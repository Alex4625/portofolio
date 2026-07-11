import { notFound } from "next/navigation";
import { supabase } from "@/../lib/db";
import { text, type DbRow } from "@/../lib/data";
import { toPublicUrl } from "@/../lib/r2";
import { requireAdmin } from "@/../lib/auth";
import { resourceConfigs, type FieldKind } from "@/../lib/adminResources";
import { deleteResourceAction, upsertResourceAction } from "../actions";

type PageProps = {
  params: Promise<{ resource: string }>;
};

async function getRows(table: string) {
  try {
    const { data } = await supabase.from(table).select("*").order("order_column", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

function defaultValue(row: DbRow | undefined, key: string, kind: FieldKind) {
  const value = row?.[key];
  if (kind === "json" && Array.isArray(value)) return value.join(", ");
  if (typeof value === "string" || typeof value === "number") return String(value);
  return "";
}

function FieldInput({ name, label, kind, row }: { name: string; label: string; kind: FieldKind; row?: DbRow }) {
  if (kind === "textarea" || kind === "json") {
    return (
      <label className="field full">
        <span>{label}</span>
        <textarea name={name} defaultValue={defaultValue(row, name, kind)} />
      </label>
    );
  }

  if (kind === "checkbox") {
    return (
      <label className="field">
        <span>{label}</span>
        <select name={name} defaultValue={row?.[name] === false ? "false" : "true"}>
          <option value="true">Published / Ya</option>
          <option value="false">Draft / Tidak</option>
        </select>
      </label>
    );
  }

  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={kind} defaultValue={defaultValue(row, name, kind)} />
    </label>
  );
}

function ResourceForm({ resource, row }: { resource: string; row?: DbRow }) {
  const config = resourceConfigs[resource];
  const action = upsertResourceAction.bind(null, resource);

  return (
    <form action={action} className="glass-panel admin-card admin-form">
      <div className="admin-header">
        <div>
          <h1>{row ? "Edit" : "Tambah"} {config.title}</h1>
          <p>{row ? "Perbarui item ini." : "Buat item baru untuk halaman public."}</p>
        </div>
        <button type="submit" className="primary-btn">Simpan</button>
      </div>

      {row && <input type="hidden" name="id" value={text(row, ["id"])} />}
      {Object.keys(config.files).map((column) => (
        <input key={column} type="hidden" name={`old_${column}`} value={text(row, [column])} />
      ))}

      <div className="admin-form-grid">
        {Object.entries(config.fields).map(([name, kind]) => (
          <FieldInput key={name} name={name} label={config.labels[name] || name} kind={kind} row={row} />
        ))}
        {Object.entries(config.files).map(([name]) => (
          <label className="field" key={name}>
            <span>{config.labels[name] || name}</span>
            <input name={name} type="file" accept="image/*" />
            {text(row, [name]) && <a href={toPublicUrl(text(row, [name]))} target="_blank" rel="noopener" className="text-sm text-[var(--accent-blue)]">File saat ini</a>}
          </label>
        ))}
      </div>
    </form>
  );
}

export default async function ResourcePage({ params }: PageProps) {
  await requireAdmin();
  const { resource } = await params;
  const config = resourceConfigs[resource];
  if (!config) notFound();

  const rows = await getRows(config.table);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </div>
        <a href="/" target="_blank" rel="noopener" className="ghost-btn">Preview</a>
      </div>

      <ResourceForm resource={resource} />

      <section className="glass-panel admin-card admin-table">
        <div className="admin-header">
          <div>
            <h1>Daftar {config.title}</h1>
            <p>{rows.length} item tersimpan.</p>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="empty-state">Belum ada data.</div>
        ) : (
          rows.map((row) => {
            const filePaths = Object.keys(config.files).map((column) => text(row, [column])).filter(Boolean);
            const deleteAction = deleteResourceAction.bind(null, resource, text(row, ["id"]), filePaths);

            return (
              <article className="admin-row" key={text(row, ["id"])}>
                <div>
                  <h3>{text(row, [config.summary[0]], "Untitled")}</h3>
                  <p>{text(row, [config.summary[1]], "Tidak ada deskripsi")}</p>
                </div>
                <div className="row-actions">
                  <details>
                    <summary className="small-btn">Edit</summary>
                    <div style={{ marginTop: 12, minWidth: "min(720px, 80vw)" }}>
                      <ResourceForm resource={resource} row={row} />
                    </div>
                  </details>
                  <form action={deleteAction}>
                    <button type="submit" className="danger-btn">Hapus</button>
                  </form>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
