<template>
  <div>
    <h2>ユーザー登録</h2>
    <form id="register-form">
      <div>
        <label for="name">ユーザー名</label>
        <input id="name" type="text" v-model="user.name"/>
      </div>
      <div>
        <label for="email">メールアドレス</label>
        <input id="email" type="email" v-model="user.email"/>
      </div>
      <div>
        <label for="password">パスワード</label>
        <input id="password" type="password" v-model="user.password"/>
      </div>
      <div>
        <label for="password-confirmation">パスワード（確認）</label>
        <input id="password-confirmation" type="password" v-model="user.password_confirmation"/>
      </div>
      <div>
        <input type="button" @click="createUser(user)" value="登録"/>
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
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    ...mapActions('users', ['createUser']),
  }
}
</script>
