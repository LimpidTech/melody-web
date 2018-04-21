<template>
  <article>
    <header>
      <h2>
        <a :href="url">{{ subject }}</a>
      </h2>
    </header>

    <div>{{ html }}</div>

    <footer>
      <a v-for="topic in topics" :key="topic.url" href='#'>
        {{topic.name}}
      </a>
    </footer>
  </article>
</template>

<script>
  export default {
    props: {
      url: String,
      subject: String,
      html: String,
      topics: [Array, {
        name: String,
        url: String,
      } ],
    },
  }
</script>

<style scoped>
  footer {
    text-align: right;
    padding-right: 3em;
    font-size: 0.9rem;
  }
</styled>
