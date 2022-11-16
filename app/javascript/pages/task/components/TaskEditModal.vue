<template>
<div :id="'task-edit-modal-' + task.id">
        <div class="modal" v-on:click.self="handleCloseModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div>
                        <div>
                            <label>タイトル</label>
                            <input type="text" name="タイトル" @input="handleTaskTitleInput" :value="task.title" />
                        </div>
                        <div>
                            <label>説明文</label>
                            <input type="text" name="説明文" @input="handleTaskDescriptionInput" :value="task.description" />
                        </div>
                        <button type="button" @click.prevent="handleUpdateTask">更新</button>
                        <button type="button" class="close" v-on:click="handleCloseModal">閉じる</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop show"></div>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data: function(){
        return {
            newTaskTitle: this.task.title,
            newTaskDescription: this.task.description,
        }
    },
    props: {
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
        },
    },
    methods: {
        handleTaskTitleInput: function($event){
            this.newTaskTitle = $event.target.value;
        },
        handleTaskDescriptionInput: function($event){
            this.newTaskDescription = $event.target.value;
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