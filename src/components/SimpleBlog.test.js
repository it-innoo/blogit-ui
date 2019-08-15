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

it(
  'clicking like like button twice calls event handler twice',
  async () => {

    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 0
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
