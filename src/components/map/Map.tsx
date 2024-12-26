'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface MapProps {
  positions: any;
  zoom?: number;
  cls?: string;
}

function Map({ positions, zoom, cls }: MapProps) {
  const DynamicMap = dynamic(() => import('./DynamicMap'), {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        Loading map...
      </div>
    ),
  });

  return (
    <div className="h-[300px] w-full">
      <DynamicMap positions={positions} zoom={zoom} cls={cls} />
    </div>
  );
}

export default React.memo(Map);
