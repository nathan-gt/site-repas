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


export class Calendar extends React.Component {
  // Ajout de valeur hardcodé
  state = {
    calendarEvents: [
      {
        title: "Pizza",
        start: "2021-09-15",
        id: "99999998"
      },
      {
        title: "Hamburger",
        start: "2021-09-15",
        id: "2"
      },
      {
        title: "Toast",
        start: "2021-09-15",
        id: "3"
      },
      {
        title: "Lasagne",
        start: "2021-09-20",
        id: "99999999"
      }
    ],
    events: [
      { title: "Repas 1", id: "1" },
      { title: "Repas 2", id: "2" },
      { title: "Repas 3", id: "3" },
      { title: "Repas 4", id: "4" },
      { title: "Repas 5", id: "5" }
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
          <strong>Pain,</strong>
          <strong>Viande,</strong>
          <strong>Laitue,</strong>
          <strong>Tomate,</strong>
          <strong>Bacon,</strong>
          <strong>Ketchup</strong>
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
        Alert.fire("Supprimer!", "Le repas a été supprimé.", "success");
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
                maxHeight: "-webkit-fill-available"
              }}
            >
              <p align="center">
                <strong> Liste de repas</strong>
              </p>
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
            <div className="demo-app-calendar" id="mycalendartest">
              <FullCalendar
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
                ref={this.calendarComponentRef}
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