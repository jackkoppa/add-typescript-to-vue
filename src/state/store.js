import Vue from "vue";
import Vuex from "vuex";

import { national } from "@/state/modules/national";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    national
  }
});
