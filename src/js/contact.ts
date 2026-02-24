// Types
type FormElements = HTMLFormControlsCollection & {
  name: HTMLInputElement;
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
  terms: HTMLInputElement;
};

interface ContactForm extends HTMLFormElement {
  readonly elements: FormElements;
}

// DOM Element Selectors
const getElement = (id: string): HTMLElement | null =>
  document.getElementById(id);

// UI Functions
const showElement = (element: HTMLElement): void =>
  element.classList.remove("hidden");
const hideElement = (element: HTMLElement): void =>
  element.classList.add("hidden");

const setElementContent = (element: HTMLElement, content: string): void => {
  element.innerHTML = content;
};

const displayMessage = (
  element: HTMLElement,
  message: string,
  isError: boolean = false,
): void => {
  const colorClass = isError ? "text-orange-500" : "text-green-500";
  setElementContent(
    element,
    `<p class="text-center text-lg ${colorClass} animate-bounce">${message}</p>`,
  );
  showElement(element);
};

// Form Validation
const isFormValid = (form: ContactForm): boolean => {
  const { name, email, message, terms } = form.elements;
  return (
    [name, email, message].every((field) => field.value.trim() !== "") &&
    terms.checked
  );
};

// Form Submission
const submitForm = async (form: ContactForm): Promise<Response> => {
  const data = new FormData(form);
  return fetch(form.action, {
    method: form.method,
    body: data,
    headers: { Accept: "application/json" },
  });
};

// Submit button loading state
const setSubmitLoading = (loading: boolean): void => {
  const btn = getElement("submit-btn") as HTMLButtonElement | null;
  const submitText = getElement("submit-text");
  const submitLoading = getElement("submit-loading");
  if (btn) btn.disabled = loading;
  if (submitText) submitText.classList.toggle("hidden", loading);
  if (submitLoading) submitLoading.classList.toggle("hidden", !loading);
};

// Field validation with ARIA
const validateField = (field: HTMLInputElement | HTMLTextAreaElement): boolean => {
  const valid = field.value.trim() !== "";
  field.setAttribute("aria-invalid", valid ? "false" : "true");
  const errorEl = getElement(`${field.id}-error`);
  if (errorEl) {
    errorEl.textContent = valid ? "" : "Αυτό το πεδίο είναι υποχρεωτικό";
    errorEl.classList.toggle("hidden", valid);
  }
  return valid;
};

// Main Handler
const handleSubmit = async (event: Event): Promise<void> => {
  event.preventDefault();

  const form = event.target as ContactForm;
  const formStatus = getElement("success-message");
  const formInputs = getElement("form-inputs");

  if (!formStatus || !formInputs) {
    console.error("Required DOM elements not found");
    return;
  }

  // Validate individual fields with ARIA feedback
  const nameValid = validateField(form.elements.name);
  const emailValid = validateField(form.elements.email);
  const messageValid = validateField(form.elements.message);

  if (!isFormValid(form)) {
    if (!nameValid || !emailValid || !messageValid) {
      // Focus first invalid field
      if (!nameValid) form.elements.name.focus();
      else if (!emailValid) form.elements.email.focus();
      else form.elements.message.focus();
    }
    displayMessage(
      formStatus,
      "Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία",
      true,
    );
    showElement(formStatus);
    return;
  }

  try {
    setSubmitLoading(true);
    hideElement(formInputs);

    const response = await submitForm(form);

    if (response.ok) {
      form.reset();
      displayMessage(formStatus, "Το μήνυμά σας στάλθηκε επιτυχώς!");
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    displayMessage(
      formStatus,
      "Παρουσιάστηκε πρόβλημα κατά την αποστολή της φόρμας. Παρακαλώ δοκιμάστε ξανά.",
      true,
    );
    showElement(formInputs);
    setSubmitLoading(false);
    console.error("Error submitting form:", error);
  }
};

// Event Listener
const form = getElement("contact-form") as ContactForm | null;
form?.addEventListener("submit", handleSubmit);
