import React from 'react';
import { HashLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <HashLoader size={50} color={"#fcd34d"} loading={true} />
    </div>
  );
}

export default Loading;