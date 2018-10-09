<template>
<div class="content">
  <div class="add-content">
    <nav class="add-content-header">
      <div @click=" tabAdd = true; tabExist = false" v-bind:class="{active: tabAdd}"
        class="nav-item-tab">
        Add Contents
      </div>
      <div @click="tabAdd = false; tabExist = true" v-bind:class="{active: tabExist}"
        class="nav-item-tab">
        or view existing contents
      </div>
    </nav>
    <div class="add-content-body">
      <div v-if="tabAdd" class="tab-content" >
        <div v-if="showAdd">
          <input @click="showAddContent()" type="text" class="form-control"
          placeholder="You have news content ?" name="">
        </div>
        <div v-if="!showAdd">
          <CreateContent  :id="id"  @createContent="createContent"
          v-on:hideAdd="showAdd = !showAdd"></CreateContent>
        </div>
      </div>
      <div v-if="tabExist" class="tab-content">
        No item exist
      </div>
    </div>
  </div>
  <!-- list content -->
  <div v-if="tabAdd" class="list-content">
    <ShowContent :isRole="isRole" :role="role" :id="id" ref="showContent"
        v-if="listContent.length != 0"
      :listContent="listContent" v-on:editContent="editContent"></ShowContent>
    <EditContent :id="id" @editSuccess="updateDataEdit"
      ref="edit" :editContent="editContent"></EditContent>
  </div>
  <!-- end list content -->
  <Alert :message="message" ref="nottification"></Alert>
</div>
</template>
<script>
import api from '../../services/api';
import CreateContent from './CreateContent';
import ShowContent from './ShowContent';
import date from '../../services/get-date';
import EditContent from './EditContent';
import MemberAttendance from '../Attendance/MemberAttendance';
import Alert from '../Alert/Alert';
import role from '../../services/set-role';
import * as isRole from '../../config/role';
import EventBus from '../EventBus/EventBus';

export default {
  props: ['id'],
  components: {
    CreateContent,
    ShowContent,
    MemberAttendance,
    EditContent,
    Alert,
  },
  data() {
    return {
      tabAdd: true,
      tabExist: false,
      listContent: [],
      showAdd: true,
      message: '',
      role: '',
      isRole: '',
      idUser: parseInt(localStorage.getItem('idUser')),
    };
  },
  created() {
    this.getListContent();
    this.checkRole();
    this.isRole = isRole;
    EventBus.$on('StatusUser', () => this.checkRole());
  },
  methods: {
    getListContent() {
      const params = {
        isApprove: true,
      };
      api
        .get(`/course/${this.id}/course-content`, params)
        .then((contents) => {
          if (contents) {
            contents.forEach((content) => {
              content.showAll = false;
              content.startDate = date.formatDate(content.startDate);
              content.endDate = date.formatDate(content.endDate);
            });
            this.listContent = contents.reverse();
          }
        });
    },
    checkRole() {
      const params = {
        idCourse: this.id,
        idUser: this.idUser,
      };
      api
        .get('/course-member/checkRole', params)
        .then((dataRole) => {
          this.role = role.setRole(dataRole);
        });
    },
    showAddContent() {
      if (this.role === isRole.Guest) {
        this.message = 'Bạn không phải là thành viên của Course';
        this.$refs.nottification.showAlert();
      } else {
        this.showAdd = !this.showAdd;
      }
    },
    editContent(data) {
      this.$refs.edit.changeModel(data);
    },
    updateDataEdit(data) {
      this.message = 'Sửa bài viết thành công';
      this.$refs.nottification.showAlert();
      this.$refs.showContent.updateList(data);
    },
    createContent(data) {
      if (this.role === isRole.Admin) {
        this.message = 'Tạo bài viết thành công';
        this.$refs.nottification.showAlert();
        if (this.listContent.length > 0) {
          this.$refs.showContent.createContent(data);
        } else {
          this.getListContent();
        }
      } else if (this.role === isRole.User) {
        this.message = 'Bài đăng của bạn đang cần phê duyệt';
        this.$refs.nottification.showAlert();
      }
    },
  },
};
</script>

