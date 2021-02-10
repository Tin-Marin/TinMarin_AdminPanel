<template>
  <div>
    <table class="striped centered">
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
        <tr v-for="field of recommendedWebsites" :key="field.id">
          <td><input :value="field.id" /></td>
          <td><input :value="field.url" /></td>
          <td><input :value="field.image" /></td>
          <td><input :value="field.title" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  template: 'recommendedwebsitetable',
  data () {
    return {
      fields: ['ID', 'URL', 'Imagen', 'Título'],
      creationFields: ['URL', 'Imagen', 'Título'],
      recommendedWebsites: [
        {
          id: 1,
          url: 'URL 1',
          image: 'image1.jpg',
          title: 'título 1'
        },
        {
          id: 2,
          url: 'URL 2',
          image: 'image2.jpg',
          title: 'título 2'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
