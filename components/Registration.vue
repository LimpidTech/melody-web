<template>
  <section>
    <form action=/register/
          method=POST
          @submit='submit'>

      <header>
        <h3>Sign up</h3>
      </header>

      <Label header='Create a username'>
        <Input tabIndex=1
              type='text'
              name='username'
              placeholder='your username'
              v-model='username'
        />
        {{ username }}
      </Label>

      <Label header='Create a password'>
        <Input tabIndex=2
              type='password'
              name='password'
              placeholder='your password'
              v-model='password'
        />
      </Label>

      <Label header='Verify your password'>
        <Input tabIndex=3
              name='password_verification'
              type='password'
              placeholder='verify your password'
              v-model='passwordVerification'
        />
      </Label>

      <div>
        <Input tabIndex=4
               type='submit'
               value='Register'
        />

        <nuxt-link to='/login/'>Already have an account? Sign in here!</nuxt-link>
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
  }),

  methods: {
    submit(evt) {
      evt.preventDefault()

      metanic.post('user', {
        body: {
          username: this.username,
          password: this.password,
          password_verification: this.passwordVerification,
        },
      })
    },
  },
}
</script>

<style scoped>
  label {
    display: block;
    margin-bottom: 0;
  }
</style>
