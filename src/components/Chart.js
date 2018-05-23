import React from 'react';
import { Line } from 'react-chartjs-2';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: this.props.labels,
        datasets: [
          {
            label: this.props.label,
            lineTension: 0,
            data: this.props.data,
          },
        ],
      },
    };
  }
  render() {
    return (
      <div>
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: this.props.title,
            },
            legend: {
              display: false,
            },
            spanGaps: true,
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Episodes',
                  },
                  ticks: {
                    display: false,
                  },
                },
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: this.props.label,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}
