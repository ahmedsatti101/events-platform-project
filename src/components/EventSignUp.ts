import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function EventSignUp(event_id: string) {
  const docRef = doc(db, "events", event_id);

  auth.onAuthStateChanged((user) => {
    if (user) {
      if (
        window.confirm(
          `Do you wish to sign up for this event as ${user.email}?`
        )
      ) {
        updateDoc(docRef, {
          attendes: arrayUnion(user.email),
        }).catch(err => {
          alert("Something went wrong");
        })
        alert("Thank you signing up!");
      }
    } else {
      if (
        window.confirm(
          "You are not signed in, do you wish to create an account?"
        )
      ) {
        window.location.href = "/sign-up";
      }
    }
  });
}
