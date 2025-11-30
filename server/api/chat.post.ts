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

    if (!apiKey) {
      return {
        error: 'API ключ не настроен'
      }
    }

    // Упрощенный системный промпт
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

    const response = await $fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Household Assistant'
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

  } catch (error: any) {
    console.error('OpenRouter API error:', error)
    return {
      error: 'Ошибка соединения с AI'
    }
  }
})