import React, { Component } from "react";
import AfficherPlat from "./AfficherPlat";
import "@fullcalendar/timegrid/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../custom.css";

export class DetailsPlat extends Component {
    static displayName = DetailsPlat.name;

    render () {
        return (
            <div>
                <h1>Détails sur le plat</h1>
                
                <AfficherPlat />
            </div>
        );
    }
}