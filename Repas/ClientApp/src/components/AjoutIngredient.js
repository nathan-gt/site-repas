import React, { useRef, useState, useEffect } from "react";
import ListeIngredients from "./ListeIngredients";

export default function AjoutIngredient({ listeIngredients }) {

    // Plat fictif
    const lesPlatsDuJour = [
        {
            Id: 1,
            Nom: "Pizza",
            Categorie: "Carnivore",
            LesIngredients: [
                "Sauce tomate",
                "Fromage",
                "Pepperoni",
                "Jambon",
                "Poivrons",
                "Champignons"
            ]
        }
    ]

    // Récupération du nom de l'ingrédient (input text)
    const refNomIngredient = useRef()

    // Création d'une liste d'ingrédients fictive
    const [ingredients, setIngredients] = useState(lesPlatsDuJour[0].LesIngredients)

    /* ***************
        useEffect() : fonction qui est appelée une fois qu'un contenu de la 
        page a été remanipulé.

        Utilisation : Dans ce cas, lorsque la liste des ingrédient a été 
        modifiée, la fonction pa pousser les changements dans la BD.
    *****************/
    useEffect(() => {
        /*fetch(process.env.REACT_APP_BASE_URL + '/api/repas/recherche', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Id: GET_ID_PLAT})
        });*/
        console.log("Un ingrédient a été ajouté !")
    }, [ingredients])

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
    
    if (!ingredients.length > 0) {
        return (
            <section>
                <h3>Liste des ingrédients :</h3>
                <p>Vous n'avez pas encore ajouté d'ingrédients à ce plat. Ajoutez-en!</p>

                <label>Ajouter un ingrédient :</label><br />
                <input ref={refNomIngredient} type="text" />
                <button onClick={gererAjoutIngr}>Ajouter</button><br /><br />
            </section>  
        )
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
