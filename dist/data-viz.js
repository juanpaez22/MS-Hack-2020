import {getMoodData} from "./storage_utils.js"

function createGraph(entries){
    console.log("creating graph", entries)
    // set the dimensions and margins of the graph

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
    .attr('d', lineFunc(entries))
    .attr('stroke', 'black')
    .attr('fill', 'none');

    document.getElementById("chart").style.display = "block"
    
}
function scaleDownRange(min,max,a,b,x){
    let a_b_diff  = b-a;
    let max_min_diff = max-min;

    let result = ((a_b_diff)*(x-min))/(max_min_diff)
    return result
}

function convertEntries(entries){
    const month_map = { 
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "June",
        6: "July",
        7: "Aug",
        8: "Sept",
        9: "Oct",
        10: "Nov",
        11: "Dec",
    }
    let converted_entries = new Array();

    console.log(entries)
    let min = Date.parse(entries[0].timestamp)
    let max = Date.parse(entries[entries.length - 1].timestamp)

    let a = 100;
    let b = 600;

    entries.forEach((entry) => {

        let x = scaleDownRange(min,max,a,b,Date.parse(entry.timestamp))
        converted_entries.push({x: x, y:entry.val})
    });
    
    return converted_entries
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

function analyzeData(data){

    let filtered_list = filterLast7Days(data)
    let converted_entries = convertEntries(filtered_list)
    createGraph(converted_entries)
    document.getElementById("chart").style.display = "block"

    console.log("filtered", filtered_list);
    console.log("converted", converted_entries);
}

$(document).ready(()=>{
    $("#chart-button").on("click",()=>{
        getMoodData(analyzeData)
    })
})
