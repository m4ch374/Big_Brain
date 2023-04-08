import Chart from 'chart.js/auto'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { ResultsContext } from '../QuizResultFinished'

const AverageTime: React.FC = () => {
  const results: any = useContext(ResultsContext)

  const [rate, setRate] = useState<number[]>([])

  const getLabels = useMemo(() => {
    if (results.length === 0) {
      return [0]
    }

    return [...Array(results[0].answers.length).keys()].map((i: number) => i + 1)
  }, [results])

  useEffect(() => {
    // To keep eslint happy
    console.log(Chart)

    if (results.length === 0) {
      return
    }

    const newRate = []
    for (let i = 0; i < results[0].answers.length; i++) {
      let numAnswered = 0
      const timeTaken = results.reduce((acc: number, curr: any) => {
        const timeDiff = new Date(curr.answers[i].answeredAt).getTime() - new Date(curr.answers[i].questionStartedAt).getTime()

        if (timeDiff !== 0) {
          numAnswered++
        }

        return acc + timeDiff / 1000
      }, 0)
      const avg = numAnswered ? timeTaken / numAnswered : 0
      newRate.push(avg)
    }

    setRate(newRate)
  }, [results])

  return (
    <Line
      datasetIdKey='id'
      data={{
        labels: getLabels,
        datasets: [{
          label: 'Time',
          data: rate,
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 2
        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            text: 'Per Question Time Taken (in sec)',
            display: true,
            font: {
              size: 16
            }
          },
          legend: {
            display: false
          }
        }
      }}
      className='bg-white p-2 rounded-md max-w-[600px]'
    />
  )
}

export default AverageTime
