Vue.use(Vuex);

const vuexStore = new Vuex.Store({
    state: {
        foo: 0
    },
    actions: {
        increment(context) {
            context.state.foo += 1;
        }
    },
    getters: {
        foo: state => state.foo
    }
});
