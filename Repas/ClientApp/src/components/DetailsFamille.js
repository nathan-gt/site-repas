import React, { Component, Fragment } from 'react';
import authService from './api-authorization/AuthorizeService';
//import { toast } from 'react-toastify';
import { data } from 'jquery';

let dataFamille;

export class DetailsFamille extends Component {
    
    componentWillMount(){
        authService.getUser()
        .then((user) => {
            fetch(process.env.REACT_APP_BASE_URL + '/api/famille/byUserId/' + user.sub,
            {
                method: "get",
                headers: new Headers({
                    'Content-Type': 'application/json'
                  })
            })
            .then((res) => res.json())
            .then((data) => {
                if(data["errors"]) {
                    throw new Error("Error while trying to load data from famille");
                }
                dataFamille = data;
                console.log(data);
            })        
            .catch((err) =>
            {
                //toast.error("Erreur lors du fetch des données de la famille.")
                throw (err);
            });
        })
        .catch((err) =>
        {
           // toast.error("Erreur lors du fetch des données de la famille.")
            throw (err);
        });
        
    }

    render(){
        //console.log(!!authService.isAuthenticated());
        //console.log(authService.getAccessToken());
        return (
            <div>Hello World
                {dataFamille}
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