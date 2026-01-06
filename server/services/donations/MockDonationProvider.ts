/**
 * Mock Donation Provider
 *
 * This is a demo implementation of the DonationProvider interface.
 * It stores donations in memory and a local JSON file.
 *
 * TO REPLACE WITH A REAL PROVIDER:
 * 1. Create a new file (e.g., StripeDonationProvider.ts) that implements DonationProvider
 * 2. Implement all methods using the Stripe/PayPal SDK
 * 3. Update the imports in the API endpoints to use your new provider
 * 4. Configure environment variables for API keys
 *
 * Example for Stripe:
 * - Install: pnpm add stripe
 * - Create StripeDonationProvider implementing DonationProvider
 * - Use stripe.paymentIntents.create() for one-time payments
 * - Use stripe.subscriptions.create() for recurring donations
 */

import type {
  DonationProvider,
  DonationRequest,
  OneTimePaymentResult,
  RecurringPaymentResult,
  DonationRecord
} from './DonationProvider'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// In-memory storage (also persisted to file)
let donations: DonationRecord[] = []

const DATA_DIR = '.data'
const DONATIONS_FILE = join(DATA_DIR, 'donations.json')

// Generate a unique reference ID
function generateReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `DON-${timestamp}-${random}`
}

// Generate a fake payment intent ID
function generatePaymentIntentId(): string {
  return `pi_mock_${Math.random().toString(36).substring(2, 15)}`
}

// Generate a fake subscription ID
function generateSubscriptionId(): string {
  return `sub_mock_${Math.random().toString(36).substring(2, 15)}`
}

// Load donations from file
async function loadDonations(): Promise<void> {
  try {
    if (existsSync(DONATIONS_FILE)) {
      const data = await readFile(DONATIONS_FILE, 'utf-8')
      donations = JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading donations:', error)
    donations = []
  }
}

// Save donations to file
async function saveDonations(): Promise<void> {
  try {
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }
    await writeFile(DONATIONS_FILE, JSON.stringify(donations, null, 2))
  } catch (error) {
    console.error('Error saving donations:', error)
  }
}

// Initialize - load existing donations
loadDonations()

export const mockDonationProvider: DonationProvider = {
  async processOneTimePayment(request: DonationRequest): Promise<OneTimePaymentResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Simulate validation
    if (request.amount < 1) {
      return {
        success: false,
        error: 'Minimum donation amount is 1€'
      }
    }

    // Create donation record
    const record: DonationRecord = {
      id: generatePaymentIntentId(),
      reference: generateReference(),
      amount: request.amount,
      currency: request.currency || 'EUR',
      type: 'one-time',
      projectSlug: request.projectSlug || null,
      dedication: request.dedication || null,
      status: 'completed',
      createdAt: new Date().toISOString()
    }

    donations.push(record)
    await saveDonations()

    console.log(`[MOCK] One-time donation processed: ${record.reference} - ${record.amount}€`)

    return {
      success: true,
      paymentIntentId: record.id,
      reference: record.reference
    }
  },

  async createRecurringDonation(request: DonationRequest): Promise<RecurringPaymentResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Simulate validation
    if (request.amount < 1) {
      return {
        success: false,
        error: 'Minimum donation amount is 1€'
      }
    }

    // Create donation record
    const record: DonationRecord = {
      id: generateSubscriptionId(),
      reference: generateReference(),
      amount: request.amount,
      currency: request.currency || 'EUR',
      type: 'recurring',
      projectSlug: request.projectSlug || null,
      dedication: request.dedication || null,
      status: 'completed',
      createdAt: new Date().toISOString()
    }

    donations.push(record)
    await saveDonations()

    console.log(`[MOCK] Recurring donation created: ${record.reference} - ${record.amount}€/month`)

    return {
      success: true,
      subscriptionId: record.id,
      reference: record.reference
    }
  },

  async getDonations(): Promise<DonationRecord[]> {
    await loadDonations()
    return donations
  },

  async getDonationByReference(reference: string): Promise<DonationRecord | null> {
    await loadDonations()
    return donations.find(d => d.reference === reference) || null
  }
}
