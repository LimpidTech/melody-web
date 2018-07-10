<template>
  <section>
    <Post v-for="post in posts" :key="post.url"
      :reference="post.local_reference"
      :subject="post.subject"
      :html="post.html"
      :author="post.author"
      :topics="post.topics"
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

