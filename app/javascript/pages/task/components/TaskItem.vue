<template>
  <div>
    {{ task.title }}
  </div>
</template>

<script> export default { props: {
    task: {
      default: null,
      type: Object,
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
      status: {
        type: Number,
        required: true,
      },
    }
  }
}
</script>
