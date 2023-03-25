<template>
        <div>
            <v-list-item 
                @click="doneTask(task.id)"
                :class="{'blue lighten-5' : task.done}"
                :ripple="false"
                class="white"
            >
                <template v-slot:default>
                    <v-list-item-action>
                        <v-checkbox
                            :input-value="task.done"
                            color="primary"
                        ></v-checkbox>
                    </v-list-item-action>

                    <!-- Task title -->
                    <v-list-item-content>
                        <v-list-item-title :class="{'text-decoration-line-through': task.done}">
                            {{ task.title }}
                        </v-list-item-title>
                    </v-list-item-content>


                    <!-- Task date -->
                    <v-list-item-action v-if="task.dueDate">
                        <v-list-item-action-text>
                            <v-icon small> mdi-calendar</v-icon>
                            {{ task.dueDate | niceDate }}
                        </v-list-item-action-text>
                    </v-list-item-action>

                    <!-- Task actions -->
                    <v-list-item-action>
                        <task-menu :task="task" />
                    </v-list-item-action>

                    <!-- Drag and Sort -->
                    <v-list-item-action v-if="$store.state.sorting" class="handle">
                        <v-btn color="primary" icon>
                            <v-icon>
                                mdi-drag-horizontal-variant
                            </v-icon>
                        </v-btn>
                    </v-list-item-action>


                </template>
            </v-list-item>
            <v-divider></v-divider>
        </div>
</template>

<script>
import { format } from 'date-fns'
export default {

    props: ['task'],

    components: {
        'task-menu': require('@/components/Todo/TaskMenu.vue').default
    },

    methods: {

        doneTask(id) {
            this.$store.dispatch('doneTask', id)
        },

        deleteTask(id) {
            this.$store.dispatch('deleteTask', id)
        },

        closeDialog() {
            this.dialogs.delete = false
        }
    },

    filters: {
        niceDate(value) {
            return format(new Date(value), 'MMM d')
        }
    }
}
</script>
<style lang="sass">
    .sortable-ghost
        opacity: 0
    .sortable-drag
        box-shadow: rgba(0, 0, 0, 0.3)
</style>
