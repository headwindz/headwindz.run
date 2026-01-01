'use client'

import { useState } from 'react'

export default function App() {
  const [persons, setPersons] = useState([
    { id: 'uywoejk', name: 'mike' },
    { id: 'woeioqj', name: 'jason' },
    { id: 'eljlkqd', name: 'sharky' },
  ])

  const onAdd = () => {
    setPersons([
      {
        id: 'wuioeioe',
        name: 'fishman',
      },
      ...persons,
    ])
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
        {persons.map((p) => {
          return (
            <li key={p.id} className="flex items-center gap-2">
              <input type="checkbox" />
              {p.name}
            </li>
          )
        })}
      </ul>
    </>
  )
}
