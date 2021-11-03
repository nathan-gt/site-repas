import React, { Component } from 'react'
import AjoutIngredient from './AjoutIngredient';
import $, { data } from "jquery";

export class DetailPlat extends Component {
    
    /***********************
        componentWillMount() : 
            A pour but d'interroger la BD pour aller chercher les informations 
            d'un plat pour les afficher dans la page web.
            
    ***********************/
    componentWillMount() {
        // Récupération de l'ID du plat dans l'URL.
        const GET_ID_PLAT = this.props.match.params.id;

        // Requête vers la BD pour aller chercher tous les plats.
        fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
        {
            // Spécifation de la méthode et du format des données.
            method: "get",
            dataType: 'json',
        })
        // Exécution de la requête 
        .then((res) => res.json())
        // Traitement des données recues en JSON.
        .then((data) => {
            // Parcours des plats pour retrouver celui qu'on veut afficher
            data.forEach(plat => {
                if (plat['Id'] == GET_ID_PLAT)
                {
                    loadInfosPlat(plat);

                    console.log("ID du plat à afficher " + plat['Id']);
                    console.log(plat);
                }
            });
        });
    }

    
    render() {
        return (
            <div>
                <h1>Détails sur le plat</h1><br />
                <div>
                    <h2 id="titre-plat">Titre du plat</h2>

                    <label for="cars">Type de plat : </label>
                    <select name="typePlat" id="type">
                        <option value="default">Sélectionnez un type</option>
                        <option value="carnivore">Carnivore</option>
                        <option value="vegetarien">Végétarien</option>
                        <option value="vegan">Vegan</option>
                    </select><br /><br />

                    <AjoutIngredient listeIngredients={[]} />
                </div>
            </div>
        )
    }
}

/***********************
    loadInfosPlat() : 
        A pour but d'afficher les informations sur un plat.

    Paramètes :
        - plat => Plat dont on veut afficher les informations.
        
***********************/
function loadInfosPlat(plat) {
    $("#titre-plat").text(plat['Nom']);
}