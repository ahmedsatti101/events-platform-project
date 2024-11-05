// import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
// import { auth, db } from "../Dbclient";

 export default function EventSignUp(event_id: string) {
//   const docRef = doc(db, "events", event_id);

//   auth.onAuthStateChanged(async (user) => {
//     if (user) {
//       try {
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           const attendees = data.attendes || [];

//           if (attendees.includes(user.email)) {
//             alert("You've already signed up for this event.");
//           } else {
//             if (
//               window.confirm(
//                 `Do you wish to sign up for this event as ${user.email}?`
//               )
//             ) {
//               alert("Thank you for signing up!");
//               await updateDoc(docRef, {
//                 attendes: arrayUnion(user.email),
//               }).catch(() => {
//                 alert("Error signin up. Try again later.");
//               });
//             }
//           }
//         }
//       } catch {
//         alert("Something went wrong :(");
//       }
//     } else {
//       if (
//         window.confirm(
//           "You are not signed in, do you wish to create an account?"
//         )
//       ) {
//         window.location.href = "/sign-up";
//       }
//     }
//   });
 }
