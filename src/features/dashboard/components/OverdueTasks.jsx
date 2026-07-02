import { useState } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../../tasks/components/TaskCard";

function OverdueTasks() {
  const { stats, adminStats } = useSelector((state) => state.dashboard);
  const [activeTab, setActiveTab] = useState("OVERDUE");

  const overdueTasksList =
    stats?.overdueTaskList ||
    adminStats?.overdueTaskList ||
    stats?.overdueTasksList ||
    adminStats?.overdueTasksList ||
    [];

  const recentTasksList = 
    stats?.recentTasks || 
    adminStats?.recentTasks || 
    [];

  const combinedTasks = [...overdueTasksList, ...recentTasksList];
  const criticalMap = new Map();
  combinedTasks.forEach((t) => {
    if (t.priority === "CRITICAL") {
      criticalMap.set(t.id, t);
    }
  });
  const criticalTasksList = Array.from(criticalMap.values());

  const displayedTasks = activeTab === "OVERDUE" ? overdueTasksList : criticalTasksList;

  return (
    <div className="rounded-2xl glass-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[var(--text-main)]">
          {activeTab === "OVERDUE" ? "Overdue Tasks" : "Critical Tasks"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("OVERDUE")}
            className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
              activeTab === "OVERDUE"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-panel-hover)]"
            }`}
          >
            Overdue
          </button>
          <button
            onClick={() => setActiveTab("CRITICAL")}
            className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
              activeTab === "CRITICAL"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-panel-hover)]"
            }`}
          >
            Critical
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {displayedTasks.length > 0 ? (
          displayedTasks.slice(0, 2).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <p className="text-[var(--text-muted)]">
            {activeTab === "OVERDUE" ? "No overdue tasks" : "No critical tasks"}
          </p>
        )}
      </div>
    </div>
  );
}

export default OverdueTasks;
