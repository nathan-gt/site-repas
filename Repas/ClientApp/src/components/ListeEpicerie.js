import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

export class ListeEpicerie extends Component {
    //JS et JQuery en dehors du render
    componentWillMount(){
        fetch(process.env.REACT_APP_BASE_URL + '/api/ingredient',
        {
            method: "get",
            dataType: 'json',
        })
        .then((res) => res.json())
        .then((data) => {
            var listeIngredientBd = [];
            var listeEpicerieFamille = [];
            for(var i = 0; i < data.length; i++){
                var item = data[i];
                listeIngredientBd.push(item);
            }
            this.setState({listeIngredientBd})
                        
            listeIngredientBd.forEach(element =>{
                if(element.FamilleId == localStorage.getItem('familleId')){
                    console.log(element.Disponible)
                    if(!element.Disponible){
                        addExternal(element.Id, element.Nom)

                    }
                }
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div id="PageListe" className="pageListeEpicerie">
                <h1>Liste d'épicerie de la famille pour la semaine</h1> 
                <div id="liste"
                    style={{
                    padding: "8px",
                    width: "85%",
                    height: "auto",
                    maxHeight: "-webkit-fill-available",
                    }}
                >
                </div>
                <div>
                    <button onClick={generatePDF}>Télécharger la liste en PDF</button>
                </div>
            </div>

        );
    }
}

function generatePDF() {
        const input = document.getElementById('PageListe');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            console.log("ALLO")
            pdf.addImage(imgData, 'JPEG', 0, 0);
            //pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        ;
    }
function addExternal(id, nom){
    var event = document.createElement("div");
    event.classList.add("mb-2");

    var tag = document.createElement("div");
    tag.classList.add("d-inline")
    tag.classList.add("fc-event");
    tag.classList.add("p-1");
    tag.title = nom;
    tag.id = id;

    var text = document.createTextNode(nom);
    tag.appendChild(text);
  
    event.appendChild(tag);

    var elements = document.getElementById("liste");
    elements.appendChild(event);
}