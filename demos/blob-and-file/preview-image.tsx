'use client'

import { useState } from 'react'

export default function App() {
  const [preview, setPreview] = useState<string>('')

  function handleFileChange(e) {
    const file = e.target.files[0]

    if (file && file.type.startsWith('image/')) {
      // Create object URL for preview
      const url = URL.createObjectURL(file)
      console.log('url', url)
      setPreview(url)
      // Clean up previous URL if exists
      return () => URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-4">
      <label className="inline-block cursor-pointer rounded-lg border-2 border-blue-500 bg-blue-500 px-6 py-3 font-semibold text-white transition-all hover:border-blue-600 hover:bg-blue-600">
        <span>Choose Image</span>
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>
      {preview && (
        <div>
          <h3 className="mb-2 text-lg font-semibold">Preview:</h3>
          <img
            src={preview}
            alt="Preview"
            className="max-w-md rounded-lg border border-gray-200 shadow-md dark:border-gray-700"
          />
        </div>
      )}
    </div>
  )
}
