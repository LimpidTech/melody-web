<template>
  <form @submit.prevent='create' action=. method='POST' >
    <h2>New Content</h2>

    <label>
      <input
        type='text'
        name='subject'
        v-model='subject'
        placeholder='Subject'
      />
    </label>

    <label>
      <textarea
        name='body'
        v-model='body'
        placeholder="Start your next masterpiece right here."
      />
    </label>

    <label>
      <input
        type='text'
        name='topics'
        v-model='topics'
        placeholder='Topics separated by commas'
      />
    </label>

    <input type='submit' name='submit' value='Create' />
  </form>
</template>

<script>
export default {
  data() {
    return {
      subject: '',
      body: '',
      topics: '',
    }
  },

  methods: {
    async create(event) {
      // SEC: IF THIS NOT CORRECT, WE WILL LEAK DATA.

      // TODO: Test that this is the correct way to reference the context
      // NOTE: The store may be a better place for this, since it is sync'd
      //       to the client.

      this.$store.dispatch('createPost', {
        subject: this.subject,
        body: this.body,
        topics: this.topics,
      })
    },
  },
}
</script>

<style scoped lang="scss">
  form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    max-width: 42em;
  }

  input, textarea {
    padding: 0.2em;
    width: 100%;
    height: 1.8em;
    font-size: 1.2em;
    line-height: 1.4em;
  }

  textarea {
    flex-grow: 1;
    resize: vertical;
  }

  h2 {
    margin-bottom: 0.6em;
  }

  input, textarea {
    margin-bottom: 1em;
  }
</style>
