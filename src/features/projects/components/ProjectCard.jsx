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
      className="block rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
    >
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold text-gray-800">
              {project.name}
            </h2>

            {project.description && (
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {project.description}
              </p>
            )}
          </div>

          {project.status && (
            <span className="ml-3 shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {project.status}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </span>

            <div>
              <p className="text-lg font-semibold text-gray-800">{memberCount}</p>
              <p className="text-xs text-gray-500">Members</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </span>

            <div>
              <p className="text-lg font-semibold text-gray-800">{taskCount}</p>
              <p className="text-xs text-gray-500">Tasks</p>
            </div>
          </div>
        </div>
    </Link>
  );
}

export default ProjectCard;