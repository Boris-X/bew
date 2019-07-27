<template>
  <div id="app" class="container-fluid">
    <button-bar v-bind:date.sync="date" v-bind:report-data="reportDate" v-bind:log="log"></button-bar>
    <report-table v-bind:report-data="reportDate" v-bind:log="log"></report-table>
  </div>
</template>

<script>
import axios from "axios";
import ReportTable from "./component/Report.vue";
import ButtonBar from "./component/ButtonBar.vue";
import ControlPanel from "./component/ControlPanel.vue";
import { domain } from "./utils/Config.js";
import moment from "moment";
export default {
  name: "app",
  data() {
    return {
      date: "",
      reportDate: null,
      log: null
    };
  },
  mounted() {
    this.date = moment().format("MMM,YYYY");
    axios
      .post(
        `${domain}api/common/comment/load?catelog=courtesycall-report&subcate=`
      )
      .then(res => {
        this.log = JSON.parse(res.data);
      });
  },
  components: {
    ReportTable,
    ButtonBar,
    ControlPanel
  },
  methods: {},
  watch: {
    date() {
      axios
        .post(
          `${domain}api/CourtesyCall/Data/GetCourtesyCall?` +
            `year=${moment(this.date, "MMM,YYYY").get("year")}&` +
            `month=${moment(this.date, "MMM,YYYY").get("month") + 1}`
        )
        .then(res => {
          this.reportDate = res.data;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
