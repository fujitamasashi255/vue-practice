<template>
  <div>
    <p>絞り込み</p>
    <input type="text" id="search-form" v-model="searchTask" @input="this.inputHandler" />
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
