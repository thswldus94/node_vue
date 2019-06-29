<template>
    <ul class="tabs">
        <li v-for="tab in tabs" v-bind:class="{active: tab === selectedTab}" v-on:click="onClickTabs(tab)">
            {{ tab }}
        </li>
    </ul>
</template>

<script>
export default {
    // 부모(App.vue) 로 부터 받아온 데이터. tabs(todo, finish), selectedTab: 현재 선택한 탭
    props: ['tabs', 'selectedTab'],
    methods: {
        onClickTabs(tab) {
            // $emit => 부모(App.vue) 에게 @change 이름으로 이벤트 전달함
            // tab(선택한 탭) 인자로 같이 전달
            this.$emit('@change', tab)
        }
    }

}
</script>
