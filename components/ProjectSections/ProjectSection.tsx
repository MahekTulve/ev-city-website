"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, FileSearch } from "lucide-react";
import { CATEGORIES, CITY_LABEL, type Category, type City, PROJECTS } from "./data";
import ProjectCard from "./ProjectCard";
export default function ProjectSection() {
  const [category, setCategory] = useState<Category>("residential");
  const [hoverCat, setHoverCat] = useState<Category | null>(null);
  const cities = useMemo(
    () => CATEGORIES.find((c) => c.id === category)?.cities ?? [],
    [category],
  );
  const [city, setCity] = useState<City>(cities[0]);
  const activeCity = cities.includes(city) ? city : cities[0];
  const gridKey = `${category}:${activeCity}`;
  const [renderKey, setRenderKey] = useState(gridKey);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (gridKey === renderKey) return;
    setVisible(false);
    const t = setTimeout(() => {
      setRenderKey(gridKey);
      setVisible(true);
    }, 220);
    return () => clearTimeout(t);
  }, [gridKey, renderKey]);
  const [activeCatForRender, activeCityForRender] = renderKey.split(":") as [Category, City];
  const projects = PROJECTS[activeCatForRender]?.[activeCityForRender] ?? [];
  const pickCity = (cat: Category, c: City) => {
    setCategory(cat);
    setCity(c);
    setHoverCat(null);
  };
  return (
    <section className="relative min-h-screen w-full bg-neutral-950 py-10">
      <button
        type="button"
        className="fixed right-5 top-1/3 z-30 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 text-center text-[11px] font-bold uppercase text-black shadow-[0_8px_30px_rgba(0,0,0,0.6)] ring-2 ring-amber-200/60 transition hover:scale-105"
      >
        <FileSearch className="mb-1 h-5 w-5" />
        Enquire
        <span>Now</span>
      </button>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap justify-center gap-4 pb-8">
          {CATEGORIES.map((cat) => {
            const active = cat.id === category;
            const open = hoverCat === cat.id;
            return (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setHoverCat(cat.id)}
                onMouseLeave={() => setHoverCat(null)}
              >
                <button
                  onClick={() => {
                    setCategory(cat.id);
                    setCity(cat.cities[0]);
                  }}
                  className={`flex w-56 items-center justify-between gap-3 border px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                    active
                      ? "border-amber-500 bg-neutral-900 text-amber-500 shadow-[inset_0_0_20px_rgba(217,160,40,0.15)]"
                      : "border-neutral-700 bg-black/50 text-neutral-300 hover:border-amber-600/60 hover:text-amber-400"
                  }`}
                >
                  {cat.label}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`absolute left-0 right-0 top-full z-20 origin-top transform pt-2 transition-all duration-300 ease-out ${
                    open
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  <ul className="overflow-hidden border border-amber-600/40 bg-neutral-950/95 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur">
                    {cat.cities.map((c) => {
                      const isActive = cat.id === category && c === activeCity;
                      return (
                        <li key={c}>
                          <button
                            onClick={() => pickCity(cat.id, c)}
                            className={`block w-full px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.22em] transition-colors ${
                              isActive
                                ? "bg-amber-600/10 text-amber-400"
                                : "text-neutral-300 hover:bg-amber-600/10 hover:text-amber-400"
                            }`}
                          >
                            {CITY_LABEL[c]}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        {cities.length > 1 && (
          <div className="flex flex-wrap justify-center gap-8 border-b border-neutral-800/80 pb-5">
            {cities.map((c) => {
              const active = c === activeCity;
              return (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`relative pb-2 text-sm font-semibold uppercase tracking-[0.25em] transition-colors duration-300 ${
                    active ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {CITY_LABEL[c]}
                  {active && <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-amber-500" />}
                </button>
              );
            })}
          </div>
        )}
        <div
          className={`grid grid-cols-1 gap-8 py-10 transition-all duration-300 ease-out sm:grid-cols-2 lg:grid-cols-3 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        {projects.length === 0 && (
          <p className="py-20 text-center text-neutral-400">
            No projects available in this location yet.
          </p>
        )}
      </div>
    </section>
  );
}