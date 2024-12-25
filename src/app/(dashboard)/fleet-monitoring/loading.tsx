import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';

function loading() {
  return (
    <div className="flex h-[97.5vh] w-full items-center justify-center">
      <ClipLoader color="#5766db" size={40} />
    </div>
  );
}

export default loading;
