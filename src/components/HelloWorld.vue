<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
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
    <button @click="getUsage">Get City Data</button>
    <ul>
      <li v-for="city in cities" :key="city.slug">
        {{ city.name }}
        {{ city.state }}
        {{ city.usage.commercial.num_establishments }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getEnergyUsageByCityAndState } from "@/api";
import { capitalizeFirstLetter } from "@/mixins/utilities";
import { listOfStates } from "@/mixins/states";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      cities: [],
      input: {
        city: "",
        state: ""
      },
      states: listOfStates
    };
  },
  methods: {
    getUsage() {
      getEnergyUsageByCityAndState(this.input.city, this.input.state).then(
        response => {
          if (response.data != null) {
            const { inputs, result } = response.data;
            const lowerCaseCity = inputs.city.toLowerCase();
            const upperCaseState = inputs.state_abbr.toUpperCase();
            const capitalizedCity = capitalizeFirstLetter(lowerCaseCity);
            const city = {
              slug: `${lowerCaseCity}-${upperCaseState}`,
              name: capitalizedCity,
              state: upperCaseState,
              usage: result[capitalizedCity]
            };
            this.cities.push(city);
            this.input.city = "";
            this.input.state = "";
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
