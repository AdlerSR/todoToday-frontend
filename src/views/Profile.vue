<template>
  <div class="profile">
    <Header />
    <div class="container">
      <div class="profile-card">
        <div class="profile-info">
          <img v-if="!user.avatar" src="../assets/default.png" alt="user avatar">
          <img v-else-if="!this.host" :src="`https://todotodayback.herokuapp.com/files/${user.avatar}`"  alt="user avatar" />
          <img v-else :src="`http://localhost:3333/files/${user.avatar}`" alt="user avatar">
          <h2>{{user.name}}</h2>
        </div>
        <div class="progress-container">
          <h3>Progress</h3>
          <div class="progress-items">
            <div class="progress-card progress-card__done">
              <p>Done</p>
              <strong>{{status.done}}</strong>
            </div>
            <div class="progress-card progress-card__unfinished">
              <p>Unfinished</p>
              <strong>{{status.unfinished}}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Header from '../components/Header.vue';

@Component({
  components: {
    Header
  },
})

export default class Profile extends Vue {
  $api: any;
  status: Array<object> = []; 
  user: Array<object> = []; 
  host: string = process.env.VUE_APP_AXIOS_URL;

  mounted(){
    this.handleTodoProgress();
    this.handleUserInfo();
  }
  
  public async handleTodoProgress() {
    const token = localStorage.getItem('@todoToday:token');
    try {
      const res = await this.$api.get('/todos/status', {headers:{'Authorization': `Bearer ${token}`}});

      this.status = res.data;
    } catch (error) {
      console.log(error);
    }
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
  .container {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-card {
    background: #E7EAEC;
    color: #788896;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 700px;
    width: 100%;
    padding: 100px 0px;
  }

  .profile-card .profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .profile-card .profile-info img {
    border-radius: 100%;
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 15px;
  }

  .progress-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 400px;
  }

  .progress-container h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .progress-container .progress-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .progress-container .progress-items .progress-card {
    background: #ffffff;
    border-radius: 5px;
    padding: 40px 0px;
    height: 130px;
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }

  .progress-container .progress-items .progress-card__done {
    color: #22B1A3;
  }

  .progress-container .progress-items .progress-card__unfinished {
    color: #D65267;
  }

  @media (max-width: 560px) {
    .container {
      height: 86vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .profile-card .profile-info img {
      width: 150px;
      height: 150px;
    }

    .progress-container {
      width: 280px;
    }

    .progress-container .progress-items .progress-card {
      background: #ffffff;
      border-radius: 5px;
      padding: 40px 0px;
      height: 120px;
      width: 130px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
    }

    .profile-card {
      height: 400px;
      padding: 10px 0px;
    }
  }
</style>
