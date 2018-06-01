<template>
  <section>
    <h2 v-if="error.statusCode === 404">
      The specified page was not found.
    </h2>

    <h2 v-else>
      An unknown error has occurred.
    </h2>

    <p>
      If you've arrived here from a broken link or otherwise believe that this
      was an error on our part, please feel free to
      <a href="mailto:support@metanic.org">email us for support</a>.
    </p>
  </section>
</template>


<script>
export default {
  props: ['error'],
}
</script>

<style>
h2 {
  padding-left: 1rem;
  margin-top: 30vh;
}

p {
  max-width: 40vw;
}
</style>
