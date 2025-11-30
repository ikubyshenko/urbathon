// server/api/test-grok.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.openrouterApiKey

  if (!apiKey) {
    return { error: 'No API key in runtime config' }
  }

  try {
    const response = await $fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Test'
      },
      body: {
        model: 'x-ai/grok-4.1-fast:free',
        messages: [
          {
            role: 'user',
            content: 'Привет! Ответь на русском. Как починить протекающий кран? Дай краткий ответ.'
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      }
    })

    return {
      success: true,
      response: response.choices[0]?.message?.content,
      model: response.model,
      usage: response.usage
    }
  } catch (error: any) {
    return {
      error: error.message,
      status: error.status,
      data: error.data
    }
  }
})