export default {
    data() {
        return {
            errors: null
        }
    },
    methods: {
        errorsFor(field) {
            return null !== this.errors && this.errors[field] ? this.errors[field] : null;
        },
    }
}
