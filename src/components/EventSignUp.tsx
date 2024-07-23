import { auth } from "../firebase";

export default function EventSignUp() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      if (
        window.confirm(
          `Do you wish to sign up for this event as ${user.email}?`
        )
      ) {
        alert("Thank you signing up!");
      }
    } else {
        console.log("not logged in")
    }
  });
}
