<template>
  <section>
    <Post v-for="post in posts" :key="post.url"
      :reference="post.local_reference"
      :subject="post.subject"
      :html="post.html"
      :summary="post.summary"
      :topics=getTopics(post)
      :author="post.author"
      :modified="post.modified"
      :isPinned="post.is_pinned"
      :summarize="!post.is_pinned"
      :deleted=deleted
    />
  </section>
</template>


<script>
import Post from '~/components/Post'

export default {
  props: {
    posts: Array,
    refresh: Function,
  },

  components: {
    Post,
  },

  methods: {
    getTopics(post) {
      const topics = []

      for (const topic of post.topics) {
        topics.push({
          name: topic.name,
          reference: topic.local_reference,
        })
      }

      return topics
    },

    deleted() {
      return this.refresh()
    },
  },
}
</script>

<style lang="scss" scoped>
* > section > article {
  margin-bottom: 0em;
  &.pinned { margin-bottom: 1em; }
}
</style>
