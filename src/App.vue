<script setup>
import MapComponent from './components/MapComponent.vue'
import SidePanel from './components/SidePanel.vue';
</script>

<template>
  <v-layout>
    <!--v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>App Bar</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar-->
    <v-navigation-drawer
      floating
      permanent
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      width="300"
    >
      <SidePanel />
      
    </v-navigation-drawer>
    <v-main>
      <MapComponent />
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>
