'use client'

import React, { useState } from 'react'

export default function App() {
  const [isRelativeToViewport, setIsRelativeToViewport] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={isRelativeToViewport}
            onChange={(e) => setIsRelativeToViewport(e.target.checked)}
            className="h-4 w-4"
          />
          <span>Relative to viewport</span>
        </label>
      </div>

      <div
        className="wrapper relative h-40 w-full overflow-auto border border-gray-300 p-4 dark:border-gray-600"
        style={{ transform: isRelativeToViewport ? 'none' : 'translateX(0)' }}
      >
        <div className={`fixed top-2 left-2`}>
          I am fixed {isRelativeToViewport ? 'to viewport' : 'to wrapper container'}
        </div>
      </div>
    </div>
  )
}
