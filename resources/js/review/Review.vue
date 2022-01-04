<template>
    <div>
        <fatal-error v-if="error"></fatal-error>
        <div class="row" v-else>
            <div :class="[{ 'col-md-4': twoColumn }, { 'd-none': oneColumn }]">
                <div class="card">
                    <div class="card-body" v-if="loading">Loading ...</div>
                    <div class="p-3" v-if="hasBooking">
                        <p>
                            Stayed at
                            <router-link
                                :to="{
                  name: 'bookable',
                  params: { id: booking.bookable.bookable_id },
                }"
                            >
                                {{ booking.bookable.title }}
                            </router-link>
                        </p>
                        <p>From {{ booking.from }} to {{ booking.to }}</p>
                    </div>
                </div>
            </div>
            <div :class="[{ 'col-md-8': twoColumn }, { 'col-md-12': oneColumn }]">
                <div class="" v-if="loading">Loading ...</div>
                <div v-else>
                    <div class="" v-if="alreadyReviewed">
                        <h3>You've already left a review for this booking.</h3>
                    </div>
                    <div class="" v-else>
                        <div class="form-group">
                            <label class="text-muted"
                            >Select the star rating (1 is worst - 5 is best)</label
                            >
                            <star-rating class="fa-3x" v-model="review.rating"></star-rating>
                        </div>
                        <div class="form-group">
                            <label for="content" class="text-muted"
                            >Describe your expirience with</label
                            >
                            <textarea
                                name="content"
                                id="content"
                                cols="30"
                                rows="10"
                                class="form-control"
                                v-model="review.content"
                                :class="[{ 'is-invalid': errorsFor('content') }]"
                            ></textarea>
                            <v-errors :errors="errorsFor('content')"></v-errors>
                        </div>
                        <button
                            class="btn btn-lg btn-primary btn-block"
                            @click.prevent="sendReview"
                            :disabled="sending"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {is404, is422} from "../shared/utils/response";

export default {
    name: "Rating",
    data() {
        return {
            review: {
                id: null,
                rating: 5,
                content: null,
            },
            existingReview: null,
            loading: false,
            booking: null,
            error: false,
            errors: null,
            sending: false,
        };
    },
    created() {
        this.review.id = this.$route.params.id;
        this.loading = true;
        axios
            .get(`/api/reviews/${this.review.id}`)
            .then((response) => (this.existingReview = response.data.data))
            .catch((err) => {
                if (is404(err)) {
                    return axios
                        .get(`/api/booking-by-review/${this.review.id}`)
                        .then((response) => {
                            this.booking = response.data.data;
                        })
                        .catch((err) => (this.error = !is404(err)));
                }
                this.error = true;
            })
            .then(() => {
                this.loading = false;
            });
    },
    methods: {
        sendReview() {
            this.sending = true;
            axios
                .post(`/api/reviews`, this.review)
                .then((res) => console.log(res))
                .catch((err) => {
                    if (is422(err)) {
                        const errors = err.response.data.errors;

                        if (errors["content"] && 1 === _.size(errors)) {
                            this.errors = errors;
                            return;
                        }
                        return;
                    }
                    this.error = true;
                })
                .then(() => (this.sending = false));
        },
        errorsFor(field) {
            return null !== this.errors && this.errors[field]
                ? this.errors[field]
                : null;
        },
    },
    computed: {
        alreadyReviewed() {
            return this.hasReview || !this.booking;
        },
        hasReview() {
            return this.existingReview !== null;
        },
        hasBooking() {
            return this.booking !== null;
        },
        oneColumn() {
            return !this.loading && this.alreadyReviewed;
        },
        twoColumn() {
            return this.loading || !this.alreadyReviewed;
        },
    },
};
</script>

<style scoped>
.form-control.is-invalid ~ div > .invalid-feedback {
    display: block;
}
</style>
