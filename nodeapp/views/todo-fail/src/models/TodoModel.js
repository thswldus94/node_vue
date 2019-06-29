export default {
    data: [
        {todo: '할일 0', state: true},
        {todo: '할일 1', state: true},
        {todo: '할일 2', state: false},
        {todo: '할일 3', state: true},
        {todo: '할일 4', state: false}
    ],
    list(tab) {
        return new Promise(function(res) {
            if (tab === 'todo') {
                res(this.data.filter(function(item) {
                    item.state === true;
                });
            }

            if (tab === 'finish') {
                res(this.data.filter(function (item) {
                    item.state === false;
                });
            }
        });
    },
    add(todo = '') {
        todo = todo.trim();
        if (!todo) return;

        const state = true;
        this.data.push({todo, state});
    },
    finish(index) {
        this.data.filter(function(item) {
            item.state === true;
        })[index].state = false;
    },
    reset(index) {
        this.data.filter(function(item) {
            item.state === false;
        })[index].state = true;
    },
    remove(todo) {
        this.data = this.data.filter(function(item) {
            item.todo !== todo
        });
    }
}
