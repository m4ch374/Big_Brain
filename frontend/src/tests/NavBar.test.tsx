import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import NavBar from '../components/NavBar'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'

export const checkNavRender = () => {
  const homeLink = screen.getByRole('link')
  const logoutBtn = screen.getByRole('button')

  // Rendered corerctly
  expect(homeLink).toBeInTheDocument()
  expect(logoutBtn).toBeInTheDocument()

  // Have the correct attribute
  expect(homeLink).toHaveAccessibleName('To dashboard')
  expect(homeLink).toHaveTextContent('Big brain')
  expect(logoutBtn).toHaveTextContent('Logout')
}

describe('Navbar renders correct elements', () => {
  it('Renders the correct components', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )

    checkNavRender()
  })
})

describe('Navbar navigates user', () => {
  it('navigates to home if clicked on the home link', () => {
    render(
      <MemoryRouter initialEntries={['/navbar']}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/navbar' element={<NavBar />} />
        </Routes>
      </MemoryRouter>
    )

    const homeLink = screen.getByRole('link', { name: 'To dashboard' })
    expect(homeLink).toBeInTheDocument()

    fireEvent.click(homeLink)

    expect(homeLink).not.toBeInTheDocument()
  })

  it('navigates to login page when logout was clicked', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<NavBar />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </MemoryRouter>
    )

    const logoutBtn = screen.getByRole('button', { name: /Logout/i })
    expect(logoutBtn).toBeInTheDocument()

    fireEvent.click(logoutBtn)

    expect(logoutBtn).not.toBeInTheDocument()
  })
})
