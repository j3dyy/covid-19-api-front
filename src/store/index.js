import {createStore} from "vuex";
import {statistics} from "./statistics.module.js";
import {auth} from "./auth.module.js";


const store = createStore({
    modules: {
        auth,
        statistics
    }
})

export default store;