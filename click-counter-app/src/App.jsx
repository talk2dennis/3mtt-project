import { useState } from 'react'
import Counter from './Counter'


function App() {

  return (
    <div className="app">
      <header>
        <h1>Click Counter App</h1>
      </header>
      <main>
        <Counter />
      </main>
      <footer></footer>
    </div>
  )
}

export default App
