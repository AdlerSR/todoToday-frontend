<template>
  <div class="home">
    <TodoPopup @clicked="onClickChild" />
    <Header />
    <section class="container">
      <div class="link-container">
        <h2>{{weekDay}} To-Dos</h2>
        <button @click="handleAddTodoPopup">Add to-do <PlusIcon /></button>
      </div>
      <ul v-for="todo in todos"  v-bind:key="todo.id">
        <li v-bind:v-if="todo.checked === false">
          <div class="todo-header">
            <div class="todo-header__left">
              <input type="checkbox" v-bind:checked="todo.checked" @click="handleCheckTodo(todo.id)">
              <h2>{{todo.title}}</h2>
            </div>
            <div class="todo-header__right">
              <EditIcon />
              <Trash2Icon @click="handleDeleteTodo(todo.id)"/>
            </div>
          </div>
          <div class="todo-content">
            <p>{{todo.content}}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Trash2Icon, EditIcon, PlusIcon } from 'vue-feather-icons'

import Header from '../components/Header.vue';
import TodoPopup from '../components/TodoPopup.vue';

@Component({
  components: {
    Header,
    TodoPopup,
    Trash2Icon,
    EditIcon,
    PlusIcon
  },
})

export default class Home extends Vue {
  title: string = '';
  content: string = '';
  weekDay: string = '';
  todos: Array<any> = [];
  $api: any;

  mounted() {
    this.handleTodos()
    this.handleWeekDay();
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

  public async handleDeleteTodo(id: string) {
    try {
      const token = localStorage.getItem('@todoToday:token');
      const res = await this.$api.patch('/todos/check', {
        id: id,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const todo = this.todos.findIndex(todo => todo.id === id)
      const newTodo = this.todos.splice(todo, 1)

    } catch (err) {
      const errorMessage = JSON.parse(err.request.responseText);
      const {status, message} = errorMessage;
      console.log(message)
    }
  }

  public onClickChild (value: any) {
    this.todos.unshift(value)
  }

  public handleWeekDay() {
    let formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    })
    this.weekDay = formatter.format(Date.now());
  }

  public handleAddTodoPopup() {
    this.$store.commit('changeState', 'enable')
  }
}
</script>

<style scoped>
  .home .container {
    margin-top: 80px;
  }

  .home .container input {
    border: solid 1px red;
  }

  .home .container .link-container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .home .container .link-container h2 {
    color: #6053E8;
    font-size: 22px;
    font-weight: bold;
  }

  .home .container .link-container button {
    background-color: transparent;
    font-weight: 500;
    font-size: 17px;
    color: #6053E9;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .home .container ul li {
    list-style: none;
    border: solid 2px #C3CFD9;
    border-radius: 3px;
    width: 200px;
    margin-bottom: 15px;
    width: 100%;
    min-height: 200px;
  }

  .home .container ul li .todo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 2px #C3CFD9;
    padding: 5px 10px;
  }

  .container ul li .todo-header .todo-header__left, .container ul li .todo-header .todo-header__right{
    display: flex;
    align-items: center;
  }

  .home .container ul li .todo-header .todo-header__left input {
    margin-right: 8px;
    -webkit-appearance: none;
    border: solid 2px #C3CFD9;
    padding: 8px;
    border-radius: 5px;
    transition: transform 200ms, background-color 200ms;
    cursor: pointer;
  }

  .home .container ul li .todo-header .todo-header__left input:hover{
    background-color: #c3cfd963;
  }

  .home .container ul li .todo-header .todo-header__left input:checked {
    background-color: #1AAD9E;
    border: solid 2px #1AAD9E;
    transform: scale(1.2, 1.2);
  }

  .home .container ul li .todo-header .todo-header__left h2 {
    font-weight: 500;
    font-size: 18px;
    text-transform: capitalize;
    color: #293845;
  }

  .home .container ul li .todo-header .todo-header__right svg + svg {
    margin-left: 20px;
  }

  .home .container ul li .todo-header .todo-header__right svg:first-of-type {
    color: #4B5C6B;
  }

  .home .container ul li .todo-header .todo-header__right svg:last-of-type {
    color: #D3455B;
  }
  
  .home .container ul li .todo-header .todo-header__right svg:hover {
    filter: brightness(80%);
    cursor: pointer;
  }

  .home .container ul li .todo-content {
    filter: brightness(80%);
    cursor: pointer;
    padding: 15px 10px;
  }
</style>
