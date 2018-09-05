import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllMovies, refreshSelectMovie } from '../actions';
import CarouselBro from './CarouselBro';

class HomePage extends Component {

    componentWillMount() {
        this.props.getAllMovies();
        this.props.refreshSelectMovie();
    }

    render() {
        if(this.props.listMovies.length >= 3) {
            return (
                <div style={{ marginTop: "80px" }}>
                    <CarouselBro 
                        legend1={this.props.listMovies[0].title} 
                        image1={this.props.listMovies[0].image} 
                        legend2={this.props.listMovies[1].title} 
                        image2={this.props.listMovies[1].image} 
                        legend3={this.props.listMovies[2].title} 
                        image3={this.props.listMovies[2].image}
                        listMovie={this.props.listMovies}
                    />
                </div>
            );
        }
        return (
            <div style={{ marginTop: "80px" }}>
                <h1>Loading...</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const listMovies = state.movieList;

    return { listMovies };
}

export default connect(mapStateToProps, { getAllMovies, refreshSelectMovie })(HomePage);