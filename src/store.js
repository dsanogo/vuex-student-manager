import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const errorSystem = {
  state: {
    msg: "Oops, Something went wrong.",
    display: false
  },
  mutations: {
    showError: (state, msg) => {
      state.display = true;
      state.msg = msg;
    }
  }
};

export default new Vuex.Store({
  state: {
    students: []
  },
  getters: {
    students: state =>
      state.students.map(student => ({
        ...student,
        fullName: student.firstName + " " + student.lastName
      })),
    findStudent: state => id =>
      state.students.find(student => student.id == id),
    isLoaded: state => !!state.students.length
  },
  mutations: {
    setStudents: (state, students) => {
      state.students = students;
    },
    addStudent: (state, student) => {
      state.students.push(student);
    },
    editStudent: (state, student) => {
      const index = state.students.findIndex(std => std.id == student.id);
      state.students[index] = student;
      Vue.set(state.students, index, student);
    }
  },
  actions: {
    async getStudents(context) {
      try {
        const students = (await axios.get("http://localhost:3000/students"))
          .data;
        context.commit("setStudents", students);
      } catch (error) {
        context.commit("showError", error);
      }
    },
    async storeStudent(context, newStudent) {
      const student = await axios.post(
        "http://localhost:3000/students",
        newStudent
      );

      context.commit("addStudent", student.data);
    },
    async updateStudent(context, { id, updatedStudent }) {
      const student = await axios.put(
        `http://localhost:3000/students/${id}`,
        updatedStudent
      );

      context.commit("editStudent", student.data);
    }
  },
  modules: {
    error: errorSystem
  }
});
