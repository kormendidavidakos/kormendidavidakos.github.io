export type Food = {
    name: string
    macros: Macros
    unit: string
    amount: number
}

export type Macros = {
    kcal: number
    sugar: number
    protein: number
    fat: number
}

export type Meal = {
    foods: Food[]
    unixTimestamp: number
}

export type Day = {
    meals: Meal[]
    macros: Macros
    unixTimestamp: number
}