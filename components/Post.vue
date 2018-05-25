<template>
  <article>
    <header>
      <h2>
        <a :href="url">{{ subject }}</a>
      </h2>

      <h4>
        Published by {{ author.username }}
          {{ createdTime }}
          <span v-if=createdDate>on {{ createdDate }}</span>
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
  import moment from 'moment'

  export default {
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

    computed: {
      createdDate: function () {
        const now = moment()
        const created = moment(this.created)

        if (now.format(moment.HTML5_FMT.DATE) === created.format(moment.HTML5_FMT.DATE)) {
          return
        }

        if (now.format(moment.HTML5_FMT.WEEK) === created.format(moment.HTML5_FMT.WEEK)) {
          return created.format('dddd')
        }

        return created.format(moment.HTML5_FMT.DATE)
      },

      createdTime: function () {
        const now = moment()
        const created = moment(this.created)

        if (now.format(moment.HTML5_FMT.DATE) !== created.format(moment.HTML5_FMT.DATE)) {
          return created.format('LT')
        }

        return created.fromNow()
      },
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
