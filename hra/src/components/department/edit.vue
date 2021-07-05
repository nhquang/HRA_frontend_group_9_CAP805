<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Edit Department</p>
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
            <input type="text" value="Human Resources"/>
          </div>
          <div class="col-12 mb-2 px-2">
            <label class="req">Branch</label>
            <select>
              <option value="" selected>India</option>
              <option value="">Canada</option>
              <option value="">USA</option>
              <option value="">UK</option>
            </select>      
          </div>
          <div class="col-12 mb-2 px-2">
            <label>Description</label>
            <textarea name="" id="" cols="30" rows="5"></textarea>          
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
      this.$router.push('/department');
    }
  }
}
</script>
