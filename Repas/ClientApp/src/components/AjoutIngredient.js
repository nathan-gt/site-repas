import React, { useRef, useState, useEffect } from "react";
import ListeIngredients from "./ListeIngredients";
import Autocomplete from "./Autocomplete";
import "bootstrap/dist/css/bootstrap.min.css";
import "../custom.css";

// Clé pour le local storage des ingrédients
var LOCAL_STORAGE_KEY = null;

export default function AjoutIngredient({ listeIngredients }) {

    LOCAL_STORAGE_KEY = String(listeIngredients['Id']);

    const tabIngr = [
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
    function gererAjoutIngr() {
        // Récupération du contenu du TextBox
        const name = refNomIngredient.current.value;
        // Vérification si le contenu du 
        // TextBox n'est pas vide
        if (name === '') return
        // Ajout de l'ingrédient à la liste
        setIngredients(ingredientsPrec => [...ingredientsPrec, [name]]);
        // Vidage du TextBox
        refNomIngredient.current.value = null;
        console.log("Un ingrédient '" + name + "' a été ajouté !")
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
    
    if (!ingredients.length > 0) {
        return (
            <section>
                <h3>Liste des ingrédients :</h3><br/> 
                <h2 class="display-5 text-center">Vous n'avez pas encore ajouté <br/> 
                d'ingrédients à ce plat. Ajoutez-en!</h2><br/>

                <div class="input-group mb-3 max-w">
                    <input type="text" class="form-control" placeholder="Ingrédient à ajouter" ref={refNomIngredient}
                    aria-describedby="basic-addon2"/>
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button" onClick={gererAjoutIngr}>Ajouter</button>
                    </div>
                </div>
            </section>  
        )
    }

    return (
        <section>
            <h3>Liste des ingrédients :</h3>
            <ol>
                <ListeIngredients listeIngredients={ingredients} gererSuppressionIngr={gererSuppressionIngr} />
            </ol><br/>

            <div class="input-group mb-3 max-w">
                <input type="text" class="form-control" placeholder="Ingrédient à ajouter" ref={refNomIngredient}
                 aria-describedby="basic-addon2" />
                <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" onClick={gererAjoutIngr}>Ajouter</button>
                </div>
            </div>

            
            <Autocomplete suggestions={ tabIngr } />
            

            
        </section>
    )
}