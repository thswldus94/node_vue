// localstorage persistence
// 나중에는 mysql 연동으로 바꿀거임

// var STORAGE_KEY = 'todos-vuejs-2.0';
// var todoStorage = {
//     fetch: function() {
//         var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
//         //console.log(todos);
//         $.each(todos, function(todo, idx) {
//             todo.id = idx;
//         });
//         todoStorage.uid = todos.length;
//         return todos;
//     },
//     save: function(todos) {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
//     }
// }

var todos = [];
var todoSelect = {
    fetch: function() {
        console.log('aaa');
        $.ajax({
            method: 'get',
            url: "/get?type=todo",
            async: false
        }).done(function(data) {
            //console.log(data);
            todos = data;
        });

        console.log(todos);

        return todos;
    }
}

//todoSelect.fetch();


// visiblity filteredTodos
var filters = {
    all: function (todos) {
        return todos;
    },
    active: function(todos) {
        return todos.filter(function(todo) {
            return !todo.completed;
        });
    },
    completed: function(todos) {
        return todos.filter(function(todo) {
            return todo.completed;
        });
    }
}

// app Vue instance
var app = new Vue({
    // app initial
    data: {
        //todos: todoStorage.fetch(),
        todos: todoSelect.fetch(),
        newTodo: '',
        editedTodo: null,
        visiblity: 'all'
    },

    // watch todos change for localstorage persistance
    watch: {
        todos: {
            handler: function(todos) {
                todoSelect.save(todos);
            },
            deep: true
        }
    },

    // computed properties
    computed: {
        filteredTodos: function() {
            return filters[this.visiblity](this.todos)
        },
        remaining: function() {
            return filters.active(this.todos).length;
        },
        allDone: {
            get: function() {
                return this.remaining === 0;
            },
            set: function(value) {
                this.todos.forEach(function(todo) {
                    todo.completed = value;
                })
            }
        }
    },

    filters: {
        pluralize: function(n) {
            return n === 1 ? 'item' : 'items'
        }
    },

    // methods implement data logic
    methods: {
        addTodo: function() {
            var value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return;
            }

            this.todos.push({
                id: todoSelect.uid++,
                title: value,
                complated: false
            });
            this.newTodo = '';
        },
        removeTodo: function(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
        },
        editTodo: function(todo) {
            this.beforeEditCache = todo.title;
            this.editedTodo = todo;
        },

        doneEdit: function(todo) {
            if (!this.editedTodo) {
                return;
            }

            this.title = todo.title.trim();
            if (!todo.title) {
                this.removeTodo(todo);
            }
        },

        cancleEdit: function(todo) {
            this.editedTodo = null;
            todo.title = this.beforeEditCache;
        },

        removeCompleted: function() {
            this.todos = filters.active(this.todos);
        }
    },
    directives: {
        'todo-focus' : function (el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    }
});

app.$mount('.todoapp');
