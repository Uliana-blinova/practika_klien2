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
    if (colum_2 && colum_2.cards.length >= colum.limit) {
        app.colum_1_block = true;
    } else {
        app.colum_1_block = false;
    }
}