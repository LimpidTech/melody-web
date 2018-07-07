<template>
  <form @submit.prevent='create' action=. method='POST'>
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

    <button type='submit'>{{ submitText() }}</button>
  </form>
</template>

<script>
export default {
  props: {
    url: String,
    created: Function,
    failure: Function,
  },

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

      try {
        const { data } = await this.$store.dispatch('createPost', {
          subject: this.subject,
          body: this.body,
          topics: this.topics,
        })

        this.created(data)
      } catch (exception) {
        this.failure(exception)
      }
    },

    submitText() {
      if (this.url) { return 'Update' }
      return 'Create'
    },
  },
}
</script>

<style scoped lang="scss">
  * {
    > form {
      display: flex;
      flex-direction: column;

      > label > input,
      > label > textarea,
      > button {
        margin-bottom: 1em;
        padding: 0.2em;
        width: 100%;
        height: 1.8em;
        font-size: 1.2em;
        line-height: 1.4em;
      }

      > label > textarea {
        flex-grow: 1;
        resize: vertical;
        min-height: 13ex;
      }

      > h2 {
        margin-bottom: 0.6em;
      }
    }
  }
</style>
