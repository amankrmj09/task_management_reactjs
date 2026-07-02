import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

function ProjectList({ projects, onDeleteProject }) {
  const navigate = useNavigate();

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
    <div className="overflow-hidden rounded-2xl glass-card shadow-sm border border-[var(--border-color)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[var(--text-main)]">
          <thead className="bg-[var(--bg-panel-hover)] text-xs uppercase text-[var(--text-muted)] border-b border-[var(--border-color)]">
            <tr>
              <th className="px-6 py-4 font-medium w-16">S.No.</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Members</th>
              <th className="px-6 py-4 font-medium">Tasks</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {projects.map((project, index) => {
              const memberCount = project.memberCount ?? project.totalMembers ?? project.members?.length ?? 0;
              let calculatedTaskCount = undefined;
              if (project.taskCounts) {
                calculatedTaskCount = Object.values(project.taskCounts).reduce((a, b) => a + (b || 0), 0);
              }
              const taskCount = project.taskCount ?? project.totalTasks ?? calculatedTaskCount ?? project.tasks?.length ?? 0;

              return (
                <tr 
                  key={project.id} 
                  className="transition-colors hover:bg-[var(--bg-panel-hover)]/50 cursor-pointer"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <td className="px-6 py-4 text-[var(--text-muted)]">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">
                    {project.name}
                    {project.description && (
                      <div className="text-xs text-[var(--text-muted)] truncate max-w-[200px] mt-1">{project.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {project.status && (
                      <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {project.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">{memberCount}</td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">{taskCount}</td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      size="sm" 
                      variant="danger" 
                      className="!bg-red-600 !text-white inline-block" 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onDeleteProject) onDeleteProject(project.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectList;