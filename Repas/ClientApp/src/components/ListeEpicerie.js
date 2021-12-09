import React, { Component, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import $, { data, get, isEmptyObject, nodeName } from "jquery";
import AlertListe from "sweetalert2";

export class ListeEpicerie extends Component {

    componentDidMount(){

        var date = new Date();
        var dateSemaineProchaine = new Date();
        dateSemaineProchaine.setDate(dateSemaineProchaine.getDate()+7);

        fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
        {
            method: "get",
            dataType: 'json',
        })
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element =>{
                if(element.IdFamille == localStorage.getItem('familleId')){
                    if(new Date(element.DateCalendrier) >= date && new Date(element.DateCalendrier) <= dateSemaineProchaine){
                        afficherIngredients(element.Id)
                    }
                }
            })
        })
        .catch(err => console.log(err))

        fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient',
        {
            method: "get",
            dataType: 'json',
        })
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element =>{

                if(element.FamilleId == localStorage.getItem('familleId') && element.UnRepasId == 0){
                    addElement(element.Id, element.Nom, element.UnRepasId)
                }
            })
        })
    }

    // Rendu visuel de la page
    render(){
        return (
            <div id="PageListe" className="pageListeEpicerie">
                <h1>Liste d'ingrédients de la famille</h1> 
                    <form>
                        <div className="mt-5">
                            <button onClick={addIngredient} className="mt-2 btn btn-primary">Ajouter un ingrédient à la liste</button>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" id="chkIngredients" name="dispo" value="Oui" />
                            <label htmlFor="chkIngredients" className="ml-3"> Afficher les ingrédients disponibles</label>
                        </div>
                        <div id="calendriers" className="mt-2">
                            <label> Date début</label>
                            <input className="ml-1" type="date" id="dateDebut" onchange="gererListe()"/>
                            <label className="ml-3"> Date fin</label>
                            <input className="ml-1" type="date" id="dateFin" onchange="gererListe()"/>
                        </div>
                        <div id="PDF">  
                            <div id="liste" className="mt-2 list-group"
                                style={{
                                padding: "8px",
                                width: "85%",
                                height: "auto",
                                maxHeight: "-webkit-fill-available",
                                }}
                            >
                            </div>
                        </div>
                    </form>

                <div className="mt-3">
                    <p id="test"></p>
                    <button onClick={generatePDF} className="btn btn-primary">Télécharger la liste en PDF</button>
                </div>
            </div>
        );
    }
}

//Fonction pour afficher tous les ingrédients, y compris ceux disponibles
function afficherTousIngredients(id) {

    fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient',
    {
        method: "get",
        dataType: 'json',
    })
    .then((res) => res.json())
    .then((data) => {
        //gestion des upper case et lower case ici?
        data.forEach(element =>{
            if(element.UnRepasId == id){
                addElement(element.Id, element.Nom, element.UnRepasId)
            }
        })
    })
    .catch(err => console.log(err))
}

// Fonction pour afficher les ingrédients non-disponibles
function afficherIngredients(id) {

    fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient',
    {
        method: "get",
        dataType: 'json',
    })
    .then((res) => res.json())
    .then((data) => {
        //gestion des upper case et lower case ici?
        data.forEach(element =>{
            if(element.UnRepasId == id){
                if(!element.Disponible){
                    addElement(element.Id, element.Nom, element.UnRepasId)
                }
            }
        })
    })
    .catch(err => console.log(err))
}

// Fonction de génération pour le PDF de la liste d'ingrédients
function generatePDF() {

    const input = document.getElementById('PDF');
    html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("listeEpicerie.pdf");
        });
}

// Fonction d'ajout d'un ingrédient à la liste
function addIngredient() {
    AlertListe.fire({
      title: 'Ajouter un ingrédient',
      html:
        '<label htmlFor="swal-input1">Nom:</label>' +
        '<input id="swal-input1" class="swal2-input"><br>',
        preConfirm: function () {
          return new Promise(function (resolve) {
            resolve([
              $('#swal-input1').val()
            ])
          })
        },
        inputAttributes: {
          autocapitalize: 'on'
        },
        showCancelButton: true,
        confirmButtonText: 'Ajouter',
        cancelButtonText: 'Annuler',
        }).then(function (result) {
          if(result.value && result.value[0] !== ""){
            // Ajout d'un ingrédient à la base de donnée
            fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({Nom: result.value[0], Categorie: 'None', Disponible: 0, FamilleId: localStorage.getItem('familleId'), UnRepasId : 0})
            });
  
            setTimeout(function(){
            fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient',
            {
                method: "get",
                dataType: 'json',
            })
            .then((res) => res.json())
            .then((data) => {
                addElement(data[data.length-1].Id, result.value[0], 0);
            })},100);
          }
        }).catch()
};

function addElement(id, nom, repasId){
    var event2 = document.createElement("div");
    event2.classList.add("mb-2");

    var tag2 = document.createElement("div");
    tag2.classList.add("d-inline")
    tag2.classList.add("p-1");
    tag2.title = nom;
    tag2.id = id;

    var del2 = document.createElement("div");
    del2.classList.add("d-inline");
    del2.classList.add("bg-danger");
    del2.classList.add("mr-1");
    del2.classList.add("rounded");
    del2.classList.add("p-1");
    del2.classList.add("del2");
    del2.id = id;
    del2.title = nom;
    del2.ariaAtomic = repasId;
    var x = document.createTextNode("X");
    del2.appendChild(x);

    var text = document.createTextNode(nom);
    tag2.appendChild(text);

    event2.appendChild(del2);
    event2.appendChild(tag2);
 
    var elements = document.getElementById("liste");
    elements.appendChild(event2);
}

//Fonction pour gérer la liste d'ingrédients selon les différentes contraintes
function gererListe(){

    var element = document.getElementById("liste");
    var dateDebut = document.getElementById('dateDebut').value;
    var dateFin = document.getElementById('dateFin').value;

    while (element.firstChild){
        element.removeChild(element.firstChild);
    }

    if(isEmptyObject(dateDebut))
    {
        dateDebut = new Date();
    }

    if(isEmptyObject(dateFin))
    {
        dateFin = new Date();
        dateFin.setDate(dateFin.getDate()+7);
    }

    if(new Date(String(dateFin)) < new Date(String(dateDebut)))
    {
        alert("La date de fin ne doit pas être avant la date de début");
    }

    //Vérification du checkbox pour afficher ou non les ingrédients non-disponibles
    if(document.getElementById('chkIngredients').checked) {
        fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
        {
            method: "get",
            dataType: 'json',
        })
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element =>{
                if(element.IdFamille == localStorage.getItem('familleId')){
                    if(new Date(element.DateCalendrier) >= new Date(dateDebut) && new Date(element.DateCalendrier) <= new Date(dateFin)){
                        afficherTousIngredients(element.Id)
                    }
                }
            })
        })
    } else {
        fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
        {
            method: "get",
            dataType: 'json',
        })
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element =>{
                if(element.IdFamille == localStorage.getItem('familleId')){
                    if(new Date(element.DateCalendrier) >= new Date(dateDebut) && new Date(element.DateCalendrier) <= new Date(dateFin)){
                        afficherIngredients(element.Id)
                    }
                }
            })
        })
    }
}

$( document ).ready(function() {

    $(document).on("change", "#dateDebut", function () {
        var dateFin  = document.getElementById('dateFin').value;

        if(!isEmptyObject(dateFin)){
            gererListe();
        }

    })

    $(document).on("change", "#dateFin", function () {
        gererListe();
    })

    //Suppression d'un ingrédient de la liste
    $(document).on("click", ".del2", function () {
        if (confirm("Êtes-vous certain de vouloir surprimmer l'ingrédient " + this.title.toLowerCase() + "?")){
            if(this.ariaAtomic == "0"){
                // Suppresion de l'ingrédient de la base de donnée
                fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient', {
                    method: 'DELETE',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({Id: this.id})
                });
            }
          // Modification de l'ingrédient à la base de donnée
          fetch(process.env.REACT_APP_BASE_URL + '/api/jointure/id', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Id: this.id, Disponible: 1})
          });
    
          $(this).parent().remove();
        }
      });

      //Fonction pour le checkbox
      $(document).on("click", "#chkIngredients", function (){

        gererListe();

    })
})