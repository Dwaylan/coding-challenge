import React, { Component } from "react";
import axios from "axios";
import "../SearchBar/SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    };
    this.cancel = "";
  }

  fetchSearchResults = (updatedPageNo, query) => {
    console.log(this.state.query);
    const searchUrl = `https://challenge-rest-api.vercel.app/business/${this.state.query}`;
    console.log(searchUrl);
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        // console.log(res.data);

        this.setState({
          results: res.data,
          loading: false,
        });
      })

      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch data",
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query: query, loading: true, message: "" }, () => {
      this.fetchSearchResults(query);
    });
  };

  renderSearchResults = () => {
    const { results } = this.state;

    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map((business) => {
            return (
              <div className="Business_card">
                <h4 className="Business_title">{business.company_name}</h4>
                <h5>Category: {business.company_category}</h5>
                <h5>Type: {business.company_type}</h5>
                <h5>Country: {business.country}</h5>
                <h5>
                  City: {business.city}, {business.state} {""}
                  {business.zip_code} {""} {""}
                </h5>
                <h5> Year Founded: {business.year_founded}</h5>
                <a
                  key={business.id}
                  href={business.url}
                  className="result-item"
                >
                  <h6 className="company-id">{business.company_id}</h6>
                  <div className="image-wrapper">
                    <h5> {business.company_name}</h5>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      );
    }
  };
  render() {
    const { query } = this.state;
    console.log(this.state);
    return (
      <div className="container">
        <h2 className="heading">Business table challenge</h2>
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            placeholder="insert database ID (1-121)"
            value={query}
            id="search-input"
            onChange={this.handleOnInputChange}
          />
        </label>
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default SearchBar;
