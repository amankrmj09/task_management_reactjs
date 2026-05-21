function ProjectHeader({ project, title, subtitle, status, actions }) {
  const displayTitle = title || project?.name;
  const displaySubtitle = subtitle || project?.description;
  const displayStatus = status || project?.status;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {displayTitle && (
            <h1 className="text-3xl font-bold text-gray-800">{displayTitle}</h1>
          )}

          {displaySubtitle && (
            <p className="mt-2 text-gray-500">{displaySubtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {displayStatus && (
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              {displayStatus}
            </span>
          )}

          {actions}
        </div>
      </div>
    </div>
  );
}

export default ProjectHeader;
