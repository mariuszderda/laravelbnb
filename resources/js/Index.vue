<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-white border-bottom navbar-light">
            <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">LaravelBnb</router-link>
<!--            <router-link :to="{name: 'second'}">second</router-link>-->
        </nav>
        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
export default {
    name: "Index"
}
</script>

<style scoped>

</style>
