<template>
  <Editor :editing=false />
</template>

<script>
import Editor from '~/components/Editor'
import page from '~/helpers/pages'

export default page({
  components: {Editor},
})
</script>
