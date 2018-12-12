export const calculateGhgPerCapita = (cityResponse, sector = 'residential') => {
	const population = cityResponse.residential.total_pop
	const sectorUsage = cityResponse[sector]
	const electricityGhgLbs = sectorUsage.elec_lb_ghg
	const gasGhgLbs = sectorUsage.gas_lb_ghg
	const ghgLbsPerCapita = Math.round((electricityGhgLbs + gasGhgLbs) / population)
	return ghgLbsPerCapita
}

export const calculatedPercentOfMax = (city, citiesMaxGhg) => {
	return city.ghg / citiesMaxGhg
}

export const calculatedPercentDifferenceFromNational = (city, nationalAverageGhg) => {
	return (city.ghg - nationalAverageGhg) / nationalAverageGhg
}
