<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Edit Employee</p>
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
      <div class="row mx-2">
        <div class="col-lg-6 col-xl-4 col-md-6 col-sm-12 p-0">
          <div class="row sm-page-block mx-2">
            <div class="title">General Information</div>
            <div class="col-12 mb-2 pl-2">
              <label class="req">Activation Code</label>
              <input type="text" readonly="true" disabled="true" value="#AA11"/>
            </div>
            <div class="col-6 mb-2 pr-2">
              <label class="req">First Name</label>
              <input type="text" value="John"/>
            </div>
            <div class="col-6 mb-2 pl-1">
              <label class="req">Last Name</label>
              <input type="text" value="Doe"/>
            </div>
            <div class="col-12 mb-2 pl-2">
              <label class="req">User Name</label>
              <input type="text" value="johndoe"/>
            </div>
            <div class="col-6 mb-2 pl-2">
              <label class="req">Email</label>
              <input type="email" value="jdoe@example.com"/>
            </div>
            <div class="col-6 mb-2 pr-2">
              <label class="req">Phone No.</label>
              <input type="text" value="99999 88888"/>
            </div>
            <div class="col-6 mb-2 pr-1">
              <label class="req">Department</label>
              <select>
                <option value="" selected>Human Resources</option>
                <option value="">Legal</option>
                <option value="">Accounting</option>
                <option value="">Product Management</option>
              </select>      
            </div>
            <div class="col-6 mb-2 pr-1">
              <label class="req">Role</label>
              <select>
                <option value="" selected>Admin</option>
                <option value="">HR</option>
                <option value="">Employee</option>                
              </select>      
            </div>
            <div class="col-6  mb-2 pr-1">
              <label class="req">Gender</label>
              <select>
                <option value="" selected>Male</option>
                <option value="">Female</option>
                <option value="">Others</option>                
              </select>      
            </div>
            <div class="col-6 mb-2 px-2">
              <label class="req">Hire Date</label>
              <input type="date" value="2021-07-03"/>
            </div>          
          </div>
        </div>
        <div class="col-lg-6 col-xl-4 col-md-6 col-sm-12 p-0">
          <div class="row sm-page-block mx-2">
            <div class="title">Address</div>
            <div class="col-12 mb-2 px-2">
              <label class="req">Street Address</label>
              <textarea  cols="30" rows="1">1 Eglinton Ave East</textarea>          
            </div>       
            <div class="col-12 mb-2 px-2">
              <label class="req">City</label>
              <input type="text" value="Toronto"/>
            </div>
            <div class="col-12 mb-2 px-2">
              <label class="req">Province</label>
              <input type="text" value="Ontario"/>
            </div>
            <div class="col-12 mb-2 px-2">
              <label class="req">Country</label>
              <input type="text" value="Canada"/>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-xl-4 col-md-6 col-sm-12 p-0">
          <div class="row sm-page-block mx-2">            
            <div class="title">Pay Info</div>
            <div class="col-6 mb-2 px-2">
              <label class="req">Frequency</label>
              <select>
                <option value="">Biweekly</option>
                <option value="">Monthly</option>
              </select>      
            </div>                
            <div class="col-12 mb-2 px-2">
              <label class="req">A/C No.</label>
              <input type="text" value="15000260903112"/>
            </div>
            <div class="col-6 mb-2 px-2">
              <label class="req">Salary</label>
              <input type="text" value="10000"/>
            </div>
            <div class="col-6 mb-2 px-2">
              <label class="req">Gross Amount</label>
              <input type="text" value="3000"/>
            </div>
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
      this.$router.push('/employee');
    }
  }
}
</script>