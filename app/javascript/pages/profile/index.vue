<template>
  <div>
    <h2>プロフィール</h2>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form id="register-form" @submit.prevent="handleSubmit(onSubmit)">
        <div>
          <label for="name">ユーザー名</label>
          <ValidationProvider name="ユーザー名" rules="required" v-slot="{ errors }">
            <input id="name" type="text" v-model="user.name"/>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div>
          <label for="avatar">プロフィール画像</label>
          <ValidationProvider name="プロフィール画像" rules="image" v-slot="{ errors, validate }" ref="avatar">
            <input id="avatar" type="file" @change="onImageUploaded">
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
          <div>
            <img v-if="uploadedAvatarUrl" :src="uploadedAvatarUrl" width="100" height="100">
          </div>
        </div>
        <div>
          <button type="submit">更新</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data(){
    return {
      uploadedAvatarUrl: "",
    }
  },
  computed: {
    ...mapState('users', ['user']),
  },
  methods: {
    ...mapActions('users', ['updateUser']),
    async onSubmit(){
      const data = await this.createFormData()
      this.updateUser(data)
    },
    createFormData(){
      const formData = new FormData()
      formData.append('user[name]', this.user.name)
      if(this.user.avatar){
        formData.append('user[avatar]', this.user.avatar)
      }
      return formData
    },
    async onImageUploaded(event){
      const { valid } = await this.$refs.avatar.validate(event);
      if(valid){
        this.user.avatar = event.target.files[0]
        this.createImage(this.user.avatar)
      }
    },
    createImage(image){
      const reader = new FileReader()
      // imageをreaderにDataURLとしてattachする
      reader.readAsDataURL(image)
      // readAdDataURLが完了したあと実行される処理
      reader.onload = () => {
        this.uploadedAvatarUrl = reader.result
      }
    },
  },
  mounted(){
    this.uploadedAvatarUrl = this.user.avatar_url
  },
}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>