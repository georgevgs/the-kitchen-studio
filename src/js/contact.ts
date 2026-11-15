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

const STATUS_BY_ERROR: Record<string, string> = { true: "error", false: "success" };

// DOM Element Selectors
const getElementOrNull = (id: string): HTMLElement | null => document.getElementById(id);

// UI Functions
const showElement = (element: HTMLElement): void => element.classList.remove("hidden");
const hideElement = (element: HTMLElement): void => element.classList.add("hidden");

const displayMessage = (status: HTMLElement, message: string, isError: boolean): void => {
  const title = status.querySelector<HTMLElement>("[data-status-title]");
  const text = status.querySelector<HTMLElement>("[data-status-text]");
  const resetButton = status.querySelector<HTMLElement>("[data-form-reset]");

  if (null !== title && null !== text && null !== resetButton) {
    text.textContent = message;
    title.classList.toggle("hidden", isError);
    resetButton.classList.toggle("hidden", isError);
    status.dataset.status = STATUS_BY_ERROR[isError.toString()];
    showElement(status);
  }
};

// Form Validation
const isFormValid = (form: ContactForm): boolean => {
  const { name, email, message, terms } = form.elements;

  return [name, email, message].every((field) => "" !== field.value.trim()) && terms.checked;
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
const setSubmitLoading = (isLoading: boolean): void => {
  const submitButton = getElementOrNull("submit-btn");
  const submitText = getElementOrNull("submit-text");
  const submitLoading = getElementOrNull("submit-loading");

  if (submitButton instanceof HTMLButtonElement && null !== submitText && null !== submitLoading) {
    submitButton.disabled = isLoading;
    submitText.classList.toggle("hidden", isLoading);
    submitLoading.classList.toggle("hidden", false === isLoading);
  }
};

// Field validation with ARIA
const validateField = (form: ContactForm, field: HTMLInputElement | HTMLTextAreaElement): boolean => {
  const isValid = "" !== field.value.trim();
  const errorElement = getElementOrNull(`${field.id}-error`);

  field.setAttribute("aria-invalid", (false === isValid).toString());
  if (null !== errorElement) {
    errorElement.textContent = form.dataset.messageRequired ?? "";
    errorElement.classList.toggle("hidden", isValid);
  }

  return isValid;
};

const focusFirstInvalidField = (form: ContactForm): void => {
  const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");

  if (null !== firstInvalid) {
    firstInvalid.focus();
  }
};

const sendForm = async (form: ContactForm, formStatus: HTMLElement, formInputs: HTMLElement): Promise<void> => {
  try {
    setSubmitLoading(true);
    hideElement(formInputs);

    const response = await submitForm(form);

    if (response.ok) {
      form.reset();
      displayMessage(formStatus, form.dataset.messageSuccess ?? "", false);
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    displayMessage(formStatus, form.dataset.messageError ?? "", true);
    showElement(formInputs);
    setSubmitLoading(false);
    console.error("Error submitting form:", error);
  }
};

// Main Handler
const handleSubmit = async (event: Event): Promise<void> => {
  event.preventDefault();

  const form = event.target as ContactForm;
  const formStatus = getElementOrNull("success-message");
  const formInputs = getElementOrNull("form-inputs");

  if (null !== formStatus && null !== formInputs) {
    // Validate individual fields with ARIA feedback
    validateField(form, form.elements.name);
    validateField(form, form.elements.email);
    validateField(form, form.elements.message);

    if (isFormValid(form)) {
      await sendForm(form, formStatus, formInputs);
    } else {
      focusFirstInvalidField(form);
      displayMessage(formStatus, form.dataset.messageFillAll ?? "", true);
    }
  } else {
    console.error("Required DOM elements not found");
  }
};

const resetForm = (): void => {
  const formStatus = getElementOrNull("success-message");
  const formInputs = getElementOrNull("form-inputs");

  if (null !== formStatus && null !== formInputs) {
    hideElement(formStatus);
    showElement(formInputs);
    setSubmitLoading(false);
  }
};

// Event Listeners
const form = getElementOrNull("contact-form");

if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", handleSubmit);

  const resetButton = form.querySelector("[data-form-reset]");

  if (null !== resetButton) {
    resetButton.addEventListener("click", resetForm);
  }
}
