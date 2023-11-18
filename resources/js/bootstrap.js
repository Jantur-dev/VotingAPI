/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER ?? 'mt1',
    wsHost: process.env.MIX_PUSHER_HOST ? process.env.MIX_PUSHER_HOST : `ws-${process.env.MIX_PUSHER_APP_CLUSTER}.pusher.com`,
    wsPort: process.env.MIX_PUSHER_PORT ?? 80,
    wssPort: process.env.MIX_PUSHER_PORT ?? 443,
    forceTLS: (process.env.MIX_PUSHER_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

// Fungsi untuk menyimpan pesan ke dalam localStorage
function saveMessage(message) {
    var messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Fungsi untuk menampilkan pesan dari localStorage
function displayMessages() {
    var dataMessage = document.getElementById('data-message');
    var messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    // Menampilkan pesan dari localStorage
    messages.forEach(function (message) {
        var newMessage = document.createElement('div');
        newMessage.textContent = message;
        dataMessage.appendChild(newMessage);
    });
}

// Panggil fungsi displayMessages saat halaman dimuat
displayMessages();

window.Echo.channel('channel-chat').listen('ChatEvent', (event) => {
    // console.log(event.message.message);
    // Mendapatkan elemen dengan ID data-message
    var dataMessage = document.getElementById('data-message');

    // Membuat elemen baru untuk menyimpan pesan
    var newMessage = document.createElement('div');
    newMessage.textContent = event.message.message;
    // Menambahkan elemen baru ke dalam div dengan ID data-message
    dataMessage.appendChild(newMessage);
    
    // Menyimpan pesan baru ke dalam localStorage
    saveMessage(event.message.message);
});

