import React from 'react';

const Loading = ({ message = "Processing your prescription..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 absolute inset-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-pulse">⏳</span>
        </div>
      </div>
      <p className="mt-6 text-gray-700 font-medium text-lg animate-pulse">{message}</p>
      <div className="flex gap-2 mt-4">
        <div className="h-2 w-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="h-2 w-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="h-2 w-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default Loading;