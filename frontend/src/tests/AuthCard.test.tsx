// Wacky and hacky code towards the end

import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import AuthCard from '../components/AuthCard'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { checkNavRender } from './NavBar.test'

const TestingComponent: React.FC<{ initialEntry?: string }> = ({ initialEntry = '/' }) => {
  return (
    <MemoryRouter initialEntries={[initialEntry]} >
      <Routes>
        <Route path='/' element={<NavBar />} />
        <Route path='/login' element={<AuthCard isLogin={true} />} />
        <Route path='/register' element={<AuthCard isLogin={false} />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Components renders correctly', () => {
  const checkLoginRender = () => {
    const title = screen.getByText('Login')
    expect(title).toBeInTheDocument()

    const emailLabel = screen.getByText(/Email:/i)
    expect(emailLabel).toBeInTheDocument()

    const emailInput = screen.getByLabelText('email-input')
    expect(emailInput).toBeInTheDocument()

    const passwordLabel = screen.getByText(/Password:/i)
    expect(passwordLabel).toBeInTheDocument()

    const passwordInput = screen.getByLabelText('password-input')
    expect(passwordInput).toBeInTheDocument()

    const changeModeBtn = screen.getByRole('link', { name: 'change-mode' })
    expect(changeModeBtn).toBeInTheDocument()

    const goBtn = screen.getByRole('button', { name: 'Go' })
    expect(goBtn).toBeInTheDocument()
  }

  const checkRegisterRender = () => {
    const title = screen.getByText('Register')
    expect(title).toBeInTheDocument()

    const emailLabel = screen.getByText(/Email:/i)
    expect(emailLabel).toBeInTheDocument()

    const emailInput = screen.getByLabelText('email-input')
    expect(emailInput).toBeInTheDocument()

    const passwordLabel = screen.getByText(/Password:/i)
    expect(passwordLabel).toBeInTheDocument()

    const passwordInput = screen.getByLabelText('password-input')
    expect(passwordInput).toBeInTheDocument()

    const usernameLabel = screen.getByText(/Name:/i)
    expect(usernameLabel).toBeInTheDocument()

    const usernameInput = screen.getByLabelText('username-input')
    expect(usernameInput).toBeInTheDocument()

    const changeModeBtn = screen.getByRole('link', { name: 'change-mode' })
    expect(changeModeBtn).toBeInTheDocument()

    const goBtn = screen.getByRole('button', { name: 'Go' })
    expect(goBtn).toBeInTheDocument()
  }

  it('Renders correctly in login mode', () => {
    render(<TestingComponent initialEntry='/login' />)

    checkLoginRender()
  })

  it('Renders correctly in register mode', () => {
    render(<TestingComponent initialEntry='/register' />)

    checkRegisterRender()
  })

  it('Renders correctly when changing mode', () => {
    render(<TestingComponent initialEntry='/login' />)

    checkLoginRender()

    const changeMode = screen.getByRole('link', { name: 'change-mode' })

    // From login to register
    fireEvent.click(changeMode)

    checkRegisterRender()

    // From register to login
    fireEvent.click(changeMode)

    checkLoginRender()
  })
})

const credential = 'hi@hi.com'

describe('Able to do basic auth functions', () => {
  it('Could register and redirect users', async () => {
    render(<TestingComponent initialEntry='/register' />)

    const emailInput = screen.getByLabelText('email-input')
    const passwordInput = screen.getByLabelText('password-input')
    const userInput = screen.getByLabelText('username-input')

    fireEvent.change(emailInput, { target: { value: credential } })
    fireEvent.change(passwordInput, { target: { value: credential } })
    fireEvent.change(userInput, { target: { value: credential } })

    const goBtn = screen.getByRole('button', { name: 'Go' })
    await act(async () => {
      fireEvent.click(goBtn)
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    checkNavRender()
  })

  it('Could login and redirect users', async () => {
    render(<TestingComponent initialEntry='/login' />)

    const emailInput = screen.getByLabelText('email-input')
    const passwordInput = screen.getByLabelText('password-input')

    fireEvent.change(emailInput, { target: { value: credential } })
    fireEvent.change(passwordInput, { target: { value: credential } })

    const goBtn = screen.getByRole('button', { name: 'Go' })
    await act(async () => {
      fireEvent.click(goBtn)
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    checkNavRender()
  })
})

describe('Handles erros', () => {
  it('Outputs errors when login to an unregistered account', async () => {
    render(<TestingComponent initialEntry='/login' />)

    const emailInput = screen.getByLabelText('email-input')
    const passwordInput = screen.getByLabelText('password-input')

    const credential = 'aaaaa'
    fireEvent.change(emailInput, { target: { value: credential } })
    fireEvent.change(passwordInput, { target: { value: credential } })

    const goBtn = screen.getByRole('button', { name: 'Go' })

    await act(async () => {
      fireEvent.click(goBtn)
      await new Promise(resolve => setTimeout(resolve, 100))
      const errOutput = screen.getByTestId('error-msg')
      expect(errOutput).toBeInTheDocument()
    })
  })

  it('Outputs errors when registering a registered account', async () => {
    render(<TestingComponent initialEntry='/register' />)

    const emailInput = screen.getByLabelText('email-input')
    const passwordInput = screen.getByLabelText('password-input')
    const userInput = screen.getByLabelText('username-input')

    fireEvent.change(emailInput, { target: { value: credential } })
    fireEvent.change(passwordInput, { target: { value: credential } })
    fireEvent.change(userInput, { target: { value: credential } })

    const goBtn = screen.getByRole('button', { name: 'Go' })
    await act(async () => {
      fireEvent.click(goBtn)
      await new Promise(resolve => setTimeout(resolve, 100))
      const errOutput = screen.getByTestId('error-msg')
      expect(errOutput).toBeInTheDocument()
    })
  })
})
