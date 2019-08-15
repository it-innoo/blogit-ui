import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
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
    let component = render(
      <Blog blog={blog} onClick={mockHandler} />
    )

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const div = component.container.querySelector('.blog')
    expect(div).toBeDefined()

    fireEvent.click(div)

    const element = component
      .container
      .querySelector('.blogDetails')

    expect(element).toBeDefined()
    expect(element).toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
    )

  })
})