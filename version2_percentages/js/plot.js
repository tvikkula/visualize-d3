var parseDate = d3.time.format("%U-%Y").parse;
var dataCache = {};

function draw(data) {
    dataCache = data;
    dataCache.forEach(function(d) {
	    d.value = +d.cancelledTotal;
	    d.Week = parseDate(d.WeekOfYear+'-2008');
	});

    var margin = {top: 0, right: 40, bottom: 20, left: 20},
	width = 1100 - margin.left - margin.right,
        height = 530 - margin.top - margin.bottom;

    var svg = d3.select('body')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var myChart = new dimple.chart(svg, dataCache);
    var x = myChart.addTimeAxis('x', 'Week', null, '%U');
    x.ticks = 52;
    y = myChart.addMeasureAxis('y', 'value');

    y.overrideMin = 0.0;
    y.overrideMax = 1500.0;
    var series = myChart.addSeries('Origin', dimple.plot.line);
    series.addOrderRule('Week');
    var myLegend = myChart.addLegend(1000, 100, 60, 700, 'right');

    myChart.draw();
    y.titleShape.text('Amount of cancelled flights');

    myChart.legends = [];

    svg.selectAll('title_text')
	.data(['Toggle legend to','show/hide airports:'])
	.enter()
	.append('text')
	.attr('x', 970)
	.attr('y', function(d,i) {return 70 + i * 14;})
	.text(function (d) { return d; });

    var filterValues = dimple.getUniqueValues(dataCache, 'Origin');

    myLegend.shapes.selectAll('rect')
	.on('click', function (e) {
		filterValues = updateLegend(myChart, filterValues, e, this);
		drawChart(myChart, filterValues);
	    });

    document.getElementById('cancellationSelect')
        .addEventListener('change', function(e) {
		callback = function(cancellationType) {
		    drawChart(myChart, filterValues, cancellationType);
		}
                updateData(e.currentTarget.value, myChart, callback);
            });
}

function drawChart(myChart, filterValues, cancellationType) {
    if (cancellationType !== 'cancelledTotal') {
	myChart.axes[1].overrideMax = 100.0;
    } else {
	myChart.axes[1].overrideMax = 1500.0;
    }

    myChart.data = dimple.filterData(dataCache, 'Origin', filterValues);
    myChart.draw(1000);

    if (cancellationType !== 'cancelledTotal') {
        myChart.axes[1].titleShape.text('Ratio of flights from all flights');
    } else {
	myChart.axes[1].titleShape.text('Amount of cancelled flights');
    }
}

// Interactive legend from http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends
function updateLegend(myChart, filterValues, e, self) {
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
	d3.select(self).style('opacity', 0.2);
    } else {
	newFilters.push(e.aggField.slice(-1)[0]);
	d3.select(self).style('opacity', 0.8);
    }

    // Update the filters
    filterValues = newFilters;

    return filterValues;
}

function updateData(cancellationType, myChart, callback) {
    d3.csv('data/top_flights_cancellations_byweek.csv', function(data) {
	    data.forEach(function(d) {
		    if (cancellationType === 'cancelledTotal') {
			d.value = +d[cancellationType];
		    } else {
			d.value = +d[cancellationType] / +d['cancelledTotal'] * 100;
		    }
		    d.Week = parseDate(d.WeekOfYear+'-2008');
		});
	    dataCache = data;

	    callback(cancellationType);
	});
}
