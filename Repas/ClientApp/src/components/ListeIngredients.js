import React from 'react'
import Ingredient from './Ingredient'

export default function ListeIngredients({ listeIngredients }) {
    return (
        /*for (var i = 0; i < numrows; i++) {
            
        }*/
        listeIngredients.map(ingredient => {
            return <Ingredient key={ingredient} ingredient={ingredient} />
        })
    )
}
