<template>
  <ul>
    <li v-for="topic in topics" :key="topic.url">
      <a :href="getTopicURL(topic)">
        <h2>{{ topic.name }}</h2>
      </a>
    </li>
  </ul>
</template>

<script>
import Topic from '~/components/Topic'

import page from '~/helpers/pages'

export default page({
  components: {Topic},

  asyncData({ store }) {
    return store.dispatch('getTopics')
      .then(({ data }) => ({topics: data}))
      .catch(console.error)
  },

  methods: {
    getTopicURL(topic) {
      return `/topic/${topic.local_reference}/`
    },
  },
})
</script>

<style lang="scss" scoped>
* > ul {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  align-content: space-between;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;

  > li {
    flex-basis: 20%;
    padding: .3em;

    > a {
      color: inherit;
    }
  }
}
</style>
