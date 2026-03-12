import React from 'react'

const Title = ({title, subTitle, align,font}) => {
  return (
    <div className={'flex flex-col justify-center items-center text-center mb-10 ' + (align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center')}>
      <h1 className={`text-3xl md:text-4xl font-${font} font-semibold`}>{title}</h1>
      <p className='text-gray-500 mt-2 text-sm md:text-base'>{subTitle}</p>

    </div>
  )
}

export default Title