"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Home,
  Download,
  PlayCircle,
} from "lucide-react";
import type { ProjectDetail } from "@/components/ProjectSections/projects";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const FALLBACK =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=70";

export default function ProjectDetail({
  project: p,
}: {
  project: ProjectDetail;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState<
    { src: string; alt?: string }[]
  >([]);
const [videoOpen, setVideoOpen] = useState(false);
const [selectedVideo, setSelectedVideo] = useState("");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-neutral-950" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10">
          <Link
            href="/projects"
            className="mb-6 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 hover:text-amber-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-500">
            {p.city.toUpperCase()}
          </p>
          <h1 className="mt-3 text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
            {p.name}
          </h1>
          <p className="mt-2 text-lg text-neutral-300">{p.tagline}</p>
        </div>
      </div>

      {/* Overview */}
      <section className="border-b border-neutral-900 bg-black/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            {/* <span className="inline-flex items-center rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              {p.status}
            </span> */}
            <h2 className="mt-4 text-2xl font-semibold text-white">
              About the Project
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-300">
              {p.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoRow
                icon={<Home className="h-4 w-4" />}
                label="Type"
                value={p.type}
              />
              <InfoRow
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value={p.location}
              />
              {p.configuration && (
                <InfoRow
                  icon={<Home className="h-4 w-4" />}
                  label="Configuration"
                  value={p.configuration}
                />
              )}
              {p.possession && (
                <InfoRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Possession"
                  value={p.possession}
                />
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400">
                <Download className="h-4 w-4" /> Download Brochure
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-amber-500/60 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-400 transition hover:bg-amber-500/10">
                Enquire Now
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-amber-700/40">
            <img
              src={p.image}
              alt={p.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Floor Plans */}
      {/* <SectionTitle eyebrow="Layouts" title="Floor Plans" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 pb-16 sm:grid-cols-3 lg:grid-cols-4">
        {p.floorPlans.map((f, i) => (
          <div
            key={i}
            className="group overflow-hidden rounded-lg border border-neutral-800 bg-black/40"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={f.image}
                alt={f.label}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="border-t border-neutral-800 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-neutral-300">
              {f.label}
            </p>
          </div>
        ))}
      </div> */}

      {/* Amenities */}
      {p.amenities && p.amenities.length > 0 && (
        <>
          <SectionTitle eyebrow="Lifestyle" title="Amenities" />

          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 pb-16 sm:grid-cols-3 lg:grid-cols-4">
            {p.amenities.map((amenity, i) => (
              <div
                key={i}
                className="rounded-lg border border-neutral-800 bg-black/40 p-5 text-center transition hover:border-amber-500/60 hover:bg-amber-500/5"
              >
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  onClick={() => {
                    setLightboxSlides(
                      (p.amenities ?? []).map((a) => ({
                        src: a.image,
                        alt: a.title,
                      })),
                    );
                    setLightboxIndex(i);
                    setLightboxOpen(true);
                  }}
                  className="mx-auto mb-5 h-28 w-28 cursor-pointer object-contain transition hover:scale-110"
                />

                <div className="mx-auto mb-4 h-1 w-10 bg-amber-500/60" />

                <p className="text-base font-semibold text-neutral-200">
                  {amenity.title}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Specifications */}
      {/* <SectionTitle eyebrow="Build Quality" title="Specifications" />
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <ul className="grid gap-x-8 gap-y-3 rounded-xl border border-neutral-800 bg-black/40 p-8 sm:grid-cols-2">
          {p.specifications.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Location */}
      <SectionTitle eyebrow="Where to Find Us" title="Location" />
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex items-center justify-center gap-2 pb-4 text-sm text-neutral-300">
          <MapPin className="h-4 w-4 text-amber-500" /> {p.location}
        </div>
        <div className="overflow-hidden rounded-xl border border-amber-700/40">
          <iframe
            title={`${p.name} location`}
            src={p.mapEmbed}
            className="h-[400px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Gallery */}
      <SectionTitle eyebrow="Visual Tour" title="Gallery" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 pb-16 sm:grid-cols-3 lg:grid-cols-4">
        {p.gallery.map((g, i) => (
          <div
            key={i}
            onClick={() => {
              setLightboxSlides(
                p.gallery.map((g) => ({
                  src: g.image,
                  alt: g.title,
                })),
              );
              setLightboxIndex(i);
              setLightboxOpen(true);
            }}
            className="group cursor-pointer overflow-hidden rounded-lg border border-neutral-800 transition hover:border-amber-500"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={g.image}
                alt={g.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
            <p className="bg-black/60 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-neutral-300">
              {g.title}
            </p>
          </div>
        ))}
      </div>

      {/* Videos */}
<SectionTitle eyebrow="Watch" title="Videos" />

<div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 pb-24 sm:grid-cols-2 lg:grid-cols-3">
  {p.videos.map((v, i) => (
    <div
      key={i}
      onClick={() => {
        setSelectedVideo(v.url);
        setVideoOpen(true);
      }}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-neutral-800"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={v.thumbnail ?? p.image}
          alt={v.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition group-hover:bg-black/20">
        <PlayCircle className="h-14 w-14 text-amber-400 drop-shadow-lg transition group-hover:scale-110" />
      </div>

      <p className="border-t border-neutral-800 bg-black/60 px-4 py-3 text-center text-sm font-medium text-neutral-200">
        {v.title}
      </p>
    </div>
  ))}

  {videoOpen && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    onClick={() => setVideoOpen(false)}
  >
    <div
      className="relative w-[90%] max-w-3xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setVideoOpen(false)}
        className="absolute -top-10 right-0 text-3xl text-white hover:text-amber-400"
      >
        ✕
      </button>

      <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
        <iframe
          src={selectedVideo}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  </div>
)}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
          plugins={[Zoom, Fullscreen, Thumbnails]}
        />
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-black/40 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
        {icon} {label}
      </div>
      <p className="mt-2 text-sm text-neutral-200">{value}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-6 pt-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-500">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold uppercase tracking-wide text-white">
        {title}
      </h2>
      <div className="mx-auto mt-3 h-px w-16 bg-amber-500/60" />
    </div>
  );
}
