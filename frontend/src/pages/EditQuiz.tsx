import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Plus from '../components/icons/Plus';
import FileInputSection from '../components/inputs/FileInputSection';
import InputSection from '../components/inputs/InputSection';
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
    const newQuestionSet = quizData ? quizData.questions.filter((q: any) => q.id !== qId) : []
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
              questions: questions,
              name: e.target.name.value,
              thumbnail: url
            })
            .fetchResult()

          result.then((data: any) => {
            if (data.error) {
              setErrMsg(data.error)
            }

            setErrMsg('')
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
          <InputSection type='text' identifier='name' placeholder={quizData?.name} />
        </div>

        <div>
          <label htmlFor='file'>Thumbnail:</label>
          <FileInputSection identifier='file' />
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
