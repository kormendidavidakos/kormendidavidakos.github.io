import { Knob } from "primereact/knob";
import type { Day, Macros } from "../types";

export default function TodaysIntake({today, target}: {today: Day, target: Macros}) {
    const carbPercent = Math.min(today.macros.sugar / target.sugar * 100, 100)
    const proteinPercent = Math.min(today.macros.protein / target.protein * 100, 100)
    const fatPercent = Math.min(today.macros.fat / target.fat * 100, 100)
    return (
    <div className="home-today">
        <h1>Today</h1>
        <span className="today-progress">
            <Knob value={today.macros.kcal / target.kcal * 100} size={200} valueTemplate={`${today.macros.kcal / target.kcal * 100}%`}/>
            <span style={{fontSize: '1.5rem'}}>{today.macros.kcal} / {target.kcal} kcal</span>
        </span>
        <div className="today-progress-macros">
            <span className="today-progress">
                <span className="today-progress-label">Carbs:</span> 
                <div className="today-progress-bar"><div className="today-progress-bar-fill" style={{width: `${carbPercent}%`, backgroundColor: carbPercent < 95 ? 'var(--warning)' : 'var(--primary-color)'}}/></div>
                <span>{today.macros.sugar} / {target.sugar}g</span>
            </span>
            <span className="today-progress">
                <span>Protein:</span> 
                <div className="today-progress-bar"><div className="today-progress-bar-fill" style={{width: `${proteinPercent}%`, backgroundColor: proteinPercent < 95 ? 'var(--warning)' : 'var(--primary-color)'}}/></div>
                <span>{today.macros.protein} / {target.protein}g</span>
            </span>
            <span className="today-progress">
                <span>Fat:</span> 
                <div className="today-progress-bar"><div className="today-progress-bar-fill" style={{width: `${fatPercent}%`, backgroundColor: fatPercent < 95 ? 'var(--warning)' : 'var(--primary-color)'}}/></div>
                <span>{today.macros.fat} / {target.fat}g</span>
            </span>
        </div>
    </div>
    )
}