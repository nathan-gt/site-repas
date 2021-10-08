import React, { useRef } from "react";
import ListeIngredients from "./ListeIngredients";

export default function AjoutIngredient() {
    // Récupération du nom de l'ingrédient (input text)
    const refNomIngredient = useRef()
    // Création d'une liste d'ingrédients fictive
    let ingredients = [
        "Sauce tomate",
        "Fromage",
        "Pepperoni",
        "Jambon",
        "Poivrons",
        "Champigons"
    ]

    // Fonction qui gère le click sur 
    // le bouton d'ajout d'un ingrédient.
    function gererAjoutIngr(e) {
        const name = refNomIngredient.current.value
        if (name === '') return
        console.log(name)
    }

    return (
        <section>
            <h3>Liste des ingrédients :</h3>
            <ul>
                <ListeIngredients listeIngredients={ingredients} />
            </ul>

            <label>Ajouter un ingrédient :</label>
            <input ref={refNomIngredient} type="text" />
            <button onClick={gererAjoutIngr}>Ajouter</button>
        </section>
    )
}
