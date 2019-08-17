import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


describe('<Blog />', () => {
  test('renders only title and author', () => {

    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 5,
      user:
        { name: 'Arto Hellas' }
    }

    const component = render(
      <Blog blog={blog} />
    )

    const div = component.container.querySelector('.blog')
    // console.log(prettyDOM(div))

    expect(div).toHaveTextContent(
      'First class tests Robert C. Martin'
    )

    expect(div).not.toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
    )

    expect(div).not.toHaveTextContent(
      `Added by ${blog.user.name}`
    )
  })

  test('renders all its children', async () => {
    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 5,
      user:
        { name: 'Arto Hellas' }
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <Blog blog={blog} onClick={mockHandler} />
    )

    const clickable = getByText('First class tests Robert C. Martin')
    expect(clickable).toBeDefined()

    console.log(prettyDOM(clickable))

    fireEvent.click(clickable)

    console.log(mockHandler.mock)
    /*
   expect(mockHandler.mock.calls.length).toBe(1)
   */
  })
})