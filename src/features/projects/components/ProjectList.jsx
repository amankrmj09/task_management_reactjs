import ProjectCard from "./ProjectCard";

function ProjectList({ projects, onDeleteProject }) {
  if (!projects?.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700">
          No Projects Found
        </h2>

        <p className="mt-2 text-gray-500">
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