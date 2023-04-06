import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnswerSection from '../components/answer_section/AnswerSection';
import FileInputSection from '../components/inputs/FileInputSection';
import InputSection from '../components/inputs/InputSection';
import { QUIZ } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import { fileToDataUrl } from '../utils/helpers';

const useAnswerOption = () => {
  const [answerOption, setAnswerOption]: any = useState([])

  const getNewAnswerId = useMemo(() => {
    if (answerOption.length === 0) {
      return 0
    }

    const res = Math.max(...answerOption.map((ans: any) => parseInt(ans.id)))
    return res + 1
  }, [answerOption])

  const appendAnswer = useCallback((ans: any) => {
    setAnswerOption([{ id: getNewAnswerId, text: ans, isAns: false }, ...answerOption])
  }, [answerOption])

  const removeAnswer = useCallback((ans: any) => {
    setAnswerOption(answerOption.filter((a: any) => a.id !== ans))
  }, [answerOption])

  const setAnswer = useCallback((ans: any, isCorrect: any) => {
    const idx = answerOption.findIndex((a: any) => a.id === ans)
    answerOption[idx].isAns = isCorrect
    setAnswerOption(answerOption)
  }, [answerOption])

  return { answerOption, setAnswerOption, appendAnswer, removeAnswer, setAnswer }
}

// No types or interface cuz eslint is not happy
const EditQuestion: React.FC = () => {
  const { quizId, questionId } = useParams()
  const [quizData, setQuizData]: any = useState()
  const [quizType, setQuizType] = useState('sc')
  const [embedType, setEmbedType] = useState('vid')
  const [errMsg, setErrMsg] = useState('')

  const answer = useAnswerOption()

  const navigate = useNavigate()

  useEffect(() => {
    const result = Fetcher.get(QUIZ(quizId as string))
      .withLocalStorageToken()
      .fetchResult()

    result.then((data: any) => {
      if (data.error) {
        return
      }

      setQuizData(data)

      const qData = data.questions.find((q: any) => q.id === questionId)
      answer.setAnswerOption(qData?.answer ? qData.answer : [])
    })
  }, [])

  const isPositiveInteger = (intStr: string) => {
    if (!parseInt(intStr)) {
      return false
    }

    const num = Number(intStr)
    const isInt = Number.isInteger(num)
    const isPos = num > 0

    return isInt && isPos
  }

  const formSubmit = useCallback(async (e: any) => {
    e.preventDefault()

    // Sanity checks
    if (e.target.question.value === '') {
      setErrMsg('Enter question')
      return
    }

    if (answer.answerOption.length < 2 || answer.answerOption.length > 6) {
      setErrMsg('Answer options should be between 2 and 6')
      return
    }

    const numAnswers = answer.answerOption.filter((a: any) => a.isAns).length

    if (numAnswers === 0) {
      setErrMsg('There must be at least 1 correct answer')
      return
    }

    if (quizType === 'sc' && numAnswers !== 1) {
      setErrMsg('Single choice questions could only have one answer')
      return
    }

    if (!isPositiveInteger(e.target.timeLimit.value)) {
      setErrMsg('Time must be a positive integer')
      return
    }

    if (!parseInt(e.target.points.value)) {
      setErrMsg('Points must be a positive integer')
      return
    }

    if ((embedType === 'vid' && e.target.embeds.value === '') || (embedType === 'img' && !e.target.files)) {
      setErrMsg('Embeds must not be empty')
    }

    if (!quizData) {
      setErrMsg('Something went wrong')
      return
    }

    setErrMsg('')

    // Construct payload
    const question = {
      id: questionId as string,
      question: {
        type: quizType,
        text: e.target.question.value,
      },
      answer: answer.answerOption,
      timeLimit: e.target.timeLimit.value,
      points: e.target.points.value,
      embeds: {
        type: embedType,
        data: embedType === 'img' ? await fileToDataUrl(e.target.embeds.files[0]) : e.target.embeds.value,
      }
    }

    const idx = quizData.questions.findIndex((q: any) => q.id === question.id?.toString())
    if (idx !== -1) {
      quizData.questions[idx] = question
    } else {
      quizData.questions.push(question)
    }

    const payload = {
      questions: quizData.questions,
      name: quizData.name,
      thumbnail: quizData.thumbnail,
    }

    const result = Fetcher.put(QUIZ(quizId as string))
      .withLocalStorageToken()
      .withJsonPayload(payload)
      .fetchResult()

    result.then((data: any) => {
      if (data.error) {
        setErrMsg(data.error)
        return
      }

      navigate(`/quiz/${quizId}`)
    })
  }, [answer.answerOption, quizType, embedType])

  return (
    <div className='default-padding'>
      <h1 className='text-2xl'>Edit or add new question</h1>

      <hr className='h-px my-2 bg-gray-500 border-0' />

      {errMsg !== '' && <h6 className='text-sm text-red-500'>{errMsg}</h6>}

      <form className='text-xl flex flex-col gap-3' onSubmit={formSubmit}>
        <div>
          <label htmlFor='question' className='block mb-1'>Question: </label>
          <InputSection type='text' identifier='question' placeholder='New question' />
        </div>

        <div>
          <label htmlFor='question-type' className='block mb-1'>Question Type: </label>
          <select id='question-type' defaultValue={quizType} onChange={(e: any) => setQuizType(e.target.value)} className='border text-sm rounded-lg block w-full p-2.5 bg-[#2c2c2c] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'>
            <option value={'sc'}>Single Choice</option>
            <option value={'mc'}>Multiple Choice</option>
          </select>
        </div>

        <div>
          <AnswerSection answerState={answer} />
        </div>

        <div>
          <label htmlFor='timeLimit' className='block mb-1'>Time Limit: (in seconds) </label>
          <InputSection type='text' identifier='timeLimit' placeholder='Time limit' />
        </div>

        <div>
          <label htmlFor='points' className='block mb-1'>Points: </label>
          <InputSection type='text' identifier='points' placeholder='Points' />
        </div>

        <div>
          <label htmlFor='embeds' className='block mb-1'>Embeds: </label>
          <select id='embed-type' defaultValue={embedType} onChange={(e: any) => setEmbedType(e.target.value)} className='border text-sm rounded-lg block w-full p-2.5 bg-[#2c2c2c] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-2'>
            <option value={'vid'}>Video</option>
            <option value={'img'}>Image</option>
          </select>
          {embedType === 'vid' ? <InputSection type='text' identifier='embeds' placeholder='embeds' /> : <FileInputSection identifier='embeds' />}
        </div>

        <button type='submit' className='mt-2 bg-blue-500 rounded-lg px-2 py-1'>
          Go
        </button>
      </form>
    </div>
  )
}

export default EditQuestion
