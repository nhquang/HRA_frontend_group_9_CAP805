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
            <input type="text" />
          </div>   
          <div class="col-12 mb-2 px-2">
            <label class="req">Street Address</label>
            <textarea  cols="30" rows="1"></textarea>          
          </div>       
          <div class="col-12 mb-2 px-2">
            <label class="req">City</label>
            <input type="text" />
          </div>
          <div class="col-12 mb-2 px-2">
            <label class="req">Province</label>
            <input type="text" />
          </div>
          <div class="col-12 mb-2 px-2">
            <label class="req">Country</label>
            <input type="text" />
          </div>

          <div class="col-12 mb-2 px-2">
            <label>Description</label>
            <textarea  cols="30" rows="5"></textarea>          
          </div>
        </div>
      </div>
    </div>
    <div class="sm-page-footer">
      <div class="row">
        <div class="col-12  my-auto">                  
          <button class="btn save-btn">
            <i class="fa fa-check"></i>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.push('/branch');
    }
  }
}
</script>
