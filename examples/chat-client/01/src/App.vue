<template>
    <div>
        <vue-advanced-chat height="calc(100vh - 20px)" :current-user-id="currentUserId" :rooms="JSON.stringify(rooms)"
            :rooms-loaded="true" :messages="JSON.stringify(messages)" :messages-loaded="messagesLoaded"
            @send-message="sendMessage($event.detail[0])" @fetch-messages="fetchMessages($event.detail[0])" />
    </div>
</template>

<script>
import { register } from 'vue-advanced-chat'
register()

export default {
    data() {
        return {
            chatClient: null,
            currentUserId: '1234',
            rooms: [
                {
                    roomId: '1',
                    roomName: 'Room 1',
                    avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
                    users: [
                        { _id: '1234', username: 'John Doe' },
                        { _id: '4321', username: 'John Snow' }
                    ]
                }
            ],
            messages: [],
            messagesLoaded: false
        }
    },

    created() {
        this.chatClient = new WebSocket(' wss://rr3nipgjpg.execute-api.ap-northeast-2.amazonaws.com/production');
        this.chatClient.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        this.chatClient.onmessage = (message) => {
            console.log(message);
            var msg = JSON.parse(message.data);
            this.messages = [
                ...this.messages,
                {
                    _id: this.messages.length,
                    content: msg.msg,
                    senderId: '4321',
                    username: 'John Snow',
                    timestamp: new Date().toString().substring(16, 21),
                    date: new Date().toDateString()
                }
            ]
        };
        this.chatClient.send(JSON.stringify(
            {
                action: 'login',
                name: 'John Doe',
            }
        ));
    },

    methods: {
        fetchMessages() {
            this.messagesLoaded = true;
        },

        sendMessage(message) {
            this.chatClient.send(JSON.stringify(
                {
                    action: 'sendToAll',
                    msg: message.content,
                }
            ));
        },
    }
}
</script>

<style lang="scss">
body {
    font-family: 'Quicksand', sans-serif;
}
</style>
