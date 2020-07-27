
function newPlot(){
    data = [4, 8, 15, 16, 23, 42];
    const div = d3.create("div")
      .style("font", "10px sans-serif")
      .style("text-align", "right")
      .style("color", "white");

    div.selectAll("div")
    .data(data)
    .join("div")
    .style("background", "steelblue")
    .style("padding", "3px")
    .style("margin", "1px")
    .style("width", d => `${d * 10}px`)
    .text(d => d);
  
    return div.node();
} 



$(document).ready(()=>{

    $("#chart-button").on("click",()=>{
        document.getElementById("chart").style.display = "block"
    })
    // set the dimensions and margins of the graph
    var data = [{x: 100, y: 20}, {x: 200, y: 150}, {x: 300, y: 100}, {x: 400, y: 20}, {x: 500, y: 130}, {x: 600, y: 20}]

    // create svg element:
    var svg = d3.select("#chart").append("svg").attr("width", 800).attr("height", 200)

    // Create the scale
    var x = d3.scalePoint()
    .domain(["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday","Saturday"])         // This is what is written on the Axis: from 0 to 100
    .range([100, 600]);       // This is where the axis is placed: from 100 px to 800px

    svg
    .append("g")
    .attr("transform", "translate(0,150)")      // This controls the vertical position of the Axis
    .call(d3.axisBottom(x));

    // prepare a helper function
    var lineFunc = d3.line()
    .x(function(d) { return d.x })
    .y(function(d) { return d.y })

    // Add the path using this helper function
    svg.append('path')
    .attr('d', lineFunc(data))
    .attr('stroke', 'black')
    .attr('fill', 'none');
    })
