import React from 'react'

export default function Label (props) {
  const { children, ...optiosn } = props
  return <label {...optiosn}>{ props.children }</label>
}
