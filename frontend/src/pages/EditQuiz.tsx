import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Plus from '../components/icons/Plus';
import FileInputSection from '../components/inputs/FileInputSection';
import InputSection from '../components/inputs/InputSection';
import QuestionCard from '../components/QuestionCard';
import { QUIZ } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import { fileToDataUrl } from '../utils/helpers';
import { IResQuiz, TQuestion } from '../types';

const EditQuiz: React.FC = () => {
  const { quizId } = useParams()
  const [quizData, setQuizData] = useState<IResQuiz>()
  const [questionsData, setQuestionsData] = useState<TQuestion[]>([])
  const [errMsg, setErrMsg] = useState('')

  const removeQuestion = useCallback((qId: number) => {
    if (!quizData) {
      return
    }

    const newQuestionSet = quizData.questions
      ? quizData.questions.filter((q: TQuestion) => q.id !== qId)
      : []

    quizData.questions = newQuestionSet
    setQuizData(quizData)
    setQuestionsData(newQuestionSet)

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
      .fetchResult() as Promise<IResQuiz>

    result.then((data) => {
      setQuizData(data)
      setQuestionsData(data.questions as TQuestion[])
    })
  }, [])

  const getQuestionId = useCallback(() => {
    if (questionsData.length === 0) {
      return 0
    }

    return Math.max(...questionsData.map(q => q.id)) + 1
  }, [quizData, questionsData])

  const submitForm: React.FormEventHandler<HTMLFormElement> = useCallback(e => {
    e.preventDefault()

    try {
      const quizName = e.currentTarget.quizName.value
      fileToDataUrl(e.currentTarget.file?.files[0])
        .then((url) => {
          const result = Fetcher.put(QUIZ(quizId as string))
            .withLocalStorageToken()
            .withJsonPayload({
              questions: questionsData,
              name: quizName,
              thumbnail: url
            })
            .fetchResult() as Promise<IResQuiz>

          result.then(data => {
            if (data.error) {
              setErrMsg(data.error)
            }

            setErrMsg('')
          })
        })
    } catch (e) {
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
          <label htmlFor='quizName' className='block mb-1'>Name: </label>
          <InputSection type='text' identifier='quizName' placeholder={quizData?.name as string} />
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
        {questionsData.map(q => {
          return <QuestionCard key={q.id} quesiton={q} removeQuestion={removeQuestion} />
        })}
      </div>
    </div>
  )
}

export default EditQuiz
