import ProjectCard from "./ProjectCard";

function ProjectList({ projects, onDeleteProject }) {
  if (!projects?.length) {
    return (
      <div className="rounded-2xl glass-card p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-[var(--text-main)]">
          No Projects Found
        </h2>

        <p className="mt-2 text-[var(--text-muted)]">
          Create your first project
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDeleteProject}
        />
      ))}
    </div>
  );
}

export default ProjectList;