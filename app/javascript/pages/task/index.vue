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
                <task_detail_modal :task='taskDetail' @close-modal="handleCloseTaskDetailModal" v-if="isVisibleTaskDetailModal"/>
                <task_create_modal @close-modal="handleCloseTaskCreateModal" v-if="isVisibleTaskCreateModal"/>
            </transition>
        </div>
        <router-link to="/">
            <button type=button>戻る</button> 
        </router-link>
    </div>
</template>

<script>
import taskDetailModal from "./components/TaskDetailModal.vue"
import taskCreateModal from "./components/TaskCreateModal.vue"
import { mapGetters, mapActions } from "vuex";

export default {
    data: function(){
        return {
           isVisibleTaskDetailModal: false,
           isVisibleTaskCreateModal: false,
           taskDetail: {},
        }
    },
    computed: mapGetters({
        tasks: 'fetchTasks'
    }),
    components: {
        'task_detail_modal': taskDetailModal,
        'task_create_modal': taskCreateModal,
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
        ...mapActions(['restore']),
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