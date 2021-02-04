<template>
  <div class="container">
    <h1>Convert Leads</h1>
    <hr>
    <input type="text" placeholder="Enter Lead Name" name="name" id="name" v-model="lead.firstName" required><br/>
    <input type="text" placeholder="Enter Lead Name" name="name" id="name" v-model="lead.lastName" required><br/>
    <input type="email" placeholder="Enter Lead Email" name="email" id="email" v-model="lead.leadEmail" required><br/>
    <input type="text" placeholder="Enter Lead Contact Number" name="number" id="number" v-model="phoneNo" required><br/>
    <input type="text" placeholder="Enter Lead Address" name="address" id="address" v-model="address" required><br/>
  <button type="submit" class="registerbtn" @click="redirect">Convert</button>
  </div>
</template>
<script>
import axios from 'axios'
import { getCookie } from '../cookies'
import api from '../config/api'
export default {
  name: 'ConvertLead',
  data: () => ({
    lead: {},
    phoneNo: '',
    address: ''
  }),
  mounted () {
    this.lead = this.$store.getters.getLead
  },
  methods: ({
    redirect () {
      const url = api.BASE_URL_LOCAL + 'lead/addContact'
      console.log(this.lead)
      const headers = {
        Authorization: getCookie('agent_id')
      }
      axios.post(url, { firstName: this.lead.firstName, lastName: this.lead.lastName, leadEmail: this.lead.leadEmail, source: this.lead.source, adminEmail: this.lead.adminEmail, mobileNo: this.phoneNo, address: this.address, databaseId: this.lead.databaseId }, { headers: headers }).then((response) => {
        console.log(response)
        this.$router.push('/contact')
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
.container {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
input[type=text], input[type=email] {
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
