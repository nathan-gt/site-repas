import React, { Component, Fragment } from 'react';
import authService from './api-authorization/AuthorizeService';
// import { toast } from 'react-toastify';
import $ from 'jquery';
import Popup from 'reactjs-popup';
import CreerFamille from './CreerFamille';

let dataFamille;

export class DetailsFamille extends Component {

    async handleClickX(event) {
        authService.getAccessToken()
        .then((token) => {
            fetch(process.env.REACT_APP_BASE_URL + '/api/famille/removeFromFamily/' + event.data.member, 
            {
                method: "patch",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                })
            })
            .then((res) => {
                if(res.ok) {
                    return;
                }
                else throw new Error("Un problème est arrivé lors de la demande");
            });
        })

    }
    handleNoFam(currentUser) {
        $('#noFamily').show();
    }

    handleFam(data, user) {
        $('#hasFamily').show();

        $("#titreFamille").append("Famille " + data[0].FamilleNom)

        let isAdmin = (data.find(member => {
            return member.Id === user.sub;
          })).IsAdminFamille

        data.forEach(member => {
            let admin = "";
            let btn = "";
            admin = (member.IsAdminFamille ? "Admin" : "");
            btn = (isAdmin && !member.IsAdminFamille ? '' : "");
            btn = (isAdmin && !member.IsAdminFamille ? 
                "<button id='"+ member.Id +"' value='" + member.Id + "' class='x-button'>&#x2715</button>" : "");
            $("#body").append(
                $(`
                <tr>
                    <td style=text-align:center; >${member.Username}</td>
                    <td style=line-height: 309px; class="admin-text">${admin}</td>
                    <td class='w-25'>${btn}</td>
                </tr>
                `)
            );
            $("#" + member.Id).on("click", { member : member.Id}, (event) => {
                this.handleClickX(event)
                .then(() => {
                    $(event.target).parent().parent().hide()
                })
            });
        });
        $('#btn-leave').on("click", { member : user.sub}, (event) => {
             this.handleClickX(event)
             .then(() => 
            {
                window.location.reload(false);
            })
        });
    }
    
    componentDidMount(){

        authService.getUser()
        .then((user) => {
            fetch(process.env.REACT_APP_BASE_URL + '/api/famille/byUserId/' + user.sub,
            {
                method: "get",
                headers: new Headers({
                    'Content-Type': 'application/json'
                  })
            })
            .then((res) =>res.json())
            .then((data) => {
                if(data["errors"]) {
                    throw new Error("Error while trying to load data from famille");
                }
                else if(data.length == 0)
                {
                    this.handleNoFam(user);
                }
                else {
                    this.handleFam(data, user);
                }             
            })        
            .catch((err) =>
            {
                //toast.error("Erreur lors du fetch des données de la famille.")
                throw (err);
            });
        })
        .catch((err) =>
        {
            //toast.error("Erreur lors du fetch des données de la famille.")
            throw (err);
        });
        
    }

    render(){
        return (
            <div>
                <div className ="lead" style={{display : "none"}} id="hasFamily">
                    <h1 id="titreFamille" className = "display-3"></h1> <br />
                    <table className = "table table-dark">
                      <tbody id="body"></tbody>
                    </table>
                    <div id="detailsFamille-buttons">
                        <button className="btn btn-success">Ajouter un membre</button>
                        <button id="btn-leave" className = "btn btn-danger">Quitter la famille</button>
                    </div>
                </div>
                <div className ="lead" style={{display : "none"}} id="noFamily">
                    <h1 className = "display-3">Vous n'avez pas de famille</h1>
                    Vous n'avez pas encore de famille, attendez de recevoir 
                    une invitation pour en rejoindre une ou bien créez-en une en 
                    cliquant le bouton "Créer une famille". <br /><br />
                    <h5 >Votre invitation:</h5>
                    <div id="invites">
                        <table className="table">
                            <tbody id="body-noFamily"></tbody>
                        </table>
                    </div>
                    <CreerFamille></CreerFamille>
                </div>

            </div>
        )
    }
}