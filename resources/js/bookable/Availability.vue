<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Availability
            <span v-if="noAvailability" class="text-danger text-uppercase"
            >(Not Availability)</span
            >
            <span v-if="hasAvailability" class="text-success text-uppercase"
            >(Availability)</span
            >
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
            Check
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
            from: null,
            to: null,
            loading: false,
            status: null,
        };
    },
    methods: {
        check() {
            this.loading = true;
            this.errors = null;
            axios
                .get(
                    `/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
                )
                .then((res) => {
                    this.status = res.status;
                })
                .catch((e) => {
                    if (is422(e)) {
                        this.errors = e.response.data.errors;
                    }
                    this.status = e.response.status;
                })
                .then(() => (this.loading = false));
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
