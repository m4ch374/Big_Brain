import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Delete from './icons/Delete';
import Edit from './icons/Edit';
import { TQuestion } from '../types';

type TQuestionCard = {
  quesiton: TQuestion,
  removeQuestion: (a: number) => void
}

const QuestionCard: React.FC<TQuestionCard> = ({ quesiton, removeQuestion }) => {
  const { quizId } = useParams()

  return (
    <div className='px-4 py-2 bg-white rounded-lg text-gray-900 flex justify-between w-full max-w-[1000px]'>
      <h1>Question: {quesiton.question.text}</h1>
      <div className='flex gap-2'>
        <Link aria-label='edit question' to={`/question/${quizId}/${quesiton.id}`}>
          <Edit />
        </Link>

        <button aria-label='remove question' onClick={() => removeQuestion(quesiton.id)} className='text-red-500'>
          <Delete />
        </button>
      </div>
    </div>
  )
}

export default QuestionCard
