<template>
  <section>
    <form
      action=/authenticate/
      method='POST'
      @submit="submit">

      <header>
        <h3>Login</h3>
      </header>

      <Label>
        <input
          tabIndex={1}
          type='text'
          name='username'
          placeholder='Username or email' v-model=username />
      </Label>

      <Label>
        <input
          tabIndex={2} type='password'
          name='password'
          placeholder='Password'
          v-model=password
        />
      </Label>

      <Label>
        <input type='hidden' name='redirect_uri' value='/' />
      </Label>

      <footer>
        <p>
          <input type='submit' value='Submit' />
        </p>
      </footer>
    </form>
  </section>
</template>

<script>
  export default {
    data: () => ({
      username: '',
      password: '',
    }),

    methods: {
      submit(evt) {
        evt.preventDefault()
      },
    },
  }
</script>

<style scoped>
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
