import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show..." className="testButton">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  it('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  it('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  it('toggled content can be closed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const closeButton = component.getByText('Peru')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})