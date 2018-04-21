<template>
  <nav>
    <li><h3>{{ lastRender }}</h3></li>
  </nav>
</template>

<script>
export default {
  computed: {
    lastRender() {
      console.log(this.$store.state.something)
      return parseInt(+(new Date()) / 150000000, 10)
    }
  }
}
</script>

<style scoped>
  margin: 0.2em auto 1ex;
  width: 3em;
  height: 3em;

  background-color: #29A3EC;
  border-radius: 100%;

  @media (min-width: 780px) {
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
  }
</style>
