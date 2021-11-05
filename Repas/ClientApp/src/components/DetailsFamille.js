import React, { Component, Fragment } from 'react';
import authService from './api-authorization/AuthorizeService';

let hardCodedId = authService.getUser().sub;

let hardCodedClient = {
    id=hardCodedId,
    famille={
        admin= {
            id=hardCodedId
        }

    }
}

export class DetailsFamille extends Component {
    
    componentWillMount(){
        authService.getUser()
        .then((user) =>{
            console.log(user);
        })

        authService.getAccessToken()
        .then((token) => {
            console.log(token);
            fetch(process.env.REACT_APP_BASE_URL + '/connect/userinfo',
            {
                method: "get",
                headers: new Headers({
                    'Authorization': "Bearer " + token, 
                    'Content-Type': 'application/json'
                  })
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
        })
        
    }

    render(){
        //console.log(!!authService.isAuthenticated());
        //console.log(authService.getAccessToken());
        return (
            <div>Hello World
                
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