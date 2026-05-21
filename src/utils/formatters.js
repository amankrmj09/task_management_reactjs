import {
  formatDate,
  formatDateTime,
} from "./dateUtils";

const formatEnumValue = (value) => {
  if (!value) return "";

  return value
    .toString()
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

export const formatStatus = (status) =>
  formatEnumValue(status);

export const formatPriority = (priority) =>
  formatEnumValue(priority);

export const formatRole = (role) =>
  formatEnumValue(role);

export const formatName = (name) => {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/)
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1)
    )
    .join(" ");
};

export const formatNumber = (value) =>
  new Intl.NumberFormat().format(value ?? 0);

export { formatDate, formatDateTime };
