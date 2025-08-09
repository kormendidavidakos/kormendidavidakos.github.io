import { useEffect, useState, type Dispatch } from "react"
import type { Day, Food, Macros } from "./types"
import TodaysIntake from "./Home/TodaysIntake"

export default function Home({foods, setFoods, days, setDays}: {foods: Food[], setFoods: Dispatch<typeof foods>, days: Day[], setDays: Dispatch<typeof days>}) {
    const [todaysIntake, setTodayIntake] = useState<Day|null>(null)
    const [name, setName] = useState('')

    const [intakeAmount, setIntakeAmount] = useState('0')
    const [selectedFood, setSelectedFood] = useState<Food|null>(null)

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

    function generateFood(food: Food, idx: number){
        return (
            <div className="food-card clickable" key={`food-card-${idx}`} onClick={() => setSelectedFood(selectedFood?.name === food.name ? null : food)}>
                <h3>{food.name}</h3>
                <div className="intake-macros">
                    <span>{food.macros.kcal}kcal</span>
                    <span>{food.macros.sugar}g carbs</span>
                    <span>{food.macros.protein}g protein</span>
                    <span>{food.macros.fat}g fat</span>
                </div>
            </div>
        )
    }

    function addFood(){
        if (selectedFood === null || intakeAmount === '0')
            return

        let amount = parseInt(intakeAmount)
        if (Number.isNaN(amount) || amount === 0)
            return

        const factor = amount === 0 ? 0 : amount / selectedFood.amount
        const macros: Macros = {
            kcal: selectedFood.macros.kcal * factor,
            fat: selectedFood.macros.fat * factor,
            protein: selectedFood.macros.protein * factor,
            sugar: selectedFood.macros.sugar * factor,
        }


        const updatedIntake = {...todaysIntake}
        updatedIntake.meals?.push({
            foods: [{...selectedFood, macros: macros, amount: amount}],
            unixTimestamp: Date.now()
        })
        updatedIntake.macros = updatedIntake.macros ?? {kcal: 0, fat: 0, protein: 0, sugar: 0}
        updatedIntake.macros.fat += macros.fat
        updatedIntake.macros.kcal += macros.kcal
        updatedIntake.macros.protein += macros.protein
        updatedIntake.macros.sugar += macros.sugar

        setTodayIntake(updatedIntake as Day)
    }

    function intakeFoodMacros(){
        if (selectedFood === null)
            return <></>
        let amount = parseInt(intakeAmount)
        if (Number.isNaN(amount))
            amount = 0

        const factor = amount === 0 ? 0 : amount / selectedFood.amount

        return <div className="intake-macros">
            <span>{selectedFood.macros.kcal * factor}kcal</span>
            <span>{selectedFood.macros.sugar * factor}g carbs</span>
            <span>{selectedFood.macros.protein * factor}g protein</span>
            <span>{selectedFood.macros.fat * factor}g fat</span>
        </div>
    }
    
    return (
        <div className="page-container">
            <TodaysIntake today={todaysIntake} target={{fat: 50, protein: 100, sugar: 120, kcal: 2000}}/>
            <div className="home-today">
                <h1>Foods</h1>
                <span>Name: <input type="text" value={name} onChange={(event) => setName(event.target.value)}/></span>
                <span>Amount: <input type="number"/></span>
                <span>Unit: <input type="text"/></span>
                <span>Energy: <input type="text"/></span>
                <span>carbs: <input type="text"/></span>
                <span>protein: <input type="text" /></span>
                <span>fat: <input type="text"/></span>
                <span className="clickable" onClick={saveFood}>save</span>
            </div>
            <div className="home-today">
                <h1>Add food to todays intake</h1>
                {foods.map((food, idx) => generateFood(food, idx))}
                <span>
                    <input type="text" value={intakeAmount} onChange={(ev) => setIntakeAmount(ev.target.value)}/>
                    {selectedFood ? selectedFood.unit : ''}
                    {intakeFoodMacros()}
                </span>
                <div className="clickable" onClick={addFood}>Add</div>
            </div>
        </div>
    )
}