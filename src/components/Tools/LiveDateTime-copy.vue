<template>
    <div class="text-subtitle-1 ml-4">
        {{ date }}
    </div>
</template>

<script>
import { format } from 'date-fns'

export default {
    data() {
        return {
            date: '',
        }
    },

    methods: {
        getDate() {
            this.date = format(new Date(), 'MMMM d, hh:mm:ss')   
        }
    },

    mounted() {
        this.date = setInterval(() => this.getDate(), 100)
    }
}
</script>

<style>

</style>