<template>
    <div :id="'task-detail-modal-' + task.id">
        <div class="modal" v-on:click.self="handleCloseModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ task.title }}</h4>
                        <button type="button" class="close" v-on:click="handleCloseModal">×</button>
                    </div>
                    <div>
                        <span>{{ task.description }} </span>                    
                        <button type="button" class="close" v-on:click="handleCloseModal">閉じる</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop show"></div>
    </div>
</template>

<script>
export default {
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
        }
    },
    methods: {
        handleCloseModal: function(){
            this.$emit('close-modal') // $emitを使って親の@closeModalに設定されているメソッドを実行させることができる。スネークケースとキャメルケースの変換は自動で行ってくれる。
        },
    },
}
</script>

<style scoped>
.modal {
  display: block;
}
</style>