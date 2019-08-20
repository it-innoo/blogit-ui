import React from 'react'
import {
  render,
  fireEvent,
  wait,
  waitForElement,
} from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {

  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 5,
    user: [
      { name: 'Arto Hellas' }
    ]
  }

  it('renders title and author by default', async () => {
    const component = render(<Blog blog={blog} />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'First class tests Robert C. Martin'
    )
    expect(div).not.toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
    )
  })

  it('renders all info by clicking', async () => {
    const mockHandler = jest.fn()

    const { getByText } = render(
      <Blog blog={blog} onClick={mockHandler} />
    )

    const clickable = getByText('First class tests Robert C. Martin')
    expect(clickable).toBeDefined()

    console.log(prettyDOM(clickable))

    fireEvent.click(clickable)

    console.log(mockHandler.mock)

    // expect(mockHandler.mock.calls.length).toBe(1)
  })
})