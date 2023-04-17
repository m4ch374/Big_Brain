import React, { useEffect, useState } from 'react'
import YouTubePlayer from 'react-player/youtube'

const useChangeVideoDimension = () => {
  const getInnerWidth = () => window.innerWidth * 0.9

  const getInnerHeight = (innerWidth: number) => {
    return innerWidth * 9 / 16
  }

  const defaultWidth = getInnerWidth()
  const [dimensions, setDimensions] = useState([defaultWidth, getInnerHeight(defaultWidth)])

  useEffect(() => {
    const width = getInnerWidth()
    setDimensions([width, getInnerHeight(width)])
  }, [window.innerWidth])

  return dimensions
}

const YoutubeVideoPlayer: React.FC<{ data: string }> = ({ data }) => {
  const [width, height] = useChangeVideoDimension()

  return (
    <YouTubePlayer url={data} className='aspect-video' width={width as number} height={height as number} />
  )
}

export default YoutubeVideoPlayer
