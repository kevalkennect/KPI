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
      result: {},
      condition: [],
      benefit: {},
      scheme_id: "",
      dialog2: false,
      nestedObj: {},
    };
  },
  computed: {
    setScheme() {
      return this.$store.getters.getScheme.map((el) => el.groupName);
    },
    getData() {
      return this.$store.getters.getData;
    },

    // /note
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

      const { kpi_id_benefit, dynamic } = benefit;
      console.log(scheme);
      // this.getData.forEach((el, i, arr) => {
      //   const [
      //     kpi_id,
      //     emp_id,
      //     month,
      //     year,
      //     kpi_value,
      //     product,
      //     kpi_val_in_rupees,
      //   ] = Object.values(el);

      //   const K3 =
      //     this.nestedObj[emp_id][year][month][this.benefit?.kpi_id][product]
      //       .kpi_val_in_rupees;
      //   console.log(K3);
      // });
      ////////
      this.condition = conditions;

      this.getData.forEach((el, i, arr) => {
        const [
          kpi_id_main,
          emp_id,
          month,
          year,
          kpi_value,
          product,
          kpi_val_in_rupees,
        ] = Object.values(el);

        this.condition.forEach(
          ({
            kpi_id_condition,
            condition,
            min,
            max,
            lessNumber,
            greaterNumber,
          }) => {
            let value =
              this.nestedObj[emp_id][year][month][kpi_id_benefit][product]
                .kpi_val_in_rupees;
            if (condition == "C11") {
              if (
                this.betweenTwoValue(
                  +this.nestedObj[emp_id][year][month][kpi_id_condition][
                    product
                  ].kpi_value,
                  min,
                  max
                ) === true
              ) {
                let percent_value = this.getPerc(+dynamic, +value);
                console.log(percent_value);

                this.result[year][month][emp_id][kpi_id_condition][
                  product
                ].benefits = percent_value;
              }
            }
            if (condition == "C12") {
              if (
                this.lessThan(
                  +this.nestedObj[emp_id][year][month][kpi_id_condition][
                    product
                  ].kpi_value,
                  lessNumber
                ) == true
              ) {
                // console.log("C12");
                console.log(
                  +this.nestedObj[emp_id][year][month][kpi_id_condition][
                    product
                  ].kpi_value,
                  "--------->",
                  kpi_id_condition
                );
                let percent_value = this.getPerc(+dynamic, +value);
                console.log(percent_value);

                this.result[year][month][emp_id][kpi_id_condition][
                  product
                ].benefits = percent_value;
              }
            }
            if (condition == "C13") {
              console.log("C13", greaterNumber);

              if (
                this.greaterThan(
                  +this.nestedObj[emp_id][year][month][kpi_id_condition][
                    product
                  ].kpi_value,
                  greaterNumber
                ) == true
              ) {
                let percent_value = this.getPerc(+dynamic, +value);
                console.log(percent_value);
                this.result[year][month][emp_id][kpi_id_condition][
                  product
                ].benefits = percent_value;
              }
            }
          }
        );
      });
      // const isTrue = this.betweenTwoValue(+1000, +10, +20);

      // console.log(isTrue);

      console.log(this.result);
    },
    getPerc(percent, num) {
      console.log(percent, num);
      percent = percent / 100;
      return percent * num;
    },
    betweenTwoValue(value, min, max) {
      if (value >= min && value <= max) {
        return true;
      } else {
        return false;
      }
    },
    lessThan(value, lessThan) {
      //  C12: (value) => value >= 20 && value <= 40,
      if (value < lessThan) {
        return true;
      } else {
        return false;
      }
    },
    greaterThan(value, greaterNumber) {
      if (value >= greaterNumber) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    function createNestedObject(base, names) {
      for (var i = 0; i < names.length; i++) {
        base = base[names[i]] = base[names[i]] || {};
      }
    }
    this.getData.forEach((el, i, arr) => {
      const [
        kpi_id,
        emp_id,
        month,
        year,
        kpi_value,
        product,
        kpi_val_in_rupees,
      ] = Object.values(el);

      createNestedObject(this.nestedObj, [
        emp_id,
        year,
        month,
        kpi_id,
        product,
      ]);
      createNestedObject(this.result, [year, month, emp_id, kpi_id, product]);

      this.nestedObj[emp_id][year][month][kpi_id][product].kpi_value =
        +kpi_value;
      this.nestedObj[emp_id][year][month][kpi_id][product].kpi_val_in_rupees =
        +kpi_val_in_rupees;
    });
    console.log(this.nestedObj);
  },
};
</script>

<style>
</style>