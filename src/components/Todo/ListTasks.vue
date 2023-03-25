<template>
    <v-list flat>
    <draggable
        v-model="tasks"
    >
        <task :task="task" v-for="task in tasks" :key="task.id" />
    </draggable>
    </v-list>

</template>

<script>
  import draggable from 'vuedraggable'

export default {
    methods: {
    },

    computed: {
        tasks: {
            get() {
                return this.$store.getters.filteredTasks
            },
            set(value) {
                this.$store.dispatch('setTasks', value)
            }
        }
    },

    components: {
        'task': require('@/components/Todo/Task.vue').default,
        draggable

    }
}
</script>

<style lang="sass">
</style>