var parseDate = d3.time.format("%U-%Y").parse;

function draw(data) {
    data.forEach(function(d) {
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

    var myChart = new dimple.chart(svg, data);
    var x = myChart.addTimeAxis('x', 'week', null, '%U');
    x.ticks = 52;
    myChart.addMeasureAxis('y', 'value');
    var series = myChart.addSeries('Origin', dimple.plot.line);
    series.addOrderRule('week');
    myChart.addLegend(60, 10, 510, 20, 'right');
    myChart.draw();

    document.getElementById('cancellationSelect')
        .addEventListener('change', function(e) {
		console.log(e.currentTarget.value);
                updateData(e.currentTarget.value, myChart);
            });
}

function updateData(cancellationType, myChart) {
    d3.csv('data/top_flights_cancellations_byweek.csv', function(data) {
	    data.forEach(function(d) {
		    d.value = +d[cancellationType];
		    d.week = parseDate(d.WeekOfYear+'-2008');
		});
	    myChart.data = data;
	    myChart.draw(1000);
	});
}
