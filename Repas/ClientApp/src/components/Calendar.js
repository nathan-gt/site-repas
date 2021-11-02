import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import "@fullcalendar/timegrid/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../custom.css";
import $, { data } from "jquery";


export class Calendar extends Component {
  
  calendarRef = React.createRef()
  
  // Get élément dans la base de donnée repas
  componentWillMount(){
    fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
    {
        method: "get",
        dataType: 'json',
    })
    .then((res) => res.json())
    .then((data) => {
      var repasList = [];
      for(var i=0; i< data.length; i++){
        var repas = data[i];
        repasList.push(repas);
      }
      this.setState({repasList})

      repasList.forEach(element =>{

        if(element.DateCalendrier.toString().startsWith("0")){
          addExternal(element.Id, element.Nom);
        }else{
          const api = this.calendarRef.current.getApi();
          api.addEvent({
              id: element.Id,
              title: element.Nom,
              start: element.DateCalendrier,
              display: 'block'
          });
        }
      });
    })
    .catch(err => console.log(err))
  }
  
  // Ajout de valeur hardcodé
  state = {
    calendarEvents: [],
    events: []
  };

  /**
   * Ajout du draggable avec javascript
   */
  componentDidMount() {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id
        };
      }
    });
  }

  /**
   * Gestion du click sur le repas 
   */
    eventClick = eventClick => {
    Alert.fire({
      title: eventClick.event.title,
      html:
        `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr>
      <td>Repas</td>
      <td><strong>` +
        eventClick.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>Ingredients</td>
        <td>
        </td>
      </tr>
      </tbody>
      </table>
      <a href="` +process.env.REACT_APP_BASE_URL+ `/plat/` + eventClick.event.id +`">Détail du repas</a>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Supprimer repas",
      cancelButtonText: "Close"
    }).then(result => {
      if (result.value) {
        // Suppresion du repas à la base de donnée
        fetch(process.env.REACT_APP_BASE_URL + '/api/repas', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({Id: eventClick.event.id})
        });
        eventClick.event.remove(); // It will remove event from the calendar
        Alert.fire("Supprimé!", "Le repas a été supprimé.", "success");
      }
    });
  };

// Liste de repas à gauche et calendrier
  render() {
    return (
      <div className="animated fadeIn p-4 demo-app">
        <Row>
          <Col lg={3} sm={3} md={3}>
            <div
              id="external-events"
              style={{
                padding: "10px",
                width: "80%",
                height: "auto",
                maxHeight: "-webkit-fill-available",
              }}
            >
              <p align="center">
                <strong> Liste de repas</strong>
              </p>
              <a className="fc font-weight-bold mb-3" onClick={addRepas}>Ajouter un repas</a>

              <div className="d-flex">
                <input type="text" size="15" className="mb-2" placeholder="Rechercher" id="searchText"/>
                <img src={process.env.REACT_APP_BASE_URL + '/search.png'} id="search" width="25" height="25"/>
              </div>

              <label htmlFor="categorie">Catégorie:</label>
              <select className="form-select mb-3 ml-1" name="categorie" id="categorie">
                <option value="None"></option>
                <option value="Américain">Américain</option>
                <option value="Italien">Italien</option>
                <option value="Carnivore">Carnivore</option>
                <option value="Québécois">Québécois</option>
              </select>
              {this.state.events.map(event => (
                <div
                  className="fc-event"
                  title={event.title}
                  data={event.id}
                  key={event.id}
                >
                  {event.title}
                </div>
              ))}
            </div>
            
          </Col>
          <Col lg={9} sm={9} md={9}>
            <div>
              <FullCalendar
                rerenderDelay={10}
                eventDurationEditable={false}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarRef}
                weekends={this.state.calendarWeekends}
                events={this.state.calendarEvents}
                eventDrop={function(info){

                  // Ajout du repas à la base de donnée
                  fetch(process.env.REACT_APP_BASE_URL + '/api/repas/' + info.event.id, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({Id: info.event.id, Nom: info.event.title, Categorie: 'None', DateCalendrier:info.event.start})
                  });
                }}
                drop={this.drop}
                eventReceive={function(info){

                  // Ajout du repas à la base de donnée
                  fetch(process.env.REACT_APP_BASE_URL + '/api/repas', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({Nom: info.event.title, Categorie: 'None', DateCalendrier:info.event.start})
                  });

                  var events = this.getEvents();
                  var calendarApi = this;
                  setTimeout(function(){refreshBD(info, events, calendarApi)},100);

                }}
                eventClick={this.eventClick}
                selectable={true}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


function addRepas() {
  Alert.fire({
    title: 'Ajouter un repas',
    html:
      '<label htmlFor="swal-input1">Nom:</label>' +
      '<input id="swal-input1" class="swal2-input"><br>' +
      '<label htmlFor="swal-input2">Catégorie:</label>' +
      '<select id="swal-input2" class="swal2-input selectCategorie">' +
                '<option value="None"></option>' +
                '<option value="Américain">Américain</option>' +
                '<option value="Italien">Italien</option>' +
                '<option value="Carnivore">Carnivore</option>' +
                '<option value="Québécois">Québécois</option>' +
      '</select>',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#swal-input1').val(),
            $('#swal-input2').val()
          ])
        })
      },
      onOpen: function () {
        $('#swal-input1').focus()
      },
      inputAttributes: {
        autocapitalize: 'on'
      },
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      }).then(function (result) {
        if(result.value[0] !== ""){
          // Ajout du repas à la base de donnée
          fetch(process.env.REACT_APP_BASE_URL + '/api/repas', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Nom: result.value[0], Categorie: result.value[1], DateCalendrier:'0001-01-01 00:00:00'})
          });

          setTimeout(function(){
          fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
          {
              method: "get",
              dataType: 'json',
          })
          .then((res) => res.json())
          .then((data) => {
            addExternal(data[data.length-1].Id, result.value[0]);
          })},100);
        }
      }).catch()
};

function addExternal(id, nom){
  var event = document.createElement("div");
  event.classList.add("external");
  event.classList.add("mb-2");

  var del = document.createElement("div");
  del.classList.add("d-inline");
  del.classList.add("bg-danger");
  del.classList.add("mr-1");
  del.classList.add("rounded");
  del.classList.add("p-1");
  del.classList.add("del");
  del.id = id;
  del.title = nom;

  var x = document.createTextNode("X");
  del.appendChild(x);

  var tag = document.createElement("div");
  tag.classList.add("d-inline")
  tag.classList.add("fc-event");
  tag.classList.add("p-1");
  tag.title = nom;

  var text = document.createTextNode(nom);
  tag.appendChild(text);

  event.appendChild(del);
  event.appendChild(tag);

  var elements = document.getElementById("external-events");
  elements.appendChild(event);
}

function refreshBD(info, events, calendarApi){

  events[events.length - 1].remove();

  events.forEach(event => {
    if (String(event.start).slice(0,10) === String(info.event.start).slice(0,10)){
      event.remove();
    }
  });

  fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
  {
      method: "get",
      dataType: 'json',
  })
  .then((res) => res.json())
  .then((data) => {
    var date = String(info.event.start.toISOString()).slice(0,10);

    data.forEach(element =>{
      if(String(element.DateCalendrier).slice(0,10) === date)
        calendarApi.addEvent({
            id: element.Id,
            title: element.Nom,
            start: date,
            display: 'block'
        });
    });
  })
}


$( document ).ready(function() {

  $(document).on("click", ".del", function () {
    if (confirm("Êtes-vous certain de vouloir surprimmer le repas " + this.title.toLowerCase() + "?")){
      // Suppresion du repas à la base de donnée
      fetch(process.env.REACT_APP_BASE_URL + '/api/repas', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Id: this.id})
      });

      $(this).parent().remove();
    }
  });

  $(document).on("click", "#search", () => {
    doSearch();
  });

  $(document).on("change", "#categorie", (event) => {
    doSearch();
  });

  function doSearch(){
    var value = $("#searchText").val();
    var select = $("#categorie").val();
    $( ".external" ).remove();
    if (value && select !== "None"){
      fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
      {
          method: "get",
          dataType: 'json',
      })
      .then((res) => res.json())
      .then((data) => { 
        data.forEach(element => {
          if(element.DateCalendrier.toString().startsWith("0")){
            var nom = element.Nom.toLowerCase()
            if (nom.includes(value.toLocaleLowerCase()) && element.Categorie === select){
              addExternal(element.Id, element.Nom);
            }
          }
          
        });
      })
    }else if (select !== "None"){
      fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
      {
          method: "get",
          dataType: 'json',
      })
      .then((res) => res.json())
      .then((data) => { 
        data.forEach(element => {
          if(element.DateCalendrier.toString().startsWith("0")){
            var nom = element.Nom.toLowerCase()
            if (element.Categorie === select){
              addExternal(element.Id, element.Nom);
            }
          }
        });
      })
    }else if (value){
      fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
      {
          method: "get",
          dataType: 'json',
      })
      .then((res) => res.json())
      .then((data) => { 
        data.forEach(element => {
          if(element.DateCalendrier.toString().startsWith("0")){
            var nom = element.Nom.toLowerCase()
            if (nom.includes(value.toLocaleLowerCase())){
              addExternal(element.Id, element.Nom);
            }
          }
        });
      })
    }else{
      fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
      {
          method: "get",
          dataType: 'json',
      })
      .then((res) => res.json())
      .then((data) => { 
        data.forEach(element => {
          if(element.DateCalendrier.toString().startsWith("0")){
            addExternal(element.Id, element.Nom);
          }
        });
      })
    }
  }

});
