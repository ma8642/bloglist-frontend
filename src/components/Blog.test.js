import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import Blog from './Blog';

test('renders blog title and author by default but not url and likes', () => {
  const blog = {
    "id": "14310489",
    "user": "123456",
    "likes": 1005,
    "author": "Pansy Collins",
    "title": "abc",
    "url": "www.abc.com"
  }
  const userName = "Eureka Smith";
  const updateBlog = jest.fn();
  const removeBlog = jest.fn();

  const component = render(
    <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} userName={userName} />
  );

  // Title and Author should show by default
  const titleAndAuthorSelector = component.container.querySelector('.blog-title-author-div');
  expect(titleAndAuthorSelector).toHaveTextContent(
    'abc Pansy Collins'
  );
  
  // Url and Likes should not show by default
  const urlAndLikesSelector = component.container.querySelector('.blog-more-details-div');
  expect(urlAndLikesSelector).toEqual(null);
});