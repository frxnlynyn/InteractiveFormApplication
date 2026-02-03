// ===============================
// Interactive Form Application
// ===============================

// STUDENT TODO 1:
// Define your initial state object.
// It should store field values + a validity map.

// Initial state
const state = {
  values: {
    fullName: "",
    email: "",
    phone: "",
    requestType: "",
    description: "",
    consent: false
  },
  valid: {
    fullName: false,
    email: false,
    phone: false,
    requestType: false,
    description: false,
    consent: false
  }
};

// Cache elements
const form = document.getElementById("appForm");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

const successPanel = document.getElementById("successPanel");
const summaryBox = document.getElementById("summaryBox");
const newEntryBtn = document.getElementById("newEntryBtn");

// ===============================
// Helper Functions
// ===============================
function setError(fieldId, message) {

  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}Error`);

  input.classList.add("is-invalid");
  input.classList.remove("is-valid");

  error.textContent = message;

  state.valid[fieldId] = false;
}

function setValid(fieldId) {

  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}Error`);

  input.classList.add("is-valid");
  input.classList.remove("is-invalid");

  error.textContent = "";

  state.valid[fieldId] = true;
}

function isFormValid() {
  return Object.values(state.valid).every(Boolean);
}

function updateSubmitState() {
  submitBtn.disabled = !isFormValid();
}

// ===============================
// Validation Rules
// ===============================
function validateField(name, value) {

  switch (name) {

    case "fullName":
      if (value.trim().length < 3) {
        return { ok: false, msg: "Full name must be at least 3 characters." };
      }
      return { ok: true };

    case "email":
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        return { ok: false, msg: "Enter a valid email address." };
      }
      return { ok: true };

    case "phone":
      if (value.trim().length < 7) {
        return { ok: false, msg: "Enter a valid phone number." };
      }
      return { ok: true };

    case "requestType":
      if (value === "option" || value === "") {
        return { ok: false, msg: "Please select a request type." };
      }
      return { ok: true };

    case "description":
      if (value.trim().length < 10) {
        return { ok: false, msg: "Description must be at least 10 characters." };
      }
      return { ok: true };

    case "consent":
      if (!value) {
        return { ok: false, msg: "Consent is required." };
      }
      return { ok: true };

    default:
      return { ok: true };
  }
}

// ===============================
// Live Validation
// ===============================
form.addEventListener("input", (e) => {

  const el = e.target;

  if (!el.name) return;

  const value = el.type === "checkbox" ? el.checked : el.value;

  state.values[el.name] = value;

  const result = validateField(el.name, value);

  result.ok ? setValid(el.name) : setError(el.name, result.msg);

  updateSubmitState();
});


// ===============================
// Change Events
// ===============================
form.addEventListener("change", (e) => {

  const el = e.target;

  if (!el.name) return;

  const value = el.type === "checkbox" ? el.checked : el.value;

  state.values[el.name] = value;

  const result = validateField(el.name, value);

  result.ok ? setValid(el.name) : setError(el.name, result.msg);

  updateSubmitState();
});


// ===============================
// Submit Handler
// ===============================
form.addEventListener("submit", (e) => {

  e.preventDefault();

  Object.keys(state.values).forEach((field) => {

    const value = state.values[field];

    const result = validateField(field, value);

    result.ok ? setValid(field) : setError(field, result.msg);
  });


  if (!isFormValid()) {

    const firstInvalid =
      Object.keys(state.valid).find(k => !state.valid[k]);

    document.getElementById(firstInvalid).focus();

    return;
  }


  // Show success
  form.closest(".card").hidden = true;
  successPanel.hidden = false;


  summaryBox.innerHTML = `
    <p><strong>Full Name:</strong> ${state.values.fullName}</p>
    <p><strong>Email:</strong> ${state.values.email}</p>
    <p><strong>Phone:</strong> ${state.values.phone}</p>
    <p><strong>Request Type:</strong> ${state.values.requestType.replace("_", " ")}</p>
    <p><strong>Description:</strong> ${state.values.description}</p>
  `;
});


// ===============================
// Reset Button
// ===============================
resetBtn.addEventListener("click", () => {

  form.reset();

  // FIXED reset
  Object.keys(state.values).forEach(k => {
    state.values[k] = k === "consent" ? false : "";
  });

  Object.keys(state.valid).forEach(k => {
    state.valid[k] = false;
  });

  document.querySelectorAll(".error").forEach(e => {
    e.textContent = "";
  });

  document.querySelectorAll(".is-valid, .is-invalid").forEach(el => {
    el.classList.remove("is-valid", "is-invalid");
  });

  updateSubmitState();
});


// ===============================
// New Entry Button
// ===============================
newEntryBtn.addEventListener("click", () => {

  successPanel.hidden = true;
  form.closest(".card").hidden = false;

  resetBtn.click();
});


// Initial state
submitBtn.disabled = true;
