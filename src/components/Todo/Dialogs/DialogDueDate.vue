<template>
    <v-dialog
        ref="dialog"
        persistent
        width="290px"
        :value="true"
    >
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="updateTask"
          >
            OK
          </v-btn>
        </v-date-picker>
    </v-dialog>

</template>

<script>
export default {
    props: ['task'],
    data() {
        return {
            date: null
        }
    },

    methods: {
        updateTask() {
            let payload = {
                id: this.task.id,
                dueDate: this.date
            }
            this.$store.dispatch('updateTaskDueDate', payload)
            this.$emit('done-update')
        }
    },

    mounted() {
        if (this.task.dueDate) {
            this.date = this.task.dueDate
        }
    }
}
</script>

<style>

</style>