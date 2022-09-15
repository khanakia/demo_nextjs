import React from 'react'

function HelpMarkup(props : {children?: any, className?: string}) { 
  const { children, className=''} = props
  return (
    <div className={className}>{children}</div>
  )
}

export default HelpMarkup