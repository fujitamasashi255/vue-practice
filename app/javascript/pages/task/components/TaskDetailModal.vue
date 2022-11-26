<template>
  <div :id="'task-detail-modal-' + task.id">
    <div
      class="modal"
      @click.self="handleCloseModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              {{ task.title }}
            </h4>
            <button
              type="button"
              class="close"
              @click="handleCloseModal"
            >
              ×
            </button>
          </div>
          <div>
            <span>{{ task.description }} </span>                    
            <div v-if="isBelongsToUser">
              <button
              type="button"
              class="edit"
              @click="handleTaskEdit"
              >
              編集
              </button>
              <button
              type="button"
              class="delete"
              @click="handleTaskDelete"
              >
              削除
              </button>
            </div>
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
import { mapState } from 'vuex'

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
            user_id: {
              type: Number,
              required: true,
            },
        }
    },
    computed: {
      ...mapState('users', ['user']),
      isBelongsToUser(){
        console.log(this.task)
        console.log(this.user)
        return this.task.user_id === this.user.id
      },
    },
    methods: {
        handleCloseModal: function(){
            this.$emit('close-modal') // $emitを使って親の@closeModalに設定されているメソッドを実行させることができる。スネークケースとキャメルケースの変換は自動で行ってくれる。
        },
        handleTaskEdit(){
            this.$emit('task-edit');
        },
        handleTaskDelete(){
            this.$emit('task-delete', this.task);
        },
    },
}
</script>

<style scoped>
.modal {
  display: block;
}
</style>