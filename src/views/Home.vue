<template>
  <div class="home">
    <button @click="logout">Sair :(</button>
    <form>
      <h1>Add To-Do</h1>
      <label for="title">Title:</label>
      <input type="text" name="title" id="title" v-model="title">
      <label for="content">Content:</label>
      <input type="text" name="content" id="content" v-model="content">
      <button v-on:click.prevent="handleNewTodo">Enviar :)</button>
    </form>
    <ul v-for="todo in todos"  v-bind:key="todo.id">
      <li v-bind:v-if="todo.checked === false">
        <input type="checkbox" v-bind:checked="todo.checked" @click="handleCheckTodo(todo.id)">
        <h2>{{todo.title}}</h2>
        <p>{{todo.content}}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})

export default class Home extends Vue {
  title: string = '';
  content: string = '';
  todos: Array<any> = [];
  $api: any;

  mounted() {
    this.handleTodos()
  }

  public async handleNewTodo(): Promise<any>{
    if(!this.title || !this.content){
      console.error('Seu Serelepe, não deixe o input vazio');
    } else {
      try {
        const token = localStorage.getItem('@todoToday:token');
        const res = await this.$api.post('/todos',{
            title: this.title, 
            content: this.content
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        this.todos.push(res.data);
        this.title = '';
        this.content = '';
      } catch (error) {
        console.log(error)
      }
    }
  }


  public async handleTodos(): Promise<any>{
    try {
      const token = localStorage.getItem('@todoToday:token');
      const res = await this.$api.get('/todos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      this.todos = res.data
    } catch (error) {
      console.log(error)
    }
  }

  public logout(): void{
    localStorage.clear();

    this.$router.push('/');
  }

  public async handleCheckTodo(id: string): Promise<any>{
    try {
      const token = localStorage.getItem('@todoToday:token');
      const res = await this.$api.patch('/todos/check', {
        id: id,
        checked: true
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const todo = this.todos.findIndex(todo => todo.id === id)

      setTimeout(() => {
        const newTodo = this.todos.splice(todo, 1)
      }, 250);
      


    } catch (err) {
      const errorMessage = JSON.parse(err.request.responseText);
      const {status, message} = errorMessage;
      console.log(message)
    }
  }
}
</script>

<style scoped>
  .home ul li{
    list-style: none;
    border: solid 1px black;
    width: 200px;
    margin-top: 10px;
  }

  input {
    border: solid 1px red;
  }
</style>
