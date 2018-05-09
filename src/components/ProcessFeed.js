import React from 'react';
import parsePodcast from 'node-podcast-parser';
import moment from 'moment';

export default class ProcessFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            artist: '',
            episodes: [],
            durations: [],
            image: ''
        }
        this.getFeed();
    }

    getFeed() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = (e) => {
            if (e.target.readyState == 4 && e.target.status == 200) {
                const data = e.target.responseText;
                this.convertXmlToJson(data);
            }
        }
        const url = `/api/feed?feedUrl=${this.props.feedUrl}`;
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    convertXmlToJson(data) {
        parsePodcast(data, (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(data);
           
            this.setState({
                    title: data.title,
                    description: data.description.long,
                    episodes: data.episodes,
                    durations: data.episodes.map(episode => ({title: episode.title, duration: episode.duration}))
                        .sort((a, b) => a.duration > b.duration ? 1 : -1),
                    averageDuration: data.episodes.map(episode => episode.duration).reduce((accumulator, currentValue) => accumulator + currentValue) / data.episodes.length,
                    image: data.image
                });
          });
    }

    render() {
        return (
            <div>
                {!this.state.title ? (
                    <div className="container">
                        <p>Getting data...</p>
                    </div>
                ) : (
                    <div>
                        <div className="section-heading">
                            <div className="container">
                                <h1 className="heading heading--primary">{this.state.title}</h1>
                                <h2 className="heading heading--secondary">{this.state.description}</h2>
                            </div>
                        </div>
                        <div className="section-stats u-margin-top-large">
                            <div className="container">
                                <h2 className="heading heading--secondary">Lifespan</h2>
                                <p>Episodes: {this.state.episodes.length}</p>
                                <p className="stats__headline">This podcast released its first episode <strong>{moment(this.state.episodes[this.state.episodes.length-1].published, "YYYYMMDD").fromNow()}</strong>.  The first episode is entitled <strong>"{this.state.episodes[this.state.episodes.length-1].title}"</strong> and was published on <strong>{this.state.episodes[this.state.episodes.length-1].published.toGMTString()}</strong>.</p>
                                <h2 className="heading heading--secondary">Durations</h2>                                
                                <div className="row">
                                    <div className="col-1-of-3">
                                        <div className="card">
                                            <h3 className="card__heading">Longest Episode</h3>
                                            <p className="card__text">The longest episode to date is entitled <strong>"{this.state.durations[this.state.durations.length -1].title}"</strong> and is <strong>{moment().startOf('day').seconds(this.state.durations[this.state.durations.length -1].duration).format('H:mm:ss')}</strong> long.</p>
                                        </div>
                                    </div>
                                    <div className="col-1-of-3">
                                        <div className="card">
                                            <h3 className="card__heading">Shortest Episode</h3>                                        
                                            <p className="card__text">The shortest episode to date is entitled <strong>"{this.state.durations[0].title}"</strong> and is <strong>{moment().startOf('day').seconds(this.state.durations[0].duration).format('H:mm:ss')}</strong> long.</p>
                                        </div>
                                    </div>
                                    <div className="col-1-of-3">
                                        <div className="card">
                                            <h3 className="card__heading">Average Episode Length</h3>                                                                                
                                            <p className="card__text">The average episode is <strong>{moment().startOf('day').seconds(this.state.averageDuration).format('H:mm:ss')}</strong></p>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="heading heading--secondary">Releases</h2>                                
                                <img src={this.state.image} className="stats__image" />
                            </div>
                        </div>
                    </div>
                )}            
            </div>
        )
    }
}
