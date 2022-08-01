export const state = () => ({
  data: undefined,
});

export const getters = {
  getData(state) {
    return state.data;
  },
};

export const mutations = {
  setData(state, payload) {
    state.data = payload;
  },
};

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return context.$axios
      .$get("http://localhost:3001")
      .then((res) => {
        const [firstEl, ...rest] = res.split("\r\n");
        const first = firstEl.split(",");
        const arrValue = rest.map((el, i, arr) => {
          const [
            kpi_id,
            emp_id,
            month,
            year,
            kpi_value,
            product,
            kpi_val_in_rupees,
          ] = el.split(",");
          return {
            [first[0]]: kpi_id,
            [first[1]]: emp_id,
            [first[2]]: month,
            [first[3]]: year,
            [first[4]]: kpi_value,
            [first[5]]: product,
            [first[6]]: kpi_val_in_rupees,
          };
        });
        vuexContext.commit("setData", arrValue);
      })
      .catch((e) => context.error(e));
  },
  setData(vuexContext, payload) {
    vuexContext.commit("setData", payload);
  },
};
