<template>
  <v-flex sm8 offset-sm2>
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Students</v-toolbar-title>
      </v-toolbar>
      <Loader v-if="!$store.getters.isLoaded" />
      <v-list v-if="$store.getters.isLoaded">
        <v-list-tile
          v-for="(student) in $store.getters.students"
          :to="'editStudent/' + student.id"
          :key="student.id"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="student.fullName"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState } from "vuex";
import Loader from "./Loader";
export default {
  data() {
    return {};
  },
  components: {
    Loader
  },
  computed: mapState({
    students: state => state.students
  }),
  async created() {}
};
</script>