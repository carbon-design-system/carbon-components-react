import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as d3 from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

class BarGraph extends Component {
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
      colors,
      labelOffset,
      legendLabels,
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

    let x;
    let x0;
    let x1;
    let colorScale;
    let maxY;
    let legend;
    let legendRectSize;
    let legendSpacing;

    if (!Array.isArray(data[0].yVal)) {
      // Basic Bar Graph
      // Set the scales
      x = d3
        .scaleBand()
        .rangeRound([0, width])
        .domain(data.map(d => d.xVal))
        .padding(0.5);

      maxY = d3.max(data, d => d.yVal);
    } else {
      // Grouped Bar Graph
      colorScale = d3.scaleOrdinal().range(colors);

      // Set the scales
      x0 = d3
        .scaleBand()
        .rangeRound([0, width])
        .domain(data.map(d => d.xVal))
        .paddingInner(0.3);
      x1 = d3
        .scaleBand()
        .rangeRound([0, x0.bandwidth()])
        .domain(d3.range(data[0].yVal.length))
        .padding(0.05);

      maxY = d3.max(data, d => d3.max(d.yVal, y => Number(y)));
    }
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, maxY > minY ? maxY : minY]);

    // // Set the axes
    const xAxis = d3
      .axisBottom()
      .scale(x || x0)
      .tickSize(0);

    const yAxis = d3
      .axisLeft()
      .ticks(Math.ceil(height / 50))
      .tickSize(-width)
      .scale(y.nice());

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

    if (!Array.isArray(data[0].yVal)) {
      // Basic Bar Graph
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
    } else {
      // Grouped Bar Graph

      let count = 0;
      svg
        .append('g')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', d => `translate(${x0(d.xVal)}, 0)`)
        .selectAll('rect')
        .data(d => {
          count++;
          return d.yVal.map((key, index) => ({
            key,
            index,
            series: count,
            xVal: d.xVal,
          }));
        })
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x1(d.index))
        .attr('y', height)
        .attr('width', x1.bandwidth())
        .attr('height', 0)
        .attr('fill', d => colorScale(d.index))
        .transition()
        .duration(500)
        .delay((d, i) => i * 50)
        .attr('height', d => height - y(d.key))
        .attr('y', d => y(d.key));

      const tooltip = d3.select(node).select('#tooltip');

      svg
        .selectAll('.bar')
        .on('mouseover', d => {
          d3
            .select(d3.event.currentTarget)
            .style('cursor', 'pointer')
            .transition()
            .attr('fill', d3.color(colorScale(d.index)).darker());

          tooltip
            .style('display', 'inherit')
            .text(`${d.key}`)
            .style('top', `${y(d.key) - axisOffset}px`);

          const bandwidth = x1.bandwidth();
          const tooltipWidth = tooltip.nodes()[0].getBoundingClientRect().width;
          const offset = (tooltipWidth - bandwidth) / 2;

          tooltip.style(
            'left',
            `${x1(d.index) + x0(d.xVal) + margin.left - offset}px`
          );
        })
        .on('mouseout', d => {
          d3
            .select(d3.event.currentTarget)
            .transition()
            .attr('fill', colorScale(d.index));

          tooltip.style('display', 'none');
        });

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
          .select(svgNode)
          .attr('width', resizeWidth + (margin.left + margin.right))
          .attr('height', resizeHeight + (margin.top + margin.bottom))
          .select('.graph')
          .attr('width', resizeWidth + (margin.left + margin.right))
          .attr('height', resizeHeight + (margin.top + margin.bottom));

        /* Update the range of the scale with new width/height */
        (x || x0).rangeRound([0, resizeWidth]);
        if (x1) {
          x1.rangeRound([0, x0.bandwidth()]);
        }
        y.range([resizeHeight, 0]).nice();

        xAxis.scale(x || x0);
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
        if (!Array.isArray(data[0].yVal)) {
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
        } else {
          svg
            .select('.bar-container')
            .selectAll('.bar')
            .attr('x', d => x1(d.index))
            .attr('y', d => y(d.key))
            .attr('width', x1.bandwidth())
            .attr('height', d => resizeHeight - y(d.key))
            .attr('fill', d => colorScale(d.index));
        }
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

BarGraph.propTypes = {
  /**
   * data should be in this format for basic Bar Graph: [ { xVal: x1, yVal: y1 }, { xVal: x2, yVal: y2 }, ... ]
   * OR this format for grouped Bar Graph: [ { xVal: x1, yVal: [s1y1, s2y1, ...] }, { xVal: x2, yVal: [s1y2, s2y2, ...] }, ... ]
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
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
   * color for the graph's bars. This color will be used if your data has a single series. Should be in hex format.
   */
  color: PropTypes.string,
  /**
   * colors for the graph's bars. These colors will be used if your data has multiple series. Should be in hex format.
   */
  colors: PropTypes.arrayOf(PropTypes.string),
  labelOffset: PropTypes.number,
  /**
   * width and height props are inserted into inline styling, and therefore should be
   * in css format (i.e. 'inherit', '100%', '200px', '10em' would all work).
   */
  width: PropTypes.string,
  height: PropTypes.string,
  legendLabels: PropTypes.arrayOf(PropTypes.string),
};

BarGraph.defaultProps = {
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
  colors: ['#00A78F', '#3b1a40', '#473793', '#3c6df0', '#56D2BB', '#00a682'],
  labelOffset: 35,
  width: '100%',
  height: '300px',
  legendLabels: null,
};

export default BarGraph;
