<template>
  <div class="search-bar">
    <label for="city">City</label>
    <input
      type="text"
      id="city"
      placeholder="Enter City"
      v-model="input.city"
      @keyup.enter="attemptSearch"
      @input="isValidInput"
    >
    <label for="state">State</label>
    <select
      name="state"
      id="state"
      v-model="input.state"
      @change="isValidInput"
      @keyup.enter="attemptSearch"
    >
      <option
        v-for="state in states"
        :key="state.abbreviation"
        :value="state.abbreviation"
      >{{ state.abbreviation }}</option>
    </select>
    <button @click="attemptSearch">Get City Data</button>
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { capitalizeAllWords } from "@/mixins/utilities";
import { getEnergyUsageByCityAndState } from "@/api";
import { listOfStates } from "@/mixins/states";

export default {
  name: "Search",
  props: {
    cities: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      input: {
        city: "",
        state: ""
      },
      states: listOfStates,
      errorMessage: "",
      submitAttempted: false
    };
  },
  methods: {
    attemptSearch() {
      if (this.isValidSubmit()) {
        getEnergyUsageByCityAndState(this.input.city, this.input.state)
          .then(response => {
            const cityResponse = this.generateCityResponse(response);
            if (cityResponse) {
              this.emitCityAdded(cityResponse);
              this.clearInput();
            } else {
              this.errorMessage =
                "No energy usage found for this city - please try again";
            }
          })
          .catch(() => {
            this.errorMessage =
              "No energy usage found for this city - please try again";
          });
      }
    },
    isValidInput() {
      if (!this.submitAttempted) {
        this.errorMessage = "";
        return true;
      }
      if (!this.input.city || !this.input.state) {
        this.errorMessage = "Please enter a city & state";
        return false;
      }
      if (this.input.state.length !== 2) {
        this.errorMessage = "Please enter a valid state";
        return false;
      }
      this.errorMessage = "";
      return true;
    },
    isValidSubmit() {
      this.submitAttempted = true;
      if (!this.isValidInput()) {
        return false;
      }
      const { slug } = this.generateCityStateSlug();
      const cityExists = !!this.cities.find(city => city.slug === slug);
      if (cityExists) {
        this.errorMessage =
          "City is already in results. Try searching for something new?";
        return false;
      }
      this.errorMessage = "";
      return true;
    },
    generateCityStateSlug() {
      const { city, state } = this.input;
      const lowerCaseCity = city.toLowerCase();
      const capitalizedCity = capitalizeAllWords(lowerCaseCity);
      const slug = `${lowerCaseCity}-${state}`;
      return { lowerCaseCity, capitalizedCity, state, slug };
    },
    generateCityResponse(response) {
      if (response.data != null) {
        const { capitalizedCity, state, slug } = this.generateCityStateSlug();
        if (response.data.result && response.data.result[capitalizedCity]) {
          return {
            slug,
            name: capitalizedCity,
            state: state,
            energyUsage: response.data.result[capitalizedCity]
          };
        }
      }
    },
    emitCityAdded(newCityResponse) {
      this.$emit("cityAdded", newCityResponse);
    },
    clearInput() {
      this.input.city = "";
      this.input.state = "";
      this.errorMessage = "";
      this.submitAttempted = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
