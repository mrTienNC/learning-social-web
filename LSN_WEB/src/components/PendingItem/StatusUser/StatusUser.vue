<template>
  <div>
    <div v-show="role === isRole.User">
      <b-dropdown variant="primary" text="Option">
        <b-dropdown-item  @click="cancelAndExitCourse()">Exit Course</b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-show="role === isRole.Guest">
      <b-button v-show="!isApprove" @click="join()" variant="outline-success">Join+</b-button>
      <b-dropdown v-show="isApprove" variant="primary" text="No pending">
        <b-dropdown-item @click="cancelAndExitCourse()">Cancel</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>
<script>
import api from '../../../services/api';
import firebase from '../../../firebase/firebase';
import EventBus from '../../EventBus/EventBus';

export default {
  props: ['id', 'role', 'idMemberCourse', 'isApprove', 'isRole'],
  methods: {
    join() {
      const value = firebase.currentUser().email;
      const email = { email: `${value}` };
      api
        .post(`/courses/${this.id}/joins-member`, email)
        .then(() => EventBus.$emit('StatusUser'));
    },
    cancelAndExitCourse() {
      api
        .delete(`/courses/${this.id}/course-members/${this.idMemberCourse}/exist`)
        .then(() => EventBus.$emit('StatusUser'));
    },
  },
};
</script>

