<template>
  <b-container>
    <b-row>
      <b-col v-for="(item,key) in dataMember" :key="key" md="6" class="pb-1 pr-1 pl-1 pt-1">
        <b-card>
          <b-media>
            <img :src="item.user.avatar" id="formatImg" slot="aside"/>
            <h5 class="mt-0 user" >
              <div>{{item.user.fullName}}</div>
              <div v-show="role === isRole.Admin">
                <i @click="accept(key,item.id)" class="fas fa-check-circle"></i>
              </div>
            </h5>
            <div id="clearBoth"></div>
            <p>
              <b>Date join:</b>{{new Date(item.user.dateOfBirth).toDateString()}}
            </p>
            <p id="sizeGmailSkype">
              <b>Gmail:</b>{{item.user.email}}
            </p>
            <p id="sizeGmailSkype">
              <b>Skype:</b>{{item.user.email}}
            </p>
          </b-media>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import api from '../../../services/api';
import EventBus from '../../EventBus/EventBus';

export default {
  props: ['id', 'role', 'isRole'],
  data() {
    return {
      dataMember: [],
    };
  },
  created() {
    this.getMembersPending();
  },
  methods: {
    accept(index, id) {
      api
        .put(`/courses/${this.id}/course-members/${id}`)
        .then(() => this.getMembersPending());
    },
    getMembersPending() {
      const approved = { isApprove: false };
      api
        .get(`/courses/${this.id}/course-members`, approved)
        .then((e) => {
          this.dataMember = e;
          EventBus.$emit('numberMemberPending', e.length);
        });
    },
  },
};
</script>
<style scoped>
@import './stylePendingMember.css';
</style>
