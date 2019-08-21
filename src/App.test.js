import React from 'react'
import {
  render, wait, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  const tester = {
    username: 'tester',
    token: '1231231214',
    name: 'Teuvo Testaaja'
  }

  let user

  beforeAll(() => {
    return localStorage.clear()
  })

  describe('When no user logged in', () => {
    beforeEach(() => {
      user = localStorage
        .getItem('loggedinUser')
    })

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

      // component.debug()
      await waitForElement(
        () => component.container.querySelector('.login-form')
      )

      const form = component
        .container
        .querySelector('.login-form')

      expect(form).toBeDefined()
    })
  })

  describe('When a user is logged in', () => {
    beforeEach(() => {
      localStorage
        .setItem('loggedinUser', JSON.stringify(tester))
    })

    it('shows logged user and logout button', async () => {
      const loggedUserJSON = localStorage
        .getItem('loggedinUser')
      const user = JSON.parse(loggedUserJSON)

      expect(user.name).toBe('Teuvo Testaaja')

      const component = render(<App />)
      component.rerender(<App />)

      component.debug()
      await wait(
        () => component.container.querySelector('.btn-logout')
      )

      const button = component
        .container
        .querySelector('.btn-logout')

      expect(button).toBeDefined()

      await waitForElement(
        () => component.container.querySelector('.blog')
      )

      const blogs = component
        .container
        .querySelectorAll('.blog')
      expect(blogs.length).toBe(6)
    })

    it('renders all blogs', async () => {
      const loggedUserJSON = localStorage
        .getItem('loggedinUser')
      const user = JSON.parse(loggedUserJSON)

      expect(user.name).toBe('Teuvo Testaaja')

      const component = render(<App />)

      await waitForElement(
        () => component.container.querySelector('.blog'),
      )

      const blogs = component
        .container
        .querySelectorAll('.blog')
      expect(blogs.length).toBe(6)

    })
  })
})