import React, { useRef } from "react";
import ListeIngredients from "./ListeIngredients";

export default function AjoutIngredient() {
    // Récupération du nom de l'ingrédient (input text)
    const refNomIngredient = useRef()
    // Création d'une liste d'ingrédients fictive
    const [ingredients, setIngredients] = useState([
        "Sauce tomate",
        "Fromage",
        "Pepperoni",
        "Jambon",
        "Poivrons",
        "Champigons"
    ])

    // Fonction qui gère le click sur 
    // le bouton d'ajout d'un ingrédient.
    function gererAjoutIngr(e) {
        // Récupération du contenu du TextBox
        const name = refNomIngredient.current.value
        // Vérification si le contenu du 
        // TextBox n'est pas vide
        if (name === '') return
        // Ajout de l'ingrédient à la liste
        setIngredients(ingredientsPrec => [...ingredientsPrec, [name]])
        // Vidage du TextBox
        refNomIngredient.current.value = null
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
