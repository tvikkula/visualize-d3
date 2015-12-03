function draw(data) {
    // Set margins                                                              
    var margin = 75,
        width = 1400 - margin,
        height = 1800 - margin;
    console.log(height);
    // Set header                                                               
    d3.select('body')
        .append('h2')
        .text('Flight cancellations');

    // Create the svg                                                           
    var svg = d3.select('body')
        .append('svg')
	.attr('width', width + margin)
	.attr('height', height + margin)
        .append('g')
	.attr('class', 'chart');

    /* Dimple code:
    var myChart = new dimple.chart(svg, data);
    myChart.addCategoryAxis("x", "WeekOfYear");
    myChart.addMeasureAxis("y", "cancelledTotal");
    myChart.addSeries("Origin", dimple.plot.line);
    //myChart.addLegend(60, 10, 510, 20, "right");
    myChart.draw();
    */
    d3.select('svg')
	.selectAll('cancels')
	.data(data)
	.enter()
	.append('cancels')

    var x = d3.time.scale()
	.range([margin, width]);

    var y = d3.scale.linear()
	.range([height, margin]);

    var color = d3.scale.category10();

    var xaxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

    var yaxis = d3.svg.axis()
	.scale(y)
	.orient('left');

    var line = d3.svg.line();

    d3.select('svg')
	.append('g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0,' + height + ')')
	.call(xaxis);

    d3.select('svg')
        .append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + margin + ',0)')
        .call(yaxis);

    //    d3.selectAll('cancels')
    //	.attr(
}
