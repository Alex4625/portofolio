"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection({ data }: { data: any }) {
  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {
    if (!data?.whatsappNumber) return;
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/${data.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-background border-t border-border/50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">Mulai Percakapan</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Tertarik untuk berkolaborasi atau sekadar bertukar pikiran? Kirimkan pesan langsung ke WhatsApp saya!
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="bg-card border border-border/50 p-6 md:p-8 text-left shadow-lg">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Halo, saya tertarik untuk mendiskusikan..."
            className="w-full px-4 py-4 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary mb-6 resize-none leading-relaxed"
          ></textarea>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">Pesan akan langsung terkirim secara aman melalui aplikasi WhatsApp Anda.</p>
            <button 
              onClick={handleWhatsApp}
              disabled={!message.trim() || !data?.whatsappNumber}
              className="w-full md:w-auto px-8 py-3 bg-[#25D366] text-white font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="w-5 h-5" />
            </button>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
