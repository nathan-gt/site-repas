import React, { Component } from 'react'
import AjoutIngredient from './AjoutIngredient';
import $, { data } from "jquery";

export class DetailPlat extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 'default'};
    
        this.handleChange = this.handleChange.bind(this);
    }

    // Méthode ayant pour but de gérer le
    // changement de valeur du type de plat
    handleChange(event) {
        // TODO: Mettre à jour le type de plat dans la BD ICI
        this.setState({value: event.target.value});
        console.log("La valeur est maintenant à " + event.target.value);
    }

    // Fonction ayant pour but de transférer les ingrédients à celle
    // qui s'occupe de les afficher sur la page (AjoutIngregient.js).
    envoyerIngredients = () => {
        // TODO: Faire une requête pour aller chercher la liste des ingrédients
        //       du plat
        return {
            Id: this.props.match.params.id,
            LesIngredients: []
        };
    }
    
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
                    // Modifier le titre du plat dans la page
                    $("#titre-plat").text(plat['Nom']);

                    console.log("ID du plat à afficher " + plat['Id']);
                    console.log(plat);
                }
            });
        });
    }

    // Affiche le contenu de la page
    render() {
        return (
            <div>
                <h1 class="display-2 text-center" id="titre-plat">Détails sur le plat</h1>
                <p class="text-center">(détails sur le plat)</p><br />

                <div id="details-plat">
                    <h3>Type de plat : </h3>
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="default">Sélectionnez un type</option>
                        <option value="carnivore">Carnivore</option>
                        <option value="vegetarien">Végétarien</option>
                        <option value="vegan">Vegan</option>
                    </select><br /><br />

                    <AjoutIngredient listeIngredients={ this.envoyerIngredients() } />
                </div>
            </div>
        )
    }
}
