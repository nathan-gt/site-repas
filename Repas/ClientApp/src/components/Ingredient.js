import React from 'react';

export default function Ingredient({ ingredient, gererSuppressionIngr }) {

    function handleClick() {
        gererSuppressionIngr(ingredient);
        console.log("L'ingrédient '" + ingredient + "' a bien été supprimé !");
    }

    return (
        <li>
            { ingredient }
            <button type="button" class="btn btn-danger float-right"
             onClick={handleClick}>Supprimer</button>
        </li>
    )
}
