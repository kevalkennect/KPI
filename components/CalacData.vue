<template>
  <v-card>
    <v-card-title> Process the Data </v-card-title>
    <v-card-text>
      Upload btn
      <v-dialog v-model="dialog2" width="800">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            View Data
          </v-btn>
        </template>
        <Table />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog2 = false">Close </v-btn>
        </v-card-actions>
      </v-dialog></v-card-text
    >
    <v-card-subtitle> Select Scheme Number </v-card-subtitle>
    <v-select
      class="pr-5 pl-5"
      :items="setScheme"
      v-model="scheme_id"
      label="Select Scheme ID"
    ></v-select>
    <v-card-text>
      <v-btn @click="sumbit" color="primary">Go </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import table from "../components/view/table.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Table: table,
  },
  data() {
    return {
      scheme_id: "",
      dialog2: false,
    };
  },
  computed: {
    setScheme() {
      return this.$store.getters.getScheme.map((el) => el.groupName);
    },
    ///note
    // getScheme: {
    //   get() {
    //     return this.getScheme;
    //   },
    //   set(value) {
    //     this.list_schemes = value;
    //   },
    // },
  },
  methods: {
    sumbit() {
      let scheme = this.$store.getters.getScheme.find(
        (e) => e.groupName == this.scheme_id
      );
      if (!scheme) return;
      const { conditions, benefit, groupName } = scheme;

      conditions.forEach(
        ({ kpi_id, condition, min, max, lessThan, greaterNumber }) => {
          if (condition == "C11") {
            console.log(kpi_id, condition, min, max, lessThan, greaterNumber);
          }
          if (condition == "C12") {
            console.log(kpi_id, condition, min, max, lessThan, greaterNumber);
          }
          if (condition == "C13") {
            console.log(kpi_id, condition, min, max, lessThan, greaterNumber);
          }
        }
      );
    },
    greaterThan(value, min, max) {},
    lessThan() {},
    betweenTwoValue() {},
  },
};
</script>

<style>
</style>