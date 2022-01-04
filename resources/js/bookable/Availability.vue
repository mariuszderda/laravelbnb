<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Availability
            <transition name="fade">
            <span v-if="noAvailability" class="text-danger text-uppercase"
            >(Not Availability)</span
            >
                <span v-if="hasAvailability" class="text-success text-uppercase"
                >(Availability)</span
                >
            </transition>
        </h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input
                    v-model="from"
                    type="text"
                    id="from"
                    name="from"
                    class="form-control form-control-sm"
                    placeholder="Start date"
                    @keyup.enter="check"
                    :class="[{ 'is-invalid': errorsFor('from') }]"
                />
                <v-errors :errors="errorsFor('from')"></v-errors>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                    v-model="to"
                    type="text"
                    id="to"
                    name="to"
                    class="form-control form-control-sm"
                    placeholder="Start date"
                    @keyup.enter="check"
                    :class="[{ 'is-invalid': errorsFor('to') }]"
                />
                <v-errors :errors="errorsFor('from')"></v-errors>
            </div>
        </div>
        <button
            class="btn btn-secondary btn-block"
            @click="check"
            :disabled="loading"
        >
            <span v-if="!loading">Check</span>
            <span v-if="loading">
                <i class="fas fa-circle-notch fa-spin"></i>
                Checking...
            </span>
        </button>
    </div>
</template>

<script>
import Index from "../Index";
import {is422} from "../shared/utils/response";
import validationErrors from "../shared/mixins/validationErrors";

export default {
    name: "Availability",
    components: {Index},
    mixins: [validationErrors],
    props: {
        bookableId: [String, Number],
    },
    data() {
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            loading: false,
            status: null,
            price: null,
        };
    },
    methods: {
        async check() {
            this.loading = true;
            this.errors = null;

            await this.$store.dispatch('setLastSearch', {
                from: this.from,
                to: this.to
            })

            try {
                this.status = (await axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)).status
                this.$emit('availability', this.hasAvailability);
            } catch (e) {
                if (is422(e)) {
                    this.errors = e.response.data.errors;
                }
                this.status = e.response.status;
                this.$emit('availability', this.hasAvailability);
            }
          this.loading = false;
        },
    },
    computed: {
        hasErrors() {
            return 422 === this.status && this.errors !== null;
        },
        hasAvailability() {
            return 200 === this.status;
        },
        noAvailability() {
            return 404 === this.status;
        },
    },
};
</script>

<style scoped>

.is-invalid {
    border-color: #b22222;
    background-image: none;
}

</style>
