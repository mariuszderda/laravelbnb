require('./bootstrap');
import VueRouter from 'vue-router';
import router from './routes'
import Vue from 'vue'
import Vuex from 'vuex'
import Index from './Index'
import moment from "moment";
import FatalError from "./shared/components/FatalError";
import Success from "./shared/components/Success";
import StarRating from "./shared/components/StarRating";
import ValidationErrors from "./shared/components/ValidationErrors";
import storeDefinition from './store'

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter('fromNow', value => moment(value).fromNow())
Vue.component('star-rating', StarRating)
Vue.component('fatal-error', FatalError)
Vue.component('success', Success)
Vue.component('v-errors', ValidationErrors)

const store = new Vuex.Store(storeDefinition)

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        index: Index,
    },
    beforeCreate() {
        this.$store.dispatch('loadStoredState')
    }
});
