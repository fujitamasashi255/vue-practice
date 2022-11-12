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
export default {
    data: function(){
        return {
           tasks: [],
        }
    },
    methods: {
        getTasks: async function(){
            try {
                let response = await this.$axios.get('/api/tasks');
                this.tasks = response.data.map(task => task.title);
            } catch(error) {
                console.log(error);
            }
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
</style>