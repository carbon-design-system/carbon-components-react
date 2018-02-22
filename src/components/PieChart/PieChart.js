import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as d3 from 'd3';

export default class PieChart extends Component {
  static propTypes = {
    /**
     * data should be in format: [ { label: label1, value: value1 }, { label: label2, value: value2 }, ... ]
     */
    data: PropTypes.array.isRequired,
    radius: PropTypes.number,
    colors: PropTypes.array,
    units: PropTypes.string,
    title: PropTypes.string,
  };

  static defaultProps = {
    radius: 96,
    colors: [
      '#3b1a40',
      '#473793',
      '#3c6df0',
      '#00a68f',
      '#56D2BB',
      '#3b1a41',
      '#473792',
      '#3c6df1',
      '#00a682',
      '#56D2B3',
    ],
    units: '',
    title: '',
  };

  componentDidMount() {
    this.createPieChart();
  }

  componentWillReceiveProps(nextProps) {
    this.createPieChart(nextProps.data);
  }

  componentDidUpdate() {
    this.createPieChart();
  }

  createPieChart = propsData => {
    const data = propsData || this.props.data;
    const { node, svgNode } = this;
    d3
      .select(svgNode)
      .selectAll('*')
      .remove();

    const { radius } = this.props;
    const width = radius * 2;
    const height = radius * 2;

    const legendRectSize = 18;
    const legendSpacing = 4;

    const svg = d3
      .select(node)
      .select('svg')
      .attr('width', width + 200)
      .attr('height', height)
      .append('g')
      .attr('class', 'group-container')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(this.props.colors);

    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.value);

    const path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 40);

    const pathTwo = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - 40);

    const arc = svg
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arc
      .append('path')
      .attr('d', path)
      .attr('fill', (d, i) => color(i))
      .attr('stroke-width', 2)
      .attr('stroke', 'white')
      .on('mouseover', d => {
        d3
          .select(d3.event.currentTarget)
          .transition()
          .style('cursor', 'pointer')
          .attr('d', pathTwo);

        d3
          .select(node)
          .select('.tooltip-pie')
          .style('display', 'inherit');

        d3
          .select(node)
          .select('.amount-pie')
          .text(`${d.data.value}${this.props.units}`);
        d3
          .select(node)
          .select('.item')
          .text(d.data.label);
      })
      .on('mouseout', () => {
        d3
          .select(node)
          .select('.tooltip-pie')
          .style('display', 'none');

        d3
          .select(d3.event.currentTarget)
          .transition()
          .attr('d', path);
      });

    const legend = svg
      .selectAll('.legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => {
        const h = legendRectSize + legendSpacing;
        const offset = h * color.domain().length / 2;
        const horz = radius * 1.5;
        const vert = i * h - offset;
        return `translate(${horz},${vert})`;
      });

    legend
      .append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', d => color(d.label))
      .style('stroke', d => color(d.label));

    legend
      .append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(d => d.label);
  };

  render() {
    return (
      <div className="outerDiv" style={{ color: 'black' }}>
        <h2
          className="bx--graph-header"
          style={this.props.title.length > 35 ? { fontSize: '20px' } : {}}>
          {this.props.title}
        </h2>
        <div
          className="graph-container"
          ref={node => (this.node = node)}
          style={{ display: 'inline-block', position: 'relative' }}>
          <svg ref={node => (this.svgNode = node)} />
          <div
            className="tooltip-pie"
            style={{
              position: 'absolute',
              top: '40%',
              left: '20%',
              '-webkit-transform': 'translate(-40%, -20%)',
              transform: 'translate(-40%, -20%)',
              display: '-webkit-box -ms-flexbox flex',
              WebkitBoxOrient: 'vertical',
              WebkitBoxBirection: 'normal',
              MsFlexDirection: 'column',
              flexDirection: 'column',
              WebkitBoxPack: 'center',
              MsFlexPack: 'center',
              justifyDontent: 'center',
              pointerEvents: 'none',
              width: '50%',
            }}>
            <p
              className="amount-pie"
              style={{
                fontSize: '29px',
                lineHeight: 1,
                fontWeight: 300,
                textAlign: 'center',
              }}
            />
            <p
              className="item"
              style={{
                fontWeight: 400,
                fontSize: '14px',
                color: '#5A6872',
                textAlign: 'center',
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
