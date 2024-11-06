import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

const PICKUP_TIME_OPTIONS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
]

const RETURN_TIME_OPTIONS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
]

export const initializeDatePickers = async () => {
  try {
    const pickupDate = document.querySelector('#i-pickup-date')
    const returnDate = document.querySelector('#i-return-date')
    const pickupTime = document.querySelector('#i-pickup-time')
    const returnTime = document.querySelector('#i-return-time')
    const durationDisplay = document.querySelector('#v-calc-duration')

    if (
      !pickupDate ||
      !returnDate ||
      !pickupTime ||
      !returnTime ||
      !durationDisplay
    ) {
      throw new Error('Required date/time elements not found')
    }

    // Initialize time dropdowns
    initializeTimeDropdown(pickupTime, PICKUP_TIME_OPTIONS)
    initializeTimeDropdown(returnTime, RETURN_TIME_OPTIONS)

    // Initialize flatpickr
    const pickupPicker = flatpickr(pickupDate, {
      minDate: 'today',
      dateFormat: 'Y-m-d',
      onChange: () => updateDuration(pickupDate, returnDate, durationDisplay),
    })

    const returnPicker = flatpickr(returnDate, {
      minDate: 'today',
      dateFormat: 'Y-m-d',
      onChange: () => updateDuration(pickupDate, returnDate, durationDisplay),
    })

    // Initial duration calculation
    updateDuration(pickupDate, returnDate, durationDisplay)

    return { pickupPicker, returnPicker }
  } catch (error) {
    console.error('Error initializing date pickers:', error)
    throw error
  }
}

function initializeTimeDropdown(select, options) {
  if (!select) return
  select.innerHTML = options
    .map((time) => `<option value="${time}">${time}</option>`)
    .join('')
}

function updateDuration(pickupDate, returnDate, durationDisplay) {
  if (!pickupDate.value || !returnDate.value) {
    durationDisplay.textContent = '0'
    return
  }

  const start = new Date(pickupDate.value)
  const end = new Date(returnDate.value)
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

  durationDisplay.textContent = Math.max(0, duration)
}
