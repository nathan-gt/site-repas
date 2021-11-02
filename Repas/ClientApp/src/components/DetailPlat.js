import React, { Component } from 'react'

export class DetailPlat extends Component {
    constructor() {
        super();

        this.platAAfficher = {};
    }
    // GET élément dans la base de donnée repas
    componentWillMount() {
        const GET_ID_PLAT = this.props.match.params.id;

        fetch(process.env.REACT_APP_BASE_URL + '/api/repas/recherche', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Id: GET_ID_PLAT})
        })
        // Exécution de la requête 
        .then((res) => res.json())
        // Traitement des données recues en JSON
        .then((data) => {
            console.log(data);
        });
        

        // Requête vers la BD pour aller chercher tous les plats
        fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
        {
            // Spécifation de la méthode et du format des données
            method: "get",
            dataType: 'json',
        })
        // Exécution de la requête 
        .then((res) => res.json())
        // Traitement des données recues en JSON
        .then((data) => {
            data.forEach(plat => {
                if (plat['Id'] == GET_ID_PLAT)
                    this.platAAfficher = plat
            });

            /*console.log("ID du plat à afficher " + this.platAAfficher['Id']);
            console.log(this.platAAfficher);*/
        });
    }

    titreRepas() {
        
    }
    
    render(){
        return (
        <div>
            <h1>Détails sur le plat</h1><br />
        <div>
            <h2>{this.platAAfficher['Nom']}</h2>

            <label for="cars">Type de plat : </label>
            <select name="typePlat" id="type">
                <option value="carnivore">Carnivore</option>
                <option value="vegetarien">Végétarien</option>
                <option value="vegan">Vegan</option>
            </select><br /><br />

            {/* <AjoutIngredient listeIngredients={plats[2].ingredients}/> */}

            <h3>Description/Préparation</h3><br />
            <p>
                <strong>Étape 1 :</strong>Égoutter les tomates et réserver le jus dans un 
                bol. Épépiner les tomates en retirant l’eau de végétation 
                contenue dans chacune d’elles (voir note). Avec les mains, 
                broyer les tomates grossièrement. Déposer les tomates en 
                morceaux dans le jus réservé et ajouter le reste des 
                ingrédients. Saler et poivrer.
            </p>
            <p>
                <strong>Étape 2 :</strong>Placer la grille au centre du four. 
                Y placer une pierre à pizza ou une plaque de cuisson à l’envers. 
                Préchauffer le four à 230 °C (450 °F).
            </p>
            <p>
                <strong>Étape 3 :</strong>Dans une poêle, dorer les champignons 
                dans l’huile. Saler et poivrer. Réserver.
            </p>
            <p>
                <strong>Étape 4 :</strong>Séparer la pâte en deux. Sur un plan de 
                travail fariné, abaisser un morceau de pâte à la fois en un disque 
                de 35 cm (14 po) de diamètre en formant une bordure épaisse. 
                Déposer sur du papier parchemin. Étaler 250 ml (1 tasse) de 
                sauce tomate sur toute la surface. Parsemer la moitié (310 ml/1 
                1/4 tasse) du fromage râpé. Répartir la chair d’une saucisse 
                et la moitié des champignons. Cuire au four environ 12 minutes. 
                Ajouter la moitié de la mozzarella fraîche émiettée. Poursuivre 
                la cuisson environ 5 minutes ou jusqu’à ce que la pâte soit bien 
                dorée et que le fromage soit fondu. Répéter avec le reste des 
                ingrédients pour la seconde pizza.
            </p>
        </div>
        </div>
    )
    }
}