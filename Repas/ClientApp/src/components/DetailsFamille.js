import React, { Component, Fragment } from 'react';
import authService from './api-authorization/AuthorizeService';
// import { toast } from 'react-toastify';
import $  from 'jquery';

let dataFamille;

export class DetailsFamille extends Component {
    
    componentDidMount(){

        let isAdmin = false
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
                console.log(data);

                isAdmin = (data.find(member => {
                    return member.Id === user.sub;
                  })).IsAdminFamille

                data.forEach(member => {
                    let admin = "";
                    let btn = "";
                    admin = (member.IsAdminFamille ? "Admin" : "");
                    btn = (isAdmin && !member.IsAdminFamille ? '' : "");
                    btn = (isAdmin && !member.IsAdminFamille ? '<td class="w-25"><button class="x-button">&#x2715</button></td>' : "");

                    $("#body").append(
                        $(`
                        <tr>
                            <td style=text-align:center; >${member.Username}</td>
                            <td style=line-height: 309px; class="admin-text">${admin}</td>
                            ${btn}
                        </tr>
                        `)
                    );
                });                
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
                <table class="table table-dark">
                  <tbody id="body"></tbody>
                </table>
                <button class="btn btn-success">Ajouter un membre</button>
            </div>
            
    )
    }
}
  /*
  https://localhost:44380/connect/authorize/callback
  client_id=Repas
  redirect_uri=https%3A%2F%2Flocalhost%3A44380%2Fauthentication%2Flogin-callback
  response_type=code
  scope=SiteRepasAPI%20openid%20profile
  state=82ae79f2e9f54a50840223ae29757273
  code_challenge=NDQWIruxTxQVvYbtzS7YYGrc8rCty5JVZArgZFPacv8
  code_challenge_method=S256
  response_mode=query"
  */ 