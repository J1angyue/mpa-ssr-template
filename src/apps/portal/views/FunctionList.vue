<template>
  <ul>
    <li v-for="func in funcs" :key="func.name">
      <a :href="func.href">{{ func.name }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FunctionList',
  data() {
    return {
      funcs: [
        { name: 'GitHub', href: 'https://github.com/search' },
        { name: 'NPM', href: 'https://www.npmjs.com/' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  margin: 0;
}
</style>