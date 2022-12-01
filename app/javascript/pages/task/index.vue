<template>
  <div>
    <TaskSearchForm @searchTasks="filterTasks" />
    <div id="tasks">
      <task-list
        :tasks="todoTasks"
        :tag-id="todoList"
        @show-task-detail-modal="handleShowTaskDetailModal"
      >
        <template v-slot:header>
          <div class="h4">
            TODO
          </div>
        </template>
      </task-list>

      <task-list
        :tasks="doingTasks"
        :tag-id="doingList"
        @show-task-detail-modal="handleShowTaskDetailModal"
      >
        <template v-slot:header>
          <div class="h4">
            DOING
          </div>
        </template>
      </task-list>

      <task-list
        :tasks="doneTasks"
        :tag-id="doneList"
        @show-task-detail-modal="handleShowTaskDetailModal"
      >
        <template v-slot:header>
          <div class="h4">
            DONE
          </div>
        </template>
      </task-list>
    </div>
    <transition name="fade">
      <task-detail-modal
        v-if="isVisibleTaskDetailModal"
        :task="taskDetail"
        @close-modal="handleCloseTaskDetailModal"
        @task-edit="handleShowTaskEditModal"
        @task-delete="handleTaskDelete"
      />
      <task-create-modal
        v-if="isVisibleTaskCreateModal"
        @close-modal="handleCloseTaskCreateModal"
      />
      <task-edit-modal
        v-if="isVisibleTaskEditModal"
        :task="taskDetail"
        @close-modal="handleCloseTaskEditModal"
      />
    </transition>
    <button @click="handleShowTaskCreateModal()">
      タスクを追加
    </button>
    <router-link to="/">
      <button type="button">
        戻る
      </button> 
    </router-link>
  </div>
</template>

<script>
import TaskDetailModal from "./components/TaskDetailModal.vue"
import TaskCreateModal from "./components/TaskCreateModal.vue"
import TaskEditModal from "./components/TaskEditModal.vue"
import TaskList from "./components/TaskList.vue"
import TaskSearchForm from "./components/TaskSearchForm.vue"
import { mapGetters, mapActions, mapState, mapMutations } from "vuex"

export default {
    components: {
        'task-detail-modal': TaskDetailModal,
        'task-create-modal': TaskCreateModal,
        'task-edit-modal': TaskEditModal,
        'task-list': TaskList,
        'TaskSearchForm': TaskSearchForm,
    },
    data: function(){
        return {
           isVisibleTaskDetailModal: false,
           isVisibleTaskCreateModal: false,
           isVisibleTaskEditModal: false,
           taskDetail: {},
           todoList: 'todo-list',
           doingList: 'doing-list',
           doneList: 'done-list',
           orgTasks: [],
        }
    },
    computed: { 
        ...mapState('tasks', ['tasks']),
        ...mapGetters('tasks', ['todoTasks', 'doingTasks', 'doneTasks']),
    },
    created: async function(){
        await this.restore();
        this.orgTasks = [...this.tasks]
    },
    methods: {
        handleShowTaskDetailModal: function(task){
            this.isVisibleTaskDetailModal = true;
            this.taskDetail = task;
        },
        handleCloseTaskDetailModal: function(){
          this.isVisibleTaskDetailModal = false;
          this.taskDetail = {};
        },
        handleShowTaskCreateModal: function(){
            this.isVisibleTaskCreateModal = true;
        },
        handleCloseTaskCreateModal: function(){
            this.isVisibleTaskCreateModal = false;
        },
        handleShowTaskEditModal: function(){
            this.isVisibleTaskDetailModal = false;
            this.isVisibleTaskEditModal = true;
        },
        handleCloseTaskEditModal: function(){
          this.isVisibleTaskEditModal = false;
          this.taskDetail = {};
        },
        handleTaskDelete: function(task){
            this.deleteTask(task);
            this.isVisibleTaskDetailModal = false;
            this.taskDetail = {};
        },
        ...mapMutations('tasks', {setTasks: 'restore'}),
        ...mapActions('tasks', ['deleteTask', 'restore']),
        filteredTasksByTitle(title){
          return this.orgTasks.filter(task => task.title.indexOf(title) >= 0)
        },
        filterTasks(searchWord){
          this.setTasks({ tasks: this.filteredTasksByTitle(searchWord) })
        },
    },
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#tasks {
    display:flex;
}
</style>