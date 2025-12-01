// server/api/chat.post.ts
export default defineEventHandler(async (event) => {
  try {
    const { message } = await readBody(event)
    
    if (!message) {
      return {
        error: 'Сообщение обязательно'
      }
    }

    const config = useRuntimeConfig()
    const apiKey = config.openrouterApiKey
    
    console.log('Vercel API Key check:', {
      hasKey: !!apiKey,
      length: apiKey ? apiKey.length : 0,
      env: process.env.NODE_ENV,
      vercelUrl: process.env.VERCEL_URL
    })

    if (!apiKey) {
      console.error('❌ API ключ отсутствует на Vercel!')
      return {
        error: 'API ключ не настроен на сервере'
      }
    }

    // Упрощенный промпт
    const systemPrompt = `Ты помощник по бытовым вопросам для Казахстана. Отвечай на русском языке. Цены в тенге.`

    const response = await $fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': config.public.siteUrl,
        'X-Title': 'БытМастер Казахстан'
      },
      body: {
        model: 'x-ai/grok-4.1-fast:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user', 
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      },
      timeout: 10000 // 10 секунд timeout
    })

    const aiResponse = response.choices[0]?.message?.content

    if (!aiResponse) {
      return {
        error: 'AI не ответил'
      }
    }

    console.log('✅ Успешный ответ от OpenRouter на Vercel')
    
    return {
      message: aiResponse,
      model: response.model
    }

  } catch (error: any) {
    console.error('❌ OpenRouter error on Vercel:', {
      message: error.message,
      status: error.status,
      data: error.data
    })
    
    // Более детальные ошибки
    if (error.status === 401) {
      return {
        error: 'Неверный API ключ OpenRouter'
      }
    } else if (error.status === 429) {
      return {
        error: 'Превышен лимит запросов к OpenRouter'
      }
    } else if (error.status === 404) {
      return {
        error: 'Модель не найдена на OpenRouter'
      }
    }
    
    return {
      error: `Ошибка OpenRouter: ${error.message || 'Неизвестная ошибка'}`
    }
  }
})