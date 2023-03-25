import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'
let db = new Localbase('db')
db.config.debug = false


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        search: null,
        appTitle: process.env.VUE_APP_TITLE,
        tasks: [],
        snackbar: {
            show: false,
            message: "",
        },
        sorting: false
    },

    mutations: {
        
        addTask(state, newTask) {
            state.tasks.push(newTask)
        },


        doneTask(state, id) {
            let task = state.tasks.filter(task => task.id === id)[0]
            task.done = ! task.done
        },

        deleteTask(state, id) {
            state.tasks = state.tasks.filter(task => task.id !== id)
        },

        showSnackBar(state, message) {
            let timeout = 0;
            if (state.snackbar.show = true) {
                state.snackbar.show = false
                timeout = 300
            }
            setTimeout(() => {
                state.snackbar.show = true
                state.snackbar.message = message
            }, 300)
        },

        hideSnackBar(state) {
            state.snackbar.show = false
        },

        updateTaskTitle(state, payload) {
            let task = state.tasks.filter(task => task.id === payload.id)[0]
            task.title = payload.title
        },

        updateTaskDueDate(state, payload) {
            let task = state.tasks.filter(task => task.id === payload.id)[0]
            task.dueDate = payload.dueDate
        },

        setSearch(state, value) {
            state.search = value
        },

        toggleSorting(state) {
            state.sorting = !state.sorting
        },

        setTasks(state, tasks) {
            state.tasks = tasks
        },

    },

    actions: {
        
        addTask({commit}, newTaskTitle) {
            let newTask = {
                id: Date.now(),
                title: newTaskTitle,
                done: false,
                dueDate: null
            }
            db.collection('tasks').add(newTask).then(() => {
                commit('addTask', newTask);
                commit('showSnackBar', 'Task added!')    
            })
        },

        deleteTask({ commit }, id) {
            db.collection('tasks').doc({id: id}).delete().then(() => {
                commit('deleteTask', id)
                commit('showSnackBar', 'Task deleted!')
            })
        },

        updateTaskTitle({ commit }, payload) {
            db.collection('tasks').doc({id: payload.id}).update({
                title: payload.title
            }).then(() => {
                commit('updateTaskTitle', payload)
                commit('showSnackBar', 'Task updated!')    
            })
        },

        updateTaskDueDate({commit}, payload) {
            db.collection('tasks').doc({id: payload.id}).update({
                dueDate: payload.dueDate
            }).then(() => {
                commit('updateTaskDueDate', payload)
                commit('showSnackBar', 'Due date updated!')
            })
        },

        getTasks({commit}) {
            db.collection('tasks').get().then(tasks => {
                commit('setTasks', tasks)
            })
        },

        setTasks({commit}, payload) {
            db.collection('tasks').set(payload)
                commit('setTasks', tasks)
        },

        doneTask({state, commit}, id) {
            let task = state.tasks.filter(task => task.id === id)[0]
            db.collection('tasks').doc({id: id}).update({
               done : !task.done,
           }).then(() => {
             commit('doneTask', id)
           })
        }

    },

    getters: {
        filteredTasks(state) {
            if (!state.search) {
                return state.tasks
            }
            return state.tasks.filter(task => 
                task.title.toLowerCase().includes(state.search.toLowerCase()))
        }
    },
})
