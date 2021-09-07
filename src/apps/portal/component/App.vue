<template>
  <div class="now">Portal.APP.vue</div>
  <router-view></router-view>
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

<style scoped lang="less">
.now {
  color: green;
}

.unused {
  color: blue;
}
</style>