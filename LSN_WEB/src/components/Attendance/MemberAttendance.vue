<template>
<div class="modal fade" id="attendance">
  <div class="modal-dialog" style="max-width: 500px"  role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-primary font-weight-bold"
          id="exampleModalLongTitle">Take Attendance</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="list-member" v-for="item in listAttendance">
           <div class="col-3 avatar">
             <img :src="item.avatar" height="400" width="400">
           </div>
           <div class="col-9 details">
             <h6 class="text-primary">Name : {{ item.fullName }}</h6>
             <p>Email : {{ item.email }}</p>
             <div class="form-check">
                <label class="form-check-label">
                  <input type="checkbox"
                    :disabled="!attendance" v-model="item.present" class="form-check-input">
                    <span>Present</span>
                </label>
              </div>
           </div>
        </div>
      </div>
      <div class="modal-footer">
        <div v-if="attendance">
          <button class="btn btn-success mr-2"  @click="addAttendance">Done</button>
        </div>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close
          </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '../../services/api';

export default {
  props: ['attendance', 'id'],
  data() {
    return {
      listAttendance: [],
      memberAttendance: [],
      idAttendance: '',
      message: '',
    };
  },
  methods: {
    addAttendance() {
      this.listAttendance.filter((attendance) => {
        if (attendance.present) {
          this.memberAttendance.push(attendance.idUser);
        }
      });
      this.sendAttendance();
    },
    sendAttendance() {
      $('#attendance').modal('hide');
      const params = this.memberAttendance;
      api
        .put(`/courses/${this.id}/attendance/${this.idAttendance}`, params)
        .then((status) => {
          this.$emit('addSuccess');
          this.memberAttendance.length = 0;
          $('#attendance').modal('hide');
        });
    },
    updateAttendance(data) {
      this.listAttendance = data;
    },
    getListMember(idContent) {
      const params = {
        isApprove: true,
      };
      api
        .get(`/courses/${this.id}/attendance`, params)
        .then((attendances) => {
          for (const i in attendances) {
            if (attendances[i].course_content_id === idContent) {
              this.listAttendance = attendances[i].inforMemberAttendance;
              this.idAttendance = attendances[i].attendance_id;
            }
          }
        });
    },
  },
};
</script>
<style scoped>
.list-member {
  padding: 10px 0px 20px 0px;
  margin-bottom: 10px;
  height: auto;
  overflow: hidden;
  border-bottom: 1px solid #dbdbdb;
}

.avatar {
  width: 30%;
}

.avatar img {
  padding-top: 7px;
  height: 70px;
  width: 70px;
  float: left;
}

.details {
  width: 70%;
  float: left;
  padding-left: 10px;
}

.details h5 {
  margin-bottom: 0px;
}

.details p {
  margin-bottom: 0px;
}
</style>
