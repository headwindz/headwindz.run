'use client'

import React, { useState } from 'react'

export default function App() {
  const [persons, setPersons] = useState(['mike', 'jason', 'sharky'])

  const onAdd = () => {
    setPersons(['fishman', ...persons])
  }
  return (
    <>
      <button
        onClick={onAdd}
        className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Add fishman on top
      </button>
      <ul className="space-y-2">
        {persons.map((p, index) => {
          return (
            <li key={index} className="flex items-center gap-2">
              <input type="checkbox" />
              {p}
            </li>
          )
        })}
      </ul>
    </>
  )
}
