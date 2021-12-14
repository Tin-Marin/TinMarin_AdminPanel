<template>
  <div id="container">
    <div id="actions">
      <form action="#" class="row">
        <div class="col s4">
          <p>
            <label>
              <input @click="action(1)" name="group1" type="radio" />
              <span>Crear</span>
            </label>
          </p>
        </div>
        <div class="col s4">
          <p>
            <label>
              <input @click="action(2)" name="group1" type="radio" />
              <span>Editar</span>
            </label>
          </p>
        </div>
        <div class="col s4">
          <p>
            <label>
              <input @click="action(3)" name="group1" type="radio" />
              <span>Borrar</span>
            </label>
          </p>
        </div>
      </form>
    </div>
    <div id="content">
      <form v-show="creating || (editing && selected)" class="container">
        <div class="row">
          <div class="col s12">
            <select v-model="newQuiz.exhibition" required>
                <option v-for="(element, index) in educationAreas" :key="index" :value="element.name">{{element.name}}</option>
              </select>
          </div>
        <div class="row">
          <div class="col s12">
            <input
              type="text"
              placeholder="Pregunta"
              v-model="newQuiz.question"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col s3">
            <input
              type="number"
              placeholder="Número de Opciones"
              v-model.number="numberOfOptions"
              required
            />
          </div>
          <div class="col s9">
            <div>
              <input
                type="text"
                placeholder="Opcion"
                v-model="newQuiz.options[index]"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <textarea
              placeholder="Opcion correcta"
              v-model="newQuiz.correct_option"
            ></textarea>
          </div>
        </div>
        <a v-if="creating" class="waves-effect green btn" @click="createnewQuiz"
          >save</a
        >
        <a
          v-if="editing"
          class="waves-effect grey btn"
          @click="unselectToUpdate"
          >back</a
        >
        <a v-if="editing" class="blue darken-2 btn" @click="updateQuiz"
          >save</a
        >
      </form>
      <table class="striped centered">
        <thead>
          <tr v-show="deleting">
            <th>Delete</th>
            <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
          </tr>
          <tr v-show="editing && !selected">
            <th>Update</th>
            <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-show="deleting || (editing && !selected)"
            v-for="field of quizzes"
            :key="field._id"
          >
            <td>
              <i
                v-if="editing"
                class="material-icons"
                @click="selectToUpdate(field)"
                >create</i
              >
              <i
                v-if="deleting"
                class="material-icons red-text"
                @click="deleteQuiz(field)"
                >clear</i
              >
            </td>
            <td>{{ field._id }}</td>
            <td>{{ field.exhibition }}</td>
            <td>{{ field.question }}</td>
            <td>{{ field.options }}</td>
            <td>{{ field.correct_option }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  template: "quiztable",
  data() {
    return {
      creating: false,
      editing: false,
      deleting: false,
      selected: false,
      numberOfOptions: null,
      newQuiz: {
        question: "",
        options: [],
        correct_option: "",
        exhibition: "",
      },
      fields: ["ID", "Pregunta", "Opcion", "Opcion correcta", "Exhibiciones"],
      quizzes: [],
    };
  },
  methods: {
    action(option) {
      this.creating = false;
      this.editing = false;
      this.deleting = false;
      this.reseter();
      switch (option) {
        case 1:
          this.creating = true;
          break;
        case 2:
          this.editing = true;
          this.findQuizzes();
          break;
        case 3:
          this.deleting = true;
          this.findQuizzes();
          break;
      }
    },
    async retrieveExhibitions() {
      const response = await axios.get("/exhibitions");
      if (response.status === 200) this.exhibitions = response.data;
    },
    verifyExhibitions() {
      const fixedArray = this.newQuiz.exhibition.filter((value, index) => {
        return this.newQuiz.exhibition.indexOf(value) === index;
      });
      this.newQuiz.exhibition = fixedArray;
    },
    async createNewQuiz() {
      try {
        this.verifyExhibitions();
        const quiz = this.newQuiz;
        const response = await axios.post("/private/quizzes", quiz, {
          headers: this.$store.getters.getHeader,
        });
        if (response.data && response.status === 201) {
          this.reseter();
          await this.findQuizzes();
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push("/logout");
      }
    },
    async findQuizzes() {
      this.$store.dispatch("changeLoadingState");
      const quizzes = await axios.get("/quizzes");
      this.$store.dispatch("changeLoadingState");
      this.quizzes = quizzes.data;
    },
    async deleteQuiz(quiz) {
      try {
        const response = await axios.delete("/private/quizzes/" + quiz._id, {
          headers: this.$store.getters.getHeader,
        });
        if (response.status === 204) {
          await this.findQuizzes();
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push("/logout");
      }
    },
    selectToUpdate(quiz) {
      this.selected = true;
      this.newQuiz = quiz;
      this.numberOfOptions = quiz.options.length;
    },
    unselectToUpdate() {
      this.reseter();
      this.editing = true;
    },
    async updateQuiz() {
      try {
        const response = await axios.put(
          "/private/quizzes/" + this.newQuiz._id,
          this.newQuiz,
          {
            headers: this.$store.getters.getHeader,
          }
        );
        if (response.data === 200) {
          this.reseter();
          await this.findExhibitions();
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push("/logout");
      }
      this.unselectToUpdate();
    },
    reseter() {
      this.newQuiz = {
        question: "",
        options: [],
        correct_option: "",
        exhibition: "",
      };
      this.numberOfOptions = null;
    },
  },
  async mounted() {
    await this.findQuizzes();
    await this.retrieveExhibitions();
  },
};
</script>

<style scoped>
#container {
  margin-top: 140px;
}

#actions {
  background: white;
  position: fixed;
  width: 100%;
}

#content {
  margin-top: 60px;
  position: absolute;
  width: 100%;
  z-index: -10000;
}

select {
  display: initial;
}

table {
  overflow-y: scroll;
  width: 400%;
}

.btn {
  cursor: pointer;
  margin: 10px;
  position: inherit;
  width: 100px;
}

i {
  cursor: pointer;
}
</style>

<style scoped>
#container {
  margin-top: 140px;
}

#actions {
  background: white;
  position: fixed;
  width: 100%;
}

#content {
  margin-top: 60px;
  position: absolute;
  width: 100%;
  z-index: -10000;
}

select {
  display: initial;
}

table {
  overflow-y: scroll;
  width: 400%;
}

.btn {
  cursor: pointer;
  margin: 10px;
  position: inherit;
  width: 100px;
}

i {
  cursor: pointer;
}
</style>