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
    // const pageNumber = updatedPageNo ? `&page=4${updatedPageNo}` : "";
    const searchUrl = `https://challenge-rest-api.vercel.app/business${query}`;

    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        // const resultNotFoundMsg = 
        console.log(res.data);
      })
      .catch(error =>{
        if(axios.isCancel(error) || error){
          this.setState({
            loading: false,
            message: 'Failed to fetch data'
          })
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query: query, loading: true, message: "" }, () => {
      this.fetchSearchResults(query);
    });
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
            placeholder="type here"
            value={query}
            id="search-input"
            onChange={this.handleOnInputChange}
          />
        </label>
      </div>
    );
  }
}

export default SearchBar;
