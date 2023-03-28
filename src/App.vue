<template>
  <div class="chat-container container px-4 flex">
    <div>
      <div class="chat-header">
        <div class="flex items-center">
          <h1 class="text-lg font-medium">{{ companyName }}</h1>
        </div>
        <div class="text-gray-500 text-sm">{{ status }}</div>
      </div>
      <div class="chat-conversation">
          <div v-for="message in messages" :key="message.id" class="py-1">
            <div v-if="message.isCustomer" class="flex justify-start">
              <Bubble :color="'bg-green-200'" :message="message.content"></Bubble>
            </div>
            <div v-else class="flex justify-end">
              <Bubble :color="'bg-blue-200'" :message="message.content"></Bubble>
            </div>
          </div>
      </div>
      <form @submit.prevent="sendMessage" class="flex items-center">
        <input type="text" v-model="message" placeholder="Type your message here" class="flex-grow bg-gray-200 rounded-full px-4 py-2 mr-2">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-full">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { generateResponse } from './api/chatGPT';
import Bubble from './components/Bubble.vue';

export default {
  components: {
    Bubble
  },
  setup() {
    const companyName = 'Electric Acme Corporation';
    const status = '(Online) How can I help you?';
    const message = ref('');
    const messages = ref([]);

    const sendMessage = async () => {
      const response = await generateResponse(message.value);
      messages.value.push({
        id: Date.now(),
        content: message.value,
        isCustomer: true,
      });
      messages.value.push({
        id: Date.now(),
        content: response,
        isCustomer: false,
      });
      message.value = '';
    };

    return {
      companyName,
      status,
      message,
      messages,
      sendMessage,
    };
  },
};
</script>
<style>
.chat-container {
  justify-content: center;
  padding-top: 40px;
}
</style>
