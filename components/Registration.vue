<template>
  <section>
    <form action=/register/
          method=POST
          @submit='submit'>

      <header>
        <h3>Sign up</h3>
      </header>

      <Label header='Enter your e-mail address'>
        <input tabIndex=1
              type='email'
              name='email'
              placeholder='your e-mail address'
              v-model='email'
        />
      </Label>

      <Label header='Create a password'>
        <input tabIndex=2
              type='password'
              name='password'
              placeholder='your password'
              v-model='password'
        />
      </Label>

      <Label header='Verify your password'>
        <input tabIndex=3
              name='password_verification'
              type='password'
              placeholder='verify your password'
              v-model='passwordVerification'
        />
      </Label>

      <Label header='Create a username'>
        <input tabIndex=1
              type='text'
              name='username'
              placeholder='your username'
              v-model='username'
        />
      </Label>

      <div>
        <input tabIndex=4
               type='submit'
               value='Register'
        />

        <nuxt-link to='/account/login/'>Already have an account? Sign in</nuxt-link>
      </div>
    </form>
  </section>
</template>

<script>
import Label from '~/components/Label'
import Input from '~/components/Input'

import { Metanic } from '~/clients/metanic'

const metanic = new Metanic()

export default {
  components: {
    Label,
    Input,
  },

  data: () => ({
    username: '',
    password: '',
    passwordVerification: '',
    email: '',
  }),

  methods: {
    submit(evt) {
      evt.preventDefault()

      metanic.post('user', {
        body: {
          email: this.email,
          password: this.password,
          password_verification: this.passwordVerification,
          username: this.username,
        },
      })
    },
  },
}
</script>

<style scope lang="scss">
* > form > label {
  display: block;
}
</style>
