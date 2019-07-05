<template>
    <div>
        <header>
            <h2 class="container">Todo</h2>
        </header>

        <div class="container">
            <add-form v-bind:value="query" v-on:@submit="onInputTodo"></add-form>
            <!-- FormComponent.vue에서 inputValue에 넣어준 value를 v-bind가 App.vue의 query와 바인딩해줌 -->
            <!-- v-on:@submit => FormComponent.vue에서 $emit으로 전달한 @submit이라는 이벤트를 받아와서 onInputTodo 메서드와 연결 -->

            <tab v-bind:tabs="tabs" v-bind:selected-tab="seletedTab" v-on:@change="onClicTab"></tab>
        </div>

        <div>
            <list v-bind:selected-tab="selectedTab" v-bind:data="todoList"
                    v-on:@finish="onClickFinish"
                    v-in:@reset="onClickReset"
            >
            </list>
        </div>
    </div>
</template>

<script>
// FormComponent 불러오기
import FormComponent from './components/FormComponent.vue';

// TabComponent 불러오기
import TabComponent from './compoments/TabComponent.vue';

// ListComponent 불러오기
import ListComponent from './compoments/ListComponent.vue';

// Model 불러오기
import TodoModel from './models/TodoModel.js'

export default {
    name: 'app',
    data() {
        return {
            query: '',
            tabs: ['todo', 'finish'],
            selectedTab: '',
            todoList: []
        }
    },
    created() {
        // vue 인스턴스가 생성된 후에 실행됨
        // todo 탭 선택
        this.selectedTab = this.tabs[0];
        // todo list 출력
        this.search();
    },
    components: {
        // 사용할 컴포넌트 등록
        'add-form' : FormComponent,
        'tab': TabComponent,
        'list': ListComponent
    },
    methods: {
        search() {
            // list 검색
            TodoModel.list(this.selectedTab).then(function(data) {
                this.todoList = data;
            });
        },
        onClickTab(tab) {
            // tab 선택
            this.selectedTab = tab;
            this.search();
        },
        onClickFinish(item) {
            // todo 완료
            TodoModel.finish(item);
            this.search();
        },
        onClickReset(item) {
            // todo 리셋
            TodoModel.reset(item);
            this.search();
        },
        onInputTodo(query) {
            // todo 입력
            this.selectedTab = this.tabs[0];
            this.search();
        }
    }
}
</script>
