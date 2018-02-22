import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as d3 from 'd3';

class Gauge extends Component {
  componentDidMount() {
    this.createGauge();
  }

  componentDidUpdate() {
    this.createGauge();
  }

  createGauge = () => {
    const { node } = this;
    const tau = 2 * Math.PI;
    const {
      amount,
      total,
      radius,
      padding,
      amountUnits,
      totalUnits,
      color,
    } = this.props;
    const boxSize = (radius + padding) * 2;
    const ratio = amount / total;

    const arc = d3
      .arc()
      .innerRadius(radius)
      .outerRadius(radius - 15)
      .startAngle(0);

    const svg = d3
      .select(node)
      .select('svg')
      .attr('width', boxSize)
      .attr('height', boxSize);

    const g = svg
      .append('g')
      .attr('transform', `translate(${boxSize / 2}, ${boxSize / 2})`);

    // Background Arc
    g
      .append('path')
      .datum({ endAngle: tau })
      .style('fill', '#dfe3e6')
      .attr('d', arc);

    // Foreground Arc
    g
      .append('path')
      .datum({ endAngle: 0 })
      .style('fill', color)
      .transition()
      .duration(1000)
      .delay(1000)
      .attrTween('d', arcTween(ratio * tau));

    // Text Labels
    const amountText = d3.select(node).select('.amount');
    const totalText = d3.select(node).select('.total');
    amountText
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay(1500)
      .style('opacity', 1)
      .text(`${amount} ${amountUnits}`);

    totalText
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay(1700)
      .style('opacity', 1)
      .text(`/${total} ${totalUnits || amountUnits}`);

    // Animation function
    function arcTween(newAngle) {
      return d => {
        const interpolate = d3.interpolate(d.endAngle, newAngle);
        return t => {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      };
    }
  };

  render() {
    const { radius, padding } = this.props;
    return (
      <div className="outerDiv" style={{ color: 'black' }}>
        {this.props.title ? (
          <h2 className="bx--graph-header">{this.props.title}</h2>
        ) : null}
        <div
          className="graph-container"
          ref={node => (this.node = node)}
          style={{
            width: `${(radius + padding) * 2}px`,
            position: 'relative',
          }}>
          <svg />
          <div
            className="text"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'right',
            }}>
            <p
              className="amount"
              style={{
                fontSize: this.props.amountFontSize,
                opacity: 0,
                fontWeight: 300,
                margin: 0,
              }}
            />
            <p
              className="total"
              style={{
                fontSize: this.props.totalFontSize,
                opacity: 0,
                margin: 0,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

Gauge.propTypes = {
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  title: PropTypes.string,
  radius: PropTypes.number,
  padding: PropTypes.number,
  /**
   * amountUnits is the units that will be displayed next to amount. If null, no units displayed.
   */
  amountUnits: PropTypes.string,
  /**
   * totalUnits is the units that will be displayed next to total. If null, amountUnits will also be displayed next to total.
   */
  totalUnits: PropTypes.string,
  color: PropTypes.string,
  amountFontSize: PropTypes.string,
  totalFontSize: PropTypes.string,
};

Gauge.defaultProps = {
  title: null,
  radius: 100,
  padding: 30,
  amountUnits: '',
  totalUnits: null,
  color: '#00a68f',
  amountFontSize: '30px',
  totalFontSize: '14px',
};

export default Gauge;
