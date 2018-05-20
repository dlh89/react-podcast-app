import React from 'react';
import moment from 'moment';

export default class EpisodeDetails extends React.Component {
    constructor(props) {
        super(props);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const releaseDate = this.props.episode.published;
        this.state = {
            releasedString: `${moment(releaseDate).format('MMMM Do YYYY')}`
        }
    }
    render() {
        return (
            <div>
                <h4 className="card__heading--sub">Title</h4>                                            
                <p className="card__text"><a href={this.props.episode.enclosure.url} target="_none">{this.props.episode.title}</a></p>
                <hr className="card__hr" />
                <h4 className="card__heading--sub">Duration</h4>                                                                                            
                <p className="card__text">{moment().startOf('day').seconds(this.props.episode.duration).format('H:mm:ss')}</p>
                <hr className="card__hr" />                                        
                <h4 className="card__heading--sub">Release Date</h4>   
                <p className="card__text">{this.state.releasedString}</p>
            </div>
        )
    }
}