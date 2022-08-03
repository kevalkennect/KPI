<template>
  <div>
    <ListScheme />
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Create Scheme
        </v-btn>
      </template>

      <CreateScheme />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Close </v-btn>
        <v-btn color="primary" text @click="$emit('createScheme')"
          >Add Scheme
        </v-btn>
      </v-card-actions>
    </v-dialog>

  
    <CalacData />
  </div>
</template>

<script>
import CreateScheme from "../components/Schemes/CreateScheme.vue";
import ListScheme from "../components/Schemes/ListScheme.vue";
import CalacData from "../components/CalacData.vue";
export default {
  components: {
    CreateScheme,
    ListScheme,
    CalacData,
  },
  data() {
    return {
      data: [],
      obj: {},
      result: {},
    
      dialog: false,
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
  methods: {
    testing() {
      this.data = this.$store.getters.getData;
      // for (let i = 0; i < 20; i++) {
      //   this.data.push(res[i]);
      // }
      // console.log(this.data);
      // console.log(this.schemes);
      // const obj = {};
      // console.log(this.schemes.groupC1(60));

      // What is 25% of 100?

      // Y is 25% of 100
      //quation: Y = P% * X

      // Solving our equation for Y
      // Y = P% * X
      // Y = 25% * 100

      // Converting percent to decimal:
      // p = 25%/100 = 0.25

      // Y = 0.25 * 100
      // Y = 25

      function getPerc(percent, num) {
        percent = percent / 100;
        return Number(percent) * Number(num);
      }
      console.log(getPerc(25, 100));
      // creating a object of data to manipulate
      var createNestedObject = function (base, names) {
        for (var i = 0; i < names.length; i++) {
          base = base[names[i]] = base[names[i]] || {};
        }
      };
      this.data.forEach((el, i, arr) => {
        const [
          kpi_id,
          emp_id,
          month,
          year,
          kpi_value,
          product,
          kpi_val_in_rupees,
        ] = Object.values(el);

        createNestedObject(this.obj, [emp_id, year, month, kpi_id, product]);
        createNestedObject(this.result, [year, month, emp_id, kpi_id, product]);
        this.obj[emp_id][year][month][kpi_id][product].kpi_value = +kpi_value;
        this.obj[emp_id][year][month][kpi_id][product].kpi_val_in_rupees =
          +kpi_val_in_rupees;
      });
      console.log(this.obj, "Object");
      this.data.forEach((el, i, arr) => {
        const [
          kpi_id,
          emp_id,
          month,
          year,
          kpi_value,
          product,
          kpi_val_in_rupees,
        ] = Object.values(el);
        const K3 =
          this.obj[emp_id][year][month]["K3"][product].kpi_val_in_rupees;

        if (
          this.schemes.groupC1(
            this.obj[emp_id][year][month][kpi_id][product].kpi_value
          ) === true
        ) {
          let benefit = getPerc(1, +K3);
          this.result[year][month][emp_id][kpi_id][product].benefits = benefit;
          this.obj[emp_id][year][month][kpi_id][product].benefits =
            Math.trunc(benefit);
        } else {
          this.result[year][month][emp_id][kpi_id][product].benefits = 0;
        }
      });
      console.log(this.obj, this.result);
    },
  },
  created() {
    this.testing();
  },
};
</script>

<style>
</style>