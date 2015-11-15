function setup() {
    "use strict";
    var margin = 75,
	width = 1400 - margin
	height = 1600 - margin;
    var svg = d3.select('body')
	.append('svg')
	.attr('width', width + margin)
	.attr('heigh', height + margin)
        .append('g')
	.attr('class', 'chart');
    return margin, svg
}

function draw(data) {
    var margin, svg = setup();

    d3.select('svg')
	.selectAll('circle')
	.data(data)
	.enter()
	.append('circle');

}
