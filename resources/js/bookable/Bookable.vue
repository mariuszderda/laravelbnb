<template>

    <div v-else class="row">
        <div class="col-md-8 pb-4">
            <div class="card">
                <div class="card-body">
                    <div class="" v-if="!loading">
                        <h2>{{ bookable.title }}</h2>
                        <hr>
                        <article>
                            {{ bookable.description }}
                        </article>
                    </div>
                    <div v-else>
                        Data is loading ...
                    </div>
                </div>
            </div>
            <review-list :bookable-id="this.$route.params.id"></review-list>
        </div>
        <div class="col-md-4 pb-4">
            <availability :bookable-id="this.$route.params.id"
                          @availability="checkPrice($event)"
                          class="mb-4"></availability>
            <transition name="fade">
                <price-breakdown v-if="price" :price="price" class=""></price-breakdown>
            </transition>
            <transition name="fade">
                <button class="btn btn-outline-secondary btn-block" v-if="price">Book now</button>
            </transition>
        </div>
    </div>
</template>

<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";
import {mapState} from "vuex";
import PriceBreakdown from "./PriceBreakdown";

export default {
    name: "bookable",
    components: {PriceBreakdown, ReviewList, Availability},
    data() {
        return {
            bookable: null,
            loading: false,
            price: null
        }
    },
    created() {
        this.loading = true;
        axios
            .get(`/api/bookables/${this.$route.params.id}`)
            .then(res => {
                this.bookable = res.data;
                this.loading = false;

            })
    },
    computed: mapState({
        lastSearch: "lastSearch"
    }),
    methods: {
        async checkPrice(hasAvailability) {
            if (!hasAvailability) {
                this.price = null;
                return;
            }
            try {
                this.price = (await axios.get(`/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`)).data.data
            } catch (e) {
                this.price = null;
            }
        }
    }
}

</script>

<style scoped>

</style>
