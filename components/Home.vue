<template>
  <section>
    <Post v-for="post in posts" :key="post.url"
      :url="post.url"
      :subject="post.subject"
      :html="post.html"
      :topics="post.topics"
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
}
</script>
