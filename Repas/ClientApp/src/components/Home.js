import React, { Component } from 'react';
import { getFamilleId } from './Helper'

getFamilleId()

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Site de gestion de repas</h1>
        <p>Bienvenue sur le meilleur site de gestion de repas quotidien!</p>
        <ul>
          <li>Description générale du site web</li>
          <li>Insérer la vidéo de présentation ici</li>
        </ul>
      </div>
    );
  }
}