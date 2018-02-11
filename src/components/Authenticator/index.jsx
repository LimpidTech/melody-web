import React from 'react'
import styled from 'styled-components'

import Form from 'components/Form'
import Input from 'components/Input'
import Label from 'components/Label'

import { withValue, preventDefault } from 'utilities'

import state from './state'

function Authenticator (props) {
  const {
    melodyUrl,
    username, setUsername,
    password, setPassword,
    emit
  } = props

  const authenticationUrl = `${melodyUrl}authentication/`
  const onSubmit = preventDefault(() => emit.authenticate({username, password}))

  return (
    <section className={props.className}>
      <Form
        action={authenticationUrl}
        method='POST'
        onSubmit={onSubmit}>

        <header>
          <h3>Login</h3>
        </header>

        <Label>
          <Input
            tabIndex={1} type='text'
            name='username'
            placeholder='Username or email' value={username}
            onChange={withValue(setUsername)} />
        </Label>

        <Label>
          <Input
            tabIndex={2} type='password'
            name='password'
            placeholder='Password' value={password}
            onChange={withValue(setPassword)} />
        </Label>

        <Label>
          <Input type='hidden' name='redirect_uri' value='/' />
        </Label>

        <footer>
          <p>
            <Input type='submit' value='Submit' />
          </p>
        </footer>
      </Form>
    </section>
  )
}

export default styled(state(Authenticator))`
  margin: 10% auto 0;
  max-width: 20em;

  form {
    padding: 0.2em;

    > header > h3 {
      text-align: center;
    }

    label {
      display: block;

      > input {
        width: 100%;
      }
    }

    > footer {
      font-size: 0.8em;
      text-align: right;
    }
  }
`
