<template>
  <div :id="'task-edit-modal-' + task.id">
    <div
      class="modal"
      @click.self="handleCloseModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form id="task-edit-form" @submit.prevent="handleSubmit(onSubmit)">
              <div>
                <label>タイトル</label>
                <ValidationProvider name="タイトル" rules="required|max:50" v-slot="{ errors }">
                  <input
                    type="text"
                    name="タイトル"
                    v-model="newTaskTitle"
                    @input="handleTaskTitleInput"
                  >
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div>
                <label>説明文</label>
                <ValidationProvider name="説明文" rules="max:500" v-slot="{ errors }">
                  <input
                    type="text"
                    name="説明文"
                    v-model="newTaskDescription"
                    @input="handleTaskDescriptionInput"
                  >
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div>
                <label for="ステータス">ステータス</label>
                <select
                  for="ステータス"
                  name="ステータス"
                  v-model="newTaskStatus"
                  @change="handleTaskStatusInput"
                >
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
              </div>
              <button type="submit">更新</button>
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
    props: {
        task: {
            default: null,
            type: Object,
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            id: {
                type: Number,
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
        },
    },
    data: function(){
        return {
            newTaskTitle: this.task.title,
            newTaskDescription: this.task.description,
            newTaskStatus: this.task.status,
        }
    },
    methods: {
        handleTaskTitleInput: function($event){
            this.newTaskTitle = $event.target.value;
        },
        handleTaskDescriptionInput: function($event){
            this.newTaskDescription = $event.target.value;
        },
        handleTaskStatusInput: function($event){
            this.newTaskStatus = $event.target.value;
        },
        handleCloseModal: function(){
            this.$emit('close-modal')
        },
        handleUpdateTask: async function(){
            try{
                let newTask = {
                    title: this.newTaskTitle,
                    description: this.newTaskDescription,
                    id: this.task.id,
                    status: this.newTaskStatus,
                };
                
                this.updateTask(newTask);
                // モーダルを閉じる
                this.handleCloseModal();
            } catch(error) {
               console.log(error);
            }
        },
        ...mapActions('tasks', ['updateTask']),
        onSubmit(){
          this.handleUpdateTask()
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