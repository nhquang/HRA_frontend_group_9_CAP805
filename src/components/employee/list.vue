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
              <td style="min-width: 150px">Branch</td>
              <td style="min-width: 150px">Department</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">1</td>
              <td>John Doe</td>
              <td>jdoe@example.com</td>
              <td>Headquarter</td>
              <td>Human Resources</td>
              <td class="text-end">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editEmployee()">Edit</a>
                <span>|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger">Delete</a>
              </td>
            </tr>
            <tr>
              <td class="text-center">2</td>
              <td>Faulkner</td>
              <td>faulkner@example.com</td>
              <td>Branch 1</td>
              <td>Accounting</td>
              <td class="text-end">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editEmployee()">Edit</a>
                <span>|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger">Delete</a>
              </td>
            </tr>            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    addEmployee() {
      this.$router.push('/employee/add');
    },
    editEmployee() {
      this.$router.push('/employee/edit');
    }
  }
}
</script>
