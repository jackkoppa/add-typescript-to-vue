import axios from "axios";

const baseCityUrl = "https://developer.nrel.gov/api/cleap/v1/";
const apiKey = "DEMO_KEY";

export const getEnergyUsageByCityAndState = (city, state) => {
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
