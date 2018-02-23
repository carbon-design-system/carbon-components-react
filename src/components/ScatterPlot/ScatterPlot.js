import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as d3 from 'd3';
import ResizeObserver from 'resize-observer-polyfill';
import moment from 'moment';

class ScatterPlot extends Component {
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
        d.xVal = date.isValid() ? date : Number(d.xVal);
        return d;
      })
      .sort()
  );

  componentDidMount() {
    this.createScatterPlot();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.data = nextProps.data.map(dataset =>
        dataset
          .map(d => {
            const date = moment(d.xVal, this.props.dateFormat);
            d.xVal = date.isValid() ? date : Number(d.xVal);
            return d;
          })
          .sort()
      );
    }
  }

  componentDidUpdate() {
    this.createScatterPlot();
  }

  componentWillUnmount() {
    if (this.ro) {
      this.ro.disconnect();
    }
  }

  createScatterPlot() {
    const { node, data } = this;
    const { margin, legendLabels, yLabel, xLabel, colors } = this.props;
    const labelOffset = 35;
    const axisOffset = 12;

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
    // Set the scales
    var x = d3
      .scaleTime()
      .rangeRound([0, width])
      .domain([
        d3.min(this.flatten(data), d => d.xVal),
        d3.max(this.flatten(data), d => d.xVal),
      ]);
    var y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(this.flatten(data), d => d.yVal)]);

    // // Set the axes
    var xAxis = d3
      .axisBottom()
      .ticks(Math.min(width / 70, d3.max(data, d => d.length)))
      .scale(x)
      .tickSize(0)
      .tickFormat(timeFormat);

    var yAxis = d3
      .axisLeft()
      .ticks(4)
      .tickSize(-width)
      .scale(y.nice());

    // // Set up SVG with initial transform to avoid repeat positioning
    var svg = d3
      .select(node)
      .select('svg')
      .attr('class', 'graph')
      .attr('width', width + (margin.left + margin.right))
      .attr('height', height + (margin.top + margin.bottom))
      .append('g')
      .attr('class', 'group-container')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    // // Add Y axis
    svg
      .append('g')
      .attr('class', 'axis y')
      .attr('stroke-dasharray', '4')
      .call(yAxis)
      .selectAll('text')
      .attr('x', -axisOffset)
      .attr('font-family', 'ibm-plex-sans');

    // // Add Y axis label
    svg
      .select('.y')
      .append('text')
      .text(yLabel)
      .attr('class', 'label')
      .attr('fill', '#5A6872')
      .attr(
        'transform',
        'translate(' + -labelOffset + ', ' + height / 2 + ') rotate(-90)'
      )
      .attr('font-family', 'ibm-plex-sans');

    // // Add X axis
    svg
      .append('g')
      .attr('class', 'axis x')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxis)
      .selectAll('text')
      .attr('y', axisOffset)
      .attr('font-family', 'ibm-plex-sans');

    // // Add X axis label
    svg
      .select('.x')
      .append('text')
      .text(xLabel)
      .attr('class', 'label')
      .attr('fill', '#5A6872')
      .attr('transform', 'translate(' + width / 2 + ', ' + labelOffset + ')')
      .attr('font-family', 'ibm-plex-sans');

    svg
      .selectAll('.x')
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
      .selectAll('.y')
      .selectAll('path')
      .style('display', 'none');
    svg
      .selectAll('.label')
      .style('font-weight', 700)
      .style('text-anchor', 'middle')
      .style('fill', '#5A6872')
      .style('font-size', '10px');

    const scatterSets = data.map((dataset, i) =>
      svg
        .append('g')
        .attr('class', `scatter-container-${i}`)
        .selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('class', `circle-${i}`)
        .attr('cx', d => x(d.xVal))
        .attr('cy', d => y(d.yVal))
        .attr('fill', colors[i] || '#00a68f')
        .attr('r', 0)
        .transition()
        .delay((d, i) => i * 35)
        .attr('r', 4)
    );

    // Select Tooltip
    var tooltip = d3.select('.tooltip');

    scatterSets.forEach((set, i) => {
      svg
        .selectAll(`.circle-${i}`)
        .on('mouseover', d => {
          var circleData = {
            x: x(d.xVal),
            y: y(d.yVal),
          };

          svg
            .select(`.scatter-container-${i}`)
            .append('circle')
            .attr('class', `temp-circle-${i}`)
            .lower()
            .attr('cx', circleData.x)
            .attr('cy', circleData.y)
            .attr('r', 4)
            .transition()
            .attr('r', 10)
            .style('opacity', 0.5)
            .attr('fill', colors[i]);

          tooltip
            .style('display', 'inherit')
            .text(d.yVal)
            .style('top', y(d.yVal) - axisOffset + 'px')
            .transition()
            .style('opacity', 1);

          var tooltipWidth = tooltip.nodes()[0].getBoundingClientRect().width;
          var offset = tooltipWidth / 2;

          tooltip.style('left', x(d.xVal) + margin.left - offset + 'px');
        })
        .on('mouseout', () => {
          d3
            .select(`.temp-circle-${i}`)
            .transition()
            .attr('r', 0)
            .remove();

          tooltip
            .transition()
            .style('opacity', 0)
            .transition()
            .duration(0)
            .style('display', 'none');
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
          const horz = width + axisOffset;
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
        x.rangeRound([0, resizeWidth]);
        y.range([resizeHeight, 0]).nice();

        xAxis
          .scale(x)
          .ticks(Math.min(resizeWidth / 70, d3.max(data, d => d.length)));
        yAxis.scale(y).tickSize(-resizeWidth);

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

        /* Force D3 to recalculate and update the scatters */
        data.map((dataset, i) =>
          svg
            .select(`.circle-${i}`)
            .attr('cx', d => x(d.xVal))
            .attr('cy', d => y(d.yVal))
            .attr('fill', colors[i] || '#00a68f')
            .attr('r', 0)
            .transition()
            .delay((d, i) => i * 35)
            .attr('r', 4)
        );
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
          <div
            className="bx--tooltip tooltip"
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
              opacity: 0,
            }}
          />
        </div>
      </div>
    );
  }
}

ScatterPlot.propTypes = {
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

ScatterPlot.defaultProps = {
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

export default ScatterPlot;
