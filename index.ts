const firebase = require('firebase');
const moment = require('moment');
require('firebase/firestore');
// import moment = require('moment');

const firebaseConfig = {
    apiKey: 'AIzaSyAUX3OmOPYGHshAT3p8_yhbTUNjDLSpZEQ',
    authDomain: 'graduatedproject-c9985.firebaseapp.com',
    databaseURL: 'https://graduatedproject-c9985.firebaseio.com',
    projectId: 'graduatedproject-c9985',
    storageBucket: '',
    messagingSenderId: '1040966912755',
    appId: '1:1040966912755:web:4a22f6be4bee35221c8586',
    measurementId: 'G-HR8S7Z6WDQ',
};

firebase.initializeApp(firebaseConfig);

const menu = [
    'Phở bò',
    'Bún riêu',
    'Xôi xéo',
    'Cơm gà',
    'Cơm sườn',
    'Thịt rán',
    'Thịt băm',
    'Đậu sốt cà chua',
    'Thịt quay',
    'Thịt luộc',
    'Gà rán',
    'Gà luộc',
    'Sữa chua vinamilk',
];

const today = moment().startOf('day');
for (let i = 0; i < 30; i++) {
    let breakfast = [];
    let lunch = [];
    let snack = [];
    const timestamp = moment(today)
        .add(i, 'day')
        .startOf('day')
        .toISOString();
    for (let j = 0; j < 5; j++) {
        breakfast.push(menu[Math.floor(Math.random() * menu.length)]);
        lunch.push(menu[Math.floor(Math.random() * menu.length)]);
        snack.push(menu[Math.floor(Math.random() * menu.length)]);
    }
    // firebase
    //     .firestore()
    //     .collection('NutritionMenus')
    //     .add({
    //         breakfast,
    //         kidID: 'Kid 1',
    //         lunch,
    //         snack,
    //         timestamp,
    //     });
    firebase
        .firestore()
        .collection('NapActivities')
        .add({
            kidID: 'Kid 1',
            timestamp,
            from: '12h00',
            to: '13h45',
            comment: 'Con ngủ ngon giấc',
        });
}
