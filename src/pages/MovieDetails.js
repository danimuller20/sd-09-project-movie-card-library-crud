import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      movies: [],
    };

    this.fetchMovieDetails = this.fetchMovieDetails.bind(this);
  }

  componentDidMount() {
    this.fetchMovieDetails();
  }

  async fetchMovieDetails() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await movieAPI.getMovie(id);
    this.setState({
      loading: false,
      movies: response,
    });
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    const { movies, loading } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle } = { movies };
    if (loading === true) return <Loading />;

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Title: ${title}` }</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <p><Link to="/movies/:id/edit">EDITAR</Link></p>
        <p><Link to="/">VOLTAR</Link></p>
      </div>
    );
  }
}

export default MovieDetails;
