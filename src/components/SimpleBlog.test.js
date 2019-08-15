import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders title, author and likes', () => {
  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    likes: 5
  }

  const { getByTestId } = render(
    <SimpleBlog
      blog={blog}
    />
  )

  //getByTestId.debug()
  expect(getByTestId('blog')
    .textContent)
    .toBe('First class tests Robert C. Martin')

  expect(getByTestId('blogLikes')
    .textContent)
    .toBe('blog has 5 likeslike')
})
