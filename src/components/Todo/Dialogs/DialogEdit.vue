<template>
    <v-dialog
        :value="true"
        persistent
        max-width="290"
    >
        <v-card>
            <v-card-title class="text-h5">
                Edit Task
            </v-card-title>

            <v-card-text>
                Edit the task title
                <v-text-field 
                    v-model="newTaskTitle"
                    @keyup.enter="confirmSave" />
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="$emit('cancel-save')"
                >
                    Cancel
                </v-btn>
                <v-btn
                    @click="confirmSave"
                    color="red darken-1"
                    text
                    :disabled="taskTitleInvalid"
                >
                    Save
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
            newTaskTitle: null,
        }
    },
    computed: {
        taskTitleInvalid() {
            return !this.newTaskTitle || this.newTaskTitle === this.task.title
        }
    },
    methods: {
        confirmSave() {
            if (!this.taskTitleInvalid) {
                let payload = {
                    id: this.task.id,
                    title: this.newTaskTitle
                }
                this.$store.dispatch('updateTaskTitle', payload)
                this.$emit("done-update")
                this.$vutify.goTo(0, {
                    duration: 0
                })
            }
        },

        submit() {
            this.$emit('cancelSave')
        }

    },
    mounted() {
        this.newTaskTitle = this.task.title
    }
}
</script>

<style>

</style>