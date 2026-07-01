import { CardBody, CardContainer, CardItem } from "@/components/projects/3d-card";
import type { Project } from "./data";
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <CardContainer containerClassName="py-0" className="w-full">
      <CardBody className="group/card relative h-auto w-full rounded-xl border border-amber-700/40 bg-black/40 p-4 transition-all duration-300 hover:border-amber-500 hover:shadow-[0_0_35px_rgba(217,160,40,0.35)]">
        <CardItem translateZ={40} className="w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
              loading="lazy"
            />
          </div>
        </CardItem>
        <CardItem translateZ={60} className="mt-5 w-full text-center">
          <h3 className="text-xl font-semibold uppercase tracking-wide text-white">
            {project.name}
          </h3>
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
      </CardBody>
    </CardContainer>
  );
}
