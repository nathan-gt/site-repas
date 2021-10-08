import React, { Component } from "react";
import AjoutIngredient from "./AjoutIngredient";
import "@fullcalendar/timegrid/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../custom.css";

// Test avec des valeurs hardcodées en JS
let infos = {
    id: "ID du plat",
    title: "Titre du plat",
    start: "Date prévue (DD/MM/YYYY)",
    ingredients: "Nom des ingrédients (tableau de valeurs ?)",
    description: "Courte description sur la recette"
}

export class Plat extends Component {
    static displayName = Plat.name;

    render () {
        return (
            <div>
                <h1>Détails sur le plat</h1>
                <h2>Nom du plat : (ex: Pizza)</h2>

                <AjoutIngredient />

                <h3>Description/Préparation</h3>
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
        );
    }
}