import React from 'react'
import {
  render, wait, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  let user

  beforeEach(() => {
    user = localStorage
      .getItem('loggedinUser')
  })

  describe('When no user logged in', () => {
    it('blogs are not rendered', async () => {
      expect(user).toBeNull()

      const component = render(<App />)
      component.rerender(<App />)

      await waitForElement(
        () => component.container.querySelectorAll('.blog')
      )

      const blogs = component
        .container
        .querySelectorAll('.blog')
      expect(blogs.length).toBe(0)
    })

    it('shows login form', async () => {
      expect(user).toBeNull()

      const component = render(<App />)
      component.rerender(<App />)

      component.debug()
      await waitForElement(
        () => component.container.querySelector('.login-form')
      )

      const form = component
        .container
        .querySelector('.login-form')

      expect(form).toBeDefined()
    })
  })
})