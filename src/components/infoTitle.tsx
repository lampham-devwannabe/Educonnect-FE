import * as React from 'react'

interface InfoTitleProps {
  heading?: string
  description?: string
}

const InfoTitle: React.FC<InfoTitleProps> = ({ heading, description }) => {
  return (
    <div className="items-center">
      <h4 className="text-xl lg:text-4xl font-bold">{heading}</h4>
      <p className="lg:text-lg text-sm mt-3 lg:leading-7 md:leading-7">
        {description}
      </p>
    </div>
  )
}

export default InfoTitle
