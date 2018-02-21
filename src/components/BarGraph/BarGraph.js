import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as d3 from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

export default class BarGraph extends Component {
  static propTypes = {
    /**
     * data should be in format: [ { xVal: x1, yVal: y1 }, { xVal: x2, yVal: y2 }, ... ]
     */
    data: PropTypes.array.isRequired,
    /**
     * margin shoiuld be in format: { left: X, right: X, top: X, bottom: X  }
     */
    margin: PropTypes.object,
    title: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    /**
     * minY is the lowest value that will be used as the max value on the y-axis.
     * The range of the y-axis will be determined by the range of the data provided,
     * unless a minY value is provided to prevent that range from becoming too small.
     */
    minY: PropTypes.number,
    /**
     * color for the graph's bars. Should be in hex format.
     */
    color: PropTypes.string,
    labelOffset: PropTypes.number,
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
    title: '',
    xLabel: '',
    yLabel: '',
    minY: 5,
    color: '#00a68f',
    labelOffset: 35,
    width: '100%',
    height: '300px',
  };

  data = this.props.data.map(d => d);

  resize = () => {};
  ro = null;

  componentDidMount() {
    this.createBarChart();
  }

  componentWillReceiveProps(nextProps) {
    this.data = nextProps.data
      ? nextProps.data
          .map(d => {
            const date = new Date(d.xVal);
            d.xVal = Number.isNaN(date.getTime()) ? d.xVal : date;
            return d;
          })
          .sort((a, b) => a.xVal - b.xVal)
      : nextProps.data.map(d => d);
    this.createBarChart();
  }

  componentDidUpdate() {
    this.createBarChart();
  }

  componentWillUnmount() {
    if (this.ro) {
      this.ro.disconnect();
    }
  }

  createBarChart = () => {
    const { node, svgNode } = this;
    d3
      .select(svgNode)
      .selectAll('*')
      .remove();

    const {
      data,
      margin,
      xLabel,
      yLabel,
      minY,
      color,
      labelOffset,
    } = this.props;
    const axisOffset = 12;

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

    // Set the scales
    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .domain(data.map(d => d.xVal))
      .padding(0.5);

    const maxY = d3.max(data, d => d.yVal);
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, maxY > minY ? maxY : minY]);

    // // Set the axes
    const xAxis = d3
      .axisBottom()
      .scale(x)
      .tickSize(0);

    const yAxis = d3
      .axisLeft()
      .ticks(4)
      .tickSize(-width)
      .scale(y.nice());

    // // Set up SVG with initial transform to avoid repeat positioning
    const svg = d3
      .select(node)
      .select('svg')
      .attr('class', 'graph')
      .attr('width', width + (margin.left + margin.right))
      .attr('height', height + (margin.top + margin.bottom))
      .append('g')
      .attr('class', 'group-container')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('font-family', 'ibm-plex-sans');

    // Add Y axis
    svg
      .append('g')
      .attr('class', 'bx--axis bx--axis--y')
      .attr('stroke-dasharray', '4')
      .call(yAxis)
      .selectAll('text')
      .attr('x', -axisOffset)
      .attr('fill', '#5A6872');

    // Add Y axis label
    svg
      .select('.bx--axis--y')
      .append('text')
      .text(yLabel)
      .attr('class', 'bx--graph-label')
      .attr('fill', '#5A6872')
      .attr('font-size', '10px')
      .attr('font-weight', '700')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(${-labelOffset}, ${height / 2}) rotate(-90)`
      );

    svg.select('.domain').style('display', 'none');

    // Add X axis
    svg
      .append('g')
      .attr('class', 'bx--axis bx--axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('y', axisOffset)
      .attr('fill', '#5A6872');

    // Add X axis label
    svg
      .select('.bx--axis--x')
      .append('text')
      .text(xLabel)
      .attr('class', 'bx--graph-label')
      .attr('fill', '#5A6872')
      .attr('font-size', '10px')
      .attr('font-weight', '700')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${width / 2}, ${labelOffset})`);

    // Axis styling
    svg
      .selectAll('.tick')
      .selectAll('line')
      .style('stroke', '#5A6872');
    svg
      .selectAll('.bx--axis')
      .selectAll('path')
      .style('stroke', '#5A6872');
    svg
      .selectAll('.line')
      .style('stroke-width', 2)
      .style('stroke', '#FF00FF')
      .style('fill', 'none')
      .style('pointer-events', 'none');
    svg.select('.domain').style('stroke', '#5A6872');

    svg
      .append('g')
      .attr('class', 'bar-container')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.xVal))
      .attr('y', () => height)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', color)
      .transition()
      .duration(500)
      .delay((d, i) => i * 50)
      .attr('height', d => height - y(d.yVal))
      .attr('y', d => y(d.yVal));

    const tooltip = d3.select(node).select('#tooltip');

    svg
      .selectAll('.bar')
      .on('mouseover', d => {
        d3
          .select(d3.event.currentTarget)
          .style('cursor', 'pointer')
          .transition()
          .attr('fill', d3.color(color).darker());

        tooltip
          .style('display', 'inherit')
          .text(`${d.yVal}`)
          .style('top', `${y(d.yVal) - axisOffset}px`);

        const bandwidth = x.bandwidth();
        const tooltipWidth = tooltip.nodes()[0].getBoundingClientRect().width;
        const offset = (tooltipWidth - bandwidth) / 2;

        tooltip.style('left', `${x(d.xVal) + margin.left - offset}px`);
      })
      .on('mouseout', () => {
        d3
          .select(d3.event.currentTarget)
          .transition()
          .attr('fill', color);

        tooltip.style('display', 'none');
      });

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
          .select(svgNode)
          .attr('width', resizeWidth + (margin.left + margin.right))
          .attr('height', resizeHeight + (margin.top + margin.bottom))
          .select('.graph')
          .attr('width', resizeWidth + (margin.left + margin.right))
          .attr('height', resizeHeight + (margin.top + margin.bottom));

        /* Update the range of the scale with new width/height */
        x.rangeRound([0, resizeWidth]);
        y.range([resizeHeight, 0]).nice();

        xAxis.scale(x);
        yAxis.scale(y).tickSize(-resizeWidth);

        /* Update the axis with the new scale */
        svg
          .select('.bx--axis--x')
          .attr('transform', `translate(0, ${resizeHeight})`)
          .call(xAxis)
          .selectAll('text')
          .attr('y', axisOffset);
        svg
          .select('.bx--axis--x')
          .select('.bx--graph-label')
          .attr('transform', `translate(${resizeWidth / 2}, ${labelOffset})`);

        svg
          .select('.bx--axis--y')
          .call(yAxis)
          .selectAll('text')
          .attr('x', -axisOffset)
          .select('.bx--graph-label')
          .attr('transform', `translate(${-labelOffset}, ${resizeHeight / 2})`);

        /* Force D3 to recalculate and update the bars */
        svg
          .select('.bar-container')
          .selectAll('.bar')
          .attr('x', d => x(d.xVal))
          .attr('y', () => resizeHeight)
          .attr('width', x.bandwidth())
          .attr('height', 0)
          .attr('fill', color)
          .transition()
          .duration(500)
          .delay((d, i) => i * 50)
          .attr('height', d => resizeHeight - y(d.yVal))
          .attr('y', d => y(d.yVal));
      }
    };

    this.ro = new ResizeObserver(this.resize);
    this.ro.observe(node);

    this.resize();
  };

  render() {
    return (
      <div
        className="outerDiv"
        style={{ height: this.props.height, width: this.props.width }}>
        {this.props.title ? (
          <h2 className="bx--graph-header">{this.props.title}</h2>
        ) : null}
        <div
          className="graph-container"
          ref={node => (this.node = node)}
          style={{ height: '100%', width: '100%', position: 'relative' }}>
          <svg ref={node => (this.svgNode = node)} />
          <div
            className="bx--tooltip"
            id="tooltip"
            data-floating-menu-direction="top"
            style={{
              fontWeight: 700,
              paddingLeft: '1rem 2rem',
              backgroundColor: '#fff',
              position: 'absolute',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, .1)',
              border: '1px solid #DFE3E6',
              padding: '.25rem .5rem',
              pointerEvents: 'none',
              display: 'none',
            }}
          />
        </div>
      </div>
    );
  }
}
