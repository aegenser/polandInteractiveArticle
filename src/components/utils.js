import {lab} from 'd3-color';
import {scaleLinear} from 'd3-scale';

const power = 2;

const incomeScale = scaleLinear()
                  .domain([175, 3384])
                  .range([0, Math.pow(100, power)]);

const supportScale = scaleLinear()
                  .domain([5, 85])
                  .range([0, 100]);

export function giveColor(income, support) {
  return lab(40 + Math.pow(incomeScale(income), 1 / power) * 0.7 +
             supportScale(support) * 0.4, 0, supportScale(support) * -1.6 +
             Math.pow(incomeScale(income), 1 / power) * 2);
}

export function giveIncomeColor(income) {
  return lab(120 - Math.pow(incomeScale(income), 1 / power) / 3, 0,
             Math.pow(incomeScale(income), 1 / power) * 2);
}

export function giveSupportColor(support) {
  return lab(120 - supportScale(support), 0, 0 - supportScale(support));
}

export function combinePow(data) {
  if (data === undefined) {
    return undefined;
  }
  let currentCount = 0;
  let currentLatCount = 0;
  let currentLongCount = 0;
  let currentVoteCount = 0;
  let currentVotersCount = 0;
  let currentVotePercCount = 0;
  let currentIncomeCount = 0;
  const powList = [];
  function powIterate(d, i) {
    //console.log(currentLatCount);
    currentCount = currentCount + 1;
    currentLatCount = currentLatCount + Number(d.latitude);
    currentLongCount = currentLongCount + Number(d.longitude);
    currentVoteCount = currentVoteCount + Number(d['ballots counted']);
    currentVotersCount = currentVotersCount + Number(d['registered voters']);
    currentVotePercCount = currentVotePercCount + Number(d['% PiS Votes']) * Number(d['ballots counted']);
    currentIncomeCount = currentIncomeCount + Number(d['avg income']) * Number(d['registered voters']);
    if (i + 1 === data.length || d.powiat !== data[i + 1].powiat) {
      powList.push({latitude: currentLatCount / currentCount,
        longitude: currentLongCount / currentCount,
        'avg income': currentIncomeCount / currentVotersCount,
        '% PiS Votes': currentVotePercCount / currentVoteCount,
        'registered voters': currentVotersCount});
      currentCount = 0;
      currentLatCount = 0;
      currentLongCount = 0;
      currentVoteCount = 0;
      currentVotersCount = 0;
      currentVotePercCount = 0;
      currentIncomeCount = 0;
    }
  }
  data.forEach(powIterate);
  return powList;
}

export function combineWoj(data) {
  if (data === undefined) {
    return undefined;
  }
  let currentCount = 0;
  let currentLatCount = 0;
  let currentLongCount = 0;
  let currentVoteCount = 0;
  let currentVotersCount = 0;
  let currentVotePercCount = 0;
  let currentIncomeCount = 0;
  const wojList = [];
  function wojIterate(d, i) {
    currentCount = currentCount + 1;
    currentLatCount = currentLatCount + Number(d.latitude);
    currentLongCount = currentLongCount + Number(d.longitude);
    currentVoteCount = currentVoteCount + Number(d['ballots counted']);
    currentVotersCount = currentVotersCount + Number(d['registered voters']);
    currentVotePercCount = currentVotePercCount + Number(d['% PiS Votes']) * Number(d['ballots counted']);
    currentIncomeCount = currentIncomeCount + Number(d['avg income']) * Number(d['registered voters']);
    if (i + 1 === data.length || d.wojewodztwo !== data[i + 1].wojewodztwo) {
      wojList.push({latitude: currentLatCount / currentCount,
        longitude: currentLongCount / currentCount,
        'avg income': currentIncomeCount / currentVotersCount,
        '% PiS Votes': currentVotePercCount / currentVoteCount,
        'registered voters': currentVotersCount});
      currentCount = 0;
      currentLatCount = 0;
      currentLongCount = 0;
      currentVoteCount = 0;
      currentVotersCount = 0;
      currentVotePercCount = 0;
      currentIncomeCount = 0;
    }
  }
  data.forEach(wojIterate);
  return wojList;
}
