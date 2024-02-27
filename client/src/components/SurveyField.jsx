// eslint-disable-next-line react/prop-types
function SurveyField({ input, label, meta: { touched, error } }) {
  return (
    <div style={{ margin: "25px 10px" }}>
      <label>{label}</label>
      <input type="text" {...input} required />
      {touched && (
        <p className={"red-text"} style={{ fontSize: "0.8rem" }}>
          {error}
        </p>
      )}
    </div>
  );
}
export default SurveyField;
