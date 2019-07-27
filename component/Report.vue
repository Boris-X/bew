<template>
  <div id="report-container">
    <b-table
      class="table-feature"
      :fields="fields"
      :items="dataSource"
      :per-page="perPage"
      :current-page="currentPage"
      thead-class="table-header"
      small
      bordered
      hover
    >
      <template v-for="(item, index) in fields" :slot="item" slot-scope="scope">
        <div
          class="p-1 dblable"
          :class="[scope.value.labelCss||'text-center', scope.value.color]"
          :key="index"
          :id="scope.value.id"
          @dblclick="cellDbClick(scope.value)"
        >
          {{scope.value.value || 0}}
          <i
            class="fas fa-info-circle"
            v-if="scope.value.comment"
            v-b-tooltip.hover
            :title="scope.value.comment"
          ></i>
        </div>
      </template>
    </b-table>
    <b-pagination
      class="align-item-center justify-content-center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      limit="10"
      size="sm"
    ></b-pagination>

    <b-modal
      ref="drawdown-detail-modal"
      title="Draw Down Summary Detail"
      size="xl"
      scrollable
      centered
      hide-footer
    ></b-modal>
    <b-modal ref="popover-modal" hide-footer title="Control Panel">
      <control-panel
        :data="control_panel_data"
        v-on:close="$refs['popover-modal'].hide()"
        v-on:comment="control_panel_data.comment = $event"
      ></control-panel>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { domain } from "../utils/Config.js";

import ReportHelper from "../utils/ReportHelper.js";

export default Vue.component("report-table", {
  props: {
    reportData: Object,
    log: Object
  },
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      hideSections: [],
      drawdownDetails: [],
      control_panel_data: {}
    };
  },
  computed: {
    rows() {
      return this.dataSource.length;
    },
    dataSource() {
      const datasource = ReportHelper.genDataSource(this.reportData, this.log);
      return datasource;
    },
    fields() {
      return this.reportData && ReportHelper.genFields(this.reportData);
    }
  },
  mounted() {},
  methods: {
    cellDbClick(data) {
      this.control_panel_data = data;
      this.$refs["popover-modal"].show();
    },
    formatter(value, type) {
      return ReportHelper.formatter(value, type);
    },
    closeControlPanel() {}
  }
});
</script>

<style scoped >
.table-feature {
  font-size: 14px;
}
.table-feature >>> td {
  height: 30px;
  padding: 0;
}
</style>
<style>
.L_bold {
  font-weight: bold;
}
.L_left {
  text-align: left;
}
.L_right {
  text-align: right;
}
.L_italic {
  font-style: italic;
}
.L_gray {
  color: gray;
}
td.L_toggle {
  text-decoration: underline;
}
.table-grey {
  background-color: rgba(173, 173, 173, 0.5);
}
.table-green {
  background-color: rgba(148, 224, 47, 0.66);
}
.cell-color1 {
  background-color: #dc3545;
  color: #fff;
}
.cell-color2 {
  background-color: #28a745;
  color: #fff;
}
.cell-color3 {
  background-color: #17a2b8;
  color: #fff;
}
#report-container .table-header th {
  text-align: center;
}
#report-container .table-header th:first-child {
  text-align: left;
}
.dblable {
  cursor: pointer;
  user-select: none;
}
</style>
