import { useSelector } from "react-redux";
import { dispatchSubmitSurvey } from "../actions";
import fields from "./formFields";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function SurveyReview({ onBack }) {
  const values = useSelector((store) => store.form.surveyForm.values);
  const navigate = useNavigate();

  return (
    <div>
      <h5>Proceed with the following info?</h5>

      {fields.map((field) => {
        const fieldName = field.toLowerCase().split(" ")[0];

        return (
          <div key={fieldName} style={{ margin: "2rem 0 3rem" }}>
            <label>{field}</label>
            <p>{values[fieldName]}</p>
          </div>
        );
      })}

      <button
        type="button"
        className={"red btn-flat white-text left"}
        onClick={onBack}
      >
        <i className={"material-icons left"}>&larr;</i>
        Back
      </button>

      <button
        type="button"
        className={"green btn-flat white-text right"}
        onClick={() => dispatchSubmitSurvey(values, navigate)}
      >
        <i className={"material-icons right"}>&#9993;</i>
        Send
      </button>
    </div>
  );
}
export default SurveyReview;
