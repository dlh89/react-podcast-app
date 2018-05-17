import React from 'react';
import parsePodcast from 'node-podcast-parser';
import moment from 'moment';
import Card from './Card';
import EpisodeDetails from './EpisodeDetails';

export default class ProcessFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            episodes: [],
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

    getTimeBetweenEpisodes(episodes) {
        const sortedByPublished = episodes.sort((a, b) => a.published > b.published ? 1 : -1);
        const timeBetweenEpisodes = sortedByPublished.reduce((result, episode, i) => {
            if(episodes[i+1]) {
                const episodeObj = { ...episode, daysBeforeNextEp: moment(episodes[i+1].published).diff(moment(episode.published), 'days') }
                result.push(episodeObj);
            }
            return result;
        }, []).sort((a, b) => a.daysBeforeNextEp > b.daysBeforeNextEp ? 1 : -1);
        return timeBetweenEpisodes;
    }

    sortByDuration(episodes) {
        const sortedByDuration = episodes.map(episode => episode).sort((a, b) => a.duration > b.duration ? 1 : -1)
        return sortedByDuration;
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
                averageDuration: data.episodes.map(episode => episode.duration).reduce((accumulator, currentValue) => accumulator + currentValue) / data.episodes.length,
                image: data.image,
                sortedByDuration: this.sortByDuration(data.episodes),
                timeBetweenEpisodes: this.getTimeBetweenEpisodes(data.episodes)
            });
        });
    }

    render() {
        return (
            <div>
                {!this.state.title ? (
                    <div className="container u-margin-top-medium">
                        <p>Getting data...</p>
                        <div className="u-spinner u-absolute-center"></div>
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
                                <p className="stats__headline">This podcast released its first episode <strong>{moment(this.state.episodes[0].published, "YYYYMMDD").fromNow()}</strong>.  The first episode is entitled <strong>"{this.state.episodes[0].title}"</strong> and was published on <strong>{this.state.episodes[0].published.toGMTString()}</strong>.</p>
                                <h2 className="heading heading--secondary">Durations</h2>                                
                                <div className="row">
                                    <div className="col-1-of-3">
                                        <Card title="Average Length">
                                            <div className="card__section">
                                                <p className="card__text">The average episode length is <strong>{moment().startOf('day').seconds(this.state.averageDuration).format('H:mm:ss')}</strong>.</p>
                                            </div>
                                        </Card>
                                    </div>
                                    <div className="col-1-of-3">                                    
                                        <Card title="Longest Episode"> 
                                            <EpisodeDetails episode={this.state.sortedByDuration[this.state.sortedByDuration.length -1]} />
                                        </Card>
                                    </div>
                                    <div className="col-1-of-3">
                                        <Card title="Shortest Episode">
                                            <EpisodeDetails episode={this.state.sortedByDuration[0]} />
                                        </Card>
                                    </div>
                                </div>
                                <h2 className="heading heading--secondary">Releases</h2>    
                                <div className="row">
                                    <div className="col-1-of-3">
                                        <Card title="Average time between releases">
                                            <div className="card__section">
                                            {this.state.timeBetweenEpisodes && 
                                                <p className="card__text">The average time between releases is <strong>{Math.round(this.state.timeBetweenEpisodes.map(episode => episode.daysBeforeNextEp).reduce((a, b) => a + b) / this.state.episodes.length)} days</strong>.</p>
                                            }
                                            </div>
                                        </Card>
                                    </div>
                                    <div className="col-1-of-3">
                                        <Card title="Longest time between releases">
                                            <p>
                                                The longest time between episodes was <strong>{this.state.timeBetweenEpisodes[this.state.timeBetweenEpisodes.length-1].daysBeforeNextEp} days</strong>. The break was after the episode {this.state.timeBetweenEpisodes[this.state.timeBetweenEpisodes.length-1].title} which was released on {this.state.timeBetweenEpisodes[this.state.timeBetweenEpisodes.length-1].published.toGMTString()}.
                                            </p>
                                        </Card>
                                    </div>
                                    <div className="col-1-of-3">
                                        <Card title="Shortest time between releases">
                                            <p>The shortest time between episodes was <strong>{this.state.timeBetweenEpisodes[0].daysBeforeNextEp} days</strong>.</p>                                        
                                        </Card>
                                    </div>
                                </div>                            
                                <img src={this.state.image} className="stats__image" />
                            </div>
                        </div>
                    </div>
                )}            
            </div>
        )
    }
}
