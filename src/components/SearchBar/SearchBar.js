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
              <a key={business.id} href={business.url} className="result-item">
                <h6 className="company-id">{business.company_id}</h6>
                <div className="image-wrapper">
                  <h4> {business.company_name}</h4>
                </div>
              </a>
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
