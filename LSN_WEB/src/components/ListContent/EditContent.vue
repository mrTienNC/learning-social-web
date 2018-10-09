<template>
<div>
  <div class="modal fade bd-example-modal-lg" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content p-3 text-left">
        <div class="modal-header">
          <h5 class="modal-title font-weight-bold" id="exampleModalLabel"> Edit Content</h5>
        </div>
        <form id="editForm">
          <div class="form-group row mt-3">
            <div class="col-md-6">
              <label class="form-control-label">Title</label>
              <input type="text" minlength="3" name=""  maxlength="255" v-model="content.editTitle"
                     placeholder="Enter title..." class="form-control" required>
            </div>
            <div class="col-md-6">
              <label class="form-control-label">Level</label>
              <select v-model="content.editLevel" class="form-control">
                <option selected="true" disabled="disabled">Please select value !!!</option>
                <option>Fresher</option>
                <option>Junior</option>
                <option>Senior</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <div class="alert alert-danger col-md-12" v-if="check">
              Oops , End date > Start Date !!
            </div>
            <div class="col-md-6">
              <label class="form-control-label">Start Date</label>
              <input type="date" v-model="content.editStartDate" class="form-control" name="startDate" required>
            </div>
            <div class="col-md-6">
              <label class="form-control-label">End Date</label>
              <input :min="content.editStartDate" type="date" name="date" v-model="content.editEndDate"  for="recipient-date" class="form-control" required>
            </div>
            <div class="col-md-12 mt-3">
              <vue-editor v-model="content.editContents" :editorToolbar="customToolbar"
              required></vue-editor>
            </div>
          </div>
          <div class="form-group row mt-3">
            <div class="col-md-12">
              <button data-dismiss="modal" class="btn btn-danger mr-3 ml-3">Cancel</button>
              <button type="button" class="btn btn-success" @click="updateContent">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>
<script>

import { VueEditor } from 'vue2-editor';
import api from '../../services/api';
import date from '../../services/get-date';
import { editor } from '../../config/editor';

export default {
  props: ['editContent', 'id'],
  components: {
    VueEditor,
  },
  data() {
    return {
      customToolbar: editor,
      check: false,
      message: '',
      userId: localStorage.getItem('idUser'),
      content: {
        idEdit: '',
        editTitle: '',
        editLevel: '',
        editStartDate: '',
        editEndDate: '',
        editContents: '',
      },
    };
  },
  methods: {
    updateContent() {
      $('#editForm').validate();
      if ($('#editForm').valid()) {
        const params = {
          title: this.content.editTitle,
          thumnail: 'thumnail',
          content: this.content.editContents,
          level: this.content.editLevel,
          document: 'googole.com',
          startDate: this.content.editStartDate,
          endDate: this.content.editEndDate,
          userId: this.userId,
          courseId: this.id,
        };
        api
          .put(`/course/${this.id}/course-content/${this.content.idEdit}`, params)
          .then((contentEdit) => {
            contentEdit.startDate = date.formatDate(contentEdit.startDate);
            contentEdit.endDate = date.formatDate(contentEdit.endDate);
            contentEdit.showAll = false;
            this.$emit('editSuccess', contentEdit);
            $('.modal').modal('hide');
          });
      }
    },
    changeModel(data) {
      this.content.editTitle = data.title;
      this.content.editStartDate = data.startDate;
      this.content.editEndDate = data.endDate;
      this.content.editContents = data.content;
      this.content.editLevel = data.level;
      this.content.idEdit = data.id;
    },
  },
};
</script>

