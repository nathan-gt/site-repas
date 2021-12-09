import React, { Component } from 'react'
import AjoutIngredient from './AjoutIngredient';
import $ from "jquery";

export class DetailsRepas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'None',
            IdFamille: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // Méthode ayant pour but de gérer le
    // changement de valeur du type de plat
    handleChange(event) {
        // Mise à jour de la propriété du composant.
        this.setState({value: event.target.value});
        
        // Récupération du plat à modifier
        fetch(process.env.REACT_APP_BASE_URL + '/api/repas/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        })
        .then((res) => res.json())
        .then((data) => {
            data.forEach(repas => {
                // Modification de la catégorie du repas.
                fetch(process.env.REACT_APP_BASE_URL + '/api/repas/' + repas.Id, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({Id: repas.Id, Nom: repas.Nom, Categorie: this.state.value, DateCalendrier: repas.DateCalendrier, IdFamille: repas.IdFamille, Responsable: repas.Responsable})
                });
            });
        })
        .catch(err => console.log(err));
    }

    // Fonction ayant pour but de transférer les ingrédients à celle
    // qui s'occupe de les afficher sur la page (AjoutIngregient.js).
    envoyerIngredients = () => {
        // Liste des ingrédients du repas
        let lstIngrRepas = [];

        fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient', {
            method: "get",
            dataType: 'json',
        })
        .then((res) => res.json())
        .then((data) => {
            data.forEach(element => {
                if(element.UnRepasId == this.props.match.params.id) {
                    lstIngrRepas.push(element.Nom);
                }
            })
        });

        return {
            Id: this.props.match.params.id,
            LesIngredients: lstIngrRepas
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
                if (plat['Id'] == GET_ID_PLAT) {
                    // Modifier le titre du plat dans la page
                    $("#titre-plat").text(plat['Nom']);
                    this.setState({value: plat['Categorie']});
                    this.state = {IdFamille: plat['IdFamille']};
                }
            });
        });
    }

    // Affiche le contenu de la page
    render() {
        return (
            <div>
                <h1 class="display-2 text-center" id="titre-plat">Détails sur le plat</h1>
                <p class="text-center">(détails sur le repas)</p><br />

                <div id="details-plat">
                    <h3>Type de repas : </h3>
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="None">Sélectionnez un type</option>
                        <option value="Végétarien">Végétarien</option>
                        <option value="Végétalien">Végétalien</option>
                        <option value="Américain">Américain</option>
                        <option value="Italien">Italien</option>
                        <option value="Méxicain">Méxicain</option>
                        <option value="Asiatique">Asiatique</option>
                        <option value="Libanais">Libanais</option>
                        <option value="Fruits de mer">Fruits de mer</option>
                    </select><br /><br />

                    <AjoutIngredient listeIngredients={ this.envoyerIngredients() } idFamille={this.state.IdFamille}/>
                </div>
            </div>
        )
    }
}
