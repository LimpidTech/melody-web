<template>
  <span v-if=friendlyTime>{{ friendlyTime }}</span>
</template>

<script>
  import moment from 'moment'

  export default {
    props: {
      time: [Date, String],
      prefix: String,
    },

    computed: {
      friendlyTime: function () {
        const now = moment()
        const date = moment(this.date)
        const prefix = this.prefix || 'at'

        if (now.format(moment.HTML5_FMT.DATE) !== date.format(moment.HTML5_FMT.DATE)) {
          return ' ' + prefix + ' ' + date.format('LT')
        }

        return date.fromNow()
      },
    },
  }
</script>
