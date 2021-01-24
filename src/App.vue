<template>
  <CurrencyConverter />
</template>

<script lang="ts">
import CurrencyConverter from "@/components/CurrencyConverter.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: { CurrencyConverter },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f7ff;
  height: 100vh;
}

body {
  margin: 0;
}
</style>
