import { Field, reduxForm } from "redux-form";
import SurveyField from "./SurveyField";
import fields from "./formFields";
import validateEmails from "../utils/validateEmails";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function SurveyForm({ handleSubmit, onSubmitForm }) {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        {fields.map((field) => (
          <Field
            key={field}
            type={"text"}
            name={field.trim().toLowerCase().split(" ")[0]}
            label={field}
            component={SurveyField}
          />
        ))}

        <button type="button" className={"red btn-flat left white-text"}>
          <Link to={"/surveys"} style={{ color: "white" }}>
            <i className={"material-icons left"}>&larr;</i>
            Back
          </Link>
        </button>

        <button type="submit" className={"teal btn-flat right white-text"}>
          Next
          <i className={"material-icons right"}>&rarr;</i>
        </button>
      </form>
    </div>
  );
}

function validate(values) {
  const errors = {};
  const invalidEmails = validateEmails(values.recipients);

  if (!values.survey) errors.survey = "A title is required.";

  if (!values.subject) errors.subject = "The subject line is required.";

  if (!values.content)
    errors.content = "Content of the survey cannot be empty.";

  if (invalidEmails) errors.recipients = invalidEmails;

  if (!values.recipients)
    errors.recipients = "At least one recipient is required.";

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
