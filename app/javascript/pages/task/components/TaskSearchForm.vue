<template>
  <div>
    <form id="search-form">
      <label for="title">絞り込み</label>
      <input type="text" id="title" v-model="searchTask" @input="this.inputHandler" />
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data(){
    return {
      searchTask: "",
    }
  },
  methods: {
    inputHandler(){
      this.$emit('searchTasks', this.searchTask)
    }
  }
}
</script>
