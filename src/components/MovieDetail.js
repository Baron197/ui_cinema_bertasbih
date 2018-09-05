import React, { Component } from 'react';

class MovieDetail extends Component {
    render() {
        const { title, description, url, image } = this.props.movie;
        return (
            <div className="col-md-4 col-sm-6 portfolio-item">
                <a className="portfolio-link" href={url}>
                    <div className="portfolio-hover">
                        <div className="portfolio-hover-content">
                        <i className="fa fa-plus fa-3x"></i>
                        </div>
                    </div>
                    <img style={{ margin: "auto"}} className="img-responsive" src={image} alt="" />
                </a>
                <div className="portfolio-caption">
                    <h4>{title}</h4>
                    <p className="text-muted">{description}</p>
                </div>
            </div>
        );
    }
}

export default MovieDetail;