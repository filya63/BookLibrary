<template>
  <div>
    Inject nextCounter: {{ nextCounter.value }}
    Inject arrCounter: {{ arrCounter[0] }}
  </div>
</template>

<script>
export default {
  inject: ['nextCounter', 'arrCounter']
}
</script>
