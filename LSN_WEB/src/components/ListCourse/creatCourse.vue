<template>
 <div class="modal-dialog" role="document" style="max-width: 500px">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title font-weight-bold" id="exampleModalLabel">Create New Course </h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form id="createForm">
        <div class="form-group">
          <label for="cname" class="col-form-label font-weight-bold">Your Course Name</label>
          <input minlength="3"  maxlength="255" type="text"
          v-model="course.courseName" class="form-control" id="cname" required>
        </div>
        <div class="form-group">
          <label for="Descreption" class="col-form-label font-weight-bold">Descreption</label>
          <input maxlength="255" type="text"
          v-model="course.courseDescreption" class="form-control" id="Descreption">
        </div>
        <div class="form-group">
          <label for="recipient-date" class="col-form-label font-weight-bold"> Start Date </label>
          <input :min="today" v-model="course.startDate" type="date" class="form-control" name="" required>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" data-dismiss="modal">
        <i class="fa fa-times"></i>
        Close
      </button>
      <button @click="createGroup" type="submit" class="btn btn-success">
        <i class="fa fa-check" aria-hidden="true"></i>
        Done and Finish
      </button>
    </div>
  </div>
</div>
</template>
<script>
import api from '../../services/api';
import date from '../../services/get-date';

export default {
  data() {
    return {
      course: {
        courseName: '',
        courseDescreption: '',
        startDate: '',
      },
      today: '',
      message: '',
    };
  },
  methods: {
    createGroup() {
      $('#createForm').validate();
      if ($('#createForm').valid()) {
        const params = {
          name: this.course.courseName,
          content: this.course.courseDescreption,
          create_date: this.course.startDate,
          avatar: 'https://picture.vn/wp-content/uploads/2017/04/gio-vang-trong-nhiep-anh-1.jpg',
          thumbnail: 'https://webnhiepanh.com/wp-content/uploads/2017/12/34943640193_c2a25d399e_b-830x402.jpg',
          creator: localStorage.getItem('idUser'),
        };
        api
          .post('/courses', params)
          .then((courses) => {
            this.message = 'Tạo Course thành công';
            $('.modal').modal('hide');
            this.resetData();
            this.$emit('create', courses, this.message);
          });
      }
    },
    resetData() {
      this.groupName = '';
      this.groupDescreption = '';
      this.startDate = '';
    },
  },
  created() {
    this.today = date.getToday();
  },
};
</script>

