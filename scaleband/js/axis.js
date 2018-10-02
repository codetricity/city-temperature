const width = 600;
const height = 400;
const margin = { left: 120, top: 50, right: 50, bottom: 100 };
const svgHeight = height + margin.top + margin.bottom;
const svgWidth = width + margin.right + margin.left;

const svg = d3.select('body').append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .append('g')
  .attr('transform', `translate( ${margin.left}, ${margin.top})`);

d3.csv('data/state.csv').then((data) => {
  let states = []; // eslint-disable-line prefer-const
  data.forEach((d) => {
    d.population = +d.population; // eslint-disable-line no-param-reassign
    states.push(d.state);
  });

  const populationMinMax = d3.extent(data, d => d.population);

  const yScale = d3.scaleLinear()
    .domain(populationMinMax)
    .range([height, 0]);

  const xScale = d3.scaleBand()
    .domain(states)
    .range([0, width])
    .padding(0.1);

  const xAxis = d3.axisBottom(xScale);

  const yAxis = d3.axisLeft(yScale);

  svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${height})`);

  svg.append('g')
    .call(yAxis);

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', '10')
    .attr('cy', d => yScale(d.population))
    .attr('cx', (d) => {
      const offset = xScale.bandwidth() / 2;
      return xScale(d.state) + offset;
    })
    .attr('fill', (d, i) => d3.schemeAccent[i]);
});

svg.append('text')
  .attr('class', 'title')
  .text('2016 Population in US States')
  .attr('x', width / 2)
  .attr('y', -20)
  .attr('text-anchor', 'middle');

svg.append('text')
  .attr('class', 'axis')
  .text('2016 Population')
  .attr('x', -100)
  .attr('y', height / 2)
  .attr('transform', `rotate(-90, -100, ${height / 2})`);
