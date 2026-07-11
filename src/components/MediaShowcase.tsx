"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

type VideoItem = {
  id?: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
};

type GalleryItem = {
  id?: string;
  title: string;
  image: string;
};

export default function MediaShowcase({
  videos,
  galleries,
}: {
  videos: VideoItem[];
  galleries: GalleryItem[];
}) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activeGallery, setActiveGallery] = useState<number | null>(null);

  const showGallery = activeGallery !== null && galleries[activeGallery];

  return (
    <>
      <section id="videos" className="section-block">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Video Contents</span>
            <h2>Demo & Video Proyek</h2>
          </div>
          <div className="video-grid">
            {videos.map((video) => (
              <button
                key={video.id || video.embedUrl}
                className="video-card reveal"
                type="button"
                onClick={() => setActiveVideo(video)}
              >
                <Image src={video.thumbnail} alt={video.title} width={360} height={640} unoptimized />
                <span className="video-play">
                  <Play size={22} fill="currentColor" />
                </span>
                <span className="video-title">{video.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section-block section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Galeri Foto</span>
            <h2>Kumpulan Foto & Kegiatan</h2>
          </div>
          <div className="gallery-grid">
            {galleries.map((item, index) => (
              <button
                key={item.id || item.image}
                className="gallery-item reveal"
                type="button"
                onClick={() => setActiveGallery(index)}
              >
                <Image src={item.image} alt={item.title} width={520} height={520} unoptimized />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div className="modal-layer" role="dialog" aria-modal="true">
          <button className="modal-close" type="button" onClick={() => setActiveVideo(null)} aria-label="Tutup video">
            <X size={22} />
          </button>
          <div className="video-modal">
            <iframe
              src={activeVideo.embedUrl}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {showGallery && (
        <div className="modal-layer" role="dialog" aria-modal="true" onClick={() => setActiveGallery(null)}>
          <button className="modal-close" type="button" onClick={() => setActiveGallery(null)} aria-label="Tutup galeri">
            <X size={22} />
          </button>
          <button
            className="modal-arrow left"
            type="button"
            aria-label="Foto sebelumnya"
            onClick={(event) => {
              event.stopPropagation();
              setActiveGallery((current) => (current === null ? 0 : (current - 1 + galleries.length) % galleries.length));
            }}
          >
            <ChevronLeft size={26} />
          </button>
          <Image
            className="lightbox-image"
            src={galleries[activeGallery].image}
            alt={galleries[activeGallery].title}
            width={1100}
            height={900}
            unoptimized
            onClick={(event) => event.stopPropagation()}
          />
          <button
            className="modal-arrow right"
            type="button"
            aria-label="Foto berikutnya"
            onClick={(event) => {
              event.stopPropagation();
              setActiveGallery((current) => (current === null ? 0 : (current + 1) % galleries.length));
            }}
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </>
  );
}
