<template>
  <div class="search-bar">
    <label for="city">City</label>
    <input type="text" id="city" placeholder="Enter City" v-model="input.city">
    <label for="state">State</label>
    <select name="state" id="state" v-model="input.state">
      <option
        v-for="state in states"
        :key="state.abbreviation"
        :value="state.abbreviation"
      >{{ state.abbreviation }}</option>
    </select>
    <button @click="emitSearchExecuted">Get City Data</button>
  </div>
</template>

<script>
import { listOfStates } from "@/mixins/states";

export default {
  name: "Search",
  data() {
    return {
      input: {
        city: "",
        state: ""
      },
      states: listOfStates
    };
  },
  methods: {
    emitSearchExecuted() {
      this.$emit("searchExecuted", this.input);
    },
    clearInput() {
      this.input.city = "";
      this.input.state = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
