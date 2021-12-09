import React, { Component } from 'react';
import { getFamilleId } from './Helper';
import BackgroundSlider from 'react-background-slider';
import $ from 'jquery';

import burger from './food-bg/burger.jpg'
import chili from './food-bg/chili.jpg'
import yogurt from './food-bg/yogurt.jpg'
import spageth from './food-bg/spageth.jpg'
import cake from './food-bg/cake.jpg'
import table from './food-bg/table.jpg'
import steak from './food-bg/steak.jpg'
import ramen from './food-bg/ramen.jpg'
import pancakes from './food-bg/pancakes.jpg'
import veggies from './food-bg/veggies.jpg'
var shuffle = require('knuth-shuffle').knuthShuffle;

var images = [veggies, spageth, yogurt, burger, 
  chili, cake, table, steak, ramen, pancakes]

$("body").css({"background-color":"transparent"}); // use this line to override body or html css properties

getFamilleId();

export class Home extends Component {
  static displayName = Home.name;

  render () {
    images = shuffle(images);
    return (
      <>
      <div class="filter"/>
      <BackgroundSlider
          images={images}
          duration={6} transition={4} />
      <div class="black-bg"/>

      <div class="home-panel">
        <h1>Site de gestion de repas</h1>
        <p>Bienvenue sur le meilleur site de gestion de repas quotidien!</p>
        <ul>
          <li>Ce site à comme objectif de vous aider à mieux planifier les repas de votre domicile. 
              Que ce soit de les visualiser dans un calendrier, produire une liste d'épicerie ou 
              gérer les ingrédients d'un plat précis, ce site est fait pour vous!</li>
          <li>*Insérer la vidéo de présentation ici*</li>
        </ul>
      </div>
      </>
    );
  }
}