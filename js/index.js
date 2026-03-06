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

Vue.component('colum', {
    props: {
        title: String,
        limit: Number,
        cards: Array,
        blocked: Boolean,
    },
    template: `
    <div class="column" :class="{ blocked: isBlocked }">
            <h2>{{ title }} <span v-if="limit">({{ cards.length }}/{{ limit }})</span></h2>
            <div class="cards-container">
                <note-card 
                    v-for="card in cards" 
                    :key="card.id" 
                    :card="card"
                    :disabled="isBlocked"
                    @update-progress="hanUpdate"
                />
            </div>
            <div v-if="isBlocked" class="block-overlay">
                Столбец заблокирован
            </div>
        </div>
`,
    methods: {
        hanUpdate(card) {
            this.$emit('update', card);
        }
    }
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