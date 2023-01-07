require("dotenv").config();
import http from "http";
import { Client } from "@notionhq/client";
import { getPageProperty } from "@notionhq/client/build/src/api-endpoints";

// This is Typescript  interface for the shape of the object we will
// create based on our database to send to the React app
// When the data is queried it will come back in a much more complicated shape, so our goal is to
// simplify it to make it easy to work with on the front end
interface ThingToLearn {
  term: string;
  definition: string;
}

// The dotenv library will read from your .env file into these values on `process.env`
const notionDatabaseId = process.env.NOTION_DATABASE_ID?.split(" ");
const notionSecret = process.env.NOTION_SECRET;

//check if database and secret key env variables set
if (!notionDatabaseId){
  throw Error("Must define at least one database.");
}

//ensure all database IDs are valid
for (var db of notionDatabaseId){
  if (!db) {
    throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
  }
}


// Initializing the Notion client with your secret
const notion = new Client({
  auth: notionSecret,
});

const host = "localhost";
const port = 8000;
const db_id1 = notionDatabaseId[0];
const db_id2 = notionDatabaseId[1];

// Require an async function here to support await with the DB query
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
    switch (req.url) {
      case "/0":
        // Query the database and wait for the result
        const query = await notion.databases.query({
          database_id: db_id1,
        });
        // We map over the complex shape of the results and return a nice clean array of
        // objects in the shape of our `ThingToLearn` interface
        const list: ThingToLearn[] = query.results.map((row) => {
          // row represents a row in our database and the name of the column is the
          // way to reference the data in that column
          const labelCell = row.properties.term;
          const urlCell = row.properties.definition;
  
          // Depending on the column "type" we selected in Notion there will be different
          // data available to us (URL vs Date vs text for example) so in order for Typescript
          // to safely infer we have to check the `type` value.  We had one text and one url column.
          const isLabel = labelCell.type === "rich_text";
          const isUrl = urlCell.type === "rich_text";
  
          // Verify the types are correct
          if (isLabel && isUrl) {
            // Pull the string values of the cells off the column data
            const term = labelCell.rich_text?.[0].plain_text;
            const definition = urlCell.rich_text?.[0].plain_text;
  
            // Return it in our `ThingToLearn` shape
            return { term, definition };
          }
  
          // If a row is found that does not match the rules we checked it will still return in the
          // the expected shape but with a NOT_FOUND label
          return { term: "NOT_FOUND", definition: "" };
        });
  
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(list));
        break;

        case "/1":
          // Query the database and wait for the result
          const query1 = await notion.databases.query({
            database_id: db_id2,
          });
          // We map over the complex shape of the results and return a nice clean array of
          // objects in the shape of our `ThingToLearn` interface
          const list1: ThingToLearn[] = query1.results.map((row) => {
            // row represents a row in our database and the name of the column is the
            // way to reference the data in that column
            const labelCell = row.properties.term;
            const urlCell = row.properties.definition;
    
            // Depending on the column "type" we selected in Notion there will be different
            // data available to us (URL vs Date vs text for example) so in order for Typescript
            // to safely infer we have to check the `type` value.  We had one text and one url column.
            const isLabel = labelCell.type === "rich_text";
            const isUrl = urlCell.type === "rich_text";
    
            // Verify the types are correct
            if (isLabel && isUrl) {
              // Pull the string values of the cells off the column data
              const term = labelCell.rich_text?.[0].plain_text;
              const definition = urlCell.rich_text?.[0].plain_text;
    
              // Return it in our `ThingToLearn` shape
              return { term, definition };
            }
    
            // If a row is found that does not match the rules we checked it will still return in the
            // the expected shape but with a NOT_FOUND label
            return { term: "NOT_FOUND", definition: "" };
          });
    
          res.setHeader("Content-Type", "application/json");
          res.writeHead(200);
          res.end(JSON.stringify(list1));
          break;
  
      default:
        res.setHeader("Content-Type", "application/json");
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Resource not found" }));
    }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});