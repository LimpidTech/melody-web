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

          <nuxt-link to="/account/register/">
            Don't have an account? Sign up
          </nuxt-link>
        </p>
      </footer>
    </form>
  </section>
</template>

<script>
  import Label from '~/components/Label'
  import Input from '~/components/Input'

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

        this.$store.dispatch('authenticate', {
          username: this.username,
          password: this.password,
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
