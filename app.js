// ===============================
// Interactive Form Application
// ===============================

// STUDENT TODO 1:
// Define your initial state object.
// It should store field values + a validity map.
const state = {
  values: {
    // fullName: "",
    // email: "",
    // phone: "",
    // requestType: "",
    // message: "",
    // consent: false
  },
  valid: {
    // fullName: false,
    // email: false,
    // phone: false,
    // requestType: false,
    // message: false,
    // consent: false
  }
};

// Cache elements
const form = document.getElementById("appForm");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

const successPanel = document.getElementById("successPanel");
const summaryBox = document.getElementById("summaryBox");
const newEntryBtn = document.getElementById("newEntryBtn");

// STUDENT TODO 2:
// Create helper functions:
// - setError(fieldId, message)
// - setValid(fieldId)
// - isFormValid()
// - updateSubmitState()

function setError(fieldId, message) {
  // TODO: find input by id, add .is-invalid, remove .is-valid
  // TODO: find error <p> by id `${fieldId}Error` and set message
}

function setValid(fieldId) {
  // TODO: find input by id, add .is-valid, remove .is-invalid
  // TODO: clear error message
}

function isFormValid() {
  // TODO: return true only if ALL state.valid are true
  return false;
}

function updateSubmitState() {
  // TODO: disable or enable submit button based on isFormValid()
}

// STUDENT TODO 3:
// Write validation functions for each field.
// Example:
// function validateFullName(value) { ... return { ok: true/false, msg: "" } }

function validateField(fieldName, value) {
  // TODO: switch by fieldName and run specific validation rules
  // return { ok, msg }
  return { ok: true, msg: "" };
}

// STUDENT TODO 4:
// Listen for input/change events and validate live.
// - input events: text/email/textarea
// - change events: select/checkbox
form.addEventListener("input", (e) => {
  const el = e.target;

  // TODO: Only process inputs/selects/textarea
  // TODO: Update state.values
  // TODO: Validate and update UI (setValid/setError)
  // TODO: updateSubmitState()
});

form.addEventListener("change", (e) => {
  const el = e.target;

  // TODO: handle select + checkbox updates and validation
  // TODO: updateSubmitState()
});

// STUDENT TODO 5:
// Handle submit: prevent refresh, validate all fields, focus first invalid, else show success summary.
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // TODO:
  // 1) Validate all fields again
  // 2) If invalid: focus first invalid input
  // 3) If valid:
  //    - hide form card OR disable form
  //    - show successPanel
  //    - render summaryBox with submitted values (safe text)
});

// Reset behavior
resetBtn.addEventListener("click", () => {
  // TODO:
  // - Reset form fields
  // - Reset state values + valid map
  // - Clear all error messages
  // - Remove validation classes
  // - updateSubmitState()
});

newEntryBtn.addEventListener("click", () => {
  // TODO:
  // - Hide successPanel
  // - Show form again
  // - Reset the form for a new entry
});