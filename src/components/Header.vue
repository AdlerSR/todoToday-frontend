<template>
  <header>
    <div class="container">
      <h1>To-Do Today</h1>
      <div class="profile-container">
        <p>{{user.name}}</p>
        <span >
          <img v-if="!user.avatar" src="../assets/default.png" alt="user avatar">
          <img v-else-if="!this.host" :src="`https://todotodayback.herokuapp.com/files/${user.avatar}`"  alt="user avatar" />
          <img v-else :src="`http://localhost:3333/files/${user.avatar}`" alt="user avatar">
        </span>
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
  host: string = process.env.VUE_APP_AXIOS_URL

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
