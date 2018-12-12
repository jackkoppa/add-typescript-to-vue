<template>
	<div class="search-bar">
		<div class="form-control">
			<label class="form-control__label" for="city">City</label>
			<input
				type="text"
				id="city"
				class="form-control__input"
				:placeholder="placeholder"
				v-model.trim="input.city"
				@keyup.enter="attemptSearch"
				@input="isValidInput"
			>
		</div>
		<div class="form-control">
			<label class="form-control__label" for="state">State</label>
			<select
				name="state"
				id="state"
				class="form-control__select"
				v-model="input.state"
				@change="isValidInput"
				@keyup.enter="attemptSearch"
			>
				<option
					v-for="state in states"
					:key="state.abbreviation"
					:value="state.abbreviation"
				>{{ state.abbreviation }}</option>
			</select>
		</div>
		<button class="form-button" @click="attemptSearch">Get Emissions Data</button>
		<br>
		<span class="error-message" v-if="errorMessage">{{ errorMessage }}</span>
	</div>
</template>

<script>
import { calculateGhgPerCapita } from '@/mixins/calculation'
import { capitalizeAllWords } from '@/mixins/utilities'
import { fetchEnergyUsageByCityAndState } from '@/api'
import { listOfStates } from '@/mixins/states'

export default {
	name: 'SearchBar',
	props: {
		cities: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			input: {
				city: '',
				state: ''
			},
			states: listOfStates,
			placeholder: 'Enter City',
			errorMessage: '',
			submitAttempted: false
		}
	},
	methods: {
		attemptSearch() {
			if (this.isValidSubmit()) {
				fetchEnergyUsageByCityAndState(this.input.city, this.input.state)
					.then(response => {
						const cityResponse = this.generateCityResponse(response)
						if (cityResponse) {
							this.emitCityAdded(cityResponse)
							this.clearInput()
						} else {
							this.errorMessage = 'No energy usage found for this city - please try again'
						}
					})
					.catch(() => {
						this.errorMessage = 'No energy usage found for this city - please try again'
					})
			}
		},
		isValidInput() {
			const correctStateLength = 2;
			if (!this.submitAttempted) {
				this.errorMessage = ''
				return true
			}
			this.input.city = this.input.city.trim()
			if (!this.input.city || !this.input.state) {
				this.errorMessage = 'Please enter a city & state'
				return false
			}
			if (this.input.state.length !== correctStateLength) {
				this.errorMessage = 'Please enter a valid state'
				return false
			}
			this.errorMessage = ''
			return true
		},
		isValidSubmit() {
			this.submitAttempted = true
			if (!this.isValidInput()) {
				return false
			}
			const { slug } = this.generateCityStateSlug()
			const cityExists = !!this.cities.find(city => city.slug === slug)
			if (cityExists) {
				this.errorMessage = 'City is already in results. Try searching for something new?'
				return false
			}
			this.errorMessage = ''
			return true
		},
		generateCityStateSlug() {
			const { city, state } = this.input
			const lowerCaseCity = city.toLowerCase()
			const capitalizedCity = capitalizeAllWords(lowerCaseCity)
			const slug = `${lowerCaseCity}-${state}`
			return { lowerCaseCity, capitalizedCity, state, slug }
		},
		generateCityResponse(response) {
			if (response.data != null) {
				const { capitalizedCity, state, slug } = this.generateCityStateSlug()
				if (response.data.result && response.data.result[capitalizedCity]) {
					const cityResponse = response.data.result[capitalizedCity]
					return {
						slug,
						name: capitalizedCity,
						state,
						ghg: calculateGhgPerCapita(cityResponse)
					}
				}
			}
		},
		emitCityAdded(newCityResponse) {
			this.$emit('cityAdded', newCityResponse)
		},
		clearInput() {
			this.input.city = ''
			this.input.state = ''
			this.errorMessage = ''
			this.submitAttempted = false
		}
	}
}
</script>

<style lang="scss">
@import "@/styles/_variables.scss";

.search-bar {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
}

.form-control {
	display: flex;
	flex-wrap: wrap;
	font-size: $baseFontSize;

	&__label {
		padding: $spacer/2 0;
		flex: 1 0 100%;
		text-align: left;
	}

	&__input {
		font-size: $baseFontSize;
		height: $baseFontSize + $spacer;
		padding: 0 $spacer/2;
	}

	&__select {
		font-size: $baseFontSize;
	}
}

.form-button {
	font-size: $baseFontSize;
	padding: $spacer/2 $spacer;
	align-self: flex-end;
	margin-top: $spacer;
}

.error-message {
	color: $cDarkRed;
	display: block;
	font-weight: bold;
	padding: $spacer;
	flex: 1 0 100%;
}
</style>
