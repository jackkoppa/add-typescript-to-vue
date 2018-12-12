<template>
  <div class="search">
    <SearchBar :cities="cities" @cityAdded="addCity"/>
    <SearchResultChart :cities="cities" @cityDeleted="deleteCity"/>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

import SearchBar from "@/components/SearchBar";
import SearchResultChart from "@/components/SearchResultChart";

const defaultNationalCity = {
  slug: "national",
  name: "National Average",
  ghg: null
};

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
  computed: {
    ...mapState("national", ["nationalAverages"]),
    ...mapGetters("national", ["nationalAverageGhg"])
  },
  watch: {
    nationalAverageGhg() {
      if (!this.cities.find(city => city.slug === "national")) {
        this.cities.push(
          Object.assign(defaultNationalCity, { ghg: this.nationalAverageGhg })
        );
      }
    }
  },
  methods: {
    ...mapActions("national", ["fetchNationalAverages"]),
    addCity(newCityResponse) {
      this.cities.push(newCityResponse);
    },
    deleteCity(slug) {
      this.cities = this.cities.filter(city => city.slug !== slug);
    }
  },
  mounted() {
    if (this.nationalAverages == null) {
      this.fetchNationalAverages();
    }
  }
};
</script>

<style scoped lang="scss">
</style>
