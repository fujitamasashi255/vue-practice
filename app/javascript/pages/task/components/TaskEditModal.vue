<template>
  <div :id="'task-edit-modal-' + task.id">
    <div
      class="modal"
      @click.self="handleCloseModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div>
            <div>
              <label>タイトル</label>
              <input
                type="text"
                name="タイトル"
                :value="task.title"
                @input="handleTaskTitleInput"
              >
            </div>
            <div>
              <label>説明文</label>
              <input
                type="text"
                name="説明文"
                :value="task.description"
                @input="handleTaskDescriptionInput"
              >
            </div>
            <div>
              <label for="ステータス">ステータス</label>
              <select
                for="ステータス"
                name="ステータス"
                :value="task.status"
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
            <button
              type="button"
              @click.prevent="handleUpdateTask"
            >
              更新
            </button>
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
    </div>
    <div class="modal-backdrop show" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
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
        ...mapActions(['updateTask']),
    },
}
</script>

<style scoped>
.modal {
  display: block;
}
</style>