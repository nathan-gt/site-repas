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
import { Tab } from "bootstrap";


export class Calendar extends React.Component {
  
  calendarRef = React.createRef()
  
  // Get élément dans la base de donnée repas
  componentWillMount(){
    console.log(process.env);
    fetch('https://localhost:5001/api/repas',
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
      //console.log(repasList);
      this.setState({repasList})
      console.log(this.state.repasList);

      repasList.forEach(element =>{
        var tag = document.createElement("div");
        tag.classList.add("fc-event");
        tag.title = element.Nom;
        var text = document.createTextNode(element.Nom);
        tag.appendChild(text);
        var elements = document.getElementById("external-events");
        elements.appendChild(tag);

        if(!element.DateCalendrier.toString().startsWith("0")){
          const api = this.calendarRef.current.getApi();
          api.addEvent({
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
    calendarEvents: [
      {
        title: "Lasagne",
        start: "2021-10-20",
        id: "99999999"
      }
    ],
    events: [
    ]
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
      </div>`,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Supprimer repas",
      cancelButtonText: "Close"
    }).then(result => {
      if (result.value) {
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
              <a class="fc font-weight-bold" onClick={addRepas}>Ajouter un repas</a>
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
                id="calendar"
                defaultView="dayGridMonth"
                header={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                rerenderDelay={10}
                eventDurationEditable={false}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarRef}
                weekends={this.state.calendarWeekends}
                events={this.state.calendarEvents}
                eventDrop={this.drop}
                drop={this.drop}
                eventReceive={this.eventReceive}
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
    input: 'text',
    inputAttributes: {
      autocapitalize: 'on'
    },
    showCancelButton: true,
    confirmButtonText: 'Ajouter',
    cancelButtonText: 'Annuler',
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
  }).then((result) => {
    if (result.value) {
        console.log("Result: " + result.value);
        var tag = document.createElement("div");
        tag.classList.add("fc-event");
        tag.title = result.value;
        var text = document.createTextNode(result.value);
        tag.appendChild(text);
        var element = document.getElementById("external-events");
        element.appendChild(tag);

        // Ajout du repas à la base de donnée
        fetch('https://localhost:5001/api/repas', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Nom: result.value, Categorie: 'None', DateCalendrier:'0001-01-01 00:00:00'})
        });
    }
  })

};