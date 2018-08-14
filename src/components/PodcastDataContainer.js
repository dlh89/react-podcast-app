import React from 'react';
import parsePodcast from 'node-podcast-parser';

export default class PodcastDataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.convertXmlToJson = this.convertXmlToJson.bind(this);
  }
  componentWillMount() {
    this.getData();
  }
  getData() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (e) => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        const data = e.target.responseText;
        this.convertXmlToJson(data);
      }
    };
    const url = `/api/feed?feedUrl=${this.props.feedUrl}`;
    xhttp.open('GET', url, true);
    xhttp.send();
  }
  convertXmlToJson(data) {
    parsePodcast(data, (err, jsonData) => {
      if (err) {
        console.log(err);
        this.setState(
          {
            data: { error: true },
          },
          () => this.props.dataCallback(this.state.data),
        );
        return;
      }

      if (!jsonData.episodes[0].duration) {
        this.setState(
          {
            error: true,
          },
          () => this.props.dataCallback(this.state.data),
        );
      } else {
        this.setState(
          {
            data: jsonData,
          },
          () => this.props.dataCallback(this.state.data),
        );
      }
    });
  }
  render() {
    return <div />;
  }
}
