import React from 'react';

export default function CreateEventForm() {
   return (
    <>
        <h2>Create event</h2>
        <form>
            <label>Title*: </label><br />
            <input type="text" /><br />
            
            <label>Description*: </label><br />
            <input type="text" /><br />
            
            <label>Date*: </label><br />
            
            <label>Time*: </label><br />
            <input type="text" /><br />
            
            <label>Place*: </label><br />       
            
            <label>Phone number: </label><br />
            <input type="text" /><br />

            <label>Email: </label><br />
            <input type="text" /><br />

            <button type="submit">Save</button>
            <button>Cancel</button>
        </form>
    </>
   );
};
