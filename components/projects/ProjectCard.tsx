import Image from "next/image";
import Link from "next/link";
import {
  Project,
  STATUS_COLOR,
  STATUS_LABEL,
} from "./data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href ?? "#"}
      className="group relative block border border-amber-700/40 bg-black/30 transition-all duration-300 hover:border-amber-500 hover:shadow-[0_0_25px_rgba(217,160,40,0.25)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Status badge */}
        {/* <div
          className={`absolute right-4 top-4 flex h-20 w-20 items-center justify-center rounded-full text-center text-[10px] font-bold uppercase leading-tight text-white shadow-lg ring-2 ring-white/20 ${STATUS_COLOR[project.status]}`}
        >
          {STATUS_LABEL[project.status]}
        </div> */}
      </div>

      {/* Caption */}
      <div className="px-5 py-6 text-center">
        <h3 className="text-xl font-semibold uppercase tracking-wide text-white">
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-neutral-300">{project.type}</p>

        <div className="mx-auto mt-5 h-px w-12 bg-amber-600/60" />

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
          Location
        </p>
        <p className="mt-1 text-sm text-neutral-300">{project.location}</p>
      </div>
    </Link>
  );
}
