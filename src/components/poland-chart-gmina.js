import React, {Component} from 'react';
import {
  XYPlot,
  MarkSeries,
  MarkSeriesCanvas
} from 'react-vis';
import {giveColor} from './utils';
import {scaleLinear} from 'd3-scale';
import {csv} from 'd3-fetch';

const longScale = scaleLinear()
                  .domain([14.5, 20])
                  .range([0, 10]);

const latScale = scaleLinear()
                 .domain([50, 60])
                 .range([0, 10]);

const incomeScale = scaleLinear()
                 .domain([100, 3000])
                 .range([0, 10]);

const supportScale = scaleLinear()
                 .domain([20, 80])
                 .range([0, 10]);

const buffer = [{
  x: 0,
  y: 50,
  size: 1,
  color: '#ffffff',
  opacity: 0.1
  }, {
  x: 80,
  y: 0,
  size: 1,
  color: '#ffffff',
  opacity: 0.1
  }, {
  x: -10,
  y: -10,
  size: 1,
  color: '#ffffff',
  opacity: 0.1
  }];


function mapData(data) {
  return data.map(d => ({
    x: longScale(d.longitude) * 10,
    y: latScale(d.latitude) * 10,
    size: Math.sqrt(d['registered voters']) / 25,
    color: giveColor(d['avg income'], d['% PiS Votes']),
    opacity: 0.5
  })).concat(buffer);
}

function scatterData(data) {
  return data.map(d => ({
    x: incomeScale(d['avg income']) * 10,
    y: supportScale(d['% PiS Votes']) * 10,
    size: Math.sqrt(d['registered voters']) / 25,
    color: giveColor(d['avg income'], d['% PiS Votes']),
    opacity: 0.5
  })).concat(buffer);
}

export default class PolandTransformSmall extends React.Component {
  constructor() {
    super();
    this.state = {
      value: false
    }
    csv('data/data_project_sorted.csv')
      .then(data => {
        this.setState({
          predata: data,
          data: mapData(data)
        });
      });

  }

  render() {
    const {value, data, predata} = this.state;
    //console.log(this.state.data);
    //console.log(this.state.data);
    var markSeriesProps = {
      animation: true,
      className: 'mark-series',
      sizeType: 'literal',
      seriesId: 'poland-transform',
      opacityType: 'literal',
      colorType: 'literal',
      animationStyle: 'stiff',
      data
    };

    return (
      <div>
        <button
          onClick={() => {
            this.setState({data: mapData(this.state.predata)})
          }}> Map
        </button>
        <button
          onClick={() => {
            this.setState({data: scatterData(this.state.predata)})
          }}> Scatterplot
        </button>
        <XYPlot height={600} width={600} colorType='literal' sizeType='literal'>
          <MarkSeries {...markSeriesProps}/>
          {this.state.value ? <Hint value={this.state.value} /> : null}
        </XYPlot>
      </div>
    );
  }
}
