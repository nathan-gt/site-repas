import React from 'react'
import AjoutIngredient from './AjoutIngredient'

export default function test() {
    const GET_ID_PLAT = this.props.match.params.id;

    let plat = fetch(process.env.REACT_APP_BASE_URL + '/api/repas/recherche', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Id: GET_ID_PLAT})
    });
    
    console.log(plat);

    return (
        <div>
            <h1>Détails sur le plat</h1><br />

            <div>
                <h2>Titre du plat</h2>

                <label for="cars">Type de plat : </label>
                <select name="typePlat" id="type">
                    <option value="carnivore">Carnivore</option>
                    <option value="vegetarien">Végétarien</option>
                    <option value="vegan">Vegan</option>
                </select><br /><br />

                {/* <AjoutIngredient listeIngredients={plats[2].ingredients}/> */}

            </div>
        </div>
    )
}
