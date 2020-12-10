const AngularComponentA = {
    template: `
    <div>
        <div>This is an Angular page!</div>
        <ng-foo-button />
    </div>`
};

const AngularComponentB = {
    template: `
    <div>
        <div>Another Angular page.</div>
        <ng-vue-wrapper component-name="cool-component" />
    </div>`
};

let angularRootScope;

angular
.module(
    "anvApp",
    [ "ngRoute" ]
)
.config(
    [
        '$routeProvider',
        '$locationProvider',
        function config($routeProvider, $locationProvider) {
            $routeProvider
            .when('/angularA', AngularComponentA)
            .when('/angularB', AngularComponentB);

            $locationProvider.html5Mode(true);
        }
    ]
)
.run(
    [
        "$rootScope",
        function($rootScope) {
            angularRootScope = $rootScope;
        }
    ]
)
.component(
    "ngFooButton",
    {
        template: 'Angular component: <button ng-click="onClick()">Foo is {{ foo }}</button>',
        controller: function($scope) {
            this.$onInit = function() {
                this.fooWatch = $scope.$watch(
                    () => vuexStore.getters['foo'],
                    (value) => { $scope.foo = value; }
                );

                $scope.onClick = function() {
                    vuexStore.dispatch('increment');
                }
            }

            this.$onDestroy = function() {
                this.fooWatch();
            }
        }
    }
)
.component(
    "ngVueWrapper",
    {
        bindings: {
            componentName: "@"
        },
        controller: function($element) {
            this.$onInit = function() {
                this.vueComponent = new Vue({
                    template: `<div ng-non-bindable class="vue-wrapper"><${this.componentName} /></div>`,
                    store: vuexStore
                }).$mount();
                $element[0].appendChild(this.vueComponent.$el);
            }

            this.$onDestroy = function() {
                this.vueComponent.$destroy();
            }
        }
    }
);
