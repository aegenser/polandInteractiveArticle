import React from 'react';
import {csv} from 'd3-fetch';
import PolandTransformSmall from './poland-chart-gmina';
import PolandTransformMedium from './poland-chart-powiat';
import PolandTransformBig from './poland-chart-woj';
import PolandIncomeSupport from './poland-chart-is-compare';
import PolandTopBottom from './poland-chart-size-compare';

const block1 = `Poland’s economy has surged since the fall of the Soviet Union,
yet many in Poland have not benefited. This is one of the reasons for a stark
contrast in wealth between the major cities, and the rural areas of the country.
This boiled over in 2015, when the party Prawo i Sprawiedliwość (PiS), or
Law and Justice in English, took power in Poland for the first time since the
party’s inception in 2001. There has been plenty of controversy with their
treatment of the press, minorities, and the legal system. Regardless, many
credit their victory to the support among the working class, along with a
healthy dose of nationalism. We will look to explore this relationship
between income and support for PiS in an in-depth manner.`;
const block2 = `To give an idea of the current landscape of Poland, the
following is a map of the country colored by either wealth or support for
PiS (yellow means higher income, blue means higher support for PiS):`;
const block3 = `[The transition may be a bit slow]`;
const block4 = `The data for support for PiS is measured by percentage voted for
 PiS in the 2018 local elections in which PiS retained control. Wealth is
 estimated by per capita income tax collected. You can use this to familiarize
 yourself with the geography of the country. The Eastern half is more rural,
 except for the large capital, Warsaw. One can see the general increased support
 for PiS in smaller communes (denoted by smaller dots) and the larger incomes
 in cities. One can also see the interesting trend that the Western half of
 the country is generally richer, while the Eastern half is much more supportive
 of PiS. `;
const block5 = `However, holding the two separate only gives us a partial view.
Now, let us combine both wealth and support for PiS. The color spectrum is also
combined, with blue communes being poorer and more supportive of PiS, and yellow
communes being wealthier and less supportive of PiS. As the communes get wealthier
and more supportive of PiS, they also get brighter. This can be a bit confusing,
but the scatterplot mode makes the scale clearer (right is wealthier, up is
  more supportive of PiS): `;
const block6 = `[The transition on this one may be a bit slow also]`;
const block7 = `This makes the exact relationship incredibly clear. The map
reveals the islands of yellow cities among the blue countryside, especially in
the East. One might have a hesitation upon seeing the gray in the West, as they
are less wealthy, but not as supportive of PiS. The scatterplot shows, though,
that while there are indeed poorer communes with less support for PiS, there
are no wealthy communes with support for PiS, forming the triangle shape of the
plot. We also see how much Warsaw stands out. Not only is it drastically larger
than all other communes, but it is so much wealthier than almost all other
communes in the country. The few communes that are wealthier are all suburbs of
Warsaw. The disparity between populations of the communes, as well as the sheer
number of them, is a bit distracting. While interesting, it is hard to see, for
example, the small communes around the cities, or the even the trends among the
many thousands of small dots. Perhaps we can look at a larger jurisdiction, provinces:`;
const block8 = `This allows us to see the general trends among the regions. It
also does a good job of dispersing the population of the cities into the surrounding
areas, but does not show much of anything interesting because it also disperses
all the extremes of wealth and support for PiS. Perhaps we have gone too big.
As somewhere in between, we can try the counties:`;
const block9 = `This strikes a good medium where the population is fairly dispersed,
but we do not have the same problem of lack of extremes. There are a lot of data
points to keep track of, but it is still only several hundred in comparison to
several thousand. It has the added advantage of being significantly faster too.
We still see the same regional trends, while getting rid of some of the noise.
Returning to the original combined map with both wealth and support of PiS, a
large part of the reason it was hard to read was the large difference in population
between the cities and rural. The large dots overlapped with the smaller ones.
To mitigate this, this is a map with either the top 10, 20, or 50 communes, or
without those: `;
const block10 = `This not only makes it easier to see the smaller dots around
the bigger cities, but also shows just how quickly the population drops off.
The largest city, Warsaw, is more than twice as big as the rest, and is the
only one with more than a million people. It shows just how rural of a country
Poland still is.`;
const block11 = `Data from: `;
const block12 = `http://biqdata.wyborcza.pl/biqdata/7,159116,23750826,
ocean-biedy-z-wyspami-bogactwa-tak-wyglada-mapa-dochodow-mieszkancow.html`;
const block13 = `https://wybory2018.pkw.gov.pl/pl/index`;

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
        <div className='max-width-600'>{block1}</div>
        <div className='max-width-600'>{block2}</div>
        <PolandIncomeSupport />
        <div className='max-width-600'>{block3}</div>
        <div className='max-width-600'>{block4}</div>
        <div className='max-width-600'>{block5}</div>
        <PolandTransformSmall />
        <div className='max-width-600'>{block6}</div>
        <div className='max-width-600'>{block7}</div>
        <PolandTransformBig />
        <div className='max-width-600'>{block8}</div>
        <PolandTransformMedium />
        <div className='max-width-600'>{block9}</div>
        <PolandTopBottom />
        <div className='max-width-600'>{block10}</div>
        <div className='max-width-600'>{block11}</div>
        <a href='http://biqdata.wyborcza.pl/biqdata/7,159116,23750826,ocean-biedy-z-wyspami-bogactwa-tak-wyglada-mapa-dochodow-mieszkancow.html'>http://biqdata.wyborcza.pl and </a>
        <a href='https://wybory2018.pkw.gov.pl/pl/index'> https://wybory2018.pkw.gov.pl/pl/index </a>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
