import { notFound } from "next/navigation";
import { getProjectDetail } from "@/components/ProjectSections/projects";
import ProjectDetail from "@/components/ProjectSections/ProjectDetail";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectDetailsPage({ params }: Props) {
  const { projectId } = await params;

  const project = getProjectDetail(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}