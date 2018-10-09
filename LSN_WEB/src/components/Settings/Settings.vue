<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9 m-auto ">
        <ClourseSettings :id = "id" :role = "role" :isRole="isRole"></ClourseSettings>
        <DocumentsSettings :id = "id" :role = "role" :isRole="isRole"></DocumentsSettings>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '../../services/api.js';
import ClourseSettings from './ClourseSettings';
import DocumentsSettings from './DocumentsSettings';
import role from '../../services/set-role';
import * as isRole from '../../config/role';

export default {
  props: ['id'],
  components: {
    ClourseSettings,
    DocumentsSettings,
  },
  data() {
    return {
      role: '',
      isRole: '',
      idUser: localStorage.getItem('idUser'),
    };
  },
  methods: {
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
  },
  created() {
    this.checkRole();
    this.isRole = isRole;
  },
};
</script>
