<template>
    <div id="tasks">
        <div class="card">
            <div class="card-header">
                TODO
            </div>
            <ul class="list-group list-group-flush">
                <li v-for="task in tasks" :key="task.id" :id="'task-' + task.id" @click.self="handleShowTaskDetailModal(task)">
                    {{ task.title }}
                </li>
                <button @click="handleShowTaskCreateModal()">タスクを追加</button>
            </ul>
            <transition name="fade">
                <task_detail_modal :task='taskDetail' @close-modal="handleCloseTaskDetailModal" @task-edit="handleShowTaskEditModal" @task-delete="handleTaskDelete" v-if="isVisibleTaskDetailModal"/>
                <task_create_modal @close-modal="handleCloseTaskCreateModal" v-if="isVisibleTaskCreateModal"/>
                <task_edit_modal :task="taskDetail" @close-modal="handleCloseTaskEditModal" v-if="isVisibleTaskEditModal"/>
            </transition>
        </div>
        <router-link to="/">
            <button type=button>戻る</button> 
        </router-link>
    </div>
</template>

<script>
import TaskDetailModal from "./components/TaskDetailModal.vue"
import TaskCreateModal from "./components/TaskCreateModal.vue"
import TaskEditModal from "./components/TaskEditModal.vue"
import { mapGetters, mapActions } from "vuex";

export default {
    data: function(){
        return {
           isVisibleTaskDetailModal: false,
           isVisibleTaskCreateModal: false,
           isVisibleTaskEditModal: false,
           taskDetail: {},
        }
    },
    computed: mapGetters({
        tasks: 'fetchTasks'
    }),
    components: {
        'task_detail_modal': TaskDetailModal,
        'task_create_modal': TaskCreateModal,
        'task_edit_modal': TaskEditModal,
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
        ...mapActions(['restore', 'deleteTask']),
    },
    created: function(){
        this.restore();
    }
}
</script>

<style scoped>
.card {
  width: 18rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>