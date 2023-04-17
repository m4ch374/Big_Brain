import React from 'react'
import YoutubeVideoPlayer from './YoutubeVdoPlayer'
import { ETypeEnum, TEmbeds } from '../../types'

const DisplayEmbeds: React.FC<{ embeds: TEmbeds }> = ({ embeds }) => {
  return (
    <div className='flex justify-center bg-slate-700'>
      {embeds.type !== ETypeEnum.NIL && (embeds.type === ETypeEnum.VID
        ? <YoutubeVideoPlayer data={embeds.data} />
        : <img src={embeds.data} className='w-[90%] aspect-video object-cover' />)
      }
    </div>
  )
}

export default DisplayEmbeds
