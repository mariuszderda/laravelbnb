<template>
    <div class="error text-center">
        <i class="fa fa-bomb"></i>
        <h1 class="mt-4">
            We've encountered a problem
        </h1>
        <h2>
            Unfortunately we cannot proceed
        </h2>
    </div>
</template>

<script>
export default {
    name: "FatalError"
}
</script>

<style scoped>
.error {
    color: #999;
    font-size: 10rem;
}
</style>
