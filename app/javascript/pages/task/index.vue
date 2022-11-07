<template>
    <div id="tasks">
        <div class="card">
            <div class="card-header">
                TODO
            </div>
            <ul class="list-group list-group-flush">
                <li v-for="task in tasks" :key="task">{{ task }}</li>
            </ul>
        </div>
        <router-link to="/">
            <button type=button>戻る</button> 
        </router-link>
    </div>
</template>

<script>
    const tasks = [
        'スーパーに買い物に行く',
        '子供の迎えに行く',
        '新聞を解約する',
        'ゴミ出しをする',
    ]
    export default {
        data: function(){
            return {
               tasks, 
            }
        }
    }
</script>


<style scoped>
.card {
  width: 18rem;
}
</style>