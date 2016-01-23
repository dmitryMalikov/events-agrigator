var event = require('./event');


var sampleEvent = {
    id: 1,
    title: 'JOY DIVISION',
    description: ['¬первые в ”краине вы увидите спектакль, на котором можно и нужно танцевать, и попадете на концерт, где есть что посмотреть!',
    '—пектакль - байопик о культовой британской группе JOY DIVISION и ее солисте яне  ертисе состоитс€ 16 феврал€ в 21:00 в клубе SENTRUM.'],
    image: 'https://image.karabas.com/w/350/h/496/f/files/import/502188467_ImageBig635871247089139902.jpg',
    location: ' ињв',
    startDateTime: new Date(Date.UTC(2015,2,16,19,0)),
    priceHigh: 200,
    priceLow: 150,
    priceCurr: 'UAH',
    type: '—ѕ≈ “ј Ћ№- ќЌ÷≈–“',
    eventUrl: 'https://kiev.karabas.com/ua/joy-division',
    orderUrl: 'https://kiev.karabas.com/ua/joy-division/order/'
}


var events = [];
events.push(sampleEvent);


module.exports = events;