<template>
  <div>
    Inject counter: {{ counter }}
  </div>
</template>

<script>
export default {
  inject: ['counter']
}
</script>
