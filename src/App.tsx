import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Home'
import { useEffect, useState } from 'react'
import { type Food, type Day } from './types'

function App() {
  const [foods, setFoods] = useState<Food[]|null>(null)
  const [days, setDays] = useState<Day[]|null>(null)

  useEffect(() => {
    const storedFoods = localStorage.getItem('foods') ?? '[]'
    setFoods(JSON.parse(storedFoods))

    const storedDays = localStorage.getItem('days') ?? '[]'
    setDays(JSON.parse(storedDays))
  }, [])

  useEffect(() => {
    if (foods === null)
      return

    localStorage.setItem('foods', JSON.stringify(foods))
  }, [foods])

  useEffect(() => {
    if (days === null)
      return
    localStorage.setItem('days', JSON.stringify(days))
  }, [days])

  return <BrowserRouter>
    <Routes>
      <Route path='*' element={<Home setFoods={setFoods} foods={foods ?? []} days={days ?? []} setDays={setDays}/>}/>
    </Routes>
  </BrowserRouter>
}
export default App
