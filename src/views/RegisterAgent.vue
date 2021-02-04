<template>
  <div class="registerAgent">
    <h1>Register Agents</h1>
    <hr>
    <input type="text" placeholder="Enter Full Name" name="name" id="name" v-model="agent.agentName" required><br/>
    <input type="text" placeholder="Enter Email" name="email" id="email" v-model="agent.agentEmail" required><br/>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" v-model="agent.password" required><br/>
    <select id="agent" name="agent" placeholder="Select Role" v-model="agent.agentType" >
    <option value="supportAgent">SupportAgent</option>
    <option value="supportEngineer">SupportEngineer</option>
    </select><br/>
  <button type="submit" class="registerbtn" @click="authenticate">Add Agent</button>
  </div>
</template>
<script>
import { getCookie } from '../cookies'
import axios from 'axios'
import router from '../router/index'
import api from '../config/api'
export default {
  name: 'RegisterAgent',
  data: () => ({
    agent: {
      agentName: '',
      agentEmail: '',
      password: '',
      agentType: ''
    }
  }),
  methods: ({
    authenticate () {
      const url = api.BASE_URL_LOCAL + 'crmorg/addAgent'
      const headers = {
        Authorization: getCookie('b_id')
      }
      axios.post(url, { agentName: this.agent.agentName, agentEmail: this.agent.agentEmail, password: this.agent.password, agentType: this.agent.agentType }, { headers: headers }).then((response) => {
        console.log(response)
        if (response.data === 'No user Available') {
          alert('No user sended')
        } else {
          console.log(response.data)
          router.push('/businessdashboard')
        }
      })
    }
  })
}
</script>
<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: black;
}

* {
  box-sizing: border-box;
}

/* Add padding to containers */
.registerAgent {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 40%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border-bottom: 1px solid #ccc;
  border-top: none;
  border-left: none;
  border-right: none;
  box-sizing: border-box;
  background: #ffffff;
  margin-bottom: 2%;
}
label{
align-content:left;
margin-right:610px ;
}
select {
  width: 40%;
  padding: 10px;
  margin: 2px 0 15px 0;
  background: #f1f1f1;
  border-radius: 1px;
}
input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #123813;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 35%;
  opacity: 0.9;
  border-radius: 6px;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>
