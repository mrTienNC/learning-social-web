<template>
  <div>
    <b-btn href="#" v-b-toggle.accordion1 variant="info"><b-badge variant="light">{{numberMemberPending}}</b-badge> Member</b-btn>
    <b-btn href="#" v-b-toggle.accordion2 variant="info"><b-badge variant="light">{{numberContentPending}}</b-badge> Content</b-btn>
    <b-collapse id="accordion1" class="mt-2" visible>
      <b-card class="p-0">
        <PendingMember :id="id" :role="role" :isRole="isRole"></PendingMember>
      </b-card>
    </b-collapse>
    <b-collapse id="accordion2" class="mt-2">
      <b-card class="p-0">
        <PendingContent :id="id" :role="role" :isRole="isRole"></PendingContent>
      </b-card>
    </b-collapse>
  </div>
</template>
<script>
import PendingMember from '../PendingMember/pendingMember';
import PendingContent from '../PendingContent/PendingContent';
import role from '../../../services/set-role';
import api from '../../../services/api';
import * as isRole from '../../../config/role';
import EventBus from '../../EventBus/EventBus';

export default {
  props: ['id'],
  components: {
    PendingMember,
    PendingContent,
  },
  data() {
    return {
      idUser: localStorage.getItem('idUser'),
      role: null,
      isRole: '',
      numberMemberPending: 0,
      numberContentPending: 0,
    };
  },
  created() {
    this.checkRole();
    this.isRole = isRole;
    EventBus.$on('numberMemberPending', e => this.numberMemberPending = e);
    EventBus.$on('numberContentPending', e => this.numberContentPending = e);
  },
  methods: {
    checkRole() {
      const params = {
        idCourse: this.id,
        idUser: this.idUser,
      };
      api
        .get('/course-member/checkRole', params)
        .then(dataRole => this.role = role.setRole(dataRole));
    },
  },
};
</script>

