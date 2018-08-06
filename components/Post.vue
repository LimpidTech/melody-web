<template>
  <article>
    <header>
      <h2>
        <a :href="url">{{ subject }}</a>
      </h2>

      <h4>
        <span v-if=isPinned>Pinned</span>
        <span v-else>Published</span>

        <span v-if=author> by {{ author.username }}</span>
        <span v-else> anonymously</span>

        <FriendlyDate :date=modified />

        <!-- TODO: Allow deleting without Javascript -->
        <a v-if='isOwner' :href=editUrl>edit</a>
        <a v-if='isOwner' :href=deleteUrl v-on:click='remove($event)'>delete</a>
      </h4>
    </header>

    <div v-if=!summarize v-html=html></div>
    <div v-else v-html=summary></div>

    <footer>
      <a v-for="topic in topics" :key="topic.url" :href=getTopicURL(topic)>
        {{topic.name}}
      </a>
    </footer>
  </article>
</template>

<script>
  import FriendlyDate from '~/components/FriendlyDate'

  import { Metanic } from '~/clients/metanic'

  export default {
    components: {
      FriendlyDate,
    },

    props: {
      reference: String,

      subject: String,

      html: {
        default: '',
        type: String,
      },

      summary: {
        default: '',
        type: String,
      },

      modified: [Date, String],

      author: [Object, {
        username: String,
      }],

      topics: [Array, {
        name: String,
        reference: String,
      }],

      summarize: {
        default: true,
        type: Boolean,
      },

      isPinned: {
        default: false,
        type: Boolean,
      },
    },

    data() {
      const { state } = this.$store

      const isOwner = state.user.username === this.author.username
      const url = `/post/${this.reference}/`

      const deleteUrl = `${url}delete/`
      const editUrl = `${url}edit/`

      return {deleteUrl, editUrl, isOwner, url}
    },

    methods: {
      getTopicURL: topic => `/topic/${topic.reference}/`,

      remove(event) {
        event.preventDefault()

        const { $store } = this
        const metanic = Metanic.FromStore($store)

        metanic.delete('post', this.reference)
      },
    },
  }
</script>

<style scoped lang="scss">
  article {
    > header {
      display: block;
      line-height: 2em;

      > h4 {
        font-size: 0.8em;
      }

      a:link, a:active, a:visited, a:hover {
        color: inherit;
      }

      > h2, > h4 {
        margin-bottom: 0;

        > a {
          padding: .1em .3em;
          font-size: 0.9em;
          text-decoration: underline;

          &::before { content: '/'; }

          &:nth-child(1) {
            padding-left: 0;
            text-decoration: none;
            &::before { content: ''; }
          }
        }
      }
    }

    > div {
      padding-left: 0.1em;
    }

    > footer {
      text-align: right;
      padding-right: 3em;
      font-size: 0.9em;
    }

    @media (min-width: 780px) {
      header {
        display: flex;
        align-items: baseline;

        > h2 {
          flex-grow: 1;
          margin-right: .7em;
        }
      }
    }
  }
</styled>
