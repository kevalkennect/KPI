<template>
  <v-card class="">
    <v-card-title> Schemes </v-card-title>
    <v-card-text>
      <v-row>
        <v-card elevation="10 mr-4" v-for="(item, i) in getScheme" :key="i">
          <!-- <div class="pa-8"> -->
          <v-card-title>
            {{ item.groupName }}
          </v-card-title>
          <v-list-item v-for="(i, index) in item.conditions" :key="index">
            {{ index + 1 }} --> {{ i.kpi_id }}
            {{
              i.condition == "C11"
                ? "between"
                : "" || i.condition == "C12"
                ? "Less then"
                : "Greater Then"
            }}
            {{ i?.min }} {{ i?.max }} {{ i?.greaterNumber }}
            {{ i?.lessNumber }}
          </v-list-item>
          <!-- </div> -->
        </v-card>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    getScheme() {
      return this.$store.getters.getScheme;
    },
  },
};
</script>

<style>
</style>