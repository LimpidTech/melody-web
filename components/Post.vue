<template>
  <article>
    <header>
      <h2>
        <a :href="url">{{ subject }}</a>
      </h2>

      <h4>
        Published by {{ author.username }} <FriendlyDate :date=created />
      </h4>
    </header>

    <div v-html="html"></div>

    <footer>
      <a v-for="topic in topics" :key="topic.url" href='#'>
        {{topic.name}}
      </a>
    </footer>
  </article>
</template>

<script>
  import FriendlyDate from '~/components/FriendlyDate'

  export default {
    components: {
      FriendlyDate,
    },

    props: {
      url: String,

      subject: String,
      html: String,

      created: [Date, String],
      modified: [Date, String],

      author: [Object, {
        username: String,
      }],

      topics: [Array, {
        name: String,
        url: String,
      }],
    },
  }
</script>

<style lang="scss" scoped>
  article {
    min-width: 32rem;

    > header {
      display: flex;
      align-items: baseline;

      padding: 0 0.2rem;
      background: #E9E9E9AA;
      color: #303030;

      a:link, a:active, a:visited, a:hover {
        color: inherit;
        text-decoration: none;
      }

      > h2, > h4 {
        margin-bottom: 0;
      }

      > h2 {
        flex-grow: 1;
      }
    }

    > div {
      font-size: 1.2rem;
    }

    > footer {
      text-align: right;
      padding-right: 3em;
      font-size: 0.9rem;
    }
  }
</styled>
