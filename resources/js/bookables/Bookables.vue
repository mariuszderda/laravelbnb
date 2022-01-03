<template>
    <div>
        <div v-if="loading">
            Data is loading ...
        </div>
        <div v-else>
            <div class="row mb-4" v-for="row in rows" :key="'row' + row">
                <div class="col d-flex align-items-stretch" v-for="(bookable, column) in bookablesInRow(row)" :key="'row' + row + column">
                    <bookables-list-item v-bind="bookable"></bookables-list-item>
                </div>
                <div class="col" v-for="p in placeholderInRow(row)" :key="'placeholder' + row + p"></div>
            </div>
        </div>

    </div>
</template>

<script>
import BookablesListItem from "./BookablesListItem";

export default {
    name: "Bookables",
    components: {BookablesListItem},
    data() {
        return {
            bookables: null,
            loading: false,
            columns: 3,
        }
    },
    methods: {
        bookablesInRow(row) {
            return this.bookables.slice((row - 1) * this.columns, row * this.columns)
        },
        placeholderInRow(row) {
            return this.columns - this.bookablesInRow(row).length
        }
    },
    computed: {
        rows() {
            return this.bookables === null
                ? 0
                : Math.ceil(this.bookables.length / this.columns)
        }
    },
    created() {
        this.loading = true;

        axios
            .get('/api/bookables')
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Not Found')
                }
                this.bookables = res.data;
                this.loading = false;
            })
            .catch(err => console.log('Serwer nie dostępny', err))

        // setTimeout(() => {
        //     this.loading = false;
        //     this.bookables = [
        //         {
        //             title: "Cheap villa 1",
        //             content: "Very cheap villa",
        //             price: 1000,
        //         },
        //         {
        //             title: "Expensive villa 1",
        //             content: "Very expensive villa",
        //             price: 1500
        //         },
        //         {
        //             title: "Expensive villa 2",
        //             content: "Very expensive villa",
        //             price: 1500
        //         },
        //         {
        //             title: "Cheap villa2",
        //             content: "Very cheap villa",
        //             price: 1500
        //         },
        //         {
        //             title: "Cheap villa3",
        //             content: "Very cheap villa",
        //             price: 1500
        //         },
        //         {
        //             title: "Expensive villa 4",
        //             content: "Very expensive villa",
        //             price: 1500
        //         },
        //         {
        //             title: "Expensive villa 5",
        //             content: "Very expensive villa",
        //             price: 1500
        //         }
        //     ]
        // }, 2000)


    }
}
</script>

<style scoped>

</style>
