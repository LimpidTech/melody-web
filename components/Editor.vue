<template>
  <form @submit.prevent='submit' action=. method='PUT'>
    <h2>
      New Content
      <nuxt-link v-if=reference :to=url >View on site</nuxt-link>
    </h2>

    <label>
      <input
        type='text'
        name='subject'
        :value='subject'
        placeholder='Subject'
      />
    </label>

    <label>
      <textarea
        name='body'
        :value='body'
        placeholder="Start your next masterpiece right here."
      />
    </label>

    <label>
      <input
        type='text'
        name='topics'
        :value='topicNames'
        placeholder='Topics separated by commas'
      />
    </label>

    <button type='submit'>{{ submitText() }}</button>
  </form>
</template>

<script>
export default {
  props: {
    reference: String,

    subject: String,
    body: String,

    // TODO: How do I validate values in the Array?
    topics: {
      type: Array,
      default: () => [],
    },

    created: {
      default: () => {},
      type: Function,
    },

    failed: {
      default: console.error,
      type: Function,
    },
  },

  data() {
    const topicNames = []

    for (const topic of this.topics) {
      topicNames.push(topic.name)
    }

    return {
      topicNames: topicNames.join(', '),
      url: `/post/${this.reference}/`,
    }
  },

  methods: {
    async submit(event) {
      return this.$store.dispatch(this.reference ? 'updatePost' : 'createPost', {
        body: event.target.body.value,
        local_reference: this.reference,
        subject: event.target.subject.value,
        topics: event.target.topics.value,
      })
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitFailed)
    },

    async onSubmitSuccess(result) {
      return this.created(result)
    },

    async onSubmitFailed(error) {
      return this.failed(error)
    },

    submitText() {
      if (this.reference) { return 'Update' }
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

        > a {
          float: right;
        }
      }
    }
  }
</style>
