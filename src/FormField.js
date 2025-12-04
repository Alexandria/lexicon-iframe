const formFieldStyles = new CSSStyleSheet();

formFieldStyles.replaceSync(`

    :host {
        --error-message-color:red;
        --
    }

    .error-message{
        color: var(--error-message-color);
        font-size:small;

    }
    .error-message:empty{
        display:none;
    }

`);

export class FormField extends HTMLElement {
  #input;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [formFieldStyles];
    this.shadowRoot.innerHTML = `<div class="form-field"><slot></slot><span class="error-message" aria-live="polite"></span></div>`;
  }

  get #errorMessage() {
    return this.shadowRoot.querySelector(".error-message");
  }

  // This will allow the user to make custom error messages
  get #customErrorMessage() {
    return {
      valueMissing:
        this.getAttribute("value-missing-message") || "This field is required",
      tooLong:
        this.getAttribute("too-long-message") || "This field is too long",
      tooShort:
        this.getAttribute("too-short-message") || "This field is too short",
      rangeOverflow:
        this.getAttribute("range-overflow-message") ||
        "This number is too large",
      rangeUnderflow:
        this.getAttribute("range-underflow-message") ||
        "This number is too small",
      typeMismatch:
        this.getAttribute("type-mismatch-message") ||
        "This field is the wrong type",
      patternMismatch:
        this.getAttribute("pattern-mismatch-message") ||
        "This field has a pattern mismatch",
    };
  }

  // I only want to return the first error key that was found
  #getFirstError = (validityState) => {
    for (const key in validityState) {
      if (validityState[key]) {
        this.#input.classList.add("error");
        return key;
      }
    }
  };

  #handleInvalid = (event) => {
    event.preventDefault();
  };

  #handleInput = (event) => {
    this.#errorMessage.textContent = "";
    this.#input.classList.remove("error");
  };

  #handleBlur = () => {
    if (this.#input && !this.#input.validity.valid) {
      this.#errorMessage.textContent =
        this.#customErrorMessage[this.#getFirstError(this.#input.validity)];
    }
  };

  connectedCallback() {
    this.#input = this.querySelector("input");
    console.log("Form field is connected");

    if (this.#input) {
      console.log("We have an input!");
      // handle invalid behavior
      this.#input.addEventListener("invalid", this.#handleInvalid);

      // hide error message when typing
      this.#input.addEventListener("input", this.#handleInput);

      //validate and display error message when user leaves field
      this.#input.addEventListener("blur", this.#handleBlur);
    }
  }

  disconnectCallback() {
    if (this.#input) {
      this.#input.removeEventListener("invalid", this.#handleInvalid);
      this.#input.removeEventListener("input", this.#handleInput);
      this.#input.removeEventListener("blur", this.#handleBlur);
    }
  }
}

customElements.define("form-field", FormField);
