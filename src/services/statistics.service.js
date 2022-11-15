import authHeader from "./auth-header.js";
import api from "./api.js";


class StatisticsService{

    countryList() {
        return api.get('statistics/countries', { headers: authHeader() });
    }

    country(request){
        return api.get( `statistics/country/${request.code}?page=${request.page}`, { headers: authHeader() });
    }
}

export default new StatisticsService()