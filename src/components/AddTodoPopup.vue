<template>
  <header>
    <form>
      <h1>Add To-Do</h1>
      <label for="title">Title:</label>
      <input type="text" name="title" id="title" v-model="title">
      <label for="content">Content:</label>
      <input type="text" name="content" id="content" v-model="content">
      <button v-on:click.prevent="handleNewTodo">Enviar :)</button>
    </form>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {

  },
})

export default class Header extends Vue {

}
</script>

<style scoped>

</style>
