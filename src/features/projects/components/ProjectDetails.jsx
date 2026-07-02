import ProjectHeader from "./ProjectHeader";
import ProjectStats from "./ProjectStats";
import MemberList from "./MemberList";
import TaskCard from "../../tasks/components/TaskCard";

function ProjectDetails({ project, actions, onRemoveMember, currentUserEmail }) {
  if (!project) {
    return <p className="text-[var(--text-muted)]">No project selected</p>;
  }

  const recentTasks = project.recentTasks || project.tasks || [];

  const computedTaskCounts = {
    total: recentTasks.length,
    done: recentTasks.filter(t => t.status === "DONE").length,
    inProgress: recentTasks.filter(t => t.status === "IN_PROGRESS").length,
    overdue: recentTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "DONE").length
  };

  return (
    <div className="space-y-6">
      <ProjectHeader project={project} actions={actions} />

      <ProjectStats taskCounts={computedTaskCounts} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl glass-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-[var(--text-main)]">Members</h2>

          <MemberList
            members={project.members || []}
            onRemove={onRemoveMember}
            currentUserEmail={currentUserEmail}
          />
        </div>

        <div className="rounded-2xl glass-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-[var(--text-main)]">
            Recent Tasks
          </h2>

          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <p className="text-[var(--text-muted)]">No recent tasks</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
