function surveyTemplate(body, id) {
  return `<html>
  <body>
    <div>
      <h3>We need your help!</h3>

      <p>Please provide us your feedback with the following question:</p>

      <p>${body}</p>

      <div>
        <a href="${process.env.DOMAIN}/api/surveys/${id}/yes">Yes</a>
      </div>

      <div>
        <a href="${process.env.DOMAIN}/api/surveys/${id}/no">No</a>
      </div>
    </div>
  </body>
</html>;
`;
}

export default surveyTemplate;
