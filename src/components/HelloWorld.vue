<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
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

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return { cities: [] };
  },
  mounted() {
    getEnergyUsageByCityAndState("WAshington", "DC").then(response => {
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
      }
    });
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
