<template>
  <div class="row-mt-5">
    <form id="clourseSettings">
      <div class="col-md-12 pl-0 pr-0">
        <li class="list-group-item">
          <div class="row input-group">
            <div class="col-12">
              <label class="showIcon" >Class name:
                <span v-if = "!checkName">
                  {{user.name}}
                </span>
                <span class="iconCourse" @click = "checkName = !checkName" >
                  <i  v-if = "!checkName && role === isRole.Admin  " class="fa fa-pencil showIconCourse ml-2"
                    aria-hidden="true">
                  </i>
                </span>
              </label>
            </div>
              <div class="col-12 text-left" v-if = "checkName">
                <input  type="text" class="col-8 form-control mb-2" v-model="editName" required>
                <div class="input-group-append">
                  <button  type="button" class="btn btn-outline-secondary mr-2" @click="editCourse">Save</button>
                  <button  type="button" class="btn btn-outline-secondary" @click="cancleCourse">Cancle</button>
                </div>
              </div>
            </div>
        </li>
      <li class="list-group-item">
              <div class="row input-group">
                <div class="col-12">
                <label  class="showIcon">Description:
                  <span v-if="!checkDescription">
                    {{user.content}}
                  </span>
                  <span class="iconCourse" @click="checkDescription=!checkDescription">
                    <i v-if = "!checkDescription && role === isRole.Admin"
                    class="fa fa-pencil showIconCourse ml-2 "
                    aria-hidden="true">
                    </i>
                  </span>
                </label>
                 </div>
              <div class="col-12 text-left" v-if = "checkDescription">
                <input  type="text"  class="col-8 form-control mb-2" v-model="editDescreption"required>
                <div class="input-group-append">
                  <button  type="button" class="btn btn-outline-secondary mr-2" @click = "editCourse">Save</button>
                  <button  type="button" class="btn btn-outline-secondary" @click = "cancleCourse">Cancle</button>
                </div>
              </div>
         </div>
      <li class="list-group-item">
        <div class="row input-group">
          <div class="col-12">
            <label class="showIcon">Start date:
              <span v-if="!checkDate">
                    {{user.startDate}}
              </span>
              <span class="iconCourse" @click = "checkDate = !checkDate">
                <i v-if = "!checkDate && role === isRole.Admin"
                    class="fa ml-2 fa-pencil showIconCourse" aria-hidden="true">
                </i>
              </span>
            </label>
          </div>
          <div class="col-12 text-left " v-if = "checkDate">
            <input type="date"  class="col-8 form-control mb-2" v-model="editStartDate" required>
            <div class="input-group-append">
              <button  type="button" class="btn btn-outline-secondary mr-2" @click="editCourse">Save</button>
              <button  type="button"  class="btn btn-outline-secondary" @click="cancleCourse">Cancle</button>
            </div>
          </div>
        </div>
      </li>
      </div>
    </form>
    <Notification ref="show" :message = "message"></Notification>
  </div>
</template>
<script type="text/javascript">
import api from '../../services/api.js';
import '../../../node_modules/jquery-validation/dist/jquery.validate';
import Notification from '../notification';
import EventBus from '../EventBus/EventBus';

export default {
  props: ['id', 'role', 'isRole'],
  components: {
    Notification,
  },
  data() {
    return {
      user: [],
      message: '',
      editName: '',
      editDescreption: '',
      editStartDate: '',
      checkName: false,
      checkDescription: false,
      checkDate: false,
    };
  },
  methods: {
    validate() {
      $('#clourseSettings').validate();
      return $('#clourseSettings').valid();
    },
    cancleCourse() {
      this.checkName = this.checkDescription = this.checkDate = false;
      this.getCourse();
    },
    editCourse() {
      if (this.validate()) {
        const params = {
          name: this.editName,
          content: this.editDescreption,
          create_date: this.editStartDate,
        };
        api
          .put(`/courses/${this.id}`, params)
          .then((courseDetails) => {
            this.message = 'Cập nhật thông tin Course thành công';
            this.$refs.show.show();
            this.cancleCourse();
            EventBus.$emit('updateCourse');
          });
      }
    },
    getCourse() {
      api
        .get(`/courses/${this.id}`)
        .then((courseDetails) => {
          this.user = courseDetails;
          this.editName = this.user.name;
          this.editDescreption = this.user.content;
          this.editStartDate = this.user.startDate;
        });
    },
  },
  created() {
    this.getCourse();
  },
};
</script>
<style type="text/css" scoped>
.showIconCourse {
  display: none;
  cursor: pointer;
}
.input-group:hover .showIconCourse {
  display: inline-block;
}
.icon:hover , .showIconCourse:hover {
  color: #0b670e;
}
.icon {
  cursor: pointer;
}
.showIcon {
  color: #c30909;
}
</style>
