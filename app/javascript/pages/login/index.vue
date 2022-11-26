<template>
  <div>
    <h2>ログイン</h2>
    <form id="login-form">
      <div>
        <label for="email">メールアドレス</label>
        <input id="email" type="email" v-model="user.email"/>
      </div>
      <div>
        <label for="password">パスワード</label>
        <input id="password" type="password" v-model="user.password"/>
      </div>
      <div>
        <input type="button" @click="login(user)" value="ログイン"/>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: function(){
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions('users', ['login'])
  }
}
</script>
