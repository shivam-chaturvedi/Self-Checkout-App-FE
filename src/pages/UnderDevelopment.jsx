import React from 'react';

const UnderDevelopment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300 flex items-center justify-center p-4 animate-gradient">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center relative overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 flex justify-around items-center opacity-10">
          <svg
            className="h-32 w-32 animate-spin-slow text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            className="h-20 w-20 animate-bounce text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M8.211 8.293a1 1 0 00-.22 1.154l2 4a1 1 0 00.92.553h2.158a1 1 0 00.92-.553l2-4a1 1 0 00-.22-1.154l-4-4a1 1 0 00-1.36 0l-4 4z"
            />
          </svg>
        </div>

        {/* Icon Section */}
        <div className="mb-8 relative z-10">
          <svg
            className="mx-auto h-24 w-24 text-indigo-500 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>

        {/* Title Section with Typewriter Animation */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 relative z-10">
          <span className="typewriter">Under Development</span>
        </h1>
        <p className="text-gray-600 mb-8 relative z-10">
          We're working hard to bring you something amazing. Stay tuned!
        </p>

        {/* Progress Indicator with Animation */}
        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-8">
          <div
            className="absolute top-0 left-0 h-full bg-indigo-500 animate-progress"
            style={{ width: '75%' }}
          ></div>
        </div>

        {/* Footer Section */}
        <p className="text-sm text-gray-500 relative z-10">Expected completion: Soon™</p>
      </div>

      {/* Styles for animations */}
      <style jsx>{`
        .animate-gradient {
          animation: gradient 6s infinite alternate;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite alternate;
        }
        @keyframes progress {
          from {
            width: 60%;
          }
          to {
            width: 90%;
          }
        }
        .typewriter {
          display: inline-block;
          overflow: hidden;
          border-right: 2px solid;
          white-space: nowrap;
          animation: typing 4s steps(30, end), blink 0.5s step-end infinite alternate;
        }
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blink {
          from {
            border-color: transparent;
          }
          to {
            border-color: black;
          }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default UnderDevelopment;
