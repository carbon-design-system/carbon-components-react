import React from 'react';
import { OrderSummaryList, OrderSummaryListItem } from '../OrderSummary';
import { shallow } from 'enzyme';

describe('OrderSummary', () => {
  describe('Renders as expected', () => {
    const orderSummaryList = shallow(
      <OrderSummaryList className="some-class">
        <OrderSummaryListItem />
        <OrderSummaryListItem text="Detail 2" price="$20.00" />
        <OrderSummaryListItem text="Detail 3" price="$40.00" />
      </OrderSummaryList>
    );

    it('renders Order Summary List', () => {
      expect(orderSummaryList.length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(orderSummaryList.hasClass('bx--order-list')).toEqual(true);
      expect(orderSummaryList.hasClass('some-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(orderSummaryList.find(OrderSummaryListItem).length).toEqual(3);
    });
  });
});
