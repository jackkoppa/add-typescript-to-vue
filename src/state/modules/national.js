import { fetchNationalAverages } from "@/api";

// TODO: Further test exact calculations for power <--> greenhouse gas ratios

// Average of 3 most observed ratios in testing responses: 1704.9, 1339.0, 1498.4
const lbsGhgPerMegaWattHourElectricity = (1704.9 + 1339.0 + 1498.4) / 3;

// Consistent across all responses
const lbsGhgPerThousandCubicFeetGas = 120.04;

export const state = {
  nationalAverages: null
};

export const getters = {
  nationalAverageGhg(state) {
    // Get the average national usage of electricity & gas, per capita
    if (state.nationalAverages == null) {
      return null;
    }
    const megaWattHoursElectricityPerCapita =
      state.nationalAverages.residential.elec_mwh_per_capita;
    const thousandCubicFeetGasPerCapita =
      state.nationalAverages.residential.gas_mcf_per_capita;

    // Determine the average pounds of greenhouse gas emissions, from electricity & gas
    // Using the constants defined above
    const electricityLbs =
      megaWattHoursElectricityPerCapita * lbsGhgPerMegaWattHourElectricity;
    const gasLbs =
      thousandCubicFeetGasPerCapita * lbsGhgPerThousandCubicFeetGas;

    // Return pounds of GHGs from electricity, plus punds of GHGs from gas
    return Math.round(electricityLbs + gasLbs);
  }
};

export const actions = {
  fetchNationalAverages({ commit }) {
    return fetchNationalAverages().then(response => {
      if (response.data && response.data.result) {
        commit("setNationalAverages", response.data.result);
      }
    });
  }
};

export const mutations = {
  setNationalAverages(state, nationalAverages) {
    state.nationalAverages = nationalAverages;
  }
};

export const national = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
