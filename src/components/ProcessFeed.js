import React from 'react';
import parsePodcast from 'node-podcast-parser';

export default class ProcessFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
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
        const url = this.props.feedUrl;
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    convertXmlToJson(data) {
        parsePodcast(data, (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
           
            this.setState({
                    title: data.title,
                    episodes: data.episodes,
                    durations: data.episodes.map(episode => ({title: episode.title, duration: episode.duration}))
                        .sort((a, b) => a.duration > b.duration ? 1 : -1),
                    image: data.image
                });
          });
    }

    render() {
        return (
            <div>
                <h1>ProcessFeedComponent</h1>
                {!this.state.title ? (<p>Getting data...</p>) : (
                    <div>
                        <h1>{this.state.title}</h1>
                        <p>Episodes: {this.state.episodes.length}</p>
                        <p>The longest episode to date is titled "{this.state.durations[this.state.durations.length -1].title}" and is {this.state.durations[this.state.durations.length -1].duration / 60} minutes long.</p>
                        <img src={this.state.image} />
                    </div>
                )}            
            </div>
        )
    }
}
