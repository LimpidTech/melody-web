<template>
  <article>
    <header>
      <h2>
        <a :href="url">{{ subject }}</a>
      </h2>

      <h4>
        Published
        <span v-if=author>by {{ author.username }}</span>
        <span v-else>anonymously</span>
        <FriendlyDate :date=created />
      </h4>
    </header>

    <div v-html="html"></div>

    <footer>
      <a v-for="topic in topics" :key="topic.url" :href=getTopicURL(topic)>
        {{topic.name}}
      </a>

      <!-- TODO: Allow deleting without Javascript -->
      <a v-if='isOwner' :href=editUrl>edit</a>
      <a v-if='isOwner' :href=deleteUrl v-on:click='remove($event)'>delete</a>
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
      html: String,

      created: [Date, String],
      modified: [Date, String],

      author: [Object, {
        username: String,
      }],

      topics: [Array, {
        name: String,
        reference: String,
      }],
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
        text-decoration: none;
      }

      > h2, > h4 {
        margin-bottom: 0;
      }
    }

    > div {
      padding-left: 0.1em;
    }

    > footer {
      text-align: right;
      padding-right: 3em;
      font-size: 0.9em;

      > a {
        padding: .1em .3em;
      }
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
