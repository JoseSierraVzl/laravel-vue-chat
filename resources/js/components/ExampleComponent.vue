<template>
    <div>
        <h1>Chat</h1>
        <ul>
            <li v-for="message in messages" :key="message.id">{{ message }}</li>
        </ul>
    </div>
</template>

<script>
import echo from '../echo.js';

export default {
    data() {
        return {
            messages: [],
        };
    },
    mounted() {
        echo.channel('chat')
            .listen('MessageSent', (event) => {
                this.messages.push(event.message);
            });
    },
};
</script>