<template>
    <div>
        <h1>Reactivity Limitations</h1>

        <a href="https://ru.vuejs.org/v2/guide/reactivity.html">Documentation</a>

        <hr />

        <h2>Object</h2>

        <div>
            <strong>
                Object:
            </strong>

            {{ obj }}
        </div>

        <hr />

        <strong>
            Not working:
        </strong>
        <button @click="notWorkingSetNewProperty">
            this.obj.b = 4;
        </button>

        <hr />

        <strong>
            Working:
        </strong>
        <button @click="setNewProperty">
            this.$set(this.obj, "b", 6);
        </button>
        <br />

        <strong>
            Working:
        </strong>
        <button @click="setNewProperyAssign">
            this.obj = Object.assign({}, this.obj, {b: 4, c: 5});
        </button>

        <hr />

        <h2>Array</h2>
        
        <div>
            <strong>
                Array:
            </strong>
            {{ arr }}

            <strong>
                Array length:
            </strong>
            {{ arr.length }}
        </div>

        <hr />
        
        <strong>
            Not working:
        </strong>
        
        <button @click="notWorkingSetElement">
            this.arr[2] = this.arr[2] + 1
        </button>
        <br />
        <strong>
            Not working:
        </strong>
        <button @click="notWorkingSetElement">
            this.arr.length = this.arr.length - 1
        </button>
        <br />

        <hr />

        <strong>
            Working:
        </strong>
        <button @click="setElement">
            this.$set(this.arr, 2, this.arr[2] + 1)
        </button>
        <br />

        <strong>
            Working:
        </strong>
        <button @click="spliceElement">
            this.arr.splice(2, 1, this.arr[2] - 1)
        </button>
        <br />

        <strong>
            Working:
        </strong>
        <button @click="setLength">
            this.arr.splice(this.arr.length - 1)
        </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                arr: [1, 2, 3, 4, 5],
                obj: {
                    name: 1,
                    second: 2,
                    age: 3
                }
            }
        },
        methods: {
            notWorkingSetElement() {
                this.arr[2] = this.arr[2] + 1;
            },
            setElement() {
                this.$set(this.arr, 2, this.arr[2] + 1);
            },
            spliceElement() {
                this.arr.splice(2, 1, this.arr[2] + 1);
            },
            notWorkingSetLength() {
                this.arr.length = this.arr.length - 1;
            },
            setLength() {
                this.arr.splice(this.arr.length - 1);
            },
            notWorkingSetNewProperty() {
                this.obj.b = 4;
            },
            setNewProperty() {
                this.$set(this.obj, "b", 6);
            },
            setNewProperyAssign() {
                this.obj = Object.assign({}, this.obj, {b: 4, c: 5});
            }
        }
    }
</script>
