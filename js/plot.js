var parseDate = d3.time.format("%U-%Y").parse;
function draw(error, data) {
    data.forEach(function(d) {
	    d.value = +d.cancelledTotal;
	    d.week = parseDate(d.WeekOfYear+'-2008');
	});

    d3.select('body')
        .append('h2')
        .text('Flight cancellations');

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
	width = 1200 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

    var svg = d3.select('body')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.select('#cancellationSelect option').addEventListener('click', function(e) {
	    
	});
	
    // Dimple code:
    var myChart = new dimple.chart(svg, data);
    var x = myChart.addTimeAxis('x', 'week');
    var y = myChart.addMeasureAxis('y', 'value');
    var series = myChart.addSeries('Origin', dimple.plot.line);
    series.addOrderRule('week');
    myChart.addLegend(60, 10, 510, 20, 'right');
    myChart.draw();

    if (error) throw error;
}

function updateData(cancellationType) {
    d3.csv('data/top_flights_cancellations_byweek.csv', function(error, data) {
	    data.forEach(function(d) {
		    d.value = +d[cancellationType];
		    d.week = +d.WeekByYear;
		});
	    var myChart = new dimple.chart(d3.select('svg'), data);
	    var x = myChart.addTimeAxis('x', 'week');
	    var y = myChart.addMeasureAxis('y', 'value');
	    var series = myChart.addSeries('Origin', dimple.plot.line);
	    series.addOrderRule('week');
	    myChart.addLegend(60, 10, 510, 20, 'right');
	    myChart.draw();

	    if (error) throw error;
	});

    
}
