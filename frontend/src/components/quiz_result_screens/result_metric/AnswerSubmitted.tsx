import Chart from 'chart.js/auto'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { ResultsContext } from '../QuizResultFinished'

const AnswerSubmitted: React.FC = () => {
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

    const ans = []
    for (let i = 0; i < results[0].answers.length; i++) {
      const ansCount = results.filter((r: any) => r.answers[i].answeredAt).length
      ans.push(ansCount)
    }

    setRate(ans)
  }, [results])

  return (
    <Bar
      datasetIdKey='id'
      data={{
        labels: getLabels,
        datasets: [{
          label: 'Count',
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
            text: 'Per Question Answer Submitted',
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

export default AnswerSubmitted
