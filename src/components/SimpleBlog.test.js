import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title, author and likes', () => {
  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    likes: 5
  }

  const component = render(
    <SimpleBlog
      blog={blog}
    />
  )

  // component.debug()
  expect(component.container).toHaveTextContent(
    'First class tests'
  )
  expect(component.container).toHaveTextContent(
    'Robert C. Martin'
  )
  expect(component.container).toHaveTextContent(
    '5'
  )
})