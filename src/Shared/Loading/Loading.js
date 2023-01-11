import React from 'react';

const Loading = () => {
	return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-12 h-12 border-dashed border-4  rounded-full border-green-500 animate-spin"></div>
    </div>
  );
};

export default Loading;