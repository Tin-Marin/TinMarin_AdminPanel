<template>
  <div class="">
    <table class="striped centered responsive-table">
      <thead>
        <tr>
          <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          </td>
          <td v-for="(field, index) in creationFields" :key="index">
            <input type="text" :placeholder="field" required>
          </td>
        </tr>
        <tr v-for="field of educationAreas" :key="field.id">
          <td><input :value="field.id"/></td>
          <td><input :value="field.name"/></td>
          <td><textarea :value="field.description"></textarea></td>
          <td><input :value="field.images"/></td>
          <td><input :value="field.sponsorName"/></td>
          <td><input :value="field.sponsorLogo"/></td>
          <td><input :value="field.educationAreas"/></td>
          <td><input :value="field.minimunAge"/></td>
          <td><input :value="field.maximumAge"/></td>
          <td><input :value="field.duration"/></td>
          <td><input :value="field.capacity"/></td>
          <td><textarea :value="field.curiousInfo"></textarea></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// TODO: develop the picker for the educaction area

export default {
  template: 'exhibitiontable',
  data () {
    return {
      fields: ['ID', 'Nombre', 'Descripción', 'Imagen', 'Patrocinador', 'Imagen del patrocinador', 'Áreas de educación', 'Edad min.', 'Edad Max', 'Duración', 'Capacidad', 'Dato curioso'],
      creationFields: ['Nombre', 'Descripción', 'Imagen', 'Patrocinador', 'Imagen del patrocinador', 'Áreas de educación', 'Edad min.', 'Edad Max', 'Duración', 'Capacidad', 'Dato curioso'],
      educationAreas: [
        {
          id: 1,
          name: 'whatever',
          description: 'SIU',
          images: ['image.jpg'],
          sponsorName: ['sponsor'],
          sponsorLogo: ['sponsor.jpg'],
          educationAreas: ['area', 'de', 'educacion'],
          minimunAge: 4,
          maximumAge: 17,
          duration: 20,
          capacity: 20,
          curiousInfo: 'Dato curioso'
        },
        {
          id: 1,
          name: 'whatever',
          description: 'SIU',
          images: ['image.jpg'],
          sponsorName: ['sponsor'],
          sponsorLogo: ['sponsor.jpg'],
          educationAreas: ['area', 'de', 'educacion'],
          minimunAge: 4,
          maximumAge: 17,
          duration: 20,
          capacity: 20,
          curiousInfo: 'Dato curioso'
        }
      ]
    }
  }
}
</script>

<style scoped>
table {
  overflow-y: scroll;
  width: 400%;
}
.container {
  border: 2px solid gray;
  margin-top: 1%;
  width: 90%;
}
</style>
