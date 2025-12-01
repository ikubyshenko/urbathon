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

    console.log('API Key check:', {
      hasKey: !!apiKey,
      length: apiKey ? apiKey.length : 0,
      env: process.env.NODE_ENV
    })

    if (!apiKey) {
      console.error('API ключ отсутствует')
      return {
        error: 'API ключ не настроен'
      }
    }

    // Системный промпт
    const systemPrompt = `Ты - опытный бытовой помощник для жителей Казахстана. Отвечай на русском языке.

ВАЖНЫЕ ПРАВИЛА:
1. Все цены указывай в тенге (₸)
2. Не используй маркдаун символы (#, *, и т.д.)
3. Пиши чистым текстом с красивым форматированием
4. Упоминай казахстанские магазины (мелодия дома, технодом, сулпак и т.д.)
5. Давай практичные советы для местных условий
6. Всегда в конце пиши - Разработанно командой Palmyass для Urbathon SKO Hub

Форматируй ответ так:
- Используй переносы строк для абзацев
- Выделяй важное жирным шрифтом (без символов)
- Используй списки с точками
- Пиши понятно и по делу

Твоя задача - помогать с бытовыми проблемами: ремонт, уборка, организация пространства.`

    try {
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
          max_tokens: 1500,
          temperature: 0.7
        }
      })

      const aiResponse = response.choices[0]?.message?.content

      if (!aiResponse) {
        return {
          error: 'AI не ответил'
        }
      }

      return {
        message: aiResponse,
        model: response.model
      }

    } catch (fetchError: any) {
      console.error('OpenRouter fetch error:', fetchError)
      
      // Возвращаем более информативную ошибку
      return {
        error: `Ошибка API: ${fetchError.status || 'unknown'} - ${fetchError.message || 'Неизвестная ошибка'}`
      }
    }

  } catch (error: any) {
    console.error('Server error:', error)
    return {
      error: 'Внутренняя ошибка сервера'
    }
  }
})