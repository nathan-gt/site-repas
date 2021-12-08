import React, { useState, useEffect } from "react";
import ListeIngredients from "./ListeIngredients";
import Autocomplete from "./Autocomplete";
import "bootstrap/dist/css/bootstrap.min.css";
import "../custom.css";
import Ingredient from "./Ingredient";

// Clé pour le local storage des ingrédients
var LOCAL_STORAGE_KEY = null;

export default function AjoutIngredient({ listeIngredients, idFamille }) {

    LOCAL_STORAGE_KEY = String(listeIngredients['Id']);

    // Liste des noms des ingrédients de la famille.
    const tabNomIngrFamille = [];
    // Liste des ingrédients de la famille du user.
    const lstIngrFamille = [];
    // Liste des ingrédients du repas.
    const ingredientsRepas = [];

    // Requête pour récupérer les ingrédients de la famille
    // dans le but de templir l'autocomplete.
    fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient',
    {
        method: "GET",
        dataType: 'JSON',
    })
    .then((res) => res.json())
    .then((data) => {
        data.forEach(ingredient => {
            // Tri des ingredients en fonction du d'identifiant
            // de la famille 
            if (ingredient.FamilleId === idFamille) {
                tabNomIngrFamille.push(ingredient.Nom);
                lstIngrFamille.push(ingredient);
            }
            // Tri des ingrédients pour récupérer ceux du repas affiché
            if (ingredient.UnRepasId == listeIngredients['Id']) {
                ingredientsRepas.push(ingredient);
            }
        });
    })
    .catch(err => console.log(err));

    // Création d'une liste d'ingrédients fictive
    const [ingredients, setIngredients] = useState(listeIngredients['LesIngredients']);

    console.log(ingredientsRepas);

    // Autre utilisation du useEffect pour conserver les ingrédients 
    useEffect(() => {
        const storedIngredients = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedIngredients.length < 1 /*|| storedIngredients.length != listeIngredients['LesIngredients'].length*/) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listeIngredients['LesIngredients']));
        }
        setIngredients(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
    }, []);

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
        // Ajout de l'ingrédient au localstorage pour l'affichage.
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ingredients));

    }, [ingredients]);

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

        console.log(ingredients);

        // Ajout de l'ingrédient à la BD
        fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Nom: String(nomIngr), Categorie: "None", Disponible: false, UnRepasId: listeIngredients['Id'], FamilleId: idFamille})
        });
    }

    // Fonction qui gère le click sur 
    // le bouton de suppression d'un 
    // ingrédient.
    function gererSuppressionIngr(nomIngredient) {
        /*
        *   Effectuer la suppression pour le render.
        */
        const newIngredients = [...ingredients];
        const idIngrSuppr = newIngredients.indexOf(nomIngredient);
        newIngredients.splice(idIngrSuppr, 1);
        setIngredients(newIngredients);

        /*
        *   Suppression de l'ingrédient dans la BD.
        */
        // Récupération de l'ingrédient à supprimer
        const ingrASuprr = ingredientsRepas.find(element => element.Nom == nomIngredient);
        console.log(ingrASuprr);

        // Suppression de l'ingrédient
        fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient/', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Id: ingrASuprr.Id})
        });
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
            <Autocomplete suggestions={ tabNomIngrFamille }  noGererAjoutIngr={ gererAjoutIngr } />
        </section>
    )
}