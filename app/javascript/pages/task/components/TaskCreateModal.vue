<template>
<div id="task-create-modal">
        <div class="modal" v-on:click.self="handleCloseModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div>
                        <div>
                            <label>タイトル</label>
                            <input type="text" name="タイトル" v-model="task.title"/>
                        </div>
                        <div>
                            <label>説明文</label>
                            <input type="text" name="説明文" v-model="task.description"/>
                        </div>
                        <button type="button" @click.prevent="handleCreateTask">追加</button>
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
            task: {
                title: '',
                description: '',
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
                this.addTask(this.task);
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