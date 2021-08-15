<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Branch</p>
        </div>
        <div class="col-6 d-flex justify-content-end" v-if="role=='admin'">
          <button class="btn" @click="addBranch()">
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
              <td style="min-width: 150px">City</td>
              <td style="min-width: 150px">Province</td>
              <td style="min-width: 150px">Country</td>
              <td style="min-width: 150px">Description</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.city }}</td>
              <td>{{ item.province }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.description }}</td>
              <td class="text-right" v-if="role == 'admin'">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editBranch(item._id)">Edit</a>
                <span v-if="item.active">|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger" @click="deleteBranch(item._id, index)" v-if="item.active">Deactivate</a>
              </td>
              <td class="text-right" v-if="role != 'admin'">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editBranch(item._id)">View</a>
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
    addBranch() {
      this.$router.push('/branch/add');
    },
    editBranch(id) {
      this.$router.push('/branch/edit/'+id);
    },
    async deleteBranch(id, index) {
      var confirm = await this.$confirm('Are you sure to delete?');
      if(confirm) { 
        try {
          this.$store.state.loading = true;
          var response = await axios.delete(this.$store.state.apiUrl+'/branches/delete_branch/'+id, {
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
    }
  },
  async created() {
    try {
      this.role = this.$cookies.get("_r_hrm");
      this.$store.state.loading = true;
      var response = await axios.get(this.$store.state.apiUrl+'/branches', {
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

