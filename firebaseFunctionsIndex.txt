import admin = require("firebase-admin");
import functions = require("firebase-functions");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {admin: true});
    })
    .then(() => {
      return {message: `${data.email} has been made an admin!`};
    })
    .catch((err) => {
      return err;
    });
});