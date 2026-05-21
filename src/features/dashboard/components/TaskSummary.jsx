import { useSelector } from "react-redux";

function TaskSummary({ summary }) {
  const { stats, adminStats } = useSelector((state) => state.dashboard);

  const data =
    summary ||
    stats?.taskSummary ||
    stats?.taskCounts ||
    adminStats?.taskSummary ||
    adminStats?.taskCounts ||
    {};

  const statusCounts = {
    TODO: data.TODO ?? data.todo ?? data.todoCount ?? 0,
    IN_PROGRESS:
      data.IN_PROGRESS ??
      data.inProgress ??
      data.in_progress ??
      data.inProgressCount ??
      0,
    IN_REVIEW:
      data.IN_REVIEW ??
      data.inReview ??
      data.in_review ??
      data.inReviewCount ??
      0,
    DONE: data.DONE ?? data.done ?? data.completed ?? data.completedCount ?? 0,
  };

  const items = [
    {
      label: "Todo",
      value: statusCounts.TODO,
      styles: "bg-gray-100 text-gray-700",
    },
    {
      label: "In Progress",
      value: statusCounts.IN_PROGRESS,
      styles: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "In Review",
      value: statusCounts.IN_REVIEW,
      styles: "bg-blue-100 text-blue-700",
    },
    {
      label: "Done",
      value: statusCounts.DONE,
      styles: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Task Summary</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl px-4 py-5 text-center ${item.styles}`}
          >
            <p className="text-sm font-medium">{item.label}</p>
            <p className="mt-2 text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskSummary;
