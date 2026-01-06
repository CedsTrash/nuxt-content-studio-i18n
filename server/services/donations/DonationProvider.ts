/**
 * Donation Provider Interface
 *
 * This interface defines the contract for donation payment providers.
 * To replace the mock provider with a real one (Stripe, PayPal, etc.),
 * implement this interface and update the provider in the API endpoints.
 */

export interface DonationRequest {
  amount: number
  currency?: string
  projectSlug?: string | null
  dedication?: string | null
  email?: string
  name?: string
}

export interface OneTimePaymentResult {
  success: boolean
  paymentIntentId?: string
  reference?: string
  error?: string
}

export interface RecurringPaymentResult {
  success: boolean
  subscriptionId?: string
  reference?: string
  error?: string
}

export interface DonationRecord {
  id: string
  reference: string
  amount: number
  currency: string
  type: 'one-time' | 'recurring'
  projectSlug: string | null
  dedication: string | null
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export interface DonationProvider {
  /**
   * Process a one-time donation payment
   */
  processOneTimePayment(request: DonationRequest): Promise<OneTimePaymentResult>

  /**
   * Create a recurring donation subscription
   */
  createRecurringDonation(request: DonationRequest): Promise<RecurringPaymentResult>

  /**
   * Get all donation records (for admin purposes)
   */
  getDonations(): Promise<DonationRecord[]>

  /**
   * Get a specific donation by reference
   */
  getDonationByReference(reference: string): Promise<DonationRecord | null>
}
