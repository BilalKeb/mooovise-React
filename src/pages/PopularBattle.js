import React, { Component } from 'react';

import Card from '../components/Card'

class PopularBattle extends Component {
  constructor() {
    super()

    this.state = {
      movies: [],
      currentBattle: 0,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    this.setState({ currentBattle: this.state.currentBattle + 2})
    
    let favoriteArray = localStorage.getItem("favorite")

    if(!favoriteArray) {
      favoriteArray = localStorage.setItem("favorite", JSON.stringify([id]))
    } else {
      favoriteArray = JSON.parse(favoriteArray)
      favoriteArray = [...favoriteArray, id]
      favoriteArray = localStorage.setItem("favorite", JSON.stringify(favoriteArray))
    }
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=74ff4d5b18f55c304a239fadf716fe2f")
      .then(res => res.json())
      .then(data => {
        this.setState({ 
          movies: data.results,
        })
      })
  }
  
  render() {
    const { movies, currentBattle } = this.state

    console.log(currentBattle)
    return ( 
      <div className="container">
        <h1 className="my-5 text-center">film popular</h1>
        <h2 className="my-5 text-center">Selectionner un film</h2>

        <div className="d-flex flex-wrap justify-content-center">
          {movies.map((movie, index) => {
            if(index === currentBattle || index === currentBattle + 1) {
              return <div onClick={() => this.handleClick(movie.id)}>
                <Card
                  title={movie.title}
                  release={movie.release_date}
                  description={movie.overview}
                  image={movie.poster_path}
                />
              </div>
            }
          })}
        </div>

      </div>
    );
  }
}

export default PopularBattle;