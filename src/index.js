import axios from 'axios';

const API = 'http://localhost:3000';
const Total = 100 * 50 * 0.2 * 0.1 * 0.1;
const BaseLen = 100;
const DoneItems = [];

const elStart = document.querySelector('#start');
const elEnd = document.querySelector('#end');
const elProgress = document.querySelector('#progress');

elEnd.textContent = Total;

function foo () {
    const start = Date.now();
    let len = BaseLen;
    console.log(len, '--- firing');

    while(len) {
        let idx = len--
        axios(`${API}?_get=${idx}`, { method: 'GET' })
        .then(() => {
            axios(`${API}?_get_post=${idx}`, { method: 'POST' } )
            .then(() => {
                DoneItems.push(1);
                const len = DoneItems.length;
                elStart.textContent = '+' + len;
                elProgress.style.width = len / Total * 100 + '%';

                if (idx > 1) return;
                console.warn(len, 'seconds:', (Date.now() - start)/1000);
                if (len < Total) {
                    todo();
                } else {
                    console.error(len)
                }
            })
        }).catch(err => console.warn(err))
    }
}

function todo () {
    setTimeout(() => {
        foo()
    }, 1000 * 2)
}

// todo()
let locked = false;
document.querySelector('#btn').addEventListener('click', () => {
    if (locked) return;
    locked = true;
    console.warn('firing')
    todo();
});

console.log('Hello World from your main file!')


const elBtnWorker = document.querySelector('#btn_worker');
const myWorker = new Worker('other.js');
const myWorker2 = new Worker('other.js');
elBtnWorker.addEventListener('click', () => {
    myWorker.postMessage(10);
    myWorker.onmessage = function(e) {
        const i = e.data;
        elStart.textContent = '+' + i;
        elProgress.style.width = i / Total * 100 + '%';
    }
    // myWorker2.postMessage(10);
    // myWorker2.onmessage = function(e) {
    //     console.log(e.data);
    // }
});