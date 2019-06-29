<template>
    <form v-on:enter.prevent="addTodo">
        <input type="text" class="form-control" v-model="todoValue" />
        <button class="btn btn-primary" v-on:click.prevent="addTodo"></button>
    </form>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            todoValue: this.value
        }
    },
    methods: {
        addTodo() {
            this.$emit('@submit', this.todoValue);
            this.todoValue = ""
        }
    }
}
</script>
