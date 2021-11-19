import React, { useRef, useState, useEffect } from "react";
import ListeIngredients from "./ListeIngredients";
import Autocomplete from "./Autocomplete";
import "bootstrap/dist/css/bootstrap.min.css";
import "../custom.css";

// Clé pour le local storage des ingrédients
var LOCAL_STORAGE_KEY = null;

export default function AjoutIngredient({ listeIngredients }) {

    LOCAL_STORAGE_KEY = String(listeIngredients['Id']);

    const tabIngrFamille = [
        "Farine",
        "Jambon",
        "Tomate",
        "Laitue",
        "Sucre",
        "Sel",
        "Boeuf",
        "Poulet",
        "Riz",
        "Pâtes",
        "Oignons",
        "Paprika",
        "Poivre",
        "Persil",
        "Coriande",
        "Oeufs",
        "Beurre",
        "Huile",
        "Lait"
    ];

    // Récupération du nom de l'ingrédient (input text)
    const refNomIngredient = useRef()

    // Création d'une liste d'ingrédients fictive
    const [ingredients, setIngredients] = useState(listeIngredients['LesIngredients'])

    // Autre utilisation du useEffect pour conserver les ingrédients 
    useEffect(() => {
        const storedIngredients = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedIngredients) setIngredients(storedIngredients);
    }, [])

    /* ***************
        useEffect() : 
            Fonction qui est appelée une fois que le render est appelé. 
            Celui-ci est appelé lors d'un changement d'état de ce dernier ou 
            lorsqu'il recoit de nouvelle données.

        Utilisation : 
            Dans ce cas, lorsque la liste des ingrédient a été 
            modifiée, la fonction pa pousser les changements dans la BD..

    *****************/
    useEffect(() => {
        // TODO: Faire la requête pour ajouter l'ingrédient
        //       à la BD ICI !
        // NOTE: La solution adoptée est temporaire.
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ingredients));

    }, [ingredients])

    // Fonction qui gère le click sur 
    // le bouton d'ajout d'un ingrédient.
    function gererAjoutIngr(nomIngr) {
        // Récupération du contenu du TextBox
        const name = nomIngr;
        // Vérification si le contenu du 
        // TextBox n'est pas vide
        if (name === '') return
        // Ajout de l'ingrédient à la liste
        setIngredients(ingredientsPrec => [...ingredientsPrec, [name]]);
    }

    // Fonction qui gère le click sur 
    // le bouton de suppression d'un 
    // ingrédient.
    function gererSuppressionIngr(nomIngredient) {
        const newIngredients = [...ingredients]
        const idIngrSuppr = newIngredients.indexOf(nomIngredient);
        newIngredients.splice(idIngrSuppr, 1);
        setIngredients(newIngredients);
    }

    function AfficherListeIngr () {
        if (!ingredients.length > 0) {
            return (
                <span>
                    <h2 class="display-5 text-center">Vous n'avez pas encore ajouté <br/> 
                            d'ingrédients à ce plat. Ajoutez-en!</h2><br/>
                </span>
            )
        } else {
            return (
                <span>
                    <ol>
                        <ListeIngredients listeIngredients={ingredients} 
                        gererSuppressionIngr={gererSuppressionIngr} />
                    </ol><br/>
                </span>
            )
        }
    }

    return (
        <section>
            <h3>Liste des ingrédients :</h3>
            <AfficherListeIngr />
            <Autocomplete suggestions={ tabIngrFamille }  noGererAjoutIngr={ gererAjoutIngr } />
        </section>
    )
}