<template>
  <div>
    <v-row v-if="user_condition.length != 0" class="box grey darken-4">
      <div class="cs">
        <div v-for="(item, i) in user_condition" :key="i">
          {{ item.condition }} {{ item.kpi_id }} - {{ item?.min }} -
          {{ item?.max }}
          {{ item.lessNumber }}
        </div>
      </div>
      <div class="bene">
        {{ user_benefit?.dyanmic }}% of {{ user_benefit?.kpi_id }} and Dyanmic
        Value is :
        {{ user_benefit?.static }}
      </div>
    </v-row>

    <v-card class="mx-auto pa-8" outlined>
      <v-card-title> Add Conditons </v-card-title>
      <v-text-field
        class="pr-5 pl-5"
        type="text"
        v-model="conditionName"
        placeholder="Condition Name"
      >
      </v-text-field>
      <v-select
        class="pr-5 pl-5"
        :items="kpi_ids"
        v-model="select_kpi_id"
        label="Select KPI ID"
      ></v-select>
      <v-select
        v-model="condition"
        class="pr-5 pl-5"
        :items="conditions"
        label="Select The Conditon"
      ></v-select>
      <v-row v-if="condition == 'C11'" class="pr-5 pl-5">
        <v-text-field
          v-model="min"
          class="pr-5 pl-5"
          placeholder="min"
          single-line
          :rules="[numberRule]"
          type="number"
        ></v-text-field>
        <v-text-field
          v-model="max"
          class="pr-5 pl-5"
          placeholder="max"
          single-line
          :rules="[numberRule]"
          type="number"
        ></v-text-field>
      </v-row>
      <v-text-field
        v-if="condition == 'C12'"
        v-model="less_then_value"
        class="pr-5 pl-5"
        placeholder="Enter Less then a Number"
        single-line
        :rules="[numberRule]"
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="greater_then_value"
        v-if="condition == 'C13'"
        class="pr-5 pl-5"
        placeholder="Enter Greater a Number"
        single-line
        :rules="[numberRule]"
        type="number"
      ></v-text-field>
      <v-btn @click="addCondition()" elevation="2">Add Conditon</v-btn>
      <v-card-title> Benefits </v-card-title>
      <v-select
        class="pr-5 pl-5"
        :items="kpi_ids"
        v-model="kpi_id_benefit"
        label="Select KPI ID"
      ></v-select>
      <v-row class="pr-5 pl-5">
        <v-text-field
          v-model="dynamic_value"
          class="pr-5 pl-5"
          placeholder="Dynamic value in %"
          single-line
          type="number"
        ></v-text-field>
        <v-text-field
          v-model="static_value"
          class="pr-5 pl-5"
          placeholder="Eg: +1000"
          single-line
          type="number"
        ></v-text-field>
      </v-row>
      <v-btn @click="addBenefit()" elevation="2">Add Benefit</v-btn>
    </v-card>
    <v-btn @click="createScheme()" elevation="2">Create</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      static_value: null,
      dynamic_value: null,
      user_condition: [],
      user_benefit: {},
      kpi_id_benefit: "",
      conditionName: "",
      greater_then_value: null,
      less_then_value: null,
      select_kpi_id: "",
      kpi_ids: ["K0", "K1", "K2", "K3", "K4"],
      min: undefined,
      max: undefined,
      condition: { text: "", value: "" },
      conditions: [
        { text: "Between two Numbers", value: "C11" },
        { text: "Less then a Number", value: "C12" },
        { text: "Greater than a Number", value: "C13" },
      ],
      c_value: 0,
      numberRule: (v) => {
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 100) return true;
        return "Number has to be between 0 and 100";
      },
    };
  },
  computed: {},
  mounted() {
    console.log("From CreateScheme.js");
  },
  methods: {
    addCondition() {
      let obj = {};
      if (this.condition == "C11")
        obj = {
          kpi_id: this.select_kpi_id,
          condition: this.condition,
          min: +this.min,
          max: +this.max,
        };
      if (this.condition == "C12") {
        obj = {
          kpi_id: this.select_kpi_id,
          condition: this.condition,
          lessNumber: +this.less_then_value,
        };
      }
      if (this.condition == "C13") {
        obj = {
          kpi_id: this.select_kpi_id,
          condition: this.condition,
          greaterNumber: +this.greater_then_value,
        };
      }
      this.user_condition.push(obj);
      console.log(this.user_condition);
    },
    addBenefit() {
      if (this.user_condition.length === 0) console.log("please add condition");
      this.user_benefit = {
        kpi_id: this.kpi_id_benefit,
        static: +this.static_value,
        dyanmic: +this.dynamic_value,
      };
    },
    createScheme() {
      if (this.user_condition.length === 0) {
        console.log("please add condition");
        return;
      }
      if (Object.keys(this.user_benefit).length === 0) {
        console.log("please add benefit");
        return;
      }
      this.$store.dispatch("setScheme", {
        groupName: this.conditionName,
        conditions: this.user_condition,
        benefit: this.user_benefit,
      });
      this.user_condition = [];
      this.user_benefit = {};
      console.log(this.$store.getters.getScheme);
    },
  },
};
</script>

<style scoped>
.box > div {
  width: 200px;
  height: 100px;
  margin: 20px;
  border: 2px solid gray;
  border-radius: 10px;
}
</style>