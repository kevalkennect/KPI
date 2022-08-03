<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="desserts"
    :items-per-page="10"
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: this.$store.getters.getHeaders,
      desserts: this.$store.getters.getData,
    };
  },
};
</script>

<style>
</style>