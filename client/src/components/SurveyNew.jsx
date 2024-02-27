import { useState } from "react";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";
import { reduxForm } from "redux-form";

function SurveyNew() {
  const [showReview, setShowReview] = useState(false);

  return (
    <div>
      {!showReview && <SurveyForm onSubmitForm={() => setShowReview(true)} />}
      {showReview && <SurveyReview onBack={() => setShowReview(false)} />}
    </div>
  );
}

// Will dump the survey inputs when this component unmounts
export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
