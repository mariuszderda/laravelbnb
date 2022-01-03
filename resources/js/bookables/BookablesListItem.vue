<template>
    <div class="card w-100">
        <div class="card-body">
            <router-link class="card-title" :to="{ name: 'bookable', params: { id }}">
                <h5>
                    {{ title }}
                </h5>
            </router-link>
            <p class="card-text">{{ description }}</p>
            <p class="card-text">{{ price }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "BookablesListItem",
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 1500
        },
        id: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
