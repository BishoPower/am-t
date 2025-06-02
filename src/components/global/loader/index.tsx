import React from "react";
import Spinner from "./spinner";

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
  duration?: number;
  fullScreen?: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
  duration = 1.5,
  fullScreen = false,
  text,
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50">
        <Spinner
          size={size}
          color={color}
          className={className}
          duration={duration}
        />
        {text && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Spinner size={size} color={color} duration={duration} />
      {text && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{text}</p>
      )}
    </div>
  );
};

// Export both the wrapper and the raw spinner
export { Spinner };
export default Loader;
