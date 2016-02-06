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
    var x = myChart.addCategoryAxis('x', 'MonthOfYear');
    x.addOrderRule(
		   ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
		    'Aug', 'Sep', 'Oct', 'Nov','Dec'],
		   desc= false
		   );
    x.title = 'Month';

    /* Define Cancelled amounts as y-axis */
    var y = myChart.addMeasureAxis('y', 'Cancelled');
    y.title = 'Amount of cancelled flights';

    /* Add line and bubble plots as plot series */
    myChart.addSeries('CancellationType', dimple.plot.line);
    myChart.addSeries('CancellationType', dimple.plot.bubble);

    /* Add legend to plot */
    myChart.addLegend(1000, 100, 60, 700, 'right');

    myChart.draw();

    /* Set bubble radius to something smaller */
    svg.selectAll('circle').attr('r', 3);

    /* Define custom legend title and it's location on the plot */
    svg.selectAll('title_text')
        .data(['Flight cancellation types:'])
        .enter()
        .append('text')
        .attr('x', 890)
        .attr('y', 105)
        .text(function (d) { return d; });

    /* Add toggle-button event handler */
    document.getElementById('toggle-button')
	.addEventListener('click', function () {
	    toggle(document.querySelectorAll('.target'));
	});

    /* 
     * Courtesy of
     * http://stackoverflow.com/questions/21070101/show-hide-div-using-javascript.
     * Toggles the metadata block on and off using just Javascript.
     *
     * @param   elements          Html elements to be toggled
     * @param   specifiedDisplay  Specified display style if given.
     * @returns void
     */
    function toggle (elements, specifiedDisplay) {
	var element, index;

	elements = elements.length ? elements : [elements];
	for (index = 0; index < elements.length; index++) {
	    element = elements[index];

	    if (isElementHidden(element)) {
		element.style.display = '';

		// If the element is still hidden after removing
		// the inline display
		if (isElementHidden(element)) {
		    element.style.display = specifiedDisplay || 'block';
		}
	    } else {
		element.style.display = 'none';
	    }
	}
	function isElementHidden (element) {
	    return window.getComputedStyle(element, null)
		.getPropertyValue('display') === 'none';
	}
    }
}
