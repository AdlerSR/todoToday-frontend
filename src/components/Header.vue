<template>
  <header>
    <div class="container">
      <h1>To-Do Today</h1>
      <div class="profile-container">
        <p>Adler Rodrigues</p>
        <img src="../assets/default.png" alt="user avatar">
      </div>
    </div>
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
  header {
    background-color: #e7eaec;
    padding: 10px 0px;
  }

  .container{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  header h1 {
    color: #6456f4;
    font-size: 27px;
  }

  header .profile-container {
    display: flex;
    align-items: center;
    justify-content: flex-end; 
  }

  header .profile-container p {
    color: #788896;
    font-weight: bold;
    margin-right: 10px;
  }

  header .profile-container img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 100%;
  }
</style>
