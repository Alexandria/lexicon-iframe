# Iframe

This repo holds and html form made up of a custom web component `FormField`

### FormField Web Component

The FormField Web Component is a simple wrapper designed to enhance native HTML
form inputs by providing validation and error message display.

It automatically listens for native validity changes (:invalid, blur, input) on
the slotted `<input>` element and displays a customizable error message when
validation fails.

#### Usage Example

```
<form>
  <form-field
    value-missing-message="Please enter your email address."
  >
    <label for="email">Email Address</label>
    <input
      id="email"
      type="email"
      required
    />
  </form-field>

  <form-field
    range-overflow-message="Must be 100 or less."
    range-underflow-message="Must be 10 or more."
  >
    <label for="quantity">Quantity (10-100)</label>
    <input
      id="quantity"
      type="number"
      min="10"
      max="100"
    />
  </form-field>
</form>

```

#### 🛠️ Configuration and Customization

You can input custom error messages for a variety of properties

| Native Validity Property | Attribute to Set           | Default Message                     |
| :----------------------- | :------------------------- | :---------------------------------- |
| **`valueMissing`**       | `value-missing-message`    | "This field is required"            |
| **`tooLong`**            | `too-long-message`         | "This field is too long"            |
| **`tooShort`**           | `too-short-message`        | "This field is too short"           |
| **`rangeOverflow`**      | `range-overflow-message`   | "This number is too large"          |
| **`rangeUnderflow`**     | `range-underflow-message`  | "This number is too small"          |
| **`typeMismatch`**       | `type-mismatch-message`    | "This field is the wrong type"      |
| **`patternMismatch`**    | `pattern-mismatch-message` | "This field has a pattern mismatch" |
