function setup() {
    // Set margins
    var margin = 75,
	width = 1400 - margin
	height = 1600 - margin;

    // Set header
    d3.select('body')
	.append('h2')
	.text('Flight cancellations');

    // Create the svg 
    var svg = d3.select('body')
	.append('svg')
	    .attr('width', width + margin)
	    .attr('heigh', height + margin)
        .append('g')
	    .attr('class', 'chart');

    return margin, svg;
}

function draw(data) {
    var margin, svg = setup();
    console.log(margin);
    var myChart = new dimple.chart(svg, data);
    myChart.addCategoryAxis("x", "Origin");
    myChart.addMeasureAxis("y", "cancelledTotal");
    myChart.addSeries(null, dimple.plot.scatter);
    //myChart.addLegend(60, 10, 510, 20, "right");
    myChart.draw();
}
