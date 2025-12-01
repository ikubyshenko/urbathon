<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
    <!-- Header -->
    <header class="bg-gray-800/80 border-b border-gray-700/50 sticky top-0 z-10 backdrop-blur-xl">
      <div class="max-w-2xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/30 ring-2 ring-blue-400/20">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">БытМастер</h1>
              <p class="text-xs text-gray-400">Помощник по дому для Казахстана</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-xl border border-gray-600/50">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/25"></div>
            <span class="text-xs text-gray-300 font-medium">Online</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-2xl mx-auto px-4 pb-32 pt-8">
      <!-- Welcome Message -->
      <div v-if="messages.length === 0" class="text-center py-16">
        <div class="w-24 h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30 ring-4 ring-blue-400/10">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m7-7l2.879-2.879M12 12l2.879 2.879M12 12L9.121 14.121M12 12l-2.879-2.879M12 12L5 5m7 7l-7 7" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Готов помочь с домом</h2>
        <p class="text-gray-400 mb-12 text-lg">Расскажите о проблеме - подскажу решение с ценами в тенге</p>
        
        <!-- Quick Actions -->
        <div class="grid grid-cols-1 gap-4 max-w-md mx-auto">
          <button
            v-for="action in quickActions"
            :key="action.title"
            @click="selectQuickAction(action.prompt)"
            class="group bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 text-left hover:bg-gray-700/40 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 backdrop-blur-sm"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-500 border border-blue-500/10 group-hover:border-blue-500/20">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m7-7l2.879-2.879M12 12l2.879 2.879M12 12L9.121 14.121M12 12l-2.879-2.879M12 12L5 5m7 7l-7 7" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors text-lg">{{ action.title }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">{{ action.description }}</p>
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Chat Messages - Single Column -->
      <div class="space-y-8">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="transition-all duration-700"
          :class="{
            'animate-message-in': message.role === 'assistant'
          }"
        >
          <!-- User Question -->
          <div v-if="message.role === 'user'" class="mb-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center shadow-lg border border-gray-600 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="bg-gray-800/60 border border-gray-700/50 rounded-2xl rounded-tl-none px-6 py-4 shadow-2xl backdrop-blur-sm flex-1">
                <p class="text-gray-100 whitespace-pre-wrap leading-relaxed text-lg">{{ message.content }}</p>
                <p class="text-xs text-gray-500 mt-3">{{ message.timestamp }}</p>
              </div>
            </div>
          </div>

          <!-- AI Response -->
          <div v-else class="mb-10">
            <div class="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/30 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <!-- Decorative elements -->
              <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div class="relative z-10">
                <div class="flex items-start gap-4 mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/30 ring-2 ring-blue-400/20 flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m7-7l2.879-2.879M12 12l2.879 2.879M12 12L9.121 14.121M12 12l-2.879-2.879M12 12L5 5m7 7l-7 7" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-3 mb-4">
                      <span class="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">БытМастер</span>
                      <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
                      <span class="text-sm text-gray-500">{{ message.timestamp }}</span>
                    </div>
                    <div class="prose prose-invert max-w-none">
                      <div class="text-gray-100 whitespace-pre-wrap leading-relaxed text-lg" v-html="formatResponse(message.content)"></div>
                    </div>
                  </div>
                </div>
                
                <!-- Model badge -->
                <div v-if="message.model" class="flex justify-end">
                  <div class="inline-flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full border border-gray-600/50">
                    <div class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="text-xs text-gray-400 font-medium">{{ message.model.split('/')[0] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="loading" class="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/30 rounded-3xl p-8 shadow-2xl backdrop-blur-sm animate-pulse">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/30 ring-2 ring-blue-400/20 flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m7-7l2.879-2.879M12 12l2.879 2.879M12 12L9.121 14.121M12 12l-2.879-2.879M12 12L5 5m7 7l-7 7" />
              </svg>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">БытМастер</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-lg shadow-blue-400/25"></div>
                  <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-lg shadow-blue-400/25" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-lg shadow-blue-400/25" style="animation-delay: 0.2s"></div>
                </div>
                <span class="text-gray-400 text-sm">Ищу лучшее решение...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Input Area - Fixed at bottom -->
    <div class="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-800/50 backdrop-blur-2xl">
      <div class="max-w-2xl mx-auto p-6">
        <form @submit.prevent="sendMessage" class="flex gap-4">
          <div class="flex-1 relative">
            <textarea
              v-model="inputMessage"
              placeholder="Опишите проблему с ремонтом, уборкой или организацией..."
              :rows="1"
              ref="textareaRef"
              :disabled="loading"
              @keydown="handleKeyPress"
              class="w-full resize-none bg-gray-800/80 border border-gray-700/50 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500/50 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-gray-100 placeholder-gray-500 text-lg transition-all duration-300 backdrop-blur-sm shadow-2xl"
              :class="{
                'hover:border-gray-600/50': !loading,
                'h-16': !inputMessage,
                'h-auto': inputMessage
              }"
            ></textarea>
            <button
              type="submit"
              :disabled="!inputMessage.trim() || loading"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 disabled:shadow-none group"
            >
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
        <p class="text-xs text-gray-500 text-center mt-4">
          💡 Все цены в тенге (₸) • Решения для Казахстана
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
  
  return text
    .replace(/^#{1,6}\s?/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-300 font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-gray-300 italic">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-700/50 px-2 py-1 rounded-lg text-sm font-mono border border-gray-600/50">$1</code>')
    .replace(/\n\s*[-*]\s+/g, '\n• ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n/g, '<br>')
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
    let response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        message: currentInput
      }
    }).catch(error => {
      console.log('Main API failed, trying backup:', error)
      return null
    })

    // Если основной API не сработал или вернул ошибку, пробуем backup
    if (!response || response.error) {
      console.log('Trying backup API...')
      response = await $fetch('/api/chat-backup', {
        method: 'POST',
        body: {
          message: currentInput
        }
      }).catch(error => {
        console.log('Backup API also failed:', error)
        return null
      })
    }

    // Если оба API не сработали
    if (!response) {
      throw new Error('Все сервисы временно недоступны')
    }

    // Проверяем на ошибку в ответе
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
    
    let errorText = '⚠️ Временные технические проблемы. Попробуйте позже.'
    
    // Более информативные ошибки
    if (error.message?.includes('недоступны')) {
      errorText = '⚠️ Сервис временно недоступен. Попробуйте через несколько минут.'
    } else if (error.message?.includes('ключ')) {
      errorText = '⚠️ Проблема с API ключом. Пожалуйста, обновите страницу.'
    }
    
    const errorMessage = {
      role: 'assistant',
      content: errorText,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }
    
    messages.value.push(errorMessage)
  } finally {
    loading.value = false
    nextTick(() => {
      textareaRef.value?.focus()
      // Плавная прокрутка к последнему сообщению
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }, 100)
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
  min-height: 64px;
  max-height: 200px;
  transition: height 0.2s ease;
}

/* Анимации */
@keyframes message-in {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-message-in {
  animation: message-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Кастомный скролл */
.scroll-thin {
  scrollbar-width: thin;
  scrollbar-color: #4B5563 #1F2937;
}

.scroll-thin::-webkit-scrollbar {
  width: 8px;
}

.scroll-thin::-webkit-scrollbar-track {
  background: #1F2937;
  border-radius: 4px;
}

.scroll-thin::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #4B5563, #6B7280);
  border-radius: 4px;
}

.scroll-thin::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #6B7280, #9CA3AF);
}

/* Стили для форматированного текста */
.prose strong {
  color: #93C5FD;
  font-weight: 600;
}

.prose em {
  color: #D1D5DB;
  font-style: italic;
}

.prose code {
  background: linear-gradient(135deg, #374151, #4B5563);
  padding: 3px 8px;
  border-radius: 8px;
  font-size: 0.875em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  border: 1px solid #4B5563;
}

/* Градиентные тексты */
.gradient-text {
  background: linear-gradient(135deg, #60A5FA, #A78BFA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>