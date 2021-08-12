<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Add Department</p>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <button class="btn" @click="back()">
            <i class="fa fa-chevron-left"></i>
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
    <div class="sm-page-body">     
      <div class="col-lg-6 col-xl-4 col-md-6 col-sm-12 p-0">
        <div class="row sm-page-block">
          <div class="col-12 mb-2 px-2">
            <label class="req">Department Name</label>
            <input type="text" id="name" v-model="name"/>
          </div>
          <div class="col-12 mb-2 px-2">
            <label class="req">Branch</label>
            <select v-model="branchId" id="branchId">
                <option value="">--Select--</option>
                <option v-for="(item, index) in master_branches" :key="index" :value="item._id">{{ item.name }}</option>
            </select>      
          </div>
          <div class="col-12 mb-2 px-2">
            <label>Description</label>
            <textarea cols="30" rows="5" id="description" v-model="description"></textarea>          
          </div>
          <div class="col-12 mb-2 px-2">  
              <div class="d-flex">
                <input type="checkbox" id="active" class="w-auto my-auto mr-2" v-model="active"/>                 
                <label for="active" class="my-auto"> Active</label>            
              </div>            
            </div>
        </div>
      </div>
    </div>
    <div class="sm-page-footer">
      <div class="row">
        <div class="col-12  my-auto">                  
          <button class="btn save-btn" @click="save()">
            <i class="fa fa-check"></i>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { formValidation } from '@/helper/form_validation';
export default {
  mixins: [formValidation],
  data() {
    return {
      branchId:'',description:'',name:'',active:'',
      master_branches: [],      
    }
  },
  validators: {
    name(value) { return this.validator.value(value).required(this.required('Department Name')); },
    description(value) { return this.validator.value(value).required(this.required('Description')); },
    branchId(value) { return this.validator.value(value).required(this.required('Branch')); },
  },
  methods: {
    back() {
      this.$router.push('/department');
    },
    async getBranch(){
      var response = await axios.get(this.$store.state.apiUrl+"/branches/active_branches", {
        headers: {
          Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
        }
      });
      if(response.hasOwnProperty('data')) {
        this.master_branches = response.data;
      }
    },
    async save() {
      this.resetFormError();
      var confirm = await this.$confirm('Are you sure to save?');
      if(confirm) { 
        this.$validate();
        if(this.validation.errors.length == 0) {
          try {
            this.$store.state.loading = true;
            var data = {
              name:this.name,description:this.description,branchId:this.branchId,active:this.active
            }
            var response = await axios.post(this.$store.state.apiUrl+'/departments', data, {
               headers: {
                Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
              }
            });
            if(response.hasOwnProperty('data')) { 
              // this.branchId='';this.description='';this.name='';this.active='';
              this.back();
            }
            this.$store.state.loading = false;
          }
          catch(error) {
            this.$errorHandling(error);
          }
        }
        else {
          this.tooltipError();
        }
      }
    },
  },
  async created() {
    this.getBranch();
  }
}
</script>
