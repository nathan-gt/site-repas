import React, { Component, Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserSuggest from './UserSuggest';
import authService from './api-authorization/AuthorizeService';
import $ from 'jquery';

export default function ChercherMembre() {
    const [show, setShow] = useState(false);
    // utility functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {
    
      const userNom = $("#inputValue").val();
      authService.getAccessToken()
      .then((token) => {
          fetch(process.env.REACT_APP_BASE_URL + '/api/user/invite/' + userNom,
          {
              method: "patch",
              headers: new Headers({
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
              }),
          })
          .then((res) => {
              if(res.ok) {
                  $("#message").text("Invitation envoyée!").css("color", "green");
              }
              else if(res.status == "409") {
                $("#message").text("L'utilisateur a déjà une invitation associée à son compte").css("color", "#Cbbf00");
              }
              else if(res.status == "404") {
                $("#message").text("L'utilisateur n'existe pas").css("color", "red");
              }
              else {
                $("#message").text("Une erreur s'est produite lors de la demande").css("color", "red");
              }
          });
      }) 
    };
  
    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Ajouter un membre
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Inviter membre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="display-6">Nom de l'utilisateur: </h3>
            <UserSuggest></UserSuggest> <br />
            <p style={{fontSize: "20px"}} id="message"></p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Envoyer Invitation
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }