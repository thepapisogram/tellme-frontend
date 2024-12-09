import React from 'react'

export default function Res({ res, show }:{res:string, show:boolean}) {
    return (
      show && (
        <p className="connect-subtitle">{res}</p>
      )
    );
}
