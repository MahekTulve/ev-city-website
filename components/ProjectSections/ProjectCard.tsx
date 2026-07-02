import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import type { Project } from "@/components/ProjectSections/projects";
const FALLBACK =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=70";
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <CardContainer containerClassName="py-0" className="w-full">
      <CardBody className="group/card relative h-auto w-full rounded-xl border border-amber-700/40 bg-black/40 p-4 transition-all duration-300 hover:border-amber-500 hover:shadow-[0_0_35px_rgba(217,160,40,0.35)]">
        <CardItem translateZ={40} className="w-full">
          <Link href={`/projects/${project.id}`} className="block">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={project.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK;
                }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                loading="lazy"
              />
            </div>
          </Link>
        </CardItem>
        <CardItem translateZ={60} className="mt-5 w-full text-center">
          <Link href={`/projects/${project.id}`} className="block">
             <h3 className="text-xl font-semibold uppercase tracking-wide text-amber-500">
            {project.name}
          </h3>
          </Link>
        </CardItem>
        <CardItem translateZ={30} className="mx-auto mt-1 w-full text-center">
          <p className="text-sm text-neutral-300">{project.type}</p>
        </CardItem>
        <CardItem translateZ={20} className="mx-auto mt-5 block">
          <div className="mx-auto h-px w-12 bg-amber-600/60" />
        </CardItem>
        <CardItem translateZ={50} className="mx-auto mt-4 w-full text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
            Location
          </p>
          <p className="mt-1 text-sm text-neutral-300">{project.location}</p>
        </CardItem>
        <CardItem translateZ={40} className="mx-auto mt-5 block">
  <Link
    href={`/projects/${project.id}`}
    className="inline-flex items-center justify-center rounded-full border border-amber-500 px-2 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-amber-500 transition-all duration-300 hover:bg-amber-500 hover:text-black"
  >
    View Details
  </Link>
</CardItem>
      </CardBody>
    </CardContainer>
  );
}
