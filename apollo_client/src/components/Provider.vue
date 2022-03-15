<template>
  <div>
    Provider broken: {{ counter }}
    <button @click="counter++">broken increment</button>
    <InjectorBroken/>

    <hr />

    Provider broken: {{ nextCounter.value }}
    <button @click="nextCounter.value++">working increment</button>
    <br />

    Provider broken: {{ arrCounter[0] }}
    <button @click="incFirstArrEl">working increment</button>

    <InjectorWorking />
  </div>
</template>

<script>
import InjectorBroken from './InjectorBroken.vue'
import InjectorWorking from './InjectorWorking.vue'

export default {
  components: {
    InjectorBroken,
    InjectorWorking
  },
  data () {
    return {
      counter: 1,
      nextCounter: {
        value: 0
      },
      arrCounter: [0]
    }
  },
  provide () {
    return {
      counter: this.counter,
      nextCounter: this.nextCounter,
      arrCounter: this.arrCounter
    }
  },
  methods: {
    incFirstArrEl () {
      this.arrCounter.splice(0, 1, this.arrCounter[0] + 1)
    }
  }
}
</script>
