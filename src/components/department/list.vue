<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Department</p>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <div class="col-6 mb-auto pr-1">
              <select v-model="branchId" id="branchId" @change="getBranchDepartment()">
                <option value="">--Select--</option>
                <option v-for="(item, index) in master_branches" :key="index" :value="item._id">{{ item.name }}</option>
              </select>      
            </div>
          <button class="btn" @click="addDepartment()" v-if="role=='admin'">
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
              <!-- <td style="min-width: 150px">Branch</td> -->
              <td style="min-width: 150px">Description</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <!-- <td>{{ item.branchId }}</td> -->
              <td>{{ item.description }}</td>
              <td class="text-right" v-if="role=='admin'">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editDepartment(item._id)">Edit</a>
                <span v-if="item.active">|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger" @click="deleteDepartment(item._id, index)" v-if="item.active">Deactivate</a>
              </td>
              <td class="text-right" v-if="role!='admin'">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editDepartment(item._id)">View</a>
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
      branchId:'',
      master_branches: [],
      list: [],
    }
  },
  methods: {
    async getBranch(){
      var response = await axios.get(this.$store.state.apiUrl+"/branches/active_branches", {
        headers: {
          Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
        }
      });
      if(response.hasOwnProperty('data')) {
        this.master_branches = response.data;
        this.branchId = this.master_branches[0]._id;
      }
    },
    addDepartment() {
      this.$router.push('/department/add');
    },
    editDepartment(id) {
      this.$router.push('/department/edit/'+id);
    },
    async deleteDepartment(id, index) {
      var confirm = await this.$confirm('Are you sure to delete?');
      if(confirm) { 
        try {
          this.$store.state.loading = true;
          
          var response = await axios.delete(this.$store.state.apiUrl+'/departments/'+id, {
            headers: {
              Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
            }
          });
          if(response.hasOwnProperty('data')) {
            if(response.data.hasOwnProperty('message') && response.data.message != '') {
              this.$toaster(response.data.message);
              
            }
            this.list[index].active = false;
            this.$forceUpdate();
            //this.$delete(this.list, index);
          }
          this.$store.state.loading = false;
        }
        catch(error) {
          this.$errorHandling(error);
        }
      }
    },
    async getBranchDepartment(){
      var response = await axios.get(this.$store.state.apiUrl+'/departments/all?branchId='+this.branchId, {
        headers: {
          Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
        }
      });
      if(response.hasOwnProperty('data')) {
        this.list = response.data;
      }
    }
  },
  async created() {
    this.role = this.$cookies.get("_r_hrm");
    try {
      this.$store.state.loading = true;
      await this.getBranch();
      var response = await axios.get(this.$store.state.apiUrl+'/departments/all?branchId='+this.branchId, {
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

