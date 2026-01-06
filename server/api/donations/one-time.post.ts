import { mockDonationProvider } from '../../services/donations/MockDonationProvider'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  if (!body.amount || typeof body.amount !== 'number') {
    throw createError({
      statusCode: 400,
      message: 'Amount is required and must be a number'
    })
  }

  if (body.amount < 1) {
    throw createError({
      statusCode: 400,
      message: 'Minimum donation amount is 1€'
    })
  }

  try {
    const result = await mockDonationProvider.processOneTimePayment({
      amount: body.amount,
      currency: body.currency || 'EUR',
      projectSlug: body.projectSlug || null,
      dedication: body.dedication || null,
      email: body.email,
      name: body.name
    })

    return result
  } catch (error) {
    console.error('Error processing one-time donation:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to process donation'
    })
  }
})
