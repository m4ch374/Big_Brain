import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Plus from '../components/icons/Plus';
import QuestionCard from '../components/QuestionCard';
import { QUIZ } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import { fileToDataUrl } from '../utils/helpers';

const EditQuiz: React.FC = () => {
  const { quizId } = useParams()
  const [quizData, setQuizData]: any = useState()
  const [questions, setQuestions]: any = useState([])
  const [errMsg, setErrMsg] = useState('')

  const removeQuestion = useCallback((qId: string) => {
    const newQuestionSet = quizData?.questions.filter((q: any) => q.id !== qId)
    quizData.questions = newQuestionSet
    setQuizData(quizData)
    setQuestions(newQuestionSet)

    Fetcher.put(QUIZ(quizId as string))
      .withLocalStorageToken()
      .withJsonPayload({
        questions: newQuestionSet,
        name: quizData.name,
        thumbnail: quizData.thumbnail,
      })
      .fetchResult()
  }, [quizData])

  useEffect(() => {
    const result = Fetcher.get(QUIZ(quizId as string))
      .withLocalStorageToken()
      .fetchResult()

    result.then((data: any) => {
      setQuizData(data)
      setQuestions(data.questions)
    })
  }, [])

  const getQuestionId = useCallback(() => {
    if (questions.length === 0) {
      return 0
    }

    return Math.max(...questions.map((q: any) => parseInt(q.id))) + 1
  }, [quizData, questions])

  const submitForm = useCallback((e: any) => {
    e.preventDefault()

    try {
      fileToDataUrl(e.target.file?.files[0])
        .then((url) => {
          const result = Fetcher.put(QUIZ(quizId as string))
            .withLocalStorageToken()
            .withJsonPayload({
              questions: quizData.questions,
              name: e.target.name.value,
              thumbnail: url
            })
            .fetchResult()

          result.then((data: any) => {
            if (data.error) {
              setErrMsg(data.error)
            }
          })
        })
    } catch (e: any) {
      console.log(e)
      setErrMsg('Unsupported file type')
    }
  }, [])

  return (
    <div className='default-padding'>
      <h1 className='text-2xl font-bold'>Edit Game: {quizData?.name}</h1>

      <hr className='h-px my-2 bg-gray-500 border-0' />

      {errMsg !== '' && <h6 className='text-sm text-red-500'>{errMsg}</h6>}

      <form onSubmit={submitForm} className='text-xl flex flex-col gap-3'>
        <div>
          <label htmlFor='name' className='block mb-1'>Name: </label>
          {/* "no trailing whitespces allowed" so i cant break it up to be more readable lol */}
          <input type='text' id='name' name='name' placeholder={quizData?.name} className='border text-sm rounded-lg block w-full p-2.5 m-0 bg-[#2c2c2c] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' />
        </div>

        <div>
          <label htmlFor='file'>Thumbnail:</label>
          <input aria-describedby='file-input' id="file" name='file' type="file" className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-[#2c2c2c] border-gray-600 placeholder-gray-400 file:bg-[#3f3f3f] file:text-white file:border-0 file:border-r-[1px] file:border-gray-400 file:py-2" />
          <p className="mt-1 text-sm text-gray-300" id="file-input">PNG, JPG or JPEG</p>
        </div>

        <button type='submit' className='place-self-end mr-5 bg-blue-500 px-3 py-1 rounded-md text-md'>
          Edit
        </button>
      </form>

      <div className='flex justify-between mt-4'>
        <h2 className='text-xl font-bold mt-3'>Questions</h2>
        <Link to={`/question/${quizId}/${getQuestionId()}`} aria-label='Add question' className='place-self-center'>
          <Plus />
        </Link>
      </div>
      <hr className='h-px m-0 p-0 bg-gray-500 border-0' />

      <div className='flex flex-col justify-center mt-3 gap-5'>
        {questions.map((q: any) => {
          return <QuestionCard key={q.id} quesiton={q} removeQuestion={removeQuestion} />
        })}
      </div>
    </div>
  )
}

export default EditQuiz
