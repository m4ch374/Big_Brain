import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import AnswerSection from '../components/answer_section/AnswerSection';
import { useAnswerOption } from '../pages/EditQuestion';

const TestingComponent: React.FC = () => {
  const hook = useAnswerOption()

  return (
    <AnswerSection answerState={hook} />
  )
}

describe('Renders correctly on mount', () => {
  it('should only have a label and a button', () => {
    render(<TestingComponent />)

    const answerLabel = screen.getByText(/Answers/i)
    const button = screen.getByRole('button')

    expect(answerLabel).toBeInTheDocument()
    expect(button).toBeInTheDocument()

    expect(button).toHaveAccessibleName('add answer option')
  })
})

describe('Renders correctly when adding answer options', () => {
  it('Has an input section when clicking on the plus button', () => {
    render(<TestingComponent />)

    const addButton = screen.getByRole('button', { name: 'add answer option' })

    fireEvent.click(addButton)

    // Check if the input renders correctly
    const input = screen.getByLabelText('new answer input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('placeholder', 'New answer')

    // Check buttons renders correctly
    const cancelBtn = screen.getByLabelText('discard answer')
    const addAnsBtn = screen.getByLabelText('add answer')

    expect(cancelBtn).toBeInTheDocument()
    expect(addAnsBtn).toBeInTheDocument()

    expect(cancelBtn).toHaveAttribute('type', 'button')
    expect(addAnsBtn).toHaveAttribute('type', 'button')
  })

  it('Discards the input section when clicking on the cencel button', () => {
    render(<TestingComponent />)

    const addButton = screen.getByRole('button', { name: 'add answer option' })
    fireEvent.click(addButton)

    const input = screen.getByLabelText('new answer input')
    const cancelBtn = screen.getByLabelText('discard answer')
    const addAnsBtn = screen.getByLabelText('add answer')

    expect(input).toBeInTheDocument()
    expect(cancelBtn).toBeInTheDocument()
    expect(addAnsBtn).toBeInTheDocument()

    fireEvent.click(cancelBtn)

    expect(input).not.toBeInTheDocument()
    expect(cancelBtn).not.toBeInTheDocument()
    expect(addAnsBtn).not.toBeInTheDocument()
  })

  it('Input section disappears when clicking on the add button', () => {
    render(<TestingComponent />)

    const addButton = screen.getByRole('button', { name: 'add answer option' })
    fireEvent.click(addButton)

    const input = screen.getByLabelText('new answer input')
    const cancelBtn = screen.getByLabelText('discard answer')
    const addAnsBtn = screen.getByLabelText('add answer')

    expect(input).toBeInTheDocument()
    expect(cancelBtn).toBeInTheDocument()
    expect(addAnsBtn).toBeInTheDocument()

    // Adds answer
    fireEvent.change(input, { target: { value: 'Answer1' } })
    fireEvent.click(addAnsBtn)

    // Check the input is gone
    expect(input).not.toBeInTheDocument()
    expect(cancelBtn).not.toBeInTheDocument()
    expect(addAnsBtn).not.toBeInTheDocument()
  })

  it('Adds an answer option upon clicking on the add button', () => {
    render(<TestingComponent />)

    const addButton = screen.getByRole('button', { name: 'add answer option' })
    fireEvent.click(addButton)

    const input = screen.getByLabelText('new answer input')
    const cancelBtn = screen.getByLabelText('discard answer')
    const addAnsBtn = screen.getByLabelText('add answer')

    expect(input).toBeInTheDocument()
    expect(cancelBtn).toBeInTheDocument()
    expect(addAnsBtn).toBeInTheDocument()

    // Adds answer
    const ansValue = 'Answer1'
    fireEvent.change(input, { target: { value: ansValue } })
    fireEvent.click(addAnsBtn)

    // Check answer option renders correctly
    const answerCheckbox = screen.getByTestId('check-0')
    const answerLabel = screen.getByLabelText(ansValue)
    const deleteBtn = screen.getByRole('button', { name: 'discard-0' })

    expect(answerCheckbox).toBeInTheDocument()
    expect(answerLabel).toBeInTheDocument()
    expect(deleteBtn).toBeInTheDocument()
  })
})

describe('Renders correctly when removing answer options', () => {
  it('Removes answer option upon clicking on the discard button', () => {
    render(<TestingComponent />)

    const addButton = screen.getByRole('button', { name: 'add answer option' })
    fireEvent.click(addButton)

    const input = screen.getByLabelText('new answer input')
    const cancelBtn = screen.getByLabelText('discard answer')
    const addAnsBtn = screen.getByLabelText('add answer')

    expect(input).toBeInTheDocument()
    expect(cancelBtn).toBeInTheDocument()
    expect(addAnsBtn).toBeInTheDocument()

    // Adds answer
    const ansValue = 'Answer1'
    fireEvent.change(input, { target: { value: ansValue } })
    fireEvent.click(addAnsBtn)

    // Check answer option renders correctly
    const answerCheckbox = screen.getByTestId('check-0')
    const answerLabel = screen.getByLabelText(ansValue)
    const deleteBtn = screen.getByRole('button', { name: 'discard-0' })

    expect(answerCheckbox).toBeInTheDocument()
    expect(answerLabel).toBeInTheDocument()
    expect(deleteBtn).toBeInTheDocument()

    fireEvent.click(deleteBtn)

    expect(answerCheckbox).not.toBeInTheDocument()
    expect(answerLabel).not.toBeInTheDocument()
    expect(deleteBtn).not.toBeInTheDocument()
  })

  it('Only removes the answer option correspond to the button', () => {
    render(<TestingComponent />)

    const ansValues = ['Answer1', 'Answer2', 'Answer3']
    const addButton = screen.getByRole('button', { name: 'add answer option' })

    for (let i = 0; i < ansValues.length; i++) {
      fireEvent.click(addButton)

      const input = screen.getByLabelText('new answer input')
      const cancelBtn = screen.getByLabelText('discard answer')
      const addAnsBtn = screen.getByLabelText('add answer')

      expect(input).toBeInTheDocument()
      expect(cancelBtn).toBeInTheDocument()
      expect(addAnsBtn).toBeInTheDocument()

      // Adds answer
      fireEvent.change(input, { target: { value: ansValues[i] } })
      fireEvent.click(addAnsBtn)
    }

    // Check answer option renders correctly
    for (let i = 0; i < ansValues.length; i++) {
      const answerCheckbox = screen.getByTestId(`check-${i}`)
      const answerLabel = screen.getByLabelText(ansValues[i] as string)
      const deleteBtn = screen.getByRole('button', { name: `discard-${i}` })

      expect(answerCheckbox).toBeInTheDocument()
      expect(answerLabel).toBeInTheDocument()
      expect(deleteBtn).toBeInTheDocument()
    }

    const deletePriority = [2, 0, 1]
    const remainIdx = [...deletePriority]

    for (let i = 0; i < deletePriority.length; i++) {
      const delBtn = screen.getByRole('button', { name: `discard-${deletePriority[i]}` })
      fireEvent.click(delBtn as Element)

      // Check answer option deleted
      expect(screen.queryByTestId(`check-${deletePriority[i]}`)).toBeNull()
      expect(screen.queryByLabelText(ansValues[deletePriority[i] as number] as string)).toBeNull()
      expect(screen.queryByRole('button', { name: `discard-${deletePriority[i]}` })).toBeNull()
      remainIdx.splice(remainIdx.indexOf(deletePriority[i] as number))

      // Check other option still remains
      for (let i = 0; i < remainIdx.length; i++) {
        const remainCheckbox = screen.getByTestId(`check-${remainIdx[i]}`)
        const remainLabel = screen.getAllByLabelText(ansValues[remainIdx[i] as number] as string)
        const remainDelBtn = screen.getByRole('button', { name: `discard-${remainIdx[i]}` })

        expect(remainCheckbox).toBeInTheDocument()
        expect(remainLabel).toBeInTheDocument()
        expect(remainDelBtn).toBeInTheDocument()
      }
    }
  })
})

describe('Generates the right index', () => {
  it('Generates index in ascending order', () => {
    render(<TestingComponent />)
    const addButton = screen.getByRole('button', { name: 'add answer option' })

    const numIdx = 30
    for (let i = 0; i < numIdx; i++) {
      fireEvent.click(addButton)

      const input = screen.getByLabelText('new answer input')
      const cancelBtn = screen.getByLabelText('discard answer')
      const addAnsBtn = screen.getByLabelText('add answer')

      expect(input).toBeInTheDocument()
      expect(cancelBtn).toBeInTheDocument()
      expect(addAnsBtn).toBeInTheDocument()

      // Adds answer
      fireEvent.change(input, { target: { value: 'hi' } })
      fireEvent.click(addAnsBtn)
    }

    for (let i = 0; i < numIdx; i++) {
      const checkbox = screen.getByTestId(`check-${i}`)
      expect(checkbox).toBeInTheDocument()
    }
  })

  it('Generates index based on the most recent one added', () => {
    render(<TestingComponent />)
    const addButton = screen.getByRole('button', { name: 'add answer option' })

    // Add answer 0 - 29
    const numIdx = 30
    for (let i = 0; i < numIdx; i++) {
      fireEvent.click(addButton)

      const input = screen.getByLabelText('new answer input')
      const cancelBtn = screen.getByLabelText('discard answer')
      const addAnsBtn = screen.getByLabelText('add answer')

      expect(input).toBeInTheDocument()
      expect(cancelBtn).toBeInTheDocument()
      expect(addAnsBtn).toBeInTheDocument()

      // Adds answer
      fireEvent.change(input, { target: { value: 'hi' } })
      fireEvent.click(addAnsBtn)
    }

    // Delete answer 0 - 14
    const numDelete = 15
    for (let i = 0; i < numDelete; i++) {
      const checkbox = screen.getByTestId(`check-${i}`)
      expect(checkbox).toBeInTheDocument()

      const deleteBtn = screen.getByRole('button', { name: `discard-${i}` })
      fireEvent.click(deleteBtn)

      expect(screen.queryByTestId(`check-${i}`)).toBeNull()
    }

    // Add another answer option, id should be 30
    fireEvent.click(addButton)
    const input = screen.getByLabelText('new answer input')
    const addAnsBtn = screen.getByLabelText('add answer')

    fireEvent.change(input, { target: { value: 'hi' } })
    fireEvent.click(addAnsBtn)

    expect(screen.getByTestId(`check-${numIdx}`)).toBeInTheDocument()
  })
})
