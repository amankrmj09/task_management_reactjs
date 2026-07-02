import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RecentProjects() {
  const { stats, adminStats } = useSelector((state) => state.dashboard);

  const recentProjects =
    stats?.recentProjects || adminStats?.recentProjects || [];

  return (
    <div className="rounded-2xl glass-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[var(--text-main)]">
        Recent Projects
      </h2>

      <div className="space-y-4">
        {recentProjects.length > 0 ? (
          recentProjects.slice(0, 4).map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`} className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-[var(--border-color)] bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm hover:bg-white/60 dark:hover:bg-slate-800/60 p-4 transition duration-200 ease-in-out">
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-medium text-[var(--text-main)] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">{project.name}</h3>
                <div className="mt-1 flex items-center gap-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${project.status === 'ACTIVE' ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-[var(--bg-panel-hover)] text-[var(--text-main)]'}`}>
                    {project.status.replace("_", " ")}
                  </span>
                  {project.pendingTasks > 0 && (
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-500">
                      {project.pendingTasks} pending task{project.pendingTasks > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 sm:mt-0 flex items-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 opacity-0 transition group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-[var(--text-muted)]">No recent projects</p>
        )}
      </div>
    </div>
  );
}

export default RecentProjects;
