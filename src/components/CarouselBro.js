import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectMovie } from '../actions';

class CarouselBro extends Component {
    onCarouselClick = (index) => {
        this.props.selectMovie(this.props.listMovie[index]);
    }
    render() {
        if(this.props.selectedMovie.id === 0) {
            return (
                <div>
                    <Carousel showThumbs={false} showIndicators={false} className="container kucing">
                        <div className="merdeka" onClick={() => this.onCarouselClick(0)}>
                            <img src={this.props.image1} alt="Movie 1" />
                            <p className="legend">{this.props.legend1}</p>
                        </div>
                        <div className="merdeka" onClick={() => this.onCarouselClick(1)}>
                            <img src={this.props.image2} alt="Movie 2" />
                            <p className="legend">{this.props.legend2}</p>
                        </div>
                        <div className="merdeka" onClick={() => this.onCarouselClick(2)}>
                            <img src={this.props.image3} alt="Movie 3"/>
                            <p className="legend">{this.props.legend3}</p>
                        </div>
                    </Carousel>
                </div>
            );
        } 

        return <Redirect to={`/orderseats?id=${this.props.selectedMovie.id}`} />;
    }
}

const mapStateToProps = (state) => {
    const selectedMovie = state.selectedMovie;

    return { selectedMovie };
}

export default connect(mapStateToProps, { selectMovie })(CarouselBro);