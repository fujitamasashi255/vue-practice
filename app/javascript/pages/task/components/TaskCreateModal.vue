<template>
  <div id="task-create-modal">
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
                v-model="task.title"
                type="text"
                name="タイトル"
              >
            </div>
            <div>
              <label>説明文</label>
              <input
                v-model="task.description"
                type="text"
                name="説明文"
              >
            </div>
            <div>
              <label for="ステータス">ステータス</label>
              <select
                v-model="task.status"
                for="ステータス"
                name="ステータス"
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
              @click.prevent="handleCreateTask"
            >
              追加
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
    data: function(){
        return {
            task: {
                title: '',
                description: '',
                status: 'todo',
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
                console.log('createTask!!')
                await this.addTask(this.task);
                // モーダルを閉じる
                this.handleCloseModal();
            } catch(error) {
               console.log(error);
            }
        },
        ...mapActions(['addTask']),
    },
}
</script>

<style scoped>
.modal {
  display: block;
}
</style>