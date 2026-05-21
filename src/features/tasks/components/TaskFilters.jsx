import { useDispatch, useSelector } from "react-redux";

import {
  resetFilters,
  setFilters,
} from "../redux/taskSlice";

function TaskFilters() {
  const dispatch = useDispatch();

  const { filters } = useSelector(
    (state) => state.tasks
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      setFilters({
        [name]: value,
      })
    );
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">
            All Status
          </option>

          <option value="TODO">
            TODO
          </option>

          <option value="IN_PROGRESS">
            IN_PROGRESS
          </option>

          <option value="IN_REVIEW">
            IN_REVIEW
          </option>

          <option value="DONE">
            DONE
          </option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">
            All Priority
          </option>

          <option value="LOW">
            LOW
          </option>

          <option value="MEDIUM">
            MEDIUM
          </option>

          <option value="HIGH">
            HIGH
          </option>

          <option value="CRITICAL">
            CRITICAL
          </option>
        </select>

        <select
          name="overdue"
          value={filters.overdue}
          onChange={handleChange}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">
            Overdue
          </option>

          <option value="true">
            Yes
          </option>

          <option value="false">
            No
          </option>
        </select>

        <button
          onClick={handleReset}
          className="rounded-xl bg-gray-800 px-5 py-3 font-medium text-white transition hover:bg-gray-900"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default TaskFilters;