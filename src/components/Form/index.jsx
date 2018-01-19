import React from 'react'

export default function Form (props) {
  const { children, ...proxiedProps } = props
  return <form {...proxiedProps}>{children}</form>
}
