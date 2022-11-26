<template>
  <div id="index">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <router-link class="btn btn-outline-primary" to="/tasks">
      はじめる
    </router-link>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: "タスクを管理しよう！",
      message: "生活や仕事に関するタスクを見える化して抜け漏れを防ぎましょう。",
    }
  },
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
