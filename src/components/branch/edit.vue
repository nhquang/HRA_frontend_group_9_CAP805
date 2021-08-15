<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p v-if="role=='admin'">Edit Branch</p>
          <p v-if="role!='admin'">View Branch</p>
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
        <div class="row sm-page-block" v-if="role=='admin'">
           <div class="col-12 mb-2 px-2">
            <label class="req">Branch Name</label>
            <input type="text" id="name" v-model="name"/>
          </div>   
          <div class="col-12 mb-2 px-2">
            <label class="req">Street Address</label>
            <textarea  cols="30" rows="2" id="streetAddress" v-model="streetAddress"></textarea>          
          </div>       
          <div class="col-12 mb-2 px-2">
            <label class="req">City</label>
            <input type="text" id="city" v-model="city"/>
          </div>
          <div class="col-12 mb-2 px-2">
            <label class="req">Province</label>
            <input type="text" id="province" v-model="province"/>
          </div>
          <div class="col-12 mb-2 px-2">
            <label class="req">Country</label>
            <input type="text" id="country" v-model="country"/>
          </div>
          <div class="col-12 mb-2 px-2">
            <label>Description</label>
            <textarea  cols="30" rows="5" id="description" v-model="description"></textarea>          
          </div>
          <div class="col-12 mb-2 px-2">  
              <div class="d-flex">
                <input type="checkbox" id="active" class="w-auto my-auto mr-2" v-model="active"/>                 
                <label for="active" class="my-auto">Active</label>            
              </div>            
          </div>
        </div>


        <div class="row sm-page-block" v-if="role!='admin'">
           <div class="col-12 mb-2 px-2">
            <label class="req">Branch Name</label>
            <input type="text" id="name" v-model="name" disabled/>
          </div>   
          <div class="col-12 mb-2 px-2">
            <label class="req">Street Address</label>
            <textarea  cols="30" rows="2" id="streetAddress" v-model="streetAddress" disabled></textarea>          
          </div>       
          <div class="col-12 mb-2 px-2">
            <label class="req">City</label>
            <input type="text" id="city" v-model="city" disabled/>
          </div>
          <div class="col-12 mb-2 px-2">
            <label class="req">Province</label>
            <input type="text" id="province" v-model="province" disabled/>
          </div>
          <div class="col-12 mb-2 px-2">
            <label class="req">Country</label>
            <input type="text" id="country" v-model="country" disabled/>
          </div>
          <div class="col-12 mb-2 px-2">
            <label>Description</label>
            <textarea  cols="30" rows="5" id="description" v-model="description" disabled></textarea>          
          </div>
          <div class="col-12 mb-2 px-2">  
              <div class="d-flex">
                <input type="checkbox" id="active" class="w-auto my-auto mr-2" v-model="active" disabled/>                 
                <label for="active" class="my-auto">Active</label>            
              </div>            
          </div>
        </div>


      </div>
    </div>
    <div class="sm-page-footer">
      <div class="row">
        <div class="col-12  my-auto">                  
          <button class="btn save-btn" @click="edit()" v-if="role=='admin'">
            <i class="fa fa-check"></i>
            <span>Update</span>
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
      name: '', streetAddress: '', city: '', province: '', country: '', description: '', active: false
    }
  },
  validators: {
    name(value) { return this.validator.value(value).required(this.required('Name')); },
    streetAddress(value) { return this.validator.value(value).required(this.required('Street Address')); },
    city(value) { return this.validator.value(value).required(this.required('City')); },
    province(value) { return this.validator.value(value).required(this.required('Province')); },
    country(value) { return this.validator.value(value).required(this.required('Country')); },
    //stillEmployed(value) { return this.validator.value(value).required(this.required('Still Employed')); },
  }, 
  methods: {
    back() {
      this.$router.push('/branch');
    },
    async edit() {
      this.resetFormError();
      var confirm = await this.$confirm('Are you sure to update?');
      if(confirm) { 
        this.$validate();
        if(this.validation.errors.length == 0) {
          try {
            this.$store.state.loading = true;
            var data = {
              name: this.name, streetAddress: this.streetAddress, city: this.city, province: this.province, country: this.country, description: this.description, active: this.active 
            }
            var response = await axios.put(this.$store.state.apiUrl+'/branches/update_branch/'+this.$route.params.id, data, {
              headers: {
                Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
              }
            });
            if(response.hasOwnProperty('data')) {
              this.$store.state.loading = false;
              this.$router.push('/branch');
            }
          }
          catch(error) {
            this.$errorHandling(error);
          }
        }
        else {
          this.tooltipError();
        }
      }
    }
  },
  async created() {
    this.role = this.$cookies.get("_r_hrm");
    try {
      this.$store.state.loading = true;
      var response = await axios.get(this.$store.state.apiUrl+'/branches/'+this.$route.params.id, {
        headers: {
          Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
        }
      });
      if(response.hasOwnProperty('data')) { 
        this.name = response.data.name;
        this.streetAddress = response.data.streetAddress;
        this.city = response.data.city;
        this.province = response.data.province;
        this.country = response.data.country;
        this.description = response.data.description;
        this.active = response.data.active
      }
      this.$store.state.loading = false;
    }
    catch(error) {
      this.$errorHandling(error);
    }
  }
}
</script>
