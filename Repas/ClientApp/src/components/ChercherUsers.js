import React, { Component, Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import authService from './api-authorization/AuthorizeService';
import $ from 'jquery';

export default function ChercherMembre() {
    const [show, setShow] = useState(false);
  
    // utility functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {
      const userNom = $('#userNom').val();
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
              else {
                $("#message").text("Une erreur s'est produite lors de la demande!").css("color", "red");
                throw new Error("Un problème est arrivé lors de la demande");
              }
          });
      }) 
    }
  
    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Ajouter un membre
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Créer Famille</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="display-6">Nom de l'utilisateur: </h3>
            <input style={{fontSize : '20px'}} type="text" id="userNom"></input> <br />
            Note: Aucune invitation ne sera envoyé si l'utilisateur spécifié n'existe pas ou a déjà reçu une invitation 
            d'une autre famille ou de la vôtre.
            <p id="message"></p>
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