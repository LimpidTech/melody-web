import React from 'react'

export default props => {
  return (
    <article>
      <header>
        {props.subject && <h2>{ props.subject }</h2>}
      </header>

      {props.html && <div dangerouslySetInnerHTML={{
        __html: props.html,
      }} />}

      <footer>
        {props.topics.map(topic => <a href='#' key={topic.url}>{topic.name}</a>)}
      </footer>
    </article>
  )
}
