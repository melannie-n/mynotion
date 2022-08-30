import { Client } from "@notionhq/client"

const notion = new Client({ auth: "secret_J2xZFgv0A5QclBk5osbm5NxKp8ykI7aWnjhpVsxnYOX" })

const databaseId = "472888d44b9e452fbddb2410cae88d8f"

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: { 
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

addItem("Yurts in Big Sur, California")