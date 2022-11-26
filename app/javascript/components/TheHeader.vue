<template>
    <header>
        {{ header }}
        <a v-if="isLoggedIn" @click.prevent="logout" href="#">ログアウト</a>
        <router-link to="/register" v-if="!isLoggedIn">ユーザー登録</router-link>
        <router-link to="/login" v-if="!isLoggedIn">ログイン</router-link>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: function(){
        return {
            header: 'タスク管理アプリ',
        }
    },
    computed: {
        ...mapGetters('users', ['isLoggedIn'])
    },
    methods: {
        ...mapActions('users', ['logout']),
    },
}
</script>