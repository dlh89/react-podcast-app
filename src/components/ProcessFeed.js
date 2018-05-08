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
                    image: data.image,
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
                                <p>Episodes: {this.state.episodes.length}</p>
                                <p className="stats__headline">This podcast released its first episode <strong>{moment(this.state.episodes[this.state.episodes.length-1].published, "YYYYMMDD").fromNow()}</strong>.  The first episode is entitled <strong>"{this.state.episodes[this.state.episodes.length-1].title}"</strong> and was published on <strong>{this.state.episodes[this.state.episodes.length-1].published.toGMTString()}</strong>.</p>
                                <p className="stats__headline">The longest episode to date is entitled <strong>"{this.state.durations[this.state.durations.length -1].title}"</strong> and is <strong>{moment().startOf('day').seconds(this.state.durations[this.state.durations.length -1].duration).format('H:mm:ss')}</strong> long.</p>
                                <img src={this.state.image} className="stats__image" />
                            </div>
                        </div>
                    </div>
                )}            
            </div>
        )
    }
}
