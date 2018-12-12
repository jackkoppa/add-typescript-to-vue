<template>
  <div class="search">
    <SearchBar :cities="cities" @cityAdded="addCity"/>
    <SearchResultChart :cities="cities"/>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import SearchResultChart from "@/components/SearchResultChart";

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
    addCity(newCityResponse) {
      this.cities.push(newCityResponse);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
