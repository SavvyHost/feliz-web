import React from "react";
import { Heart, HeartOff } from "lucide-react";
import {
  toast,
  ToastOptions as ToastOptions_TP,
  ToastPosition,
} from "react-toastify";

// Toast Content Component
interface ToastContentProps {
  message: string;
  isAdding: boolean;
}

const ToastContent: React.FC<ToastContentProps> = ({ message, isAdding }) => {
  return (
    <div className="flex items-center gap-2">
      {isAdding ? (
        <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
      ) : (
        <HeartOff className="w-8 h-8" />
      )}
      <span>{message}</span>
    </div>
  );
};

// Toast Configuration
const toastOptions: ToastOptions_TP = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
  closeButton: false,
  icon: false, // Disable the default icon
};

const STYLES = {
  success: "bg-white text-gray-800 shadow-md",
  error: "bg-red-50 text-red-600",
  info: "bg-white text-gray-800 shadow-md",
  loading: "bg-blue-50 text-blue-600",
} as const;

type ToastType = keyof typeof STYLES;

// Toast Utility Functions
interface WishlistToastOptions {
  isAdding?: boolean;
  itemName?: string;
}

export const notify = (
  type: ToastType = "success",
  msg?: string,
  position: ToastPosition = "top-right",
  isLoading: boolean = false
) => {
  let message = msg || "Successful operation";

  if (type === "error" && !msg) {
    message = "Something went wrong";
  }

  if (isLoading) {
    message = msg || "Loading...";
  }

  const className = `${
    STYLES[isLoading ? "loading" : type]
  } custom-toast-class`;

  toast(message, {
    ...toastOptions,
    type,
    autoClose: isLoading ? false : 2000,
    className, // Apply your custom class here
    position,
  });
};

export const notifyWishlist = ({ isAdding = true }: WishlistToastOptions) => {
  const message = isAdding
    ? "Saved to your wishlist"
    : "Removed from your wishlist";

  toast(<ToastContent message={message} isAdding={isAdding} />, {
    ...toastOptions,
    className: STYLES.success,
  });
};
