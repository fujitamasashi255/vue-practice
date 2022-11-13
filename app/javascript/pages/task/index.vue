<template>
    <div id="tasks">
        <div class="card">
            <div class="card-header">
                TODO
            </div>
            <ul class="list-group list-group-flush">
                <li v-for="task in tasks" :key="task.id" :id="'task-' + task.id" @click.self="handleShowTaskDetailModal()">
                    {{ task.title }}
                    <transition name="fade">
                        <task_detail_modal :task='task' @close-modal="handleCloseTaskDetailModal" v-if="isVisibleTaskDetailModal"/>
                    </transition>
                </li>
            </router-link>
            </ul>
        </div>
        <router-link to="/">
            <button type=button>戻る</button> 
        </router-link>
    </div>
</template>

<script>
import taskDetailModal from "./components/TaskDetailModal.vue"

export default {
    data: function(){
        return {
           tasks: [],
           isVisibleTaskDetailModal: false,
        }
    },
    components: {
        'task_detail_modal': taskDetailModal,
    },
    methods: {
        getTasks: async function(){
            try {
                let response = await this.$axios.get('/api/tasks');
                this.tasks = response.data;
            } catch(error) {
                console.log(error);
            }
        },
        handleShowTaskDetailModal: function(){
            this.isVisibleTaskDetailModal = true;
        },
        handleCloseTaskDetailModal: function(){
          this.isVisibleTaskDetailModal = false;
        },
    },
    created: function(){
        this.getTasks();
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