import React from 'react'

function HtmlMarkup(props : {text: string, className?: string}) { 
  const { text , className=''} = props
  const html = {__html: text}
  return (
    <div dangerouslySetInnerHTML={html} className={className} />
  )
}

export default HtmlMarkup