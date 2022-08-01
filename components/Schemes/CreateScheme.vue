<template>
  <v-card class="mx-auto pa-8" outlined>
    <v-card-title> Conditons </v-card-title>
    <v-select
      class="pr-5 pl-5"
      :items="kpi_ids"
      v-model="select_kpi_id"
      label="Select KPI ID"
    ></v-select>
    <v-select
      class="pr-5 pl-5"
      :items="conditions"
      v-model="select_condition"
      label="Select The Conditon"
    ></v-select>
    <div v-show="select_condition == 'Between two Numbers'">
      <v-range-slider
        v-model="range"
        :max="max"
        :min="min"
        class="align-center"
      >
        <template v-slot:prepend>
          <v-text-field
            :value="range[0]"
            type="number"
            style="width: 60px"
            @change="$set(range, 0, $event)"
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            :value="range[1]"
            type="number"
            style="width: 60px"
            @change="$set(range, 1, $event)"
          ></v-text-field>
        </template>
      </v-range-slider>
    </div>
    <div v-show="select_condition == 'Less then a Number'">
      <v-text-field
        class="pr-5 pl-5"
        placeholder="Enter a Number"
        single-line
        :rules="[numberRule]"
        type="number"
      ></v-text-field>
    </div>
    <v-btn elevation="2">Create</v-btn>

    <!-- <v-card-actions>
      <v-btn outlined rounded text> Button </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      select_condition: "",
      select_kpi_id: "",
      kpi_ids: ["K0", "K1", "K2", "K3", "K4"],
      min: 0,
      max: 100,
      range: [0, 5],
      conditions: [
        "Between two Numbers",
        "Less then a Number",
        "Greater than a Number",
      ],
      c_value: 0,
      groupName: "",
      numberRule: (v) => {
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 100) return true;
        return "Number has to be between 0 and 100";
      },
      schemes: {
        C11: (value) => value >= 90 && value <= 100,
        C12: (value) => value >= 20 && value <= 40,
        C13: (value) => value <= 50,
        groupC1: (value) => {
          return this.schemes.C11(value) ||
            this.schemes.C12(value) ||
            this.schemes.C13(value)
            ? true
            : false;
        },
      },
    };
  },
  computed: {},
  mounted() {
    console.log("From CreateScheme.js");
  },
  methods: {
    addScheme() {},
  },
};
</script>

<style>
</style>