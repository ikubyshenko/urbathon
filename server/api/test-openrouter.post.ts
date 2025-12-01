// server/api/test-openrouter.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.openrouterApiKey

  if (!apiKey) {
    return { 
      error: '❌ НЕТ API КЛЮЧА на сервере',
      suggestion: 'Добавьте OPENROUTER_API_KEY в Environment Variables Vercel'
    }
  }

  try {
    const response = await $fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: {
        model: 'x-ai/grok-4.1-fast:free',
        messages: [
          {
            role: 'user',
            content: 'Привет! Ответь "Работает!" если ты меня слышишь'
          }
        ],
        max_tokens: 50
      }
    })

    return {
      success: true,
      response: response.choices[0]?.message?.content,
      model: response.model
    }

  } catch (error: any) {
    return {
      error: `OpenRouter error: ${error.message}`,
      status: error.status,
      details: error.data
    }
  }
})