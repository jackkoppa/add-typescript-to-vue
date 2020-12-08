import axios from 'axios'

const baseCityUrl = 'https://developer.nrel.gov/api/cleap/v1'

// NOTE: If API ever fails, generate your own API key here:
// https://developer.nrel.gov/signup/
const demoApiKey = 'DEMO_KEY'

// Can uncomment for Jack's key, if requests get limited with DEMO
const apiKey = 'aWcNiqkAVeFiCXyjO4p6QwNzMDnTxd2VTOmTMwtn'

export const fetchEnergyUsageByCityAndState = (city, state) => {
	const energyUsageEndpoint = 'energy_expenditures_and_ghg_by_sector'
	const encodedCity = encodeURIComponent(city)
	const encodedState = encodeURIComponent(state)
	return axios.get(
		`${baseCityUrl}/${energyUsageEndpoint}` +
			`?city=${encodedCity}` +
			`&state_abbr=${encodedState}` +
			`&api_key=${apiKey || demoApiKey}`
	)
}

export const fetchNationalAverages = () => {
	const nationalAveragesEndpoint = 'electricity_and_gas_stats'
	return axios.get(
		`${baseCityUrl}/${nationalAveragesEndpoint}` + `?api_key=${apiKey || demoApiKey}`
	)
}
