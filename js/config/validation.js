const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validationRules = {
  email: {
    required: true,
    regex: emailRegex,
    message: "Please enter a valid email address."
  },
  default: {
    message: "This field is required!"
  }
};

export default validationRules;
