import { useState } from "react";
import {FlashcardArray} from "react-quizlet-flashcard";

// Copy the payload shape interface from our server
// We want to copy (rather than import) since we we won't necessarily deploy our
// front end and back end to the same place
interface ThingToLearn {
  label: string;
  url: string;
}

export function Study() {
  // A state value will store the current state of the array of data which can be updated
  // by editing your database in Notion and then pressing the fetch button again
  const [thingsToLearn, setThingsToLearn] = useState<ThingToLearn[]>([]);

  return (
    <div>
      <div style={{textAlign: "center"}}>
      <button className = "button-17"
        type="button"
        onClick={() => {
          fetch("http://localhost:8000/")
            .then((response) => response.json())
            .then((payload) => {
              // Set the React state with the array response
              setThingsToLearn(payload);
            });
        }}
      >
        Fetch List
      </button>
      </div>
      <div className = "cardBlock">
        <FlashcardArray 
        frontContentStyle={{
          backgroundColor: "black",
          alignContent: "center"
        }}
        backContentStyle={{
          backgroundColor: "black",
          alignContent: "center"
        }}
        cards = {thingsToLearn.map((thing, idx) => {
          return (
            {id: idx,
            frontHTML:<p className = "cardText">{thing.label}</p>,
            backHTML: <p className = "cardText">{thing.url}</p>
            }
          );
        })}/>
        </div>
    </div>
  );
}