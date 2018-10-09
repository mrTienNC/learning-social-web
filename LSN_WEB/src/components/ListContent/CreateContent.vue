<template>
  <div class="container">
    <form id="createContent" validate="validate">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6"> Title </div>
            <div class="col-md-6"> Level </div>
            <div class="col-md-6 form-group">
             <input minlength="3" name="title" maxlength="64" type="text" v-model="content.newTitle" class="form-control" id="cname" required>
           </div>
           <div class="col-md-6">
            <div class="form-group">
              <select v-model="content.newLevel" class="form-control">
                <option disabled="disabled">Please select value !!!</option>
                <option>Fresher</option>
                <option>Junior</option>
                <option>Senior</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-6"  >
            <label class="lableDate">Start Day</label><br>
            <input name="startDate" :min="today" v-model="content.newStartDate" type="date" class="form-control"  required>
          </div>
          <div class="form-group col-md-6" >
            <label for="recipient-date" class="lableEndDate">End Day</label><br>
            <input :min="content.newStartDate == '' ? today : content.newStartDate" for="recipient-date" name="enddate" v-model="content.newEndDate" type="date" class="form-control"  required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <vue-editor v-model="content.newContent" :editorToolbar="customToolbar"></vue-editor>
            <div style="color:red" v-if="checkLength" >The filed is required</div>
          </div>

        </div>
        <div class="row mb-3 mt-3">
          <button class="btn btn-danger mr-3 ml-3" @click="$emit('hideAdd')">Cancel</button>
          <button class="btn btn-primary" type="button" @click="addData">Done</button>
        </div>
      </div>
      </div>
    </form>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor';
import api from '../../services/api';
import date from '../../services/get-date';
import { editor } from '../../config/editor';
import '../../../node_modules/jquery-validation/dist/jquery.validate';

export default {
  props: ['id'],
  components: {
    VueEditor,
  },
  data() {
    return {
      customToolbar: editor,
      checkLength: false,
      content: {
        newTitle: '',
        newStartDate: '',
        newLevel: 'Fresher',
        newEndDate: '',
        newContent: '',
        thumnail: '',
      },
      today: '',
      message: '',
      lisContent: [],
    };
  },
  methods: {
    checkContent() {
      this.checkLength = !this.content.newContent;
      return !!this.content.newContent;
    },
    addData() {
      $('#createContent').validate();
      this.checkContent();
      if ($('#createContent').valid() && this.checkContent()) {
        const params = {
          title: this.content.newTitle,
          thumnail: this.content.thumnail,
          content: this.content.newContent,
          level: this.content.newLevel,
          document: 'google.com',
          startDate: this.content.newStartDate,
          endDate: this.content.newEndDate,
          courseId: this.id,
          userId: localStorage.getItem('idUser'),
        };
        api
          .post(`/course/${this.id}/course-content`, params)
          .then((contentNew) => {
            contentNew.showAll = false;
            contentNew.startDate = date.formatDate(contentNew.startDate);
            contentNew.endDate = date.formatDate(contentNew.endDate);
            this.$emit('createContent', contentNew);
            this.$emit('hideAdd');
          });
      }
    },
  },
  created() {
    this.today = date.getToday();
  },
};
</script>
