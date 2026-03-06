let app = {
    columns: [
        {
            id: 1,
            title: 'At work',
            limit: 3,
            cards: []
        },
        {
            id: 2,
            title: 'In process',
            limit: 5,
            cards: []
        },
        {
            id: 3,
            title: 'ready',
            limit: null,
            cards: []
        }
    ],
    colum_1_block: false
}

function ruleBlock() {
    let colum_2 = app.columns[1];
    if (colum_2 && colum_2.cards.length >= colum_2.limit) {
        app.colum_1_block = true;
    } else {
        app.colum_1_block = false;
    }
}
Vue.component('cards', {
    props: {
        card: {
            type: Object,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    template: `
        <div class="card">
            <h3>{{ card.title }}</h3>
            <ul>
                <li v-for="(item, index) in card.items" :key="index">
                    <label>
                        <input 
                            type="checkbox" 
                            v-model="item.done"
                            @change="$emit('update-progress', card)"
                            :disabled="disabled"
                        >
                        <span :class="{ 'text-done': item.done }">
                            {{ item.text }}
                        </span>
                    </label>
                </li>
            </ul>
            <p v-if="card.completedAt" class="completed-date">
                Завершено: {{ card.completedAt }}
            </p>
        </div>
    `,

})
new Vue({
    el: '#app',
    data: app,
    methods: {
        ruleBlock
    },
    mounted() {
        this.ruleBlock();
    }
});