const sudoProducts: Record<string, number> = {
  sugoku_sudo_100: 100,
  sugoku_sudo_500: 500,
  sugoku_sudo_1000: 1000,
  sugoku_sudo_2500: 2500,
  sugoku_sudo_10000: 10000,
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

function equalSignatures(expected: string, actual: string) {
  if (expected.length !== actual.length) return false
  let difference = 0
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected.charCodeAt(index) ^ actual.charCodeAt(index)
  }
  return difference === 0
}

async function hasValidSignature(rawBody: Uint8Array, signatureHeader: string, secret: string) {
  const fields = Object.fromEntries(signatureHeader.split(',').map((field) => {
    const separator = field.indexOf('=')
    return separator < 0 ? ['', ''] : [field.slice(0, separator), field.slice(separator + 1)]
  }))
  const timestamp = Number(fields.t)
  if (!Number.isInteger(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > 300 || !/^[\da-f]{64}$/i.test(fields.v1 ?? '')) {
    return false
  }

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const prefix = new TextEncoder().encode(`${fields.t}.`)
  const signedBytes = new Uint8Array(prefix.length + rawBody.length)
  signedBytes.set(prefix)
  signedBytes.set(rawBody, prefix.length)
  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, signedBytes))
  const expected = Array.from(signature, (byte) => byte.toString(16).padStart(2, '0')).join('')
  return equalSignatures(expected, fields.v1.toLowerCase())
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') return json(405, { error: 'POST required.' })

  const hmacSecret = Deno.env.get('REVENUECAT_WEBHOOK_HMAC_SECRET')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!hmacSecret || !supabaseUrl || !serviceRoleKey) {
    console.error('RevenueCat webhook secrets are not configured.')
    return json(500, { error: 'Webhook is not configured.' })
  }

  const rawBody = new Uint8Array(await request.arrayBuffer())
  const signatureHeader = request.headers.get('X-RevenueCat-Webhook-Signature') ?? ''
  if (!await hasValidSignature(rawBody, signatureHeader, hmacSecret)) {
    return json(401, { error: 'Invalid webhook signature.' })
  }

  let payload: { event?: Record<string, unknown> }
  try {
    payload = JSON.parse(new TextDecoder().decode(rawBody))
  } catch {
    return json(400, { error: 'Invalid JSON payload.' })
  }

  const event = payload.event
  if (!event || typeof event !== 'object') return json(400, { error: 'Missing purchase event.' })
  if (event.type === 'TEST') return json(200, { received: true })
  if (event.type !== 'NON_RENEWING_PURCHASE') return json(200, { received: true, ignored: true })

  const productId = event.product_id
  const userId = event.app_user_id
  const eventId = event.id
  const transactionId = event.transaction_id
  if (typeof productId !== 'string' || !sudoProducts[productId]) {
    console.warn('Ignoring RevenueCat purchase for an unconfigured product.')
    return json(200, { received: true, ignored: true })
  }
  if (typeof userId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(userId)) {
    console.error('Verified purchase does not identify a Sugoku account.')
    return json(200, { received: true, ignored: true })
  }
  if (typeof eventId !== 'string' || !eventId || typeof transactionId !== 'string' || !transactionId) {
    return json(400, { error: 'Purchase event is missing its idempotency fields.' })
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/credit_verified_sudo`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      p_app_user_id: userId,
      p_product_id: productId,
      p_event_id: eventId,
      p_transaction_id: transactionId,
    }),
  })
  if (!response.ok) {
    console.error('Supabase rejected a verified RevenueCat purchase.', await response.text())
    return json(500, { error: 'Could not credit verified purchase.' })
  }

  return json(200, { received: true, credited: sudoProducts[productId] })
})
