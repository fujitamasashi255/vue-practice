<template>
    <header>
        {{ header }}
        <template v-if="isLoggedIn">
            <a @click.prevent="logout" href="#">ログアウト</a>
            <img :src="user.avatar_url" width="100" height="100">
            <router-link to="/profile">プロフィール</router-link>
        </template>
        <template v-else>
            <router-link to="/register">ユーザー登録</router-link>
            <router-link to="/login">ログイン</router-link>
        </template>
    </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    data: function(){
        return {
            header: 'タスク管理アプリ',
        }
    },
    computed: {
        ...mapGetters('users', ['isLoggedIn']),
        ...mapState('users', ['user'])
    },
    methods: {
        ...mapActions('users', ['logout']),
    },
}
</script>