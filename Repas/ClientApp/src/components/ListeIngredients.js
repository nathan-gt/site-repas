import React from 'react'
import Ingredient from './Ingredient'

export default function ListeIngredients({ listeIngredients }) {
    return (
        listeIngredients.map(ingredient => {
            return <Ingredient key={ingredient} ingredient={ingredient} />
        })
    )
}
