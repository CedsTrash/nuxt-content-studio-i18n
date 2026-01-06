import { writeFile, mkdir, appendFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const DATA_DIR = '.data'
const CONTACTS_FILE = join(DATA_DIR, 'contacts.log')

interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  ip?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  const errors: string[] = []

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push('Name is required (minimum 2 characters)')
  }

  if (!body.email || typeof body.email !== 'string') {
    errors.push('Email is required')
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      errors.push('Invalid email format')
    }
  }

  if (!body.subject || typeof body.subject !== 'string' || body.subject.trim().length < 2) {
    errors.push('Subject is required (minimum 2 characters)')
  }

  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10) {
    errors.push('Message is required (minimum 10 characters)')
  }

  if (errors.length > 0) {
    throw createError({
      statusCode: 400,
      message: errors.join(', ')
    })
  }

  // Create contact message record
  const contactMessage: ContactMessage = {
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    subject: body.subject.trim(),
    message: body.message.trim(),
    timestamp: new Date().toISOString(),
    ip: getRequestIP(event) || undefined
  }

  // Log to console (demo email handler)
  console.log('\n========== NEW CONTACT MESSAGE ==========')
  console.log(`From: ${contactMessage.name} <${contactMessage.email}>`)
  console.log(`Subject: ${contactMessage.subject}`)
  console.log(`Date: ${contactMessage.timestamp}`)
  console.log('Message:')
  console.log(contactMessage.message)
  console.log('==========================================\n')

  // Store to local file
  try {
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }

    const logEntry = `
========================================
Date: ${contactMessage.timestamp}
From: ${contactMessage.name} <${contactMessage.email}>
Subject: ${contactMessage.subject}
IP: ${contactMessage.ip || 'unknown'}

${contactMessage.message}
========================================

`

    await appendFile(CONTACTS_FILE, logEntry)
  } catch (error) {
    console.error('Error saving contact message:', error)
    // Don't fail the request if file save fails
  }

  return {
    success: true,
    message: 'Message received successfully'
  }
})
