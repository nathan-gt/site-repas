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
import $, { data, get } from "jquery";

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
        if(element.IdFamille == localStorage.getItem('familleId')){
          if(element.DateCalendrier.toString().startsWith("0")){
            addExternal(element.Id, element.Nom, element.Categorie);
          }else{
            const api = this.calendarRef.current.getApi();
            api.addEvent({
                id: element.Id,
                title: element.Nom,
                start: element.DateCalendrier,
                classNames: [element.Categorie, element.Id, element.Responsable],
                display: 'block'
            });
          }
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
          id: id,
          classNames: eventEl.id
        };
      }
    });
  }

  /**
   * Gestion du click sur le repas 
   */
    eventClick = eventClick => {
      fetch(process.env.REACT_APP_BASE_URL + '/api/repas/' + eventClick.event.id,
      {
          method: "get",
          dataType: 'json',
      })
      .then((res) => res.json())
      .then((data) => { 
        var options = "";
        localStorage.getItem('familleUser').split(",").forEach(element => {
          if (data[0].Responsable == element){
            options += '<option value='+ element + ' selected>'+ element +'</option>'
          }else{
            options += '<option value='+ element + '>'+ element +'</option>'
          }
        })
        Alert.fire({
          title: eventClick.event.title,
          html:
            `<div class="table-responsive">
          <table class="table">
          <tbody>
          <tr >
          <td>Catégorie</td>
            <td>` +
              eventClick.event.classNames[0] +
            `</td>
          </tr>
          <td>Responsable</td>
            <td>
            <select name="`+ eventClick.event.id +`" id="respo">` +
              options +
            `</select>
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
      })
  };

// Liste de repas à gauche et calendrier
  render() {
    return (
      <div className="animated fadeIn p-4 demo-app lstRepas">
        <Row>
          <Col lg={3} sm={3} md={3}>
            <div id="side">
            <div
              id="external-events"
              style={{
                padding: "8px",
                width: "85%",
                height: "auto",
                maxHeight: "-webkit-fill-available",
              }}
            >
              <p align="center">
                <strong> Liste de repas</strong>
              </p>
              <a className="fc font-weight-bold mb-3" onClick={addRepas}>Ajouter un repas</a>

              <div className="d-flex">
                <input type="text" size="21" className="mb-2" placeholder="Rechercher" id="searchText"/>
              </div>

              <label htmlFor="categorie">Catégorie:</label>
              <select className="form-select mb-3" name="categorie" id="categorie">
                <option value="None"></option>
                <option value="Végétarien">Végétarien</option>
                <option value="Végétalien">Végétalien</option>
                <option value="Américain">Américain</option>
                <option value="Italien">Italien</option>
                <option value="Méxicain">Méxicain</option>
                <option value="Asiatique">Asiatique</option>
                <option value="Libanais">Libanais</option>
                <option value="Fruits de mer">Fruits de mer</option>
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
                  fetch(process.env.REACT_APP_BASE_URL + '/api/repas/' + info.event.id,
                  {
                      method: "get",
                      dataType: 'json',
                  })
                  .then((res) => res.json())
                  .then((data) => { 
                    putRepas(data);
                  })
                  }
                }
                drop={this.drop}
                eventReceive={function(info){
                  // Ajout du repas à la base de donnée
                  fetch(process.env.REACT_APP_BASE_URL + '/api/repas', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({Nom: info.event.title, Categorie: info.event.classNames[0], DateCalendrier:info.event.start, IdFamille: localStorage.getItem('familleId'), Responsable: localStorage.getItem('currentUser')})
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
        <div id="foot"></div>
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
                '<option value="Végétarien">Végétarien</option>' +
                '<option value="Végétalien">Végétalien</option>' +
                '<option value="Américain">Américain</option>' +
                '<option value="Italien">Italien</option>' +
                '<option value="Méxicain">Méxicain</option>' +
                '<option value="Asiatique">Asiatique</option>' +
                '<option value="Libanais">Libanais</option>' +
                '<option value="Fruits de mer">Fruits de mer</option>' +
      '</select>',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#swal-input1').val(),
            $('#swal-input2').val()
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
          // Ajout du repas à la base de donnée
          fetch(process.env.REACT_APP_BASE_URL + '/api/repas', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Nom: result.value[0], Categorie: result.value[1], DateCalendrier:'0001-01-01 00:00:00', IdFamille: localStorage.getItem('familleId'), Responsable: localStorage.getItem('currentUser')})
          });

          setTimeout(function(){
          fetch(process.env.REACT_APP_BASE_URL + '/api/repas',
          {
              method: "get",
              dataType: 'json',
          })
          .then((res) => res.json())
          .then((data) => {
            addExternal(data[data.length-1].Id, result.value[0],result.value[1]);
          })},100);

          $("#searchText").val("");
          $("#categorie").val("None");
          $('#search').click();
        }
      }).catch()
};

function addExternal(id, nom, cat){
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
  tag.id = cat;

  var text = document.createTextNode(nom);
  tag.appendChild(text);

  event.appendChild(del);
  event.appendChild(tag);

  var elements = document.getElementById("external-events");
  elements.appendChild(event);
}

function putRepas(repas){
  // Modif du repas à la base de donnée
  fetch(process.env.REACT_APP_BASE_URL + '/api/repas/' + repas[0].Id, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({Id: repas[0].Id, Nom: repas[0].Nom, Categorie: repas[0].Categorie, DateCalendrier: repas[0].DateCalendrier, Responsable: repas[0].Responsable})
  });
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
      if(String(element.DateCalendrier).slice(0,10) === date && element.IdFamille == localStorage.getItem('familleId')){
        calendarApi.addEvent({
          id: element.Id,
          title: element.Nom,
          start: date,
          classNames: [element.Categorie, element.Id, element.Responsable],
          display: 'block'
        });
      }
    });
  })
}

$(document).on("change", "#respo", () => {
  fetch(process.env.REACT_APP_BASE_URL + '/api/repas/' + $('#respo').attr('name'),
  {
      method: "get",
      dataType: 'json',
  })
  .then((res) => res.json())
  .then((data) => { 
      changeResponsable(data);
  })

  function changeResponsable(repas){
    fetch(process.env.REACT_APP_BASE_URL + '/api/repas/' + repas[0].Id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({Id: repas[0].Id, Nom: repas[0].Nom, Categorie: repas[0].Categorie, DateCalendrier: repas[0].DateCalendrier, Responsable: $('#respo').val()})
    });

    var lastClass = $("."+$('#respo').attr('name')).attr('class').split(' ').pop();
    $("."+$('#respo').attr('name')).removeClass(lastClass);
    $("."+$('#respo').attr('name')).addClass($('#respo').val());
  }

});

$( document ).ready(function() {

  if ($(window).width() <= 995) {
    $('#external-events').appendTo('#foot');
  }else{
    $('#external-events').appendTo('#side');
  }

  $( window ).resize(function() {
    if ($(window).width() <= 995) {
      $('#external-events').appendTo('#foot');
    }else{
      $('#external-events').appendTo('#side');
    }
  });

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

  $(document).on("keyup", "#searchText", () => {
    doSearch();
  });

  $(document).on("change", "#categorie", () => {
    doSearch();
  });

  function doSearch(){
    var value = $("#searchText").val();
    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    value = value.toLocaleLowerCase();
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
          if(element.DateCalendrier.toString().startsWith("0") && element.IdFamille == localStorage.getItem('familleId')){
            var nom = element.Nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            nom = nom.toLowerCase()
            if (nom.includes(value) && element.Categorie === select){
              addExternal(element.Id, element.Nom, element.Categorie);
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
          if(element.DateCalendrier.toString().startsWith("0") && element.IdFamille == localStorage.getItem('familleId')){
            if (element.Categorie === select){
              addExternal(element.Id, element.Nom, element.Categorie);
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
          if(element.DateCalendrier.toString().startsWith("0") && element.IdFamille == localStorage.getItem('familleId')){
            var nom = element.Nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            nom = nom.toLowerCase();
            if (nom.includes(value)){
              addExternal(element.Id, element.Nom, element.Categorie);
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
          if(element.DateCalendrier.toString().startsWith("0") && element.IdFamille == localStorage.getItem('familleId')){
            addExternal(element.Id, element.Nom, element.Categorie);
          }
        });
      })
    }
  }

});