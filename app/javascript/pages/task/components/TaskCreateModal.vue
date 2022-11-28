<template>
  <div id="task-create-modal">
    <div
      class="modal"
      @click.self="handleCloseModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form id="task-create-form" @submit.prevent="handleSubmit(onSubmit)">
              <div>
                <label>タイトル</label>
                <ValidationProvider name="タイトル" rules="required|max:50" v-slot="{ errors }">
                  <input
                    v-model="task.title"
                    type="text"
                    name="タイトル"
                  >
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div>
                <label>説明文</label>
                <ValidationProvider name="説明文" rules="max:500" v-slot="{ errors }">
                  <input
                    v-model="task.description"
                    type="text"
                    name="説明文"
                  >
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div>
                <label for="ステータス">ステータス</label>
                <ValidationProvider name="ステータス" rules="required" v-slot="{ errors }">
                  <select
                    v-model="task.status"
                    for="ステータス"
                    name="ステータス"
                  >
                    <option value="" selected></option>
                    <option value="todo">
                      TODO
                    </option>
                    <option value="doing">
                      DOING
                    </option>
                    <option value="done">
                      DONE
                    </option>
                  </select>
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <button type="submit">追加</button>
            </form>
          </ValidationObserver>
          <button
            type="button"
            class="close"
            @click="handleCloseModal"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, max } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: `{_field_}は必須項目です`,
})

extend('max', {
  ...max,
  message: `{_field_}は{length}文字以下で入力してください`,
})

export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: function(){
        return {
            task: {
                title: '',
                description: '',
                status: '',
            },
        }
    },
    methods: {
        handleCloseModal: function(){
            this.$emit('close-modal')
        },
        handleCreateTask: async function(){
            // POST送信
            try{
                await this.addTask(this.task);
                // モーダルを閉じる
                this.handleCloseModal();
            } catch(error) {
               console.log(error);
            }
        },
        ...mapActions('tasks', ['addTask']),
        onSubmit(){
          this.handleCreateTask()
        },
    },
}
</script>

<style scoped>
.modal {
  display: block;
}

.error-message {
  color: red;
}
</style>
