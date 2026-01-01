'use client'

import { useState } from 'react'

export default function App() {
  const [option, setOption] = useState('')

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="key-unmount-demo-option-select" className="mr-2">
          Select option:
        </label>
        <select
          id="key-unmount-demo-option-select"
          onChange={(e) => setOption(e.target.value)}
          className="w-30 rounded border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
        >
          <option value="">Choose...</option>
          <option value="a">A</option>
          <option value="b">B</option>
        </select>
      </div>

      <div>
        <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
          Without key (state persists):
        </div>
        <input
          defaultValue="this is default"
          className="rounded border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
        />
      </div>

      <div>
        <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
          With key={option} (resets on change):
        </div>
        <input
          key={option}
          defaultValue="this is default"
          className="rounded border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
        />
      </div>
    </div>
  )
}
