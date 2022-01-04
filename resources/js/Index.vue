<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-white border-bottom navbar-light">
            <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">LaravelBnb</router-link>
                        <router-link class="nav-item text-secondary d-flex align-items-center" :to="{name: 'home'}">
                            <span>Basket</span>
                            <span v-if="itemsInBasket" class="badge badge-pill badge-secondary align-self-start ml-1">{{ itemsInBasket }}</span>
                        </router-link>
        </nav>
        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>
</div>

</template>

<script>
import {mapState, mapGetters} from "vuex";

export default {
    name: "Index",
    computed: {
        ...mapState({
                lastSearchComputed: 'lastSearch'
            }),
        ...mapGetters({
            itemsInBasket: 'itemsInBasket'
        })
    }

}
</script>

<style scoped>

</style>
