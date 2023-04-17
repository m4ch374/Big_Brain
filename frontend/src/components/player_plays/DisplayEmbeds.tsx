import React from 'react'
import YoutubeVideoPlayer from './YoutubeVdoPlayer'

const DisplayEmbeds: React.FC<{ embeds: any }> = ({ embeds }) => {
  return (
    <div className='flex justify-center bg-slate-700'>
      {embeds.type === 'vid'
        ? <YoutubeVideoPlayer data={embeds.data} />
        : <img src={embeds.data} className='w-[90%] aspect-video object-cover' />
      }
    </div>
  )
}

export default DisplayEmbeds
