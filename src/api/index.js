import axios from "axios";

const baseCityUrl = "https://developer.nrel.gov/api/cleap/v1";

// NOTE: If API ever fails, generate your own API key here:
// https://developer.nrel.gov/signup/
const apiKey = "DEMO_KEY";

export const fetchEnergyUsageByCityAndState = (city, state) => {
  const energyUsageEndpoint = "energy_expenditures_and_ghg_by_sector";
  const encodedCity = encodeURIComponent(city);
  const encodedState = encodeURIComponent(state);
  return axios.get(
    `${baseCityUrl}/${energyUsageEndpoint}` +
      `?city=${encodedCity}` +
      `&state_abbr=${encodedState}` +
      `&api_key=${apiKey}`
  );
};

export const fetchNationalAverages = () => {
  const nationalAveragesEndpoint = "electricity_and_gas_stats";
  return axios.get(
    `${baseCityUrl}/${nationalAveragesEndpoint}` + `?api_key=${apiKey}`
  );
};
