<template>
  <div>
    <h3>annual lbs of greenhouse gases (GHG) per capita</h3>
    <transition-group name="search-result-chart" tag="ul">
      <SearchResultChartItem
        v-for="city in sortedCities"
        class="search-result-chart__item"
        :key="city.slug"
        :city="city"
        :cities-max-ghg="citiesMaxGhg"
        @cityDeleted="deleteCity"
      />
      <SearchResultChartItem
        v-if="nationalAverageGhg != null"
        key="national"
        :city="{}"
        :cities-max-ghg="citiesMaxGhg"
        :is-national-average="true"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import SearchResultChartItem from "@/components/SearchResultChartItem";

export default {
  name: "SearchResultChart",
  components: {
    SearchResultChartItem
  },
  props: {
    cities: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters("national", ["getNationalResidentalAverageGhgPerCapita"]),
    nationalAverageGhg() {
      return this.getNationalResidentalAverageGhgPerCapita;
    },
    citiesWithGhg() {
      return this.cities.map(city =>
        Object.assign(city, {
          ghg: this.calculateGhgPerCapita(city, "residential")
        })
      );
    },
    citiesMaxGhg() {
      const ghgValues = this.citiesWithGhg.map(city => city.ghg);
      ghgValues.push(this.nationalAverageGhg);
      return Math.max(...ghgValues);
    },
    sortedCities() {
      const citiesWithGhg = Array.from(this.citiesWithGhg);
      return citiesWithGhg.sort((cityA, cityB) => cityA.ghg - cityB.ghg);
    }
  },
  methods: {
    calculateGhgPerCapita(city, sector) {
      const population = city.energyUsage.residential.total_pop;
      const sectorUsage = city.energyUsage[sector];
      const electricityGhgLbs = sectorUsage.elec_lb_ghg;
      const gasGhgLbs = sectorUsage.gas_lb_ghg;
      const ghgLbsPerCapita = Math.round(
        (electricityGhgLbs + gasGhgLbs) / population
      );
      return ghgLbsPerCapita;
    },
    deleteCity(slug) {
      this.$emit("cityDeleted", slug);
    }
  }
};
</script>

<style scoped lang="scss">
.search-result-chart__item {
  transition: all 1s;
}
.search-result-chart-enter,
.search-result-chart-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.search-result-chart-leave-active {
  position: absolute;
}
</style>
