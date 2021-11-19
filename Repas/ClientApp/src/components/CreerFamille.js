import React, { Component, Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import authService from './api-authorization/AuthorizeService';
import $ from 'jquery';

export default function CreerFamille() {
    const [show, setShow] = useState(false);
  
    // utility functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {
      const familleNom = $('#familleNom').val();
      authService.getAccessToken()
      .then((token) => {
          fetch(process.env.REACT_APP_BASE_URL + '/api/famille/?familleNom=' + familleNom,
          {
              method: "post",
              headers: new Headers({
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
              })
          })
          .then((res) => {
              if(res.ok) {
                  window.location.reload(false);
              }
              else throw new Error("Un problème est arrivé lors de la demande");
          });
      }) 
    }
  
    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Créer une famille
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Créer Famille</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="display-6">Nom de la famille: </h3><input style={{fontSize : '20px'}} type="text" id="familleNom"></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }