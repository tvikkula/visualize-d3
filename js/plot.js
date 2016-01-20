var dataCache = {};

function draw(data) {
    dataCache = data;
    var margin = {top: 0, right: 40, bottom: 20, left: 20},
	width = 1100 - margin.left - margin.right,
        height = 530 - margin.top - margin.bottom;

    var svg = d3.select('body')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var myChart = new dimple.chart(
        svg,
	dimple.filterData(dataCache, 'MonthOfYear', 'January')
    );
    var x = myChart.addCategoryAxis('x', 'Origin');
    x.title = 'Airport';
    x.addOrderRule('Origin');
    var y = myChart.addMeasureAxis('y', 'Cancelled');
    y.overrideMin = 0;
    y.overrideMax = 3200;
    y.title = 'Amount of cancelled flights';
    myChart.addSeries('CancellationType', dimple.plot.bar);
    myChart.addLegend(1000, 100, 60, 700, 'right');

    myChart.draw();

    svg.selectAll('title_text')
        .data(['Flight cancellation types:'])
        .enter()
        .append('text')
        .attr('x', 940)
        .attr('y', 105)
        .text(function (d) { return d; });

    document.getElementById('cancellationSelect')
        .addEventListener('change', function(e) {
                updateData(e.currentTarget.value, myChart);
            });
}

function updateData(month, myChart) {
    if (month != 'Total') {
	myChart.axes[1].overrideMin = 0;
	myChart.axes[1].overrideMax = 3200;
	myChart.data = dimple.filterData(dataCache, 'MonthOfYear', month);
    } else {
	myChart.axes[1].overrideMin = 0;
	myChart.axes[1].overrideMax = 16000;
	myChart.data = dataCache;
    }
    myChart.draw(1000);
}
