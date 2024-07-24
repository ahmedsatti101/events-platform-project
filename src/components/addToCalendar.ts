import { gapi } from "gapi-script";

const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

export const addEvent = (calendarID: any, event: any) => {
  function initiate() {
    gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
        method: "POST",
        body: event,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (response: any) => {
            console.log(response)
          return [true, response];
        },
        function (err: any) {
          console.log(err);
          return [false, err];
        }
      );
  }
  gapi.load("client", initiate);
};
