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
      <div className="filter">
      <BackgroundSlider
          images={images}
          duration={6} transition={4} />
      <div className="black-bg"/>
      </div>

      <div className="home-panel">
        <h1 className="home-element">Site de gestion de repas</h1>
        <div>
          <h4 className="home-element">Bienvenue sur le meilleur site de gestion de repas quotidien!</h4>
        </div>
        <p className="home-element">
              Ce site à comme objectif de vous aider à mieux planifier les repas de votre domicile. 
              Que ce soit de les visualiser dans un calendrier, produire une liste d'épicerie ou 
              gérer les ingrédients d'un plat précis, ce site est fait pour vous.
        </p>
        <div className="home-element">
          <iframe 
            className="home-element" width="560" height="315" src="https://www.youtube.com/embed/cumlRlhIbeE" title="YouTube video player" 
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
      </>
    );
  }
}