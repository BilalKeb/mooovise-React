import React, { Component } from 'react';

import Card from '../components/Card';

class Favorites extends Component {
  constructor() {
    super()

    this.state = {
      movies: [],
      favIDs: this.getStorage()
    }
  }
  
  getStorage() {
    let localItem = localStorage.getItem("favorite")
    return JSON.parse(localItem)
  }

  getMovie(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9958597c07ec90e02675c97691bf4506`)
      .then(res => res.json())
      .then(res =>
        this.setState({ movies: [res, ...this.state.movies] })
      )
  }

  componentDidMount() {
    if(this.state.favIDs) {
      this.state.favIDs.forEach(favID => (
        this.getMovie(favID)
      ))
    }
  }
  getStorage () {
    JSON.parse();

  }
  render() {
    const { movies, favIDs } = this.state

    return (
      <div className="container">
        <h1 className="my-5 text-center">Favorites</h1>

        <div className="d-flex flex-wrap justify-content-center">
          {movies.map(movie => (
            <Card 
                title={movie.title}
                release={movie.release_date}
                description={movie.overview}
                image={movie.poster_path}
              />
          ))}

          {!favIDs &&
            <div className="my-5 text-center">
              <h2>No favorites </h2>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Favorites