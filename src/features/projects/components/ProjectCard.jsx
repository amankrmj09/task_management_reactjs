import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  const memberCount =
    project.memberCount ??
    project.totalMembers ??
    project.members?.length ??
    0;

  let calculatedTaskCount = undefined;
  if (project.taskCounts) {
    calculatedTaskCount = Object.values(project.taskCounts).reduce((a, b) => a + (b || 0), 0);
  }

  const taskCount =
    project.taskCount ??
    project.totalTasks ??
    calculatedTaskCount ??
    project.tasks?.length ??
    0;

  return (
    <Link
      to={`/projects/${project.id}`}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl glass-card p-4 sm:p-5 shadow-sm transition hover:shadow-md hover:border-blue-500/30 gap-4"
    >
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-[var(--text-main)] truncate">
          {project.name}
        </h2>
        {project.description && (
          <p className="mt-1 text-sm text-[var(--text-muted)] truncate">
            {project.description}
          </p>
        )}
      </div>

      <div className="flex items-center flex-wrap gap-4 shrink-0">
        <div className="flex items-center gap-2 mr-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--text-main)] leading-none">{memberCount}</span>
            <span className="text-[10px] text-[var(--text-muted)]">Members</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mr-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--text-main)] leading-none">{taskCount}</span>
            <span className="text-[10px] text-[var(--text-muted)]">Tasks</span>
          </div>
        </div>

        {project.status && (
          <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            {project.status}
          </span>
        )}
      </div>
    </Link>
  );
}

export default ProjectCard;