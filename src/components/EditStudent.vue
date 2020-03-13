<template>
  <div>
    <v-flex sm8 offset-sm2>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>Edit Student</v-toolbar-title>
        </v-toolbar>
        <Loader v-if="!isLoaded" />
        <v-form v-if="isLoaded">
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field
                  @input="updateFirstName"
                  :value="findStudent($route.params.id).firstName"
                  label="First Name"
                  required
                ></v-text-field>
                <v-text-field
                  @input="updateLastName"
                  :value="findStudent($route.params.id).lastName"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn @click="submit">submit</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <br />
    <Students />
  </div>
</template>

<script>
import axios from "axios";
import Students from "./Students";
import Loader from "./Loader";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      firstName: "",
      lastName: ""
    };
  },
  created() {},
  computed: {
    ...mapGetters(["isLoaded", "findStudent"])
  },
  methods: {
    async submit() {
      const student = this.findStudent(this.$route.params.id);
      const updatedStudent = {
        firstName: this.firstName || student.firstName,
        lastName: this.lastName || student.lastName
      };
      this.$store.dispatch("updateStudent", {
        id: this.$route.params.id,
        updatedStudent: updatedStudent
      });
      // axios.put(`http://localhost:3000/students/${this.$route.params.id}`, {
      //   firstName: this.student.firstName,
      //   lastName: this.student.lastName
      // });
    },
    updateFirstName: function(value) {
      this.firstName = value;
    },
    updateLastName: function(value) {
      this.lastName = value;
    }
  },
  components: {
    Students,
    Loader
  }
};
</script>