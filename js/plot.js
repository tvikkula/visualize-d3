var parseDate = d3.time.format("%U-%Y").parse;
var dataCache = {};

function draw(data) {
    dataCache = data;
    dataCache.forEach(function(d) {
	    d.value = +d.cancelledTotal;
	    d.week = parseDate(d.WeekOfYear+'-2008');
	});

    d3.select('body')
        .append('h2')
        .text('Flight cancellations');

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = 1100 - margin.left - margin.right,
        height = 580 - margin.top - margin.bottom;

    var svg = d3.select('body')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var myChart = new dimple.chart(svg, dataCache);
    var x = myChart.addTimeAxis('x', 'week', null, '%U');
    x.ticks = 52;
    myChart.addMeasureAxis('y', 'value');
    var series = myChart.addSeries('Origin', dimple.plot.line);
    series.addOrderRule('week');
    var myLegend = myChart.addLegend(60, 10, 510, 20, 'right');
    myChart.draw();

    myChart.legends = [];

    svg.selectAll("title_text")
	.data(["Click legend to","show/hide owners:"])
	.enter()
	.append("text")
	.attr("x", 499)
	.attr("y", function (d, i) { return 90 + i * 14; })
	.text(function (d) { return d; });


    var filterValues = dimple.getUniqueValues(dataCache, "Origin");
    myLegend.shapes.selectAll("rect")
	.on("click", function (e) {
		updateLegend(myChart, filterValues, e);
	    });

    document.getElementById('cancellationSelect')
        .addEventListener('change', function(e) {
                console.log(e.currentTarget.value);
                updateData(e.currentTarget.value, myChart);
            });
}

// Interactive legend from http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends
function updateLegend(myChart, filterValues, e) {
    // This indicates whether the item is already visible or not                                                                                                         
    var hide = false;
    var newFilters = [];
    // If the filters contain the clicked shape hide it                                                                                                                  
    filterValues.forEach(function (f) {
	    if (f === e.aggField.slice(-1)[0]) {
		hide = true;
	    } else {
		newFilters.push(f);
	    }
	});
    // Hide the shape or show it                                                                                                                                         
    if (hide) {
	d3.select(this).style("opacity", 0.2);
    } else {
	newFilters.push(e.aggField.slice(-1)[0]);
	d3.select(this).style("opacity", 0.8);
    }
    // Update the filters                                                                                                                                                
    filterValues = newFilters;
    // Filter the data                                                                                                                                                   
    myChart.data = dimple.filterData(dataCache, "Origin", filterValues);
    // Passing a duration parameter makes the chart animate. Without                                                                                                     
    // it there is no transition                                                                                                                                         
    myChart.draw(800);
}
function updateData(cancellationType, myChart) {
    d3.csv('data/top_flights_cancellations_byweek.csv', function(data) {
	    data.forEach(function(d) {
		    d.value = +d[cancellationType];
		    d.week = parseDate(d.WeekOfYear+'-2008');
		});
	    myChart.data = data;
	    myChart.draw(1000);
	    dataCache = data;
	});
}
