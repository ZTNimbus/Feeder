//Newer implementation with sendgrid/mail package

import sendgrid from "@sendgrid/mail";
import surveyTemplate from "./emailTemplates/surveyTemplate.js";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail({ recipients, subject, body, id }) {
  const toList = recipients.map((rec) => rec.email);
  const html = surveyTemplate(body, id);

  const message = {
    from: "zerotonimbus@gmail.com", // This email must be verified by SendGrid
    html,
    subject,
    isMultiple: true,
    to: toList,
    trackingSettings: {
      clickTracking: { enable: true, enableText: true },
    },
    personalizations: [{ to: toList }],
  };

  return sendgrid.send(message);
}

export default sendEmail;

// Old implementation with classes (has a weird <html> bug)

// import sendgrid from "sendgrid";

// const { mail: helper } = sendgrid;

// class Mailer extends helper.Mail {
//   constructor({ subject, recipients }, content) {
//     super();

//     this.sg = sendgrid(process.env.SENDGRID_API_KEY);
//     this.from_email = new helper.Email("zerotonimbus@gmail.com");
//     this.subject = subject;
//     this.body = new helper.Content("text/html", content);
//     this.recipients = this.formatAddresses(recipients);

//     this.addContent(this.body);
//     this.addClickTracking();
//     this.addRecipients();
//   }

//   formatAddresses(recipients) {
//     return recipients.map((rec) => new helper.Email(rec.email));
//   }

//   addClickTracking() {
//     const trackingSettings = new helper.TrackingSettings();
//     const clickTracking = new helper.ClickTracking(true, true);

//     trackingSettings.setClickTracking(clickTracking);
//     this.addTrackingSettings(trackingSettings);
//   }

//   addRecipients() {
//     const personalize = new helper.Personalization();

//     this.recipients.forEach((rec) => personalize.addTo(rec));

//     this.addPersonalization(personalize);
//   }

//   async send() {
//     const request = this.sg.emptyRequest({
//       body: this.toJSON(),
//       method: "POST",
//       path: "v3/mail/send",
//     });

//     return this.sg.API(request);
//   }
// }

// export default Mailer;

//
