<template>
  <div class="now">{{ now }}</div>
</template>

<script>
export default {
  data() {
    return {
      now: Date.now()
    }
  }
}
</script>

<style lang="less">
.now {
  color: green;
}
</style>