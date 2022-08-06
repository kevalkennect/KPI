export const state = () => ({
  data: undefined,
  schemes: [
    {
      groupName: "c1",
      conditions: [
        { kpi_id_condition: "K0", condition: "C11", min: 90, max: 100 },
        { kpi_id_condition: "K2", condition: "C11", min: 20, max: 40 },
        { kpi_id_condition: "K3", condition: "C12", lessNumber: 50 },
      ],
      benefit: { kpi_id_benefit: "K3", static_value: 1000, dynamic: 1 },
    },
  ],
  header: [],
});

export const getters = {
  getData(state) {
    return state.data;
  },
  getScheme(state) {
    return state.schemes;
  },
  getHeaders(state) {
    return state.header;
  },
};

export const mutations = {
  setData(state, payload) {
    state.data = payload;
  },
  setHeader(state, payload) {
    state.header = payload;
  },
  setScheme(state, payload) {
    state.schemes.push(payload);
  },
};

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return context.$axios
      .$get("http://localhost:3001")
      .then((res) => {
        const [firstEl, ...rest] = res.split("\r\n");
        const first = firstEl.split(",");
        const header = first.map((el) => {
          return {
            value: el,
            text: el,
          };
        });
        vuexContext.commit("setHeader", header);
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
  setHeader(vuexContext, payload) {
    vuexContext.commit("setHeader", payload);
  },
  setScheme(vuexContext, payload) {
    vuexContext.commit("setScheme", payload);
  },
};
