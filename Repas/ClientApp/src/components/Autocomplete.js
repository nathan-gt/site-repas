import React, { Component, Fragment } from "react";
import "../custom.css";

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
        };
    }

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;
    
        const filteredSuggestions = suggestions.filter(
        suggestion =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        this.setState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
        userInput: e.currentTarget.value
        });
    };

    onClick = e => {
        this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText
        });
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;
    
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        } 
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    ClickAjoutIngr = e => {
        let nomIngr = document.getElementById("txtNomIngr").value;
        const noGererAjoutIngr = (this.props.noGererAjoutIngr);
        // Ajout de l'ingrédient à la liste 
        noGererAjoutIngr(nomIngr);
        // Vidage du input
        this.setState({
            userInput: ""
        });
    }

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
    
        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
                        { 
                            filteredSuggestions.map((suggestion, index) => {
                                let className;
                    
                                // Flag the active suggestion with a class
                                if (index === activeSuggestion) {
                                className = "suggestion-active";
                                }
                                return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                                );
                            })
                        }
                    </ul>
                );
            } 
            else {
                // NOTE: Message en cas d'absence de suggestions.
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <em>Aucune correspondance.</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <section class="input-group mb-3 max-w">
                    <input
                        id="txtNomIngr"
                        type="text" class="form-control" placeholder="Ingrédient à ajouter"
                        aria-describedby="basic-addon2"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={userInput}
                    />
                    <button class="btn btn-outline-primary" type="button" onClick={this.ClickAjoutIngr}>Ajouter</button>
                </section>
                <section class="input-group mb-3 max-w">
                    {suggestionsListComponent}
                </section>
            </Fragment>
        );
    }
}
  
export default Autocomplete;