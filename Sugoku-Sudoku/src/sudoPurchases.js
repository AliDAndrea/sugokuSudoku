import { Capacitor } from '@capacitor/core'
import { Purchases } from '@revenuecat/purchases-capacitor'

export const sudoProducts = [
  { id: 'sugoku_sudo_100', amount: 100 },
  { id: 'sugoku_sudo_500', amount: 500 },
  { id: 'sugoku_sudo_1000', amount: 1000 },
  { id: 'sugoku_sudo_2500', amount: 2500 },
  { id: 'sugoku_sudo_10000', amount: 10000 },
]

let configuredApiKey = ''
let configuredUserId = ''

export function canPurchaseSudoInApp() {
  if (!Capacitor.isNativePlatform()) return false
  const apiKey = Capacitor.getPlatform() === 'ios'
    ? import.meta.env.VITE_REVENUECAT_APPLE_API_KEY
    : import.meta.env.VITE_REVENUECAT_GOOGLE_API_KEY
  return Boolean(apiKey)
}

async function configurePurchases(userId) {
  if (!Capacitor.isNativePlatform()) {
    throw new Error('Sudo can only be purchased in the iOS or Android app.')
  }
  const apiKey = Capacitor.getPlatform() === 'ios'
    ? import.meta.env.VITE_REVENUECAT_APPLE_API_KEY
    : import.meta.env.VITE_REVENUECAT_GOOGLE_API_KEY
  if (!apiKey) throw new Error('In-app purchases are not configured for this platform.')
  if (!userId) throw new Error('Sign in before purchasing Sudo.')

  if (!configuredApiKey) {
    await Purchases.configure({ apiKey, appUserID: userId })
    configuredApiKey = apiKey
    configuredUserId = userId
  } else if (configuredApiKey !== apiKey || configuredUserId !== userId) {
    if (configuredApiKey !== apiKey) {
      throw new Error('The configured store account changed. Restart the app before purchasing.')
    }
    await Purchases.logIn({ appUserID: userId })
    configuredUserId = userId
  }
}

export async function getSudoStoreProducts(userId) {
  await configurePurchases(userId)
  const { products } = await Purchases.getProducts({
    productIdentifiers: sudoProducts.map(({ id }) => id),
    type: 'NON_SUBSCRIPTION',
  })
  return products
    .filter((product) => sudoProducts.some(({ id }) => id === product.identifier))
    .map((product) => ({
      id: product.identifier,
      price: product.priceString,
    }))
}

export async function purchaseSudoProduct(productId, userId) {
  await configurePurchases(userId)
  const { products } = await Purchases.getProducts({
    productIdentifiers: [productId],
    type: 'NON_SUBSCRIPTION',
  })
  const product = products.find((storeProduct) => storeProduct.identifier === productId)
  if (!product) throw new Error('This Sudo bundle is not available in the store.')
  await Purchases.purchaseStoreProduct({ product })
}
