import React, {Component} from 'react';
import {
  XYPlot,
  MarkSeries,
  MarkSeriesCanvas
} from 'react-vis';
import {giveIncomeColor, giveSupportColor} from './utils';
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


function mapIncomeData(data) {
  return data.map(d => ({
    x: longScale(d.longitude) * 10,
    y: latScale(d.latitude) * 10,
    size: Math.sqrt(d['registered voters']) / 25,
    color: giveIncomeColor(d['avg income']),
    opacity: 0.5
  }));
}

function mapSupportData(data) {
  return data.map(d => ({
    x: longScale(d.longitude) * 10,
    y: latScale(d.latitude) * 10,
    size: Math.sqrt(d['registered voters']) / 25,
    color: giveSupportColor(d['% PiS Votes']),
    opacity: 0.5
  }));
}

export default class PolandIncomeSupport extends React.Component {
  constructor() {
    super();
    this.state = {
      value: false
    }
    csv('data/data_project.csv')
      .then(data => {
        this.setState({
          predata: data,
          data: mapIncomeData(data)
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
            this.setState({data: mapIncomeData(this.state.predata)})
          }}> Income
        </button>
        <button
          onClick={() => {
            this.setState({data: mapSupportData(this.state.predata)})
          }}> Support for PiS
        </button>
        <XYPlot height={600} width={600} colorType='literal' sizeType='literal'>
          <MarkSeries {...markSeriesProps}/>
          {this.state.value ? <Hint value={this.state.value} /> : null}
        </XYPlot>
      </div>
    );
  }
}
