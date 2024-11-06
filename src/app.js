'use strict'

// Import styles
import './styles/style.css'

// Import features and dependencies
import { loadScripts } from './utils/scriptLoader.js'

// Define required external scripts
const EXTERNAL_SCRIPTS = [
  'https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js',
  'https://cdn.jsdelivr.net/npm/flatpickr',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
]

// Initialize Webflow
window.Webflow ||= []
window.Webflow.push(async () => {
  try {
    // Load external scripts first
    await loadScripts(EXTERNAL_SCRIPTS)

    // Dynamically import modules
    const [
      { default: animateTitle },
      { default: createBadge },
      { populateCountrySelect },
      { initializeCurrencyToggle },
      { calculateTotals },
      { initializeDatePickers },
      { initializeExtras },
      { initializeVehicleSelection },
    ] = await Promise.all([
      import('./features/animateTitle.js'),
      import('./features/createBasge.js'),
      import('./modules/apiChoice.js'),
      import('./modules/apiExchange.js'),
      import('./modules/calculations.js'),
      import('./modules/datePickers.js'),
      import('./modules/extras.js'),
      import('./modules/vehicleSelection.js'),
    ])

    const initializeBookingForm = async () => {
      try {
        const form = document.querySelector('#booking_form')
        if (!form) throw new Error('Booking form not found')

        form.classList.add('loading')

        await populateCountrySelect()

        await Promise.all([
          initializeDatePickers(),
          initializeVehicleSelection(),
          initializeExtras(),
          initializeCurrencyToggle(),
        ])

        handleFormSubmission()
        calculateTotals()
        form.classList.remove('loading')
      } catch (error) {
        console.error('Error initializing booking form:', error)
        showError(
          'There was an error loading the booking form. Please refresh the page.'
        )
      }
    }

    const handleFormSubmission = () => {
      const form = document.querySelector('#wf-form-Booking-form')
      if (!form) return

      form.addEventListener('submit', async (e) => {
        e.preventDefault()

        try {
          form.classList.add('submitting')

          if (!validateForm()) {
            throw new Error('Please fill in all required fields')
          }

          showSuccess('Booking submitted successfully!')
        } catch (error) {
          console.error('Form submission error:', error)
          showError(error.message)
        } finally {
          form.classList.remove('submitting')
        }
      })
    }

    const validateForm = () => {
      return true
    }

    const showError = (message) => {
      const errorAlert = document.querySelector('.error-alert-bg')
      if (errorAlert) {
        errorAlert.querySelector('.error-alert-text').textContent = message
        errorAlert.classList.remove('is-hidden')
        setTimeout(() => errorAlert.classList.add('is-hidden'), 5000)
      }
    }

    const showSuccess = (message) => {
      const successAlert = document.querySelector('.success-alert-bg')
      if (successAlert) {
        successAlert.querySelector('.success-alert-text').textContent = message
        successAlert.classList.remove('is-hidden')
        setTimeout(() => successAlert.classList.add('is-hidden'), 5000)
      }
    }

    // Initialize features
    createBadge()
    animateTitle()
    await initializeBookingForm()
  } catch (error) {
    console.error('Error initializing application:', error)
  }
})
