import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as d3 from 'd3';
import ResizeObserver from 'resize-observer-polyfill';
import moment from 'moment';

export default class LineGraph extends Component {
  static propTypes = {
    /**
     * data should be in format: [ [ { xVal: s1x1, yVal: s1y1 }, { xVal: s1x2, yVal: s1y2 }, ... ], [ { xVal: s2x1, yVal: s2y1 }, { xVal: s2x2, yVal: s2y2 }, ... ] ]
     */
    data: PropTypes.array.isRequired,
    /**
     * margin shoiuld be in format: { left: X, right: X, top: X, bottom: X  }
     */
    margin: PropTypes.object,
    /**
     * displayTimeFormat is used to format the date/time x values displayed on the x axis
     */
    displayTimeFormat: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    /**
     * dollar indicates whether the y values are dollar amounts
     */
    dollar: PropTypes.bool,
    title: PropTypes.string,
    /**
     * dateFormat should be a string representing the format of the dates in xVal.
     * dateFormat can be used to help the component interpret the provided dates.
     */
    dateFormat: PropTypes.string,
    colors: PropTypes.array,
    legendLabels: PropTypes.array,
    /**
     * width and height props are inserted into inline styling, and therefore should be
     * in css format (i.e. 'inherit', '100%', '200px', '10em' would all work).
     */
    width: PropTypes.string,
    height: PropTypes.string,
  };

  static defaultProps = {
    margin: {
      top: 30,
      right: 20,
      bottom: 60,
      left: 65,
    },
    displayTimeFormat: '%b %e, %y',
    xLabel: '',
    yLabel: '',
    dollar: false,
    title: '',
    dateFormat: null,
    legendLabels: null,
    colors: [
      '#00a68f',
      '#3d70b2',
      '#3b1a40',
      '#473793',
      '#3c6df0',
      '#56D2BB',
      '#3b1a41',
      '#473792',
      '#3c6df1',
      '#00a682',
      '#56D2B3',
    ],
    width: '100%',
    height: '300px',
  };

  resize = () => {};
  ro;

  flatten = arr =>
    arr.reduce(
      (flat, toFlatten) =>
        flat.concat(
          Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten
        ),
      []
    );

  data = this.props.data.map(dataset =>
    dataset
      .map(d => {
        const date = moment(d.xVal, this.props.dateFormat);
        d.xVal = date.isValid() ? date : d.xVal;
        return d;
      })
      .sort(
        (a, b) =>
          a instanceof Date || typeof a === 'number' ? a.xVal - b.xVal : -1
      )
  );

  resize = () => {};
  ro = null;

  componentDidMount() {
    this.createLineGraph();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.data = nextProps.data.map(dataset =>
        dataset
          .map(d => {
            const date = moment(d.xVal, this.props.dateFormat);
            d.xVal = date.isValid() ? date : d.xVal;
            return d;
          })
          .sort(
            (a, b) =>
              a instanceof Date || typeof a === 'number' ? a.xVal - b.xVal : -1
          )
      );
    }
  }

  componentDidUpdate() {
    this.createLineGraph();
  }

  componentWillUnmount() {
    if (this.ro) {
      this.ro.disconnect();
    }
  }

  createLineGraph() {
    const { node, data } = this;
    const { margin, legendLabels } = this.props;
    const labelOffset = 35;
    const axisOffset = 16;

    d3
      .select(node)
      .select('svg')
      .selectAll('*')
      .remove();

    const el = d3.select(node).node();
    /* Find the new window dimensions */
    let width = el
      ? parseInt(el.getBoundingClientRect().width, 10) -
        (margin.left + margin.right)
      : 500;
    width = width >= 0 ? width : 0;
    let height = el
      ? parseInt(el.getBoundingClientRect().height, 10) -
        (margin.top + margin.bottom)
      : 300;
    height = height >= 0 ? height : 0;

    const timeFormat = d3.timeFormat(this.props.displayTimeFormat);

    // Set the scales TODO: MAKE IT HANDLE NON-DATE X VALS
    const x = d3
      .scaleTime()
      .range([0, width])
      .domain(d3.extent(this.flatten(data), d => d.xVal));
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(this.flatten(data), d => Number(d.yVal))]);

    // Set the axes
    const xAxis = d3
      .axisBottom()
      .ticks(d3.max(data, d => d.length))
      .scale(x)
      .tickSize(0)
      .tickFormat(timeFormat);

    const yAxis = d3
      .axisLeft()
      .ticks(4)
      .tickSize(-width)
      .scale(y.nice());

    // Set the line
    const line = d3
      .line()
      .x(d => x(d.xVal))
      .y(d => y(d.yVal));

    // Set up SVG with initial transform to avoid repeat positioning
    const svg = d3
      .select(node)
      .select('svg')
      .attr('class', 'bx--graph')
      .attr('width', width + (margin.left + margin.right))
      .attr('height', height + (margin.top + margin.bottom))
      .append('g')
      .attr('class', 'bx--group-container')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add Y axis
    svg
      .append('g')
      .attr('class', 'bx--axis bx--axis--y')
      .attr('stroke-dasharray', '4')
      .call(yAxis)
      .selectAll('text')
      .attr('x', -axisOffset);

    // Add Y axis label
    svg
      .select('.bx--axis--y')
      .append('text')
      .text(this.props.yLabel)
      .attr('class', 'bx--graph-label')
      .attr(
        'transform',
        `translate(${-labelOffset}, ${height / 2}) rotate(-90)`
      );

    // Add X axis
    svg
      .append('g')
      .attr('class', 'bx--axis bx--axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('y', axisOffset);

    // Add X axis label
    svg
      .select('.bx--axis--x')
      .append('text')
      .text(this.props.xLabel)
      .attr('class', 'bx--graph-label')
      .attr('transform', `translate(${width / 2}, ${labelOffset})`);

    // Style axes
    svg
      .selectAll('.bx--axis')
      .selectAll('path')
      .style('stroke', '#5A6872');
    svg
      .selectAll('.tick')
      .selectAll('line')
      .style('stroke', '#5A6872');
    svg
      .selectAll('.tick')
      .selectAll('text')
      .style('fill', '#5A6872');
    svg
      .selectAll('.bx--axis--y')
      .selectAll('path')
      .style('display', 'none');
    svg
      .selectAll('.bx--graph-label')
      .style('font-weight', 700)
      .style('text-anchor', 'middle')
      .style('fill', '#5A6872')
      .style('font-size', '10px');

    // Add the line
    const paths = data.map((dataset, i) =>
      svg
        .append('path')
        .datum(dataset)
        .attr('class', 'bx--line')
        .attr('id', `line-${i}`)
        .attr('stroke', this.props.colors[i] || '#00a68f')
        .attr('d', line)
        .style('stroke-width', 2)
        .style('fill', 'none')
        .style('pointer-events', 'none')
    );

    // Animate the line on initial draw
    paths.forEach(path => {
      const totalLength = path.node() ? path.node().getTotalLength() : width;
      path
        .attr('stroke-dasharray', `${0} ${totalLength}`)
        .transition()
        .ease(d3.easeExp)
        .duration(1000)
        .attr('stroke-dasharray', `${totalLength} ${0}`);
    });

    // Create Bisect function
    const bisectDate = d3.bisector(d => d.xVal).left;

    // Select Tooltip
    const tooltips = paths.map((path, i) =>
      d3.select(node).select(`#tooltip-${i}`)
    );

    // Add an invisible overlay to graph area to capture mouse events
    svg
      .append('rect')
      .attr('class', 'pointer')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', () => {
        // Show the tooltip on mouseover
        tooltips.forEach(tooltip => tooltip.style('display', 'inherit'));
      })
      .on('mouseout', () => {
        // Hide the tooltip on mouseout
        tooltips.forEach(tooltip => tooltip.style('display', 'none'));
      })
      .on('mousemove', () => {
        // Get the mouse
        const mouse = d3.mouse(d3.event.currentTarget);
        const timestamp = x.invert(mouse[0]);
        // Pass the xVal in to the bisectDate function, which the nearest index
        data.forEach((dataset, i) => {
          const index = bisectDate(dataset, timestamp);
          if (index > 0 && index < dataset.length) {
            const d0 = dataset[index - 1];
            const d1 = dataset[index];
            // work out which date value is closest to the mouse
            const d = timestamp - d0.xVal > d1.xVal - timestamp ? d1 : d0;
            // Get the tooltip width
            const tooltipWidth = tooltips[i].nodes()[0].getBoundingClientRect()
              .width;
            // If overlay width is 100px, tooltip width is 50px
            // the overlay needs to be offset to the left by 25px;
            const offset = -tooltipWidth / 2;
            // Moves the tooltip to the correct coordinates, and adds the calculated difference.
            tooltips[i]
              .style('left', `${x(d.xVal) + margin.left + offset}px`)
              .style('top', `${y(d.yVal) - axisOffset}px`)
              .text(`${this.props.dollar ? '$' : ''}${d.yVal}`);
          }
        });
      });
    let legend;
    let legendRectSize;
    let legendSpacing;
    if (legendLabels) {
      legendRectSize = 18;
      legendSpacing = 4;

      legend = svg
        .selectAll('.legend')
        .data(legendLabels)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => {
          const h = legendRectSize + legendSpacing;
          const offset = h * legendLabels.length / 2;
          const horz = width;
          const vert = i * h - offset + 50;
          return `translate(${horz},${vert})`;
        });

      legend
        .append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', (d, i) => this.props.colors[i])
        .style('stroke', (d, i) => this.props.colors[i]);

      legend
        .append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text((d, i) => legendLabels[i]);
    }

    this.resize = () => {
      const newEl = d3.select(node).node();
      if (newEl) {
        /* Find the new window dimensions */
        let resizeWidth =
          parseInt(newEl.getBoundingClientRect().width, 10) -
          (margin.left + margin.right);
        resizeWidth = resizeWidth >= 0 ? resizeWidth : 0;
        let resizeHeight =
          parseInt(newEl.getBoundingClientRect().height, 10) -
          (margin.top + margin.bottom);
        resizeHeight = resizeHeight >= 0 ? resizeHeight : 0;

        d3
          .select(node)
          .select('svg')
          .attr('width', resizeWidth + (margin.left + margin.right))
          .attr('height', resizeHeight + (margin.top + margin.bottom));
        svg
          .attr('width', resizeWidth + (margin.left + margin.right))
          .attr('height', resizeHeight + (margin.top + margin.bottom));

        /* Update the range of the scale with new width/height */
        x.range([0, resizeWidth]).nice();
        y.range([resizeHeight, 0]).nice();

        xAxis
          .scale(x)
          .ticks(Math.min(resizeWidth / 70, d3.max(data, d => d.length)));
        yAxis.scale(y).tickSize(-resizeWidth);

        svg
          .select('.pointer')
          .attr('height', resizeHeight)
          .attr('width', resizeWidth);

        if (legend) {
          const maxWidth = d3.max(
            legend.nodes(),
            n => n.getBoundingClientRect().width
          );
          legend.attr('transform', (d, i) => {
            const h = legendRectSize + legendSpacing;
            const offset = h * legendLabels.length / 2;
            const horz = resizeWidth + margin.right - maxWidth;
            const vert = i * h - offset + 50;
            return `translate(${horz},${vert})`;
          });
        }

        /* Update the axis with the new scale */
        svg
          .select('.bx--axis--x')
          .attr('transform', `translate(0,${resizeHeight})`)
          .call(xAxis)
          .select('.bx--graph-label')
          .attr('transform', `translate(${resizeWidth / 2}, ${labelOffset})`);

        svg
          .select('.bx--axis--y')
          .call(yAxis)
          .select('.bx--graph-label')
          .attr(
            'transform',
            `translate(${-labelOffset}, ${resizeHeight / 2}) rotate(-90)`
          );

        /* Force D3 to recalculate and update the line */
        paths.forEach(path => path.attr('d', line));
      }
    };

    this.ro = new ResizeObserver(this.resize);
    this.ro.observe(node);

    this.resize();
  }

  render() {
    return (
      <div
        className="outerDiv"
        style={{ height: this.props.height, width: this.props.width }}>
        {this.props.title ? (
          <h2 className="bx--graph-header">{this.props.title}</h2>
        ) : null}
        <div
          className="bx--graph-container"
          ref={node => (this.node = node)}
          style={{ height: '100%', position: 'relative' }}>
          <svg ref={node => (this.svgNode = node)} />
          {this.data.map((d, i) => (
            <div
              className="bx--tooltip"
              id={`tooltip-${i}`}
              data-floating-menu-direction="top"
              style={{
                display: 'none',
                fontWeight: 700,
                padding: '.25rem .5rem',
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
