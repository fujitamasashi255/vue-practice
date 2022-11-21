<template>
  <div
    :id="tagId"
    class="card"
  >
    <div class="card-header">
      <slot name="header">
        ヘッダーなし
      </slot>
    </div>
    <ul class="list-group list-group-flush">
      <li
        v-for="task in tasks"
        :id="'task-' + task.id"
        :key="task.id"
        @click="handleShowTaskDetailModal(task)"
      >
        <task-item :task="task" />
      </li>
    </ul>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue"

export default {
    components: {
        'task-item': TaskItem,
    },
    props: {
      tasks: {
        default: null,
        type: Array,
        task: {
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
      tagId: {
        type: String,
        required: true,
      },
    },
    methods: {
      handleShowTaskDetailModal(task){
        this.$emit('show-task-detail-modal', task)
      },
    }
}
</script>

<style scoped>
.card {
  width: 18rem;
}
li {
  list-style: none;
}
</style>