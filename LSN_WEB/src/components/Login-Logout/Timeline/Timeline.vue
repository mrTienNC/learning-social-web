<template>
  <b-container fluid="" class="p-0">
    <div class="row">
      <div class="col-md-9" style="border: 1px solid black">
        
      </div>
      <div class="col-md-3" style="border: 1px solid black">
        <div class="profile">
          <div class="profile-avatar">
            <img src="../../../assets/avatar.jpg" alt="" class="img-responseive">
          </div>
          <div class="profile-name">
            <p><i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                                    <a href="#">Tien Nguyen Chi</a></p>
          </div>
        </div>
        <hr>
        <div class="profile-group">
          <div class="group-name">
            <ul>
              <li><i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                                    <a href="#">PHP</a></li>
              <li><i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                                    <a href="#">PHP</a></li>
              <li><i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                                    <a href="#">PHP</a></li>
              <li><i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                                    <a href="#">PHP</a></li>
              <li><i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                                    <a href="#">PHP</a></li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="profile-event">
          <h3>Events <i class="fa fa-cubes" aria-hidden="true"></i></h3>
          <div class="event-name">
            <h3><a href="#">Java Course</a></h3>
          </div>
          <div class="event-info">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a
              type specimen book</p>
              <p>Start time : <span>10/12/2018</span></p>
              <p>End time : 20/12/2018</p>
              <p>Speaker : <a href="#">Mr Somebody</a></p>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>
<script>
import Leftbar from "../Leftbar/Leftbar";
import Rightbar from "../Rightbar/Rightbar";
export default {
  components: {
    Leftbar,
    Rightbar
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
@import "../Timeline/timeline.css";
</style>
