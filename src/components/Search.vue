<template>
  <div class="search">
    <SearchBar @searchExecuted="searchExecuted" ref="searchBar"/>
    <SearchResultChart :cities="cities"/>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import SearchResultChart from "@/components/SearchResultChart";

import { capitalizeAllWords } from "@/mixins/utilities";
import { getEnergyUsageByCityAndState } from "@/api";

export default {
  name: "Search",
  components: {
    SearchBar,
    SearchResultChart
  },
  data() {
    return {
      cities: []
    };
  },
  methods: {
    searchExecuted(input) {
      getEnergyUsageByCityAndState(input.city, input.state).then(response => {
        if (response.data != null) {
          const { inputs, result } = response.data;
          const lowerCaseCity = inputs.city.toLowerCase();
          const upperCaseState = inputs.state_abbr.toUpperCase();
          const capitalizedCity = capitalizeAllWords(lowerCaseCity);
          const city = {
            slug: `${lowerCaseCity}-${upperCaseState}`,
            name: capitalizedCity,
            state: upperCaseState,
            usage: result[capitalizedCity]
          };
          this.cities.push(city);
          this.$refs["searchBar"].clearInput();
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
</style>
