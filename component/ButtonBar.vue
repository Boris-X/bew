<template>
  <div class="row">
    <div class="col-2 my-2">
      <vue-monthly-picker v-model="selectedMonth" :monthLabels="monthLabels" dateFormat="MMM,YYYY"></vue-monthly-picker>
    </div>
    <div class="col-2 my-2 d-flex align-item-center">
      <b-button size="sm" variant="success" @click="ex()">Export</b-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { domain } from "../utils/Config.js";
import Multiselect from "vue-multiselect";
import VueMonthlyPicker from "vue-monthly-picker";
import moment from "moment";
Vue.component("multiselect", Multiselect);
Vue.component("vue-monthly-picker", VueMonthlyPicker);
import ReportHelper from "../utils/ReportHelper.js";
export default Vue.component("button-bar", {
  props: {
    date: String,
    reportData: Object,
    log: Object
  },
  data() {
    return {
      monthLabels: moment.monthsShort()
    };
  },
  computed: {
    selectedMonth: {
      get() {
        return this.date;
      },
      set(value) {
        this.$emit("update:date", value.format("MMM,YYYY"));
      }
    }
  },
  mounted() {},
  methods: {
    ex() {
      axios.post(
        `${domain}api/CourtesyCall/Data/csv`,
        {
          table: JSON.stringify(
            ReportHelper.genDataSource(this.reportData, this.log)
          )
        },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      );
    }
  }
});
</script>

<style  scoped>
.line-height-1 {
  line-height: 1;
}
</style>

