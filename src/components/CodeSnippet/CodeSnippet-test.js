import React from 'react';
import CodeSnippet from '../CodeSnippet';
import CodeSnippetSkeleton from '../CodeSnippet/CodeSnippet.Skeleton';
import { mount, shallow } from 'enzyme';

describe('Code Snippet', () => {
  describe('Renders as expected', () => {
    const snippet = shallow(
      <CodeSnippet className="some-class" type="single">
        {'node -v'}
      </CodeSnippet>
    );

    it('should use the appropriate snippet class', () => {
      expect(snippet.hasClass('bx--snippet')).toEqual(true);
      expect(snippet.hasClass('bx--snippet--single')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(snippet.find('.bx--snippet-container').length).toBe(1);
    });

    it('should all for custom classes to be applied', () => {
      expect(snippet.hasClass('some-class')).toEqual(true);
    });
  });

  it('should expose a `ref` to the content through `wrappedContentRef`', () => {
    let mockRef;
    const wrappedContentRef = jest.fn(el => (mockRef = el));
    const content = 'node -v';
    mount(
      <CodeSnippet type="single" wrappedContentRef={wrappedContentRef}>
        {content}
      </CodeSnippet>
    );
    expect(mockRef.textContent).toBe(content);
    expect(wrappedContentRef).toHaveBeenCalledTimes(1);
  });
});

describe('CodeSnippetSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<CodeSnippetSkeleton type="single" />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton')).toEqual(true);
      expect(wrapper.hasClass('bx--snippet')).toEqual(true);
      expect(wrapper.hasClass('bx--snippet--single')).toEqual(true);
    });
  });
});
