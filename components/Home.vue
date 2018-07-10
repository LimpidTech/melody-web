<template>
  <section>
    <Post v-for="post in posts" :key="post.url"
      :reference="post.local_reference"
      :subject="post.subject"
      :html="post.html"
      :topics=getTopics(post)
      :author="post.author"
      :created="post.created"
      :modified="post.last_modified"
    />
  </section>
</template>


<script>
import Post from '~/components/Post'

export default {
  props: {
    posts: Array,
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
  },
}
</script>
