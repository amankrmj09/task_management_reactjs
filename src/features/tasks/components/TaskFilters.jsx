import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setFilters } from "../redux/taskSlice";
import Dropdown from "../../../components/common/Dropdown";

function TaskFilters() {
  const dispatch = useDispatch();

  const { filters } = useSelector((state) => state.tasks);

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const hasActiveFilters = Boolean(filters.status || filters.priority || filters.overdue);

  return (
    <div className="relative z-50 rounded-2xl glass-card p-6 shadow-sm border border-[var(--border-color)]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Dropdown
          fullWidth
          label={filters.status ? filters.status.replace("_", " ") : "All Status"}
          onSelect={(val) => dispatch(setFilters({ status: val }))}
          items={[
            { label: "All Status", value: "" },
            { label: "TODO", value: "TODO" },
            { label: "IN PROGRESS", value: "IN_PROGRESS" },
            { label: "IN REVIEW", value: "IN_REVIEW" },
            { label: "DONE", value: "DONE" },
          ]}
        />

        <Dropdown
          fullWidth
          label={filters.priority || "All Priority"}
          onSelect={(val) => dispatch(setFilters({ priority: val }))}
          items={[
            { label: "All Priority", value: "" },
            { label: "LOW", value: "LOW" },
            { label: "MEDIUM", value: "MEDIUM" },
            { label: "HIGH", value: "HIGH" },
            { label: "CRITICAL", value: "CRITICAL" },
          ]}
        />

        <Dropdown
          fullWidth
          label={filters.overdue === "true" ? "Yes" : filters.overdue === "false" ? "No" : "Overdue"}
          onSelect={(val) => dispatch(setFilters({ overdue: val }))}
          items={[
            { label: "Overdue", value: "" },
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
        />

        <button
          onClick={handleReset}
          disabled={!hasActiveFilters}
          className={`rounded-xl px-5 py-3 font-medium transition ${
            hasActiveFilters
              ? "bg-[var(--color-primary)] text-white hover:opacity-90 shadow-sm hover:shadow"
              : "bg-[var(--bg-panel-hover)] text-[var(--text-muted)] cursor-not-allowed opacity-60"
          }`}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default TaskFilters;