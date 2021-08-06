<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Add Branch</p>
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
      name: '', streetAddress: '', city: '', province: '', country: '', description: '',
    }
  },
  validators: {
    name(value) { return this.validator.value(value).required(this.required('Name')); },
    streetAddress(value) { return this.validator.value(value).required(this.required('Street Address')); },
    city(value) { return this.validator.value(value).required(this.required('City')); },
    province(value) { return this.validator.value(value).required(this.required('Province')); },
    country(value) { return this.validator.value(value).required(this.required('Country')); },
  }, 
  methods: {
    back() {
      this.$router.push('/branch');
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
              name: this.name, streetAddress: this.streetAddress, city: this.city, province: this.province, country: this.country, description: this.description,
            }
            var response = await axios.post(this.$store.state.apiUrl+'/branches/add_branch', data, {
               headers: {
                Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
              }
            });
            if(response.hasOwnProperty('data')) { 
              this.name = ''; this.streetAddress = ''; this.city = ''; this.province = ''; this.country = ''; this.description = '';
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
    }
  }
}
</script>
