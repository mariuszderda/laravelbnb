require('./bootstrap');
import VueRouter from 'vue-router';
import router from './routes'
import Vue from 'vue'
import Index from './Index'
import moment from "moment";
import FatalError from "./shared/components/FatalError";
import StarRating from "./shared/components/StarRating";
import ValidationErrors from "./shared/components/ValidationErrors";

Vue.use(VueRouter);

Vue.filter('fromNow', value => moment(value).fromNow())
Vue.component('star-rating', StarRating)
Vue.component('fatal-error', FatalError)
Vue.component('v-errors', ValidationErrors)

const app = new Vue({
    el: '#app',
    router,
    components: {
        index: Index,
    }
});
