<template>
  <div class="login">
    <div class="login-container">
      <h1>To-do Today</h1>
      <form>
        <label for="name">Name:</label>
        <input type="name" id="name" v-model="name">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
        <span v-if="errorMessage">{{errorMessage}}</span>
        <div class="form-button">
          <button v-on:click.prevent="handleRegister">Register <ArrowRightIcon /></button>
        </div>
        <p>Already have an account? <router-link to="/">Login</router-link></p>
      </form>
    </div>  
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ArrowRightIcon  } from 'vue-feather-icons';

@Component({
  components: {
    ArrowRightIcon 
  },
})

export default class Login extends Vue {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  $api: any;

  async handleRegister(): Promise<void>{
    if(!this.name || !this.email || !this.password){
      this.errorMessage = "Fill all required fields"
    } else {
      try {
        const res = await this.$api.post('/users', {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        this.$router.push('/')

      } catch (err) {
        const errorMessage = JSON.parse(err.request.responseText);
        const {status, message} = errorMessage;

        this.errorMessage = message;
      }
    }
  }
}
</script>

<style scoped>
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  .login .login-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    border: solid 2px #C4D0D9;
    padding: 100px;
  }

  .login .login-container h1 {
    color: #6456F4;
    margin-bottom: 30px;
    text-align: center;
  }

  .login .login-container form {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  
  .login .login-container form input {
    border: solid 2px #C4D0D9;
    border-radius: 2px;
    padding: 7px 5px;
    font-size: 15px;
    width: 100%;
  }

  .login .login-container form label {
    margin-bottom: 2px;
    margin-top: 10px;
    color: #5c7181;
    font-weight: bold;
    font-size: 15px;
  }

  .login .login-container form span {
    margin-top: 5px;
    color: #D3455A;
    font-weight: bold;
    font-size: 15px;
  }

  .login .login-container form .form-button{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
  }

  .login .login-container form .form-button button{
    width: 100%;
    padding: 5px 3px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #6456F4;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
  }

  .login .login-container form .form-button button svg{
    margin-left: 5px;
  }

  .login .login-container form p, login .login-container form p a{
    margin-top: 5px;
    color: #5c7181;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    margin-top: 15px;
  }

  .login .login-container form p a{ 
    color: #6456F4;
  }
  

</style>
