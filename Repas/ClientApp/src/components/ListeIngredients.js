import React from 'react'
import Ingredient from './Ingredient'

export default function ListeIngredients({ listeIngredients, gererSuppressionIngr }) {
    return (
        listeIngredients.map(ingredient => {
            return <Ingredient key={ingredient} gererSuppressionIngr={gererSuppressionIngr} ingredient={ingredient} />
        })
    )
}
