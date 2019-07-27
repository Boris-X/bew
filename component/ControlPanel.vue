<template>
  <div class="row">
    <div class="col-3">
      <b-button-group vertical>
        <b-button variant="success" @click="changeColor('bg-success text-white')">Success</b-button>
        <b-button variant="primary" @click="changeColor('bg-info text-white')">Info</b-button>
        <b-button variant="danger" @click="changeColor('bg-danger text-white')">Danger</b-button>
        <b-button @click="changeColor()">Clear</b-button>
      </b-button-group>
    </div>
    <div class="col-9 clearfix">
      <b-form-textarea
        id="textarea"
        placeholder="Enter something..."
        rows="6"
        max-rows="6"
        v-model="comment"
      ></b-form-textarea>
      <b-button class="mt-2 float-right" variant="success" @click="saveComment()">Save Comment</b-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { domain } from "../utils/Config.js";

export default Vue.component("control-panel", {
  props: {
    data: Object
  },
  data() {
    return {
      comment: ""
    };
  },
  watch: {
    data: function() {
      this.comment = this.data.comment;
    }
  },
  mounted() {
    console.log(this.data);
  },
  methods: {
    changeColor: function(color) {
      axios
        .get(
          `${domain}api/common/comment/saveColor?catelog=courtesycall-report&subcate=&key=${
            this.data.id
          }&color=${color}`
        )
        .then(res => {
          this.data.color = color;
          this.$emit("close");
        });
    },
    saveComment: function() {
      axios
        .get(
          `${domain}api/common/comment/saveComment?catelog=courtesycall-report&subcate=&key=${
            this.data.id
          }&content=${this.comment}`
        )
        .then(res => {
          this.data.comment = this.comment;
          this.$emit("comment", this.comment);
          this.$emit("close");
        });
    }
  }
});
</script>