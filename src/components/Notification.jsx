import React from "react";

const Notification = ({ message, type ,setNotify}) => {
  // Define styles for different notification types
  const typeStyles = {
    info: {
      iconBg: "bg-blue-100 dark:bg-blue-800",
      iconText: "text-blue-500 dark:text-blue-200",
      iconPath: (
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
        />
      ),
    },
    error: {
      iconBg: "bg-red-100 dark:bg-red-800",
      iconText: "text-red-500 dark:text-red-200",
      iconPath: (
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 9V7a4 4 0 0 0-8 0v2m9 5a2 2 0 1 1-4 0m-2 0a2 2 0 1 1-4 0m3-5h2m-2 0h-2"
        />
      ),
    },
  };

  const currentType = typeStyles[type] || typeStyles.info;

  return (
    <div
      id="toast-default"
      className="flex items-center w-full max-w-lg p-4 lg:ml-52  mb-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${currentType.iconBg} ${currentType.iconText} rounded-lg`}
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          {currentType.iconPath}
        </svg>
      </div>
      <div className="ms-3 text-sm  font-normal">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={()=>{setNotify(null)}}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
