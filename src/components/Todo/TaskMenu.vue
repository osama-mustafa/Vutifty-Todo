<template>
    <div>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon color="primary">mdi-dots-vertical</v-icon>
            </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" @click="handleClick(index)">

                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <dialog-edit 
            v-if="dialogs.edit"
            :task="task" 
            @cancel-save="cancelSaveTitle"
            @done-update="closeEditDialog"
        />

        <dialog-due-date 
            v-if="dialogs.dueDate"
            :task="task"
            @cancel="closeDueDateDialog"
            @done-update="closeDueDateDialog"
        />

        <dialog-delete 
            v-if="dialogs.delete"
            :task="task" 
            @cancel="closeDialog"
        />

    </div>
</template>

<script>
export default {
    components: {
        'dialog-edit': require('@/components/Todo/Dialogs/DialogEdit.vue').default,
        'dialog-due-date': require('@/components/Todo/Dialogs/DialogDueDate.vue').default,
        'dialog-delete': require('@/components/Todo/Dialogs/DialogDelete.vue').default,
    },
    props: ['task'],
    data() {
        return {
            dialogs: {
                delete: false,
                edit: false,
                dueDate: false
            },

            items: [
                { 
                    title: "Edit",
                    icon:  'mdi-pencil',
                    click() {
                        this.dialogs.edit = true
                    }
                },
                { 
                    title: "Due date",
                    icon: 'mdi-calendar-range',
                    click() {
                        this.dialogs.dueDate = true
                    }
                },
                {
                    title: "Delete",
                    icon: 'mdi-delete',
                    click() {
                        this.dialogs.delete = true
                    }
                },
                {
                    title: "Sort",
                    icon: 'mdi-drag-horizontal-variant',
                    click() {
                        if (!this.$store.state.search) {
                            this.$store.commit("toggleSorting")
                        } else {
                            this.$store.commit('showSnackbar', 'Cannot sort while search')
                        }
                    }
                },

            ],

        };
    },

    methods: {
        handleClick(index) {
            this.items[index].click.call(this)
        },
        closeDialog() {
            this.dialogs.delete = false
        },
        cancelSaveTitle() {
            this.dialogs.edit = false
        },
        closeEditDialog() {
            this.dialogs.edit = false
        },
        closeDueDateDialog() {
            this.dialogs.dueDate = false
        }
    }

};
</script>

<style>
</style>