import React from 'react'

export default function Loader({ show }:{show:boolean}) {
  return (
    show && (
      <span className="block mx-auto loading loading-ring text-orange-700 tracking-widest loading-sm my-2"></span>
    )
  );
}
