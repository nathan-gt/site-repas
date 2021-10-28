import React, { Component } from "react";
import AfficherPlat from "./AfficherPlat";
import "@fullcalendar/timegrid/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../custom.css";

export class DetailsPlat extends Component {
    static displayName = DetailsPlat.name;

    /*constructor () {
        super();
        // Get élément dans la base de donnée repas
        console.log(process.env);
        fetch('https://localhost:5001/api/repas',
        {
            method: "get",
            dataType: 'json',
        })
        .then((res) => res.json())
        .then((data) => {
            var repasList = [];
            for(var i = 0; i < data.length; i++) {
                var repas = data[i];
                repasList.push(repas);
            }
            this.setState({repasList});
            console.log(this.state.repasList);
        })
        console.log(repasList);
    }*/ 

    render () {
        return (
            <div>
                <h1>Détails sur le plat</h1>
                
                <AfficherPlat />
            </div>
        );
    }
}