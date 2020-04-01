const state = {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : ""
}

const mutation = {
    login (state, val) {
      state.token = val;
      localStorage.setItem("token", val);
    },
    logout (state) {
        state.token = "";
        localStorage.removeItem("token");
    }
}

const action = {
    login (context, token) {
        context.commit("login", token);
    },
    logout (context) {
        context.commit("logout");
    }
}

export {state, mutation, action}