<template>
  <header>
    <div class="container">
      <router-link to="/home">To-Do Today</router-link>
      <div class="profile-container">
        <p>{{user.name}}</p>
        <span @click="openDropdown">
          <img v-if="!user.avatar" src="../assets/default.png" alt="user avatar">
          <img v-else-if="!this.host" :src="`https://todotodayback.herokuapp.com/files/${user.avatar}`"  alt="user avatar" />
          <img v-else :src="`http://localhost:3333/files/${user.avatar}`" alt="user avatar">
        </span>
        <div class="dropdown" v-bind:class="[this.$store.state.dropdownState]">
          <router-link to="/home" v-on:click.native="closePopup">Home</router-link>
          <router-link to="/profile" v-on:click.native="closePopup">Profile</router-link>
          <p @click="logout">Logout</p>
        </div>
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

  $api:any;
  user: Array<object> = [];
  host: string = process.env.VUE_APP_AXIOS_URL;

  mounted() {
    this.handleUserInfo();
  }

  public async handleUserInfo(){
    const token = localStorage.getItem('@todoToday:token');

    const res = await this.$api.get('/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    this.user = res.data
  }

  public openDropdown(){
    if (this.$store.state.dropdownState === 'disable'){
      this.$store.commit('changeDropdown', 'enable');
    } else {
      this.$store.commit('changeDropdown', 'disable');
    }
  }

  public closePopup() {
    this.$store.commit('changeDropdown', 'disable');
  }

  public logout(){
    localStorage.clear();
    this.$router.push('/');
  }
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

  header a {
    color: #6456f4;
    font-size: 27px;
    text-decoration: none;
    font-weight: bold ;
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
    cursor: pointer;
  }

  header .profile-container img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 100%;
    cursor: pointer;
  }

  header .profile-container .dropdown {
    position: absolute;
    top: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: #d3d6d8;
    border-radius: 5px;
    padding: 15px 20px;
  }

  header .profile-container .dropdown p, header .profile-container .dropdown a {
    color: #788896;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    padding: 3px 0px;
    cursor: pointer;
  }

  header .profile-container .dropdown p:hover, header .profile-container .dropdown a:hover {
    filter: brightness(80%);
  }

  .disable {
    opacity: 0;
    pointer-events: none;
  }

  .enable {
    opacity: 1;
    pointer-events: all;
  }
</style>
