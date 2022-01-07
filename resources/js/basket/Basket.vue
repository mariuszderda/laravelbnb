<template>
    <div>
        <success v-if="success">
            Congratulations on your purchase!
        </success>
        <div class="row" v-else>
            <div class="col-md-8" v-if="itemsInBasket">
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="first_name">First name</label>
                        <input type="text" class="form-control" name="first_name" id="first_name"
                               v-model="customer.first_name"
                               :class="[{ 'is-invalid': errorsFor('customer.first_name') }]"
                        />
                        <v-errors :errors="errorsFor('customer.first_name')"></v-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="last_name">Last name</label>
                        <input type="text" class="form-control" name="last_name" id="last_name"
                               v-model="customer.last_name"
                               :class="[{ 'is-invalid': errorsFor('customer.last_name') }]"
                        />
                        <v-errors :errors="errorsFor('customer.last_name')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 form-group">
                        <label for="email">Email:</label>
                        <input type="email" class="form-control" name="email" id="email" v-model="customer.email"
                               :class="[{ 'is-invalid': errorsFor('customer.email') }]"
                        />
                        <v-errors :errors="errorsFor('customer.email')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="street">Street</label>
                        <input type="text" class="form-control" id="street" v-model="customer.street"
                               :class="[{ 'is-invalid': errorsFor('customer.street') }]"
                        />
                        <v-errors :errors="errorsFor('customer.street')"></v-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="city">City</label>
                        <input type="text" class="form-control" id="city" v-model="customer.city"
                               :class="[{ 'is-invalid': errorsFor('customer.city') }]"
                        />
                        <v-errors :errors="errorsFor('customer.city')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="country">Country</label>
                        <input type="text" class="form-control" id="country" v-model="customer.country"
                               :class="[{ 'is-invalid': errorsFor('customer.country') }]"
                        />
                        <v-errors :errors="errorsFor('customer.country')"></v-errors>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="state">State</label>
                        <input type="text" class="form-control" id="state" v-model="customer.state"
                               :class="[{ 'is-invalid': errorsFor('customer.state') }]"
                        />
                        <v-errors :errors="errorsFor('customer.state')"></v-errors>
                    </div>
                    <div class="col-md-2 form-group">
                        <label for="zip_code">Zip</label>
                        <input type="text" class="form-control" id="zip_code" v-model="customer.zip_code"
                               :class="[{ 'is-invalid': errorsFor('customer.zip_code') }]"
                        />
                        <v-errors :errors="errorsFor('customer.zip_code')"></v-errors>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-12 form-group">
                        <button type="submit" class="btn btn-lg btn-primary btn-block" @click.prevent="book"
                                :disabled="sending">Book now
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-8" v-else>
                <div class="jumbotron jumbotron-fluid text-center">
                    <h1>Basket is empty</h1>
                </div>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">your cart</h6>
                    <h6 class="badge badge-pill badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">{{
                                itemsInBasket
                            }}
                    </span>
                        <span v-else>empty</span>
                    </h6>
                </div>
                <transition-group name="fade" tag="div">
                    <div class="" v-for="item in basket" :key="item.bookable.id">
                        <div class="pt-2 pb-2 border-top d-flex justify-content-between">
                        <span>
                            <router-link :to="{name: 'bookable', params: {id: item.bookable.id}}">
                                {{ item.bookable.title }}
                            </router-link>
                        </span>
                            <span class="font-weight-bolder">
                            $ {{ item.price.total }}
                        </span>
                        </div>
                        <div class="pt-2 pb-2 d-flex justify-content-between">
                        <span>
                            From {{ item.dates.from }}
                        </span>
                            <span class="">
                            To {{ item.dates.to }}
                        </span>
                        </div>
                        <div class="pt-2 pb-2 text-right">
                            <button class="btn btn-sm btn-outline-secondary"
                                    @click="$store.dispatch('removeFromBasket', item.bookable.id)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import validationErrors from "../shared/mixins/validationErrors";
import bookable from "../bookable/Bookable";

export default {
    name: "Basket",
    mixins: [validationErrors],
    data() {
        return {
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                street: null,
                city: null,
                country: null,
                state: null,
                zip_code: null,
            },
            sending: false,
            bookingAttempted: false

        }
    },
    computed: {
        ...mapGetters(['itemsInBasket']),
        ...mapState({
            basket: state => state.basket.items
        }),
        success() {
            return !this.sending && 0 === this.itemsInBasket && this.bookingAttempted
        }
    },
    methods: {
        async book() {
            this.sending = true;
            this.errors = null;
            this.bookingAttempted = false;

            try {
                await axios.post('/api/checkout', {
                    bookings: this.basket.map(basketItem => ({
                        bookable_id: basketItem.bookable.id,
                        from: basketItem.dates.from,
                        to: basketItem.dates.to,

                    })),
                    customer: this.customer
                })
                await this.$store.dispatch('clearBasket')
            } catch (error) {

                this.errors = error.response && error.response.data.errors
            }
            this.sending = false;
            this.bookingAttempted = true;

        }
    },
}
</script>

<style scoped>
h6.badge {
    font-size: 100%;
}

a {
    color: black;
}
</style>
