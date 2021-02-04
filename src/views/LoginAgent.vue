<template>
<div class="LoginAgent">
  <h2>Agent Login</h2>
  <div class="container">
    <!-- <label for="uname"><b>Username</b></label> -->
    <input type="text" placeholder="Enter Username" name="uname" v-model="username" required>
    <br/>
    <!-- <label for="psw"><b>Password</b></label> -->
    <input type="password" placeholder="Enter Password" name="psw" v-model="password" required>
    <br>
    <button type="submit" @click="authenticate">Login</button>
  </div>

  <div class="container">
    <span class="psw">Login Organisation...? <router-link to="/loginbusiness"> Login </router-link> </span>
  </div>
</div>
</template>
<script>
import router from '../router/index'
import axios from 'axios'
import { getCookie, setCookie } from '../cookies'
import api from '../config/api'
export default {
  name: 'LoginAgent',
  data: () => ({
    username: '',
    password: ''
  }),
  methods: ({
    authenticate () {
      const url = api.BASE_URL + 'auth/authenticate'
      axios.post(url, { username: this.username, password: this.password, client: 'crm' }).then((response) => {
        console.log('***** Authorization Succesful ********')
        if (response.data.success !== true) {
          alert(response.data.error)
        } else {
          setCookie('agent_id', response.data.data.jwt, 10)
          const url = api.BASE_URL_LOCAL + 'crmorg/validateAgent'
          const headers = {
            Authorization: getCookie('agent_id')
          }
          console.log('****CRM SERVICES API CALL*****')
          axios.get(url, { headers: headers }).then((res) => {
            console.log(res.data)
            if (res.data === 'No Agent') {
              alert('User is not there')
            } else {
              console.log(res)
              router.push('/agentdashboard')
            }
          })
        }
      })
    }
  })
}
</script>
<style scoped>
input[type=text], input[type=password] {
  width: 25%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border-bottom: 1px solid #ccc;
  border-top: none;
  border-left: none;
  border-right: none;
  box-sizing: border-box;
}
h2{
  font-size: 30px;
}
button {
  margin-top:17px;
  background-color: #123813;
  color: white;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  width: 25%;
  border-radius: 10px;
}
a, a:visited {
    color: black;
    text-decoration: none;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}
.container {
  padding: 8px;
}

span.psw {
  float: center;
  padding-top: 16px;
  align-content: center;
}
.LoginAgent{
  margin-top:7% ;
}
</style>
