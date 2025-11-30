<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <!-- Header -->
    <header class="bg-gray-800 border-b border-gray-700 sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
      <div class="max-w-2xl mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 class="text-lg font-semibold text-white">Бытовая Помощь</h1>
              <p class="text-xs text-gray-400">Решение бытовых проблем в Казахстане</p>
            </div>
          </div>
          <div class="text-xs text-gray-400 flex items-center bg-gray-700 px-2 py-1 rounded-lg">
            <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Online
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-2xl mx-auto px-4 pb-32 pt-6">
      <!-- Welcome Message -->
      <div v-if="messages.length === 0" class="text-center py-12">
        <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/20">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white mb-3">Чем могу помочь?</h2>
        <p class="text-gray-400 mb-8">Опишите проблему с ремонтом, уборкой или организацией пространства</p>
        
        <!-- Quick Actions -->
        <div class="grid grid-cols-1 gap-3 max-w-md mx-auto">
          <button
            v-for="action in quickActions"
            :key="action.title"
            @click="selectQuickAction(action.prompt)"
            class="bg-gray-800 border border-gray-700 rounded-xl p-4 text-left hover:bg-gray-750 hover:border-gray-600 transition-all duration-200 group"
          >
            <h3 class="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{{ action.title }}</h3>
            <p class="text-sm text-gray-400">{{ action.description }}</p>
          </button>
        </div>
      </div>

      <!-- Chat Messages - Single Column -->
      <div class="space-y-6">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="transition-all duration-500"
          :class="{
            'animate-fade-in-up': message.role === 'assistant'
          }"
        >
          <!-- User Question -->
          <div v-if="message.role === 'user'" class="mb-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="bg-gray-800 border border-gray-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-lg flex-1">
                <p class="text-gray-100 whitespace-pre-wrap">{{ message.content }}</p>
                <p class="text-xs text-gray-500 mt-2">{{ message.timestamp }}</p>
              </div>
            </div>
          </div>

          <!-- AI Response -->
          <div v-else class="mb-8">
            <div class="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
              <div class="flex items-start gap-3 mb-4">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-sm font-medium text-blue-400">Помощник</span>
                    <span class="text-xs text-gray-500">{{ message.timestamp }}</span>
                  </div>
                  <div class="prose prose-invert max-w-none">
                    <div class="text-gray-100 whitespace-pre-wrap leading-relaxed" v-html="formatResponse(message.content)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="loading" class="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg animate-pulse">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-sm font-medium text-blue-400">Помощник</span>
              </div>
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Input Area - Fixed at bottom -->
    <div class="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 backdrop-blur-lg bg-opacity-95">
      <div class="max-w-2xl mx-auto p-4">
        <form @submit.prevent="sendMessage" class="flex gap-3">
          <div class="flex-1 relative">
            <textarea
              v-model="inputMessage"
              placeholder="Опишите вашу бытовую проблему..."
              :rows="1"
              ref="textareaRef"
              :disabled="loading"
              @keydown="handleKeyPress"
              class="w-full resize-none bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-100 placeholder-gray-500 transition-all duration-200"
              :class="{
                'hover:border-gray-600': !loading
              }"
            ></textarea>
            <button
              type="submit"
              :disabled="!inputMessage.trim() || loading"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
        <p class="text-xs text-gray-500 text-center mt-2">
          • AI может допускать ошибки
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Состояния
const inputMessage = ref('')
const messages = ref([])
const loading = ref(false)
const textareaRef = ref(null)

// Быстрые действия
const quickActions = [
  {
    title: 'Ремонт сантехники',
    description: 'Протекает кран, засорилась раковина и т.д.',
    prompt: 'Помогите починить протекающий кран на кухне'
  },
  {
    title: 'Электрические проблемы',
    description: 'Не работает розетка, мигает свет',
    prompt: 'Что делать если перестала работать розетка в ванной?'
  },
  {
    title: 'Уборка и чистка',
    description: 'Сложные пятна, запахи, уход за поверхностями',
    prompt: 'Как эффективно отмыть духовку от жира?'
  },
  {
    title: 'Организация пространства',
    description: 'Хранение вещей, оптимизация маленьких помещений',
    prompt: 'Как организовать хранение в маленькой прихожей?'
  }
]

// Функция для форматирования ответа AI
const formatResponse = (text) => {
  if (!text) return ''
  
  // Убираем маркдаун символы и форматируем текст
  return text
    .replace(/^#{1,6}\s?/gm, '') // Убираем заголовки #
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400 font-semibold">$1</strong>') // Жирный текст
    .replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>') // Курсив
    .replace(/`(.*?)`/g, '<code class="bg-gray-700 px-1 py-0.5 rounded text-sm">$1</code>') // Код
    .replace(/\n\s*[-*]\s+/g, '\n• ') // Списки
    .replace(/\n{3,}/g, '\n\n') // Убираем лишние переносы
    .replace(/\n/g, '<br>') // Сохраняем переносы строк
}

// Функции
const selectQuickAction = (prompt) => {
  inputMessage.value = prompt
  nextTick(() => {
    textareaRef.value?.focus()
  })
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || loading.value) return

  const userMessage = {
    role: 'user',
    content: inputMessage.value.trim(),
    timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  messages.value.push(userMessage)
  const currentInput = inputMessage.value
  inputMessage.value = ''
  loading.value = true

  try {
    // Сначала пробуем основной API
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        message: currentInput
      }
    })

    // Проверяем на ошибку
    if (response.error) {
      throw new Error(response.error)
    }

    const assistantMessage = {
      role: 'assistant',
      content: response.message,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      model: response.model
    }

    messages.value.push(assistantMessage)

  } catch (error) {
    console.error('Chat error:', error)
    
    // Пробуем backup API
    try {
      console.log('Trying backup API...')
      const backupResponse = await $fetch('/api/chat-simple', {
        method: 'POST',
        body: {
          message: currentInput
        }
      })

      if (backupResponse.error) {
        throw new Error(backupResponse.error)
      }

      const backupMessage = {
        role: 'assistant',
        content: backupResponse.message,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        model: backupResponse.model
      }

      messages.value.push(backupMessage)

    } catch (backupError) {
      console.error('Backup also failed:', backupError)
      
      const errorMessage = {
        role: 'assistant',
        content: '❌ Временная проблема с сервером. Попробуйте позже.',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }
      
      messages.value.push(errorMessage)
    }
  } finally {
    loading.value = false
    nextTick(() => {
      textareaRef.value?.focus()
      // Прокрутка к последнему сообщению
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    })
  }
}

// Авто-фокус на инпут
onMounted(() => {
  textareaRef.value?.focus()
})
</script>

<style>
/* Автоматическое увеличение textarea */
textarea {
  min-height: 48px;
  max-height: 120px;
}

/* Анимации */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out;
}

/* Кастомный скролл */
.scroll-thin {
  scrollbar-width: thin;
  scrollbar-color: #4B5563 #1F2937;
}

.scroll-thin::-webkit-scrollbar {
  width: 6px;
}

.scroll-thin::-webkit-scrollbar-track {
  background: #1F2937;
  border-radius: 3px;
}

.scroll-thin::-webkit-scrollbar-thumb {
  background-color: #4B5563;
  border-radius: 3px;
}

.scroll-thin::-webkit-scrollbar-thumb:hover {
  background-color: #6B7280;
}

/* Стили для форматированного текста */
.prose strong {
  color: #60A5FA;
  font-weight: 600;
}

.prose em {
  color: #D1D5DB;
  font-style: italic;
}

.prose code {
  background-color: #374151;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
</style>