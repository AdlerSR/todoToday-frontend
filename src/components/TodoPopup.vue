<template >
  <div class="todo-popup__background" v-bind:class="[popupState]">
    <div class="todo-popup__content"  v-bind:class="[popupState]">
      <form>
        <XIcon @click="handleClosePopup"/>
        <h2>Add New To-do</h2>
        <label for="title">Title</label>
        <input type="text" v-model="title" id="title">
        <label for="content">Content</label>
        <input type="text" v-model="content" id="content">
        <button v-on:click.prevent="handleNewTodo">Add</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { XIcon } from 'vue-feather-icons'

@Component({
  components: {
    XIcon
  },
})

export default class TodoPopup extends Vue {
  
  title: string = '';
  content: string = '';
  $api: any;
  newTodo: Array<object> = [];


  get popupState() {
    return this.$store.state.popupState
  }

  mounted() {
    
  }

  public async handleNewTodo(){
    if(!this.title || !this.content){
      console.log('erro')
    } else {
      try {
        const token = localStorage.getItem('@todoToday:token');
        const res = await this.$api.post('/todos', {
          title: this.title,
          content: this.content
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        this.newTodo = res.data;
        this.$emit('clicked', this.newTodo);
        this.$store.commit('changePopup', 'disable');

        this.title = '';
        this.content = '';
      } catch (err) {
        const errorMessage = JSON.parse(err.request.responseText);
        const {status, message} = errorMessage;
        console.log(message)
      }
    }   
  }

  public handleClosePopup(){
    this.$store.commit('changePopup', 'disable')
  }
}
</script>

<style scoped>
  .todo-popup__background{
    width: 100%;
    height: 100vh;
    position: absolute;
    background: rgba(0, 0, 0, 0.377);
    z-index: 999;
    transition: opacity 200ms;
  }

  .todo-popup__content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 400px;
    transition: opacity 200ms;
  }

  .todo-popup__content form{
    position: relative;
    background-color: white;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    padding: 20px 40px;
  }

  .todo-popup__content form svg{
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #D3455B;
    transition: transform 200ms;
  }

  .todo-popup__content form svg:hover{
    transform: scale(1.2);
  }

  .todo-popup__content form h2{
    text-align: center;
    color: #6558F4;
    margin-bottom: 20px;
  }

  .todo-popup__content form input {
    border: solid 2px #C4D0D9;
    border-radius: 2px;
    padding: 7px 5px;
    font-size: 15px;
    width: 100%;
    background-color: transparent;
    margin-bottom: 10px;
  }

  .todo-popup__content form button {
    border: solid 2px #6558F4;
    background-color: #6558F4;
    color: white;
    border-radius: 2px;
    padding: 7px 5px;
    font-size: 15px;
    width: 100%;
    margin-bottom: 10px;
    cursor: pointer;
    font-weight: bold;
  }

  .todo-popup__content form button:hover {
    filter: brightness(80%);
  }

  .active {
    opacity: 1;
    pointer-events: all;
  }

  .disable {
    opacity: 0;
    pointer-events: none;
  }
  
</style>
