import React from 'react';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.Email;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.Email}
  </div>
);

export default class UserSuggest extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  getData() {
    return this.state;
  }

  onChange = (event, { newValue }) => {
    $("#inputValue").val(newValue);
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
      if(value.length > 2) // Ne va pas faire de GET si input < 3
      {
        fetch(process.env.REACT_APP_BASE_URL + '/api/user?email=' + value,
          {
              method: "get",
              headers: new Headers({
                  'Content-Type': 'application/json',
              }),
          })
          .then((res) =>res.json())
          .then((data) => {
            if(data.status == 404)
            {
              this.setState({
                suggestions: []
              });
            }
            else {
              $("#message").text("");
              console.log(data);
              this.setState({
                suggestions: data
              });
            }
          });
      }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <>
      <input type="hidden" id="inputValue"/>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      </>
    );
  }
}
