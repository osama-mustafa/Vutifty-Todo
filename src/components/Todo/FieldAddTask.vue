<template>
        <v-text-field
            @keyup.enter="addTask"
            outlined
            label="Add Task"
            class="pa-3 add-task-field"
            hide-details
            clearable
            v-model="newTaskTitle"
        >
        <template v-slot:append>
            <v-icon 
                @click="addTask"
                :disabled="taskTitleInvalid"
            >
                mdi-plus
            </v-icon>
        </template>
        </v-text-field>
    </template>

</template>
<script>
export default {

    data() {
        return {
            newTaskTitle: "",
        }
    },

    computed: {
        taskTitleInvalid() {
            return this.newTaskTitle == "" 
        }
    },
    methods: {

        addTask() {
            if (!this.taskTitleInvalid) {
                this.$store.dispatch('addTask', this.newTaskTitle);
                this.newTaskTitle = '';
            }
        },  
    },
};
</script>

<style>
</style>