Vue.component('cool-component', {
    template: `
    <div>
        I am a cool Vue component:
        <button @click="onClick">Foo is {{ foo }}</button>
    </div>`,
    computed: {
        foo() {
            return this.$store.getters["foo"];
        }
    },
    methods: {
        onClick() {
            this.$store.dispatch("increment");
        }
    }
});

const VueComponentA = {
    template: "<div>This is a Vue page! Foo is {{ foo }}</div>",
    computed: {
        foo() {
            return this.$store.getters["foo"];
        }
    }
};

const VueComponentB = {
    template: `
    <div>
        <div>This is another Vue page!</div>
        Some logic in a Vue page: <button @click="onClick">Foo is {{ foo }}</button>
    </div>`,
    computed: {
        foo() {
            return this.$store.getters["foo"];
        }
    },
    methods: {
        onClick() {
            this.$store.dispatch("increment");
        }
    }
};

const VueComponentRoot = {
    template: `<div><router-view /></div>`
};

const vueRouter = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/vueA",
            component: VueComponentA
        },
        {
            path: "/vueB",
            component: VueComponentB
        }
    ]
});

const vueRootApp = new Vue({
    render: h => h(VueComponentRoot),
    router: vueRouter,
    store: vuexStore
});
