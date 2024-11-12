import { toast, ToastOptions as ToastOptions_TP, ToastPosition } from 'react-toastify';

const toastOptions: ToastOptions_TP = {
  position: 'top-right',
  autoClose: 500,
  hideProgressBar: true,
  closeOnClick: false,      // Disabled click to close
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'light',
  closeButton: false,       // Hide the X icon
};

const STYLES = {
  success: 'text-mainred',
  error: 'bg-mainred text-white',
  info: 'bg-blue-300 text-white',
  loading: 'bg-blue-300 text-white',
};

type ToastType = keyof typeof STYLES;

export const notify = (
  type: ToastType = 'success',
  msg?: string,
  position: ToastPosition = 'top-right',
  isLoading: boolean = false
) => {
  let message = msg || 'Successful operation';
  
  if (type === 'error' && !msg) {
    message = 'Something went wrong';
  }
  
  if (isLoading) {
    message = msg || 'Uploading now...';
  }
  
  const className = STYLES[isLoading ? 'loading' : type];
  
  toast[type](message, {
    ...toastOptions,
    autoClose: isLoading ? false : 500,
    className,
    position,
  });
};