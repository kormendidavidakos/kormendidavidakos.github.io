import { useEffect, useState, type Dispatch } from "react"
import type { Day, Food } from "./types"

export default function Home({foods, setFoods, days, setDays}: {foods: Food[], setFoods: Dispatch<typeof foods>, days: Day[], setDays: Dispatch<typeof days>}) {
    const [todaysIntake, setTodayIntake] = useState<Day|null>(null)

    const [name, setName] = useState('')
    useEffect(() => {
        const now = new Date()
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
        let stored = days.find((day) => day.unixTimestamp === startOfDay)
        if (stored === undefined)
            stored = {macros: {fat: 0, kcal: 0, protein: 0, sugar: 0}, meals: [], unixTimestamp: startOfDay}
        setTodayIntake(stored)
    }, [days])

    useEffect(() => {
        if (todaysIntake === null || todaysIntake.meals.length === 0)
            return

        const existing = days.find((x) => x.unixTimestamp === todaysIntake.unixTimestamp)
        if (existing === undefined){
            setDays([...days, todaysIntake])
            return
        }
        const existingIndex = days.indexOf(existing)

        setDays([...days.slice(0, existingIndex), todaysIntake, ...days.slice(existingIndex + 1)])
    }, [todaysIntake])

    function saveFood(){
        if (foods.find(food => food.name === name))
            return
        console.log('ok')
        setFoods([...foods, {name: name, amount: 1, unit: 'g', macros: {kcal: 100, fat: 10, protein: 10, sugar: 10}}])
    }
    if (!todaysIntake)
        return <></>

    return (
        <div className="page-container">
            <div className="home-today">
                <h1>Today</h1>
                <span>Energy: {todaysIntake.macros.kcal}kcal</span>
                <span>Carbs: {todaysIntake.macros.sugar}g</span>
                <span>Protein: {todaysIntake.macros.protein}g</span>
                <span>Fat: {todaysIntake.macros.fat}g</span>
            </div>
            <div className="home-today">
                <h1>Foods</h1>
                <span>Name: <input type="text" value={name} onChange={(event) => setName(event.target.value)}/></span>
                <span>Amount: <input type="number" /></span>
                <span>Unit: <input type="text" /></span>
                <span>Energy: <input type="text" /></span>
                <span>carbs: <input type="text" /></span>
                <span>protein: <input type="text" /></span>
                <span>fat: <input type="text" /></span>
                <span className="clickable" onClick={saveFood}>save</span>
            </div>
        </div>
    )
}