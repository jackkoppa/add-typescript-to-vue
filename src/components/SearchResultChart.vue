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
    ...mapGetters("national", ["nationalAverageGhg"]),
    citiesMaxGhg() {
      const ghgValues = this.cities.map(city => city.ghg);
      return Math.max(...ghgValues);
    },
    sortedCities() {
      const citiesClone = Array.from(this.cities);
      return citiesClone.sort((cityA, cityB) => cityA.ghg - cityB.ghg);
    }
  },
  methods: {
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
