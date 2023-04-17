import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { ResultsContext } from '../QuizResultFinished'

const CorrectRate: React.FC = () => {
  const results = useContext(ResultsContext)

  const [rate, setRate] = useState<number[]>([])

  const getLabels = useMemo(() => {
    if (results.length === 0) {
      return [0]
    }

    // I had a one-line solution that somehow eslint is unhappy with
    // [...Array(results[0].answers.length).keys()].map((i: number) => i + 1)

    const res = []

    // Again, i have tried checking if it is undefined, the error still presist
    // eslint-disable-next-line
    for (let i = 0; i < results[0]!.answers.length; i++) {
      res.push(i + 1)
    }

    return res
  }, [results])

  useEffect(() => {
    // To keep eslint happy
    console.log(Chart)

    if (results.length === 0) {
      return
    }

    const newRate = []

    // eslint-disable-next-line
    for (let i = 0; i < results[0]!.answers.length; i++) {
      // eslint-disable-next-line
      const avg = results.filter(r => r.answers[i]!.correct).length / results.length
      newRate.push(avg * 100)
    }

    setRate(newRate)
  }, [results])

  return (
    <Bar
      datasetIdKey='id'
      data={{
        labels: getLabels,
        datasets: [{
          label: 'Percentage',
          data: rate,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            text: 'Per Question Correct Percentage',
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

export default CorrectRate
