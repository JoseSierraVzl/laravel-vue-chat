import { createApp } from 'vue';
import ExampleComponent from './components/ExampleComponent.vue';
import ChatMessages from './components/ChatMessages.vue';
import ChatForm from './components/ChatForm.vue';

// Bootstrap y Axios deben importarse si los necesitas
import './bootstrap';

// Crear la app de Vue
const app = createApp({
    data() {
        return {
            messages: []
        };
    },
    created() {
        this.fetchMessages();
        window.Echo.private('chat')
        .listen('.chat.created', (e) => {
            this.messages.push({
                message: e.message.message,
                user: e.user
            });
        })
        .error(error => {
            console.error('Error in Laravel Echo:', error);
        });
        
    },
    methods: {
        fetchMessages() {
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },
        addMessage(message) {
            this.messages.push(message);
            axios.post('/messages', message).then(response => {
                console.log(response.data);
            });
        }
    }
});

// Registrar los componentes de Vue
app.component('example-component', ExampleComponent);
app.component('chat-messages', ChatMessages);
app.component('chat-form', ChatForm);

// Montar la app en el `#app`
app.mount('#app');
