<template>
  <div class="search-result-chart">
    <ul>
      <li v-for="city in cities" :key="city.slug">
        {{ city.name }}
        {{ city.state }}
        {{ calculateGhgPerCapita(city, 'residential') }}
        {{ calculateGhgPerCapita(city, 'commercial') }}
        {{ calculateGhgPerCapita(city, 'industrial') }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchResultChart",
  props: {
    cities: {
      type: Array,
      required: true
    }
  },
  methods: {
    calculateGhgPerCapita(city, sector) {
      const population = city.energyUsage.residential.total_pop;
      const sectorUsage = city.energyUsage[sector];
      const electricityGhgLbs = sectorUsage["elec_lb_ghg"];
      const gasGhgLbs = sectorUsage["gas_lb_ghg"];
      const ghgLbsPerCapita = Math.round(
        (electricityGhgLbs + gasGhgLbs) / population
      );
      return `${ghgLbsPerCapita} lbs of ${sector} greenhouse gases, per capita`;
    }
  }
};
</script>

<style scoped lang="scss">
</style>
