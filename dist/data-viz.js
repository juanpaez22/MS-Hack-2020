function createGraph(data){
    console.log("creating graph", data)
    // set the dimensions and margins of the graph

    // create svg element:
    var svg = d3.select("#chart").append("svg").attr("width", 400).attr("height", 300).style("background-color","#5DC3EE")

    // Create the scale
    var x = d3.scalePoint()
    .domain(data[1])         // This is what is written on the Axis: from 0 to 100
    .range([30, 340]);       // This is where the axis is placed: from 100 px to 800px

    svg
    .append("g")
    .attr("transform", "translate(0,210)")      // This controls the vertical position of the Axis
    .call(d3.axisBottom(x));

    var y = d3.scalePoint()
    .domain(["Bad", "Good","Amazing"])         // This is what is written on the Axis: from 0 to 100
    .range([190, 10]);       // This is where the axis is placed: from 100 px to 800px

    svg
    .append("g")
    .attr("transform", "translate(350,20)")
    .call(d3.axisRight(y));

    // prepare a helper function
    var lineFunc = d3.line()
    .x(function(d) { return d.x })
    .y(function(d) { return d.y })

    // Add the path using this helper function
    svg.append('path')
    .attr('d', lineFunc(data[0]))
    .attr('stroke', '#787a72')
    .attr('fill', 'none');

    // Add the scatterplot
    svg.append('g')
    .selectAll("dot")
    .data(data[0])
    .enter()
    .append("circle")
      .attr("cx", function (d) { return d.x; } )
      .attr("cy", function (d) { return d.y; } )
      .attr("r", 3)
      .style("fill", "white")
      .append("title")
        .text("innerHTML")

    d3.selectAll("svg text")
    document.getElementById("chart").style.display = "block"
    
}

function scaleRange(min,max,a,b,x){
    let a_b_diff  = b-a;
    let max_min_diff = max-min;

    let result = ((a_b_diff)*(x-min))/(max_min_diff)
    return result
}

function getXAxis(first,last){
    const month_map = {
        0:"Jan",
        1:"Feb",
        2:"Mar",
        3:"Apr",
        4:"May",
        5:"June",
        6:"July",
        7:"Aug",
        8:"Sept",
        9:"Oct",
        10:"Nov",
        11:"Dec"
    }
    let axis = new Array();
    let first_d = new Date(first.timestamp)
    let last_d = new Date(last.timestamp)

    axis.push(month_map[first_d.getMonth()] + " " + first_d.getDate())
    axis.push(month_map[last_d.getMonth()] + " " + last_d.getDate())
    return axis
}
function convertEntries(entries){
    let converted_entries = new Array();

    let min = Date.parse(entries[0].timestamp)
    let max = Date.parse(entries[entries.length - 1].timestamp)

    let a = 25;
    let b = 340;

    let x_bias = 25;

    if(entries.length == 1){
        let x = ((b-a)/2) + x_bias
        let y = scaleRange(0,10,0,200,(10-entries[0].val))
        converted_entries.push({x:x, y:y})
    }

    else{
        entries.forEach((entry) => {

            let x = scaleRange(min,max,a,b,Date.parse(entry.timestamp)) + x_bias
            let y = scaleRange(0,10,0,200,(10-entry.val))
            converted_entries.push({x: x, y:y})
        });
    }
    
    
    let axis = getXAxis(entries[0],entries[entries.length - 1])
    return [converted_entries,axis]
}


function filterLast7Days(data){
    var cur_date = new Date();
    var seven_days_before = new Date(cur_date.getFullYear(), cur_date.getMonth(),cur_date.getDate() - 7);
    console.log(cur_date)
    console.log(seven_days_before)
    let filtered_list = data.filter((entry) => {
        let date = new Date(entry.timestamp)
        if (date < cur_date && date > seven_days_before){
            return entry
        }
    })
    
    return filtered_list
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function analyzeData(data){
    console.log(data)
    let filtered_list = filterLast7Days(data)//limiting to last 10 bc i hace bad data
    console.log("filtered", filtered_list);
    let converted_entries = convertEntries(filtered_list)
    createGraph(converted_entries)
    document.getElementById("chart").style.display = "block"

    console.log("converted", converted_entries);
}

$(document).ready(()=>{
    $("#chart-button").on("click",()=>{
        getMoodData(analyzeData)
    })
})
