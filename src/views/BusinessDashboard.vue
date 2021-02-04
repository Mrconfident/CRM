<template>
    <div class="dashboard">
        <h1> {{orgName}}</h1>
        <button @click="logout" class="login">Logout</button>
        <router-link to="/registeragent"><button class="login">Add Agent</button></router-link> <!-- route directly nothing else -->
        <table>
            <thead>
                <tr>
                    <th>AGENT ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>STATUS</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-for="agent in agentList" :key="agent.id">
                <tr>
                    <td>{{ agent.agentId }}</td>
                    <td>{{ agent.name }}</td>
                    <td>{{ agent.agentEmail }}</td>
                    <td>{{ agent.status }}</td>
                    <td><button @click="delete1(agent.agentId)" class="agent">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import { setCookie, getCookie } from '../cookies'
import router from '../router/index'
import api from '../config/api'
export default {
  name: 'BusinessDashboard',
  data: () => ({
    agentList: [],
    orgName: 'Organisation Name'
  }),
  methods: ({
    logout () {
      setCookie('b_id', '', 0)
      router.push('/loginbusiness')
    },
    delete1 (id) {
      const url = api.BASE_URL_LOCAL + 'crmorg/deleteAgent/' + id
      const headers = {
        Authorization: getCookie('b_id')
      }
      axios.delete(url, { headers: headers }).then(() => {
        window.location.reload()
      })
    }
  }),
  created () {
    const url = api.BASE_URL_LOCAL + 'crmorg/agentDetails/'
    const headers = {
      Authorization: getCookie('b_id')
    }
    axios.get(url, { headers: headers }).then((response) => {
      this.agentList = response.data
      console.log(this.agentList)
    })
  }
}
</script>

<style lang="scss">
.dashboard{
  margin: 130px 50px;
  h1{
    color: #405c58;
    display: flex;
    float: left;
  }
  .login{
      margin:10px;
  width: 100px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 25px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #405C58;
  transition-duration: 500ms;
  float: right;
  }
  table{
    table-layout: fixed;
    border-collapse: collapse;
    width:100%;
  }
  thead{
    background:#405C58;
    color: white;
  }
  th,td{
    border:1px solid white;
    text-align: center;
    padding: 5px 3px;
    margin: 10px;
    word-break: break-all;
  }
  td{
    border:1px solid #405C58;
    border-radius: 10px;
  }
.agent{
  margin:10px;
  width: 100px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 25px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #405C58;
  transition-duration: 500ms;
}
.agent:hover{
  background: #405C58;
  color: white;
  box-shadow: 2px 2px 10px #314b47;
}
.login:hover{
    background: #405C58;
  color: white;
  box-shadow: 2px 2px 10px #314b47;
}
}
</style>
