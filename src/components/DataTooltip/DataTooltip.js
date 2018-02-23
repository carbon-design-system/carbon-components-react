import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const BxDataTooltip = styled.div`
  padding: 0;
  ${props =>
    props.large
      ? `
      width: -webkit-min-content;
      width: -moz-min-content;
      width: min-content;
      max-width: none;
    `
      : ''};
`;

const BxTooltipList = styled.ul`
  ${props =>
    props.double
      ? ''
      : `
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    `} -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-column-count: ${props => (props.double ? 2 : 1)};
  column-count: ${props => (props.double ? 2 : 1)};
  -webkit-column-gap: 1.25rem;
  column-gap: 1.25rem;
`;

const BxTooltipListItem = styled.li`
  padding: 0 0.625rem;
  min-height: ${props => props.minHeight};
  ${props => props.border} ${props =>
      props.multiple
        ? `
      margin: 0.5rem 1rem;
      min-height: 2rem;
      padding-left: 0.5rem;
      ${props.last ? `margin-bottom: 1rem;` : ''}
      ${props.left ? `margin-right: 0;` : ''}
      ${props.right ? `margin-left: 0;` : ''}
    `
        : ''} display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`;

const BxTooltipLILabel = styled.span`
  color: #5a6872;
  font-size: 12px;
  white-space: nowrap;
  display: inline-block;
`;

const BxTooltipLIData = styled.span`
  font-weight: 600;
  background-color: #ffffff;
  z-index: 2;
  display: inline-block;
`;

const BxTooltipLabel = styled.p`
  width: 100%;
  height: 32px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 14px;
  color: #5a6872;
  padding: 0 1rem;
  white-space: nowrap;
  border-bottom: 1px solid #dfe3e6;
`;

class DataTooltip extends Component {
  render() {
    const len = this.props.data.length;
    switch (this.props.size) {
      case 'medium':
        return (
          <BxDataTooltip
            className="bx--tooltip bx--tooltip--shown"
            data-floating-menu-direction="top">
            <ul className="bx--data-tooltip-list bx--data-tooltip-list--single">
              <BxTooltipListItem
                minHeight="2.625rem"
                border={`border-top: 4px solid ${this.props.color};`}>
                <BxTooltipLILabel>{this.props.label}</BxTooltipLILabel>
                <BxTooltipLIData>{this.props.value}</BxTooltipLIData>
              </BxTooltipListItem>
            </ul>
          </BxDataTooltip>
        );
      case 'large':
        return (
          <BxDataTooltip
            large
            className="bx--tooltip bx--tooltip--shown"
            data-floating-menu-direction="bottom"
            id="bx--data-tooltip">
            <BxTooltipLabel>{this.props.label}</BxTooltipLabel>
            <BxTooltipList double={len > 4} className="bx--data-tooltip-list">
              {this.props.data.map((d, i) => (
                <BxTooltipListItem
                  multiple
                  left={i + 1 <= Math.ceil(len / 2) && len > 4}
                  right={i + 1 > Math.ceil(len / 2) && len > 4}
                  last={
                    (i + 1 === Math.ceil(len / 2) && len > 4) || i + 1 === len
                  }
                  border={`border-left: 4px solid ${d.color};`}>
                  <BxTooltipLILabel>{d.label}</BxTooltipLILabel>
                  <BxTooltipLIData>{d.value}</BxTooltipLIData>
                </BxTooltipListItem>
              ))}
            </BxTooltipList>
          </BxDataTooltip>
        );
      default:
        return (
          <BxDataTooltip
            className="bx--tooltip bx--tooltip--shown"
            data-floating-menu-direction="top">
            <ul className="bx--data-tooltip-list">
              <BxTooltipListItem minHeight="1.625rem">
                <BxTooltipLIData>{this.props.value}</BxTooltipLIData>
              </BxTooltipListItem>
            </ul>
          </BxDataTooltip>
        );
    }
  }
}

DataTooltip.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
};

DataTooltip.defaultProps = {
  size: 'small',
  color: '#3b1a40',
  label: null,
  value: null,
  data: [],
};

export default DataTooltip;
