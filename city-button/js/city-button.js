/* modification of original city.js;
 */

var margin = {top: 50, bottom: 100, right: 50, left: 100};
var width = 800;
var height = 600;
var svgWidth = width + margin.right + margin.left;
var svgHeight = height + margin.top + margin.bottom;

var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
        .append("g")
            .attr("transform", "translate(" + 
                margin.left + "," + margin.top + ")");

// using this only to show x axis ticks
var yLabelScale = d3.scaleTime()
    .domain([new Date("January 1, 2018"), new Date("December 1, 2018")])
    .range([0, 800]);

monthPosition = d3.scaleLinear()
    .domain([1,12])
    .range([0, 800]);

var yScale = d3.scaleLinear()
    .domain([75, 17])
    .range([ 0, height]);

// %B is the full name of the month
var xAxis = d3.axisBottom(yLabelScale)
    .tickFormat(d3.timeFormat("%B"));

var yAxis = d3.axisLeft(yScale);

svg.append("g")
    .call(yAxis);

svg.append("g")
    .attr("transform", "translate(0, " +  height + ")")
    .call(xAxis);

var cities = [
    "honolulu", "palo alto", "los angeles",
    "chicago", "boston"];

var cityColor = d3.scaleOrdinal()
    .domain(cities)
    .range(d3.schemeSet2);
    // .range(["orange", "brown", "red", "blue", "purple"]);

var circles;

d3.selectAll('label')
    .style('color', function(d, i) {
        return cityColor(cities[i]);
    });

function getCity() {
    svg.selectAll('circle').remove();
    let city = this.value;
    if (city == "all") {
        for (let i=0; i<cities.length; i++) {
            drawCity(circles, cities[i]);
        }

    } else {
        drawCity(circles, city);
    }
}

var buttons = d3.selectAll('input');


var dataset = d3.csv("city-month.csv").then(function(data){
    circles = svg.selectAll("circle").data(data)
    .enter();

   buttons.on('change', getCity);
});




function drawCity(circles, cityName){

    circles.append("g")
        .append("circle")
        .attr("cx", function(d){
            return monthPosition(d.month);
        })

        .attr("r", "5")
        .attr("fill", function(){
            var color = cityColor(cityName);
            console.log(color);
            return color;
        })
        .transition()
        .attr("cy", function(d){
            return yScale(d[cityName]);
        })
        .duration(1000);
}