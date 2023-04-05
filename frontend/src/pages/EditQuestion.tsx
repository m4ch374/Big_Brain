import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnswerSection from '../components/answer_section/AnswerSection';
import { QUIZ } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import { fileToDataUrl } from '../utils/helpers';

// No types or interface cuz eslint is not happy
const EditQuestion: React.FC = () => {
  const { quizId, questionId } = useParams()
  const [quizData, setQuizData]: any = useState()
  const [questionData, setQuestionData]: any = useState()
  const [quizType, setQuizType] = useState('sc')
  const [embedType, setEmbedType] = useState('vid')
  const [answerOption, setAnswerOption] = useState([])
  const [errMsg, setErrMsg] = useState('')

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
      setQuestionData(qData)

      setAnswerOption(qData?.answer ? qData.answer : [])
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

    if (answerOption.length < 2 || answerOption.length > 6) {
      setErrMsg('Answer options should be between 2 and 6')
      return
    }

    const numAnswers = answerOption.filter((a: any) => a.isAns).length

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
      answer: answerOption,
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

    console.log(payload)

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
  }, [answerOption, quizType, embedType])

  return (
    <div className='default-padding'>
      <h1 className='text-2xl'>Edit or add new question</h1>

      <hr className='h-px my-2 bg-gray-500 border-0' />

      {errMsg !== '' && <h6 className='text-sm text-red-500'>{errMsg}</h6>}

      <form className='text-xl flex flex-col gap-3' onSubmit={formSubmit}>
        <div>
          <label htmlFor='question' className='block mb-1'>Question: </label>
          <input type='text' id='question' name='question' placeholder={questionData ? questionData.question.text : 'New question'} className='border text-sm rounded-lg block w-full p-2.5 m-0 bg-[#2c2c2c] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' />
        </div>

        <div>
          <label htmlFor='question-type' className='block mb-1'>Question Type: </label>
          <select id='question-type' defaultValue={quizType} onChange={(e: any) => setQuizType(e.target.value)} className='border text-sm rounded-lg block w-full p-2.5 bg-[#2c2c2c] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'>
            <option value={'sc'}>Single Choice</option>
            <option value={'mc'}>Multiple Choice</option>
          </select>
        </div>

        <div>
          <AnswerSection answerState={[answerOption, setAnswerOption]} />
        </div>

        <div>
          <label htmlFor='timeLimit' className='block mb-1'>Time Limit: (in seconds) </label>
          <input type='text' id='timeLimit' name='timeLimit' placeholder={questionData ? questionData.timeLimit : 'Time limit'} className='border text-sm rounded-lg block w-full p-2.5 m-0 bg-[#2c2c2c] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' />
        </div>

        <div>
          <label htmlFor='points' className='block mb-1'>Points: </label>
          <input type='text' id='points' name='points' placeholder={questionData ? questionData.points : 'Points'} className='border text-sm rounded-lg block w-full p-2.5 m-0 bg-[#2c2c2c] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' />
        </div>

        <div>
          <label htmlFor='embeds' className='block mb-1'>Embeds: </label>
          <select id='embed-type' defaultValue={embedType} onChange={(e: any) => setEmbedType(e.target.value)} className='border text-sm rounded-lg block w-full p-2.5 bg-[#2c2c2c] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-2'>
            <option value={'vid'}>Video</option>
            <option value={'img'}>Image</option>
          </select>
          <input type={embedType === 'vid' ? 'text' : 'file'} id='embeds' name='embeds' placeholder={questionData ? questionData.points : 'Embeds'} className={`block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-[#2c2c2c] border-gray-600 placeholder-gray-400 file:bg-[#3f3f3f] file:text-white file:border-0 file:border-r-[1px] file:border-gray-400 ${embedType === 'vid' ? 'py-2.5 pl-2' : 'file:py-2.5'}`} />
        </div>

        <button type='submit' className='mt-2 bg-blue-500 rounded-lg px-2 py-1'>
          Go
        </button>
      </form>
    </div>
  )
}

export default EditQuestion
