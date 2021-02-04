<template>
  <div>
    <div class="col-md-4" v-for="lead in leads" :key="lead.ticketId">
          <Ticket :lead="lead" />
    </div>
    <div v-if="nullLead" id="nullLead">No Tickets Found</div>
  </div>
</template>
<script>
import 'firebase/storage'
import axios from 'axios'
import { getCookie } from '../cookies'
import api from '../config/api'
import Ticket from '../components/Ticket'
export default {
  name: 'TicketDashboard',
  data: () => ({
    leads: [],
    comments: '',
    documentURL: '',
    selectedFile: null,
    api: '3abb699ec797f36df2928d0be30785c9',
    nullLead: false
  }),
  components: { Ticket },
  created () {
    const url = api.BASE_URL_LOCAL + 'ticket/assignTicket'
    const headers = {
      Authorization: getCookie('agent_id')
    }
    axios.get(url, { headers: headers }).then((res) => {
      console.log(res)
      this.leads = res.data
      console.log(this.leads)
      this.leads.forEach(Element => {
        Element.ticketStatus = 'In Progress'
      })
      console.log(this.leads[0])
      if (this.leads.length === 0) {
        this.nullLead = true
      }
    })
  }
}
</script>
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: auto;
  text-align: center;
  font-family: arial;
  font-size: 18px;
}

.title {
  color: grey;
  font-size: 18px;
}

.style {
  margin-right: 40px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: fit-content;
  font-size: 18px;
  margin-top: 10px;
}

.full {
  width: 100%;
}

label {
  /* display: block; */
  padding: 5px;
  text-decoration-line: underline;
  font-weight: bold;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}

input[type=file] {
  width: 60%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  box-sizing: border-box;
  background: #ffffff;
  font-size: 18px;
}

input[type=text] {
width: 60%;
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
  font-size: 18px;
}
.leads {
  display: flex;
  padding: 10px;
  justify-content: space-between;
}

p {
  display: inline;
}

</style>
