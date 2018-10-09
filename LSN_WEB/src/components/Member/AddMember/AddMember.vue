<template>
  <b-container fluid class="p-0">
    <b-input-group class="mb-3">
      <b-form-input type="text"
                    @input="isTyping = true"
                    v-model="value"
                    placeholder="Search. . ."
                    :value="value"></b-form-input>
      <b-input-group-append>
        <b-btn  variant="secondary"
                class="pl-1 pt-0 pb-0 pr-1 "
                id="font" @click="addMember()">&#43;</b-btn>
      </b-input-group-append>
    </b-input-group>
    <div v-show="!isTyping && value !== ''" >
      <ul class="list-group mb-3 tableEmail">
        <li class="list-group-item p-0"
             v-for="(item,key) in searchData"
             :key="key"
             v-if="item.email !== value"
             @click="choice(item.email)"
        >
          <span>{{item.email}}</span>
        </li>
      </ul>
    </div>
    <b-alert :show="dismissCountDown"
             dismissible
             fade
             variant="warning"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      {{message}}
    </b-alert>
  </b-container>
</template>
<script>
import api from '../../../services/api';
import EventBus from '../../EventBus/EventBus';
import Alert from '../../Alert/Alert';

export default {
  components: {
    Alert,
  },
  props: ['id'],
  data() {
    return {
      value: '',
      isTyping: false,
      searchData: [],
      timer: '',
      message: '',
      dismissCountDown: 0,
      dismissSecs: 3,
    };
  },
  watch: {
    value() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        api
          .get(`/members?email=${this.value}`)
          .then(e => this.searchData = e.slice(0, 3));
        this.isTyping = false;
      }, 1000);
    },
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    choice(e) {
      this.value = e;
    },
    addMember() {
      const email = JSON.stringify({ email: `${this.value}` });
      this.value = '';
      api
        .post(`/course-contents/${this.id}/members`, email)
        .then(e => this.alert(e))
        .catch(e => this.alert(e));
    },
    alert(e) {
      this.dismissCountDown = this.dismissSecs;
      if (e.id) {
        EventBus.$emit('updateMembers');
        this.message = 'Bạn đã thêm thành công';
      } else {
        this.message = 'Thành viên này đã trong course!';
      }
    },
  },
};
</script>
<style scoped>
@import './styleAddMember.css';
</style>

