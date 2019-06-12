import React from 'react';
import {csv} from 'd3-fetch';
import PolandTransformSmall from './poland-chart-gmina';
import PolandTransformMedium from './poland-chart-powiat';
import PolandTransformBig from './poland-chart-woj';
import PolandIncomeSupport from './poland-chart-is-compare';
import PolandTopBottom from './poland-chart-size-compare';

const longBlock = `
The basic question at hand is what is the relationship between right-wing\n
politics and wealth in Poland? I chose to explore this because in 2015,\n
the party Prawo i Sprawiedliwość (PiS), or Law and Justice in English, took\n
power in Poland for the first time since the party’s inception in 2001. It won,\n
 in part, with its support from the working class. My project intends to\n
 highlight this relationship with a set of visualizations. \n
`;

class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

  componentWillMount() {
    csv('data/data_project.csv')
      .then(data => {
        this.setState({
          data,
          loading: false
        });
      });
  }

  render() {
    const {loading, data} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <div className="relative">
        <h1> PiS and the Poor</h1>
        <div className='max-width-600'>{longBlock}</div>
        <PolandIncomeSupport />
        <PolandTransformSmall />
        <PolandTransformBig />
        <PolandTransformMedium />
        <PolandTopBottom />
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
