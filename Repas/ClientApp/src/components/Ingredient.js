import React from 'react';

export default function Ingredient({ ingredient, gererSuppressionIngr }) {

    function handleClick() {
        gererSuppressionIngr(ingredient);
    }

    return (
        <li class="ingr">
            { ingredient }
            <button id="suppr" type="button" class="btn btn-danger float-right"
             onClick={handleClick}>Supprimer</button>
        </li>
    )
}
