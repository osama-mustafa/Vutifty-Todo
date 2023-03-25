<template>
    <v-dialog
        :value="true"
        persistent
        max-width="290"
    >

        <v-card>
            <v-card-title class="text-h5">
            Delete task?
            </v-card-title>

            <v-card-text>Are you sure you want to delete?</v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="$emit('cancel')"
            >
                No
            </v-btn>
            <v-btn
                @click="confirmDelete(task)"
                color="red darken-1"
                text
            >
                Yes
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
export default {
    props: ['task'],
    data() {
        return {
        }
    },
    methods: {
        confirmDelete(task) {
            this.$store.dispatch('deleteTask', task.id)
        },

        submit() {
            this.$emit('cancel')
        }

    }
}
</script>

<style>

</style>