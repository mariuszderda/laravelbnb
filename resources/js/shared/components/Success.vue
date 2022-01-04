<template>
    <div class="error text-center">
        <i class="far fa-thumbs-up"></i>
        <h1 class="mt-4">
            Success!
        </h1>
        <h2>
            <slot></slot>
        </h2>
    </div>
</template>

<script>
export default {
    name: "Success"
}
</script>

<style scoped>
.error {
    color: #999;
    font-size: 10rem;
}
</style>
