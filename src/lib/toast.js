import toast from "react-hot-toast";

export const showSuccessToast = (
  message
) => {
  toast.success(message);
};

export const showErrorToast = (
  message
) => {
  toast.error(message);
};

export const showLoadingToast = (
  message
) => {
  return toast.loading(message);
};

export const dismissToast = (id) => {
  toast.dismiss(id);
};