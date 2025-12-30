import { useState } from 'react'
import './App.css'
import FileUploader from './FileUploader'
import type { Segment } from './types'


function App() {
  
  const [segments, setSegments] = useState<Segment[] | null>(null)

  return (
    <>
      <FileUploader
      setSegments={setSegments}
      />
      {segments && segments.map((s)=><div>{s.text}</div>)}
    </>
  )
}

export default App
