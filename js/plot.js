/*
 * A function called when a loaded dataset is drawn to the page.
 * 
 * @param   data  The dataset that the plot is drawn from.
 * @returns void
 */
function draw(data) {
    /* Define plot margins */
    var margin = {top: 0, right: 40, bottom: 20, left: 20},
	width = 1100 - margin.left - margin.right,
        height = 530 - margin.top - margin.bottom;

    /* Initiate svg with defined margins */
    var svg = d3.select('body')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr(
	      'transform',
	      'translate(' + margin.left + ',' + margin.top + ')'
	);

    /* Initiate chart with defined svg and data */
    var myChart = new dimple.chart(
        svg,
	data
    );

    /* Define Months as x-axis, sort them in proper order */
    var x = myChart.addCategoryAxis('x', 'Month');
    x.addOrderRule(
		   ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
		    'Aug', 'Sep', 'Oct', 'Nov','Dec'],
		   desc= false
		   );
    x.title = 'Month';

    /* Define Cancelled percentages as y-axis */
    var y = myChart.addMeasureAxis('y', 'CancelledPercentage');
    y.title = 'Percentage of flights cancelled due to weather';
    y.tickFormat = ',.1%';

    /* Add line and bubble plots as plot series */
    myChart.addSeries(null, dimple.plot.line);
    var bubbles = myChart.addSeries('Significant', dimple.plot.bubble);

    /* Assign more distinguishable colors and opacity between Significant
       and non-Significant points. */
    myChart.assignColor('1', 'red', 'black', 1);
    myChart.assignColor('0', 'blue', 'grey', 0.8);

    /* Assign a custom tooltip to omit unnecessary data and to clean
       title text up. */
    bubbles.getTooltipText = function (e) {
	console.log(e);
	return [
		'Month: ' + e.x + ',',
		'Cancellation percentage: ' + e.y * 100 + '%'
	];
    };

    myChart.draw();

    /* Set bubble radius to something smaller */
    svg.selectAll('circle').attr('r', 3);

}
