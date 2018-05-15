<template>
  <section>
    <form action=/authenticate/
          method='POST'
          @submit='submit'>

      <header>
        <h3>Sign in</h3>
      </header>

      <Label>
        <input
          tabIndex={1}
          type='text'
          name='username'
          placeholder='Username or email'
          v-model='username'
        />
      </Label>

      <Label>
        <input
          tabIndex={2} type='password'
          name='password'
          placeholder='Password'
          v-model='password'
        />
      </Label>

      <Label>
        <input type='hidden'
               name='redirect_uri'
               value='/'
        />
      </Label>

      <footer>
        <p>
          <input tabIndex={3}
                 type='submit'
                 value='Sign in'
          />

          <nuxt-link to="/register/">
            Don't have an account? Sign up here!
          </nuxt-link>
        </p>
      </footer>
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
    }),

    methods: {
      submit(evt) {
        evt.preventDefault()

        metanic.post('authentication', {
          body: {
            username: this.username,
            password: this.password,
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
