import StatisticsService from "../services/statistics.service.js";

export const statistics = {
    namespaced: true,
    state: {countries:[], selectedCountry: null, error:null},
    actions: {
        countries({ commit }){
            StatisticsService.countryList().then(
                countries => {
                    commit('countryListSuccess', countries)
                },
                error => {
                    commit('errorOccurred', error)
                }
            )
        },
        country({ commit }, request){
            StatisticsService.country(request).then(
                country => {
                    commit('countryItemSuccess', country)
                },
                error => {
                    commit('errorOccurred', error)
                }
            )
        }
    },
    mutations:{
        countryListSuccess(state, countries){
            state.countries = countries.data.data
        },
        countryItemSuccess(state, country){
            state.selectedCountry = country.data
        },

        errorOccurred(state, error){
            state.error = error
        }
    }
}