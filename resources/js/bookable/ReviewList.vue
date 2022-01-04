<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder pt-4">
            Review List
        </h6>
        <div v-if="loading">Loading ...</div>
        <div v-else>
            <div class="border-bottom d-none d-md-block" v-for="(review, index) in reviews" :key="index">
                <div class="row pt-4">
                    <div class="col-md-6">Mariusz Derda</div>
                    <div class="col-md-6 d-flex justify-content-end">
                    <star-rating :value="review.rating" class="fa-lg"></star-rating>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">{{ review.created_at | fromNow }}</div>
                </div>
                <div class="row pt-4 pb-4">
                    <div class="col-md-12">{{ review.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ReviewList",
    props: {
        bookableId: [String, Number],
    },
    data() {
        return {
            reviews: null,
            loading: false,
        }
    },
    created() {
        this.loading = true;
        axios
            .get(`/api/bookables/${this.bookableId}/reviews`)
            .then(res => {
                this.reviews = res.data.data
            })
            .catch(e => {
                console.log(e)
            })
            .then(() => this.loading = false)
    }


}
</script>

<style scoped>

</style>
