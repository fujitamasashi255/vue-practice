<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button type=button>はじめる</button> 
    <footer>{{ footer }}</footer>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: "タスクを管理しよう！",
      message: "生活や仕事に関するタスクを見える化して抜け漏れを防ぎましょう。",
      footer: "Copyright &copy; 2020 RUNTEQ",
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
