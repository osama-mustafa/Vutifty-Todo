<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">

        <v-img
            height="130"
            src="mountains.jpg"
            gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
            class="pa-4 pt-4"
        >
            <v-avatar size="50" class="mb-2">
                <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="user"
                >
            </v-avatar>
            <div class="white--text text-subtitle-1 font-weight-bold">Your Name</div>
            <div class="white--text text-subtitle-1 font-weight-bold">Software Engineer</div>
        </v-img>
			<v-list dense nav>
				<v-list-item v-for="item in items" :key="item.title" link :to="item.to">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

    <v-app-bar
      color="primary"
      dark
      src="mountains.jpg"
      app
      prominent
      :height="$route.name === 'home' ? 238 : '170'"
    >
        <template v-slot:img="{ props }">
            <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
            ></v-img>
        </template>

        <v-container class="pa-0 header-container">
            <v-row>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
            </v-row>
            <v-row>
                <v-app-bar-title class="text-h4 ml-4">
                   {{ $store.state.appTitle }}
                </v-app-bar-title>
            </v-row>
            <v-row>
                <live-date-time />
            </v-row>
            <v-row>
                <field-add-task v-if="$route.name === 'home'" />
            </v-row>
        </v-container>


        <search />
    </v-app-bar>

		<v-main>
			<router-view>
			</router-view>
            <snackbar />
		<!--  -->
		</v-main>
	</v-app>
</template>

<script>
export default {

    components: { 
        'snackbar': require('@/components/Shared/Snackbar.vue').default,
        'search': require('@/components/Tools/Search.vue').default,
        'live-date-time': require('@/components/Tools/LiveDateTime.vue').default,
        'field-add-task': require('@/components/Todo/FieldAddTask.vue').default
    },

    data() {
        return {
            drawer: null,
            items: [
                { title: "Todo", icon: "mdi-list-box", to: "/" },
                { title: "About", icon: "mdi-help-box", to: "/about" },
            ],
        };
    },

    mounted() {
        this.$store.dispatch('getTasks');
    }
};
</script>
<style lang="sass">
    .header-container 
        max-width: none !important
        
</style>
