import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    };
  }
  render() {
    return (
      <div className="container">
        <h2 className="heading">Business table challenge</h2>
        <label className="search label" htmlFor="search-input">
          <input
            type="text"
            placeholder="type here"
            value=""
            id="search-input"
          />
        </label>
      </div>
    );
  }
}

export default SearchBar;
