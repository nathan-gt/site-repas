import React, { Component } from 'react';
export class ListeEpicerie extends Component {
    //JS et JQuery en dehors du render
    componentWillMount(){
        fetch(process.env.REACT_APP_BASE_URL + '/api/jointure',
        {
            method: "get",
            dataType: 'json',
        })
        .then((res) => res.json())
        .then((data) => {
            var listeIngredientBd = [];
            var listeEpicerieFamille = [];
            for(var i = 0; i < data.length; i++){
                var item = data[i];
                listeIngredientBd.push(item);
            }
            this.setState({listeIngredientBd})

            listeIngredientBd.forEach(element =>{
                if(element.FamilleId == localStorage.getItem('familleId')){
                    if(element.Disponnible == 0){
                        listeEpicerieFamille.push(element);
                    }
                    
                }
            })
        })
        .catch(err => console.log(err))
    }
    render(){
        return (
            <div className="pageListeEpicerie">
                <h1>Liste d'épicerie de la famille pour la semaine</h1> 
               <Row>
                   <Col lg={3} sm={3} md={3}>
                       <div id="liste"
                            style={{
                            padding: "8px",
                            width: "85%",
                            height: "auto",
                            maxHeight: "-webkit-fill-available",
                            }}
                       >

                       </div>
                   </Col>
               </Row>  
            </div>

        );
    }
}