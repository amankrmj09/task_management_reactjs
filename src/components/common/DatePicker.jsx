import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

const DatePicker = forwardRef(({
  label,
  value,
  onChange,
  error,
  placeholder = "Select date",
  name,
  ...props
}, ref) => {
  // Convert string value to Date object for react-datepicker
  const selectedDate = value ? new Date(value) : null;

  return (
    <div className="space-y-2 relative">
      {label && (
        <label className="text-sm font-medium text-[var(--text-main)]">
          {label}
        </label>
      )}

      <div className="relative">
        <ReactDatePicker
          selected={selectedDate}
          onChange={(date) => {
            // Convert back to YYYY-MM-DD format to match existing input type="date"
            const formattedDate = date ? date.toLocaleDateString("en-CA") : "";
            // Mock an event object since our forms use handleChange(e)
            onChange({ target: { name, value: formattedDate } });
          }}
          placeholderText={placeholder}
          className={`w-full rounded-xl border bg-[var(--bg-panel)] text-[var(--text-main)] pl-10 pr-4 py-3 outline-none transition focus:border-[var(--color-primary)] ${
            error ? "border-red-500" : "border-[var(--border-color)]"
          }`}
          dateFormat="yyyy-MM-dd"
          {...props}
        />
        <Calendar 
          size={18} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" 
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;
