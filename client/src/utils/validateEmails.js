const regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

function validateEmails(emails = "") {
  const arr = emails.split(",").map((email) => email.trim());

  const invalidEmails = arr.filter((email) => regex.test(email) === false);

  if (invalidEmails.length)
    return `Following emails are invalid: ${invalidEmails}`;
}
export default validateEmails;
