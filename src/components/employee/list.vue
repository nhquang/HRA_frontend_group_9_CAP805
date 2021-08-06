<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Employee</p>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <button class="btn" @click="addEmployee()">
            <i class="fa fa-plus-circle"></i>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
    <div class="sm-page-body b-0">
      <div class="table-grid">
        <table class="table">
          <thead>
            <tr>
              <td class="text-center" style="width: 30px; min-width: 30px">
                #
              </td>
              <td style="min-width: 150px">Name</td>
              <td style="min-width: 150px">Email</td>
              <td style="min-width: 150px; width: 150px;">Hire Date</td>
              <td style="min-width: 150px: width: 150px;">Role</td>
              <td style="min-width: 100px: width: 100px;"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ item.fname+' '+item.lname }}</td>
              <td>{{ item.email }}</td>
              <td>{{ displayDate(item.hireDate) }}</td>
              <td>{{ item.role }}</td>
              <td class="text-right">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editEmployee(item._id)">Edit</a>
                <span>|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger" @click="deleteEmployee(item._id, index)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      list: [],
    }
  },
  methods: {
    addEmployee() {
      this.$router.push('/employee/add');
    },
    editEmployee(id) {
      this.$router.push('/employee/edit/'+id);
    },
    async deleteEmployee(id, index) {
      var confirm = await this.$confirm('Are you sure to delete?');
      if(confirm) { 
        try {
          this.$store.state.loading = true;
          var response = await axios.delete(this.$store.state.apiUrl+'/employees/delete_employee/'+id, {
            headers: {
              Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
            }
          });
          if(response.hasOwnProperty('data')) {
            if(response.data.hasOwnProperty('message') && response.data.message != '') {
              this.$toaster(response.data.message);
            }
            this.$delete(this.list, index);
          }
          this.$store.state.loading = false;
        }
        catch(error) {
          this.$errorHandling(error);
        }
      }
    },
    displayDate(value){
      if (!value || value == "") return "";
      var date = new Date(value);      
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      if (dd < 10) { dd = '0' + dd; }
      if (mm < 10) { mm = '0' + mm; }
      return yyyy+'-'+mm+'-'+dd;
    }
  },
  async created() {
    try {
      this.$store.state.loading = true;
      var response = await axios.get(this.$store.state.apiUrl+'/employees', {
        headers: {
          Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
        }
      });
      if(response.hasOwnProperty('data')) {
        this.list = response.data;
      }
      this.$store.state.loading = false;
    }
    catch(error) {
      this.$errorHandling(error);
    }
  }
}
</script>
