import { Client } from "@notionhq/client"


const notion = new Client({ auth: 'Insert Key'})

const databaseId = "ID"

const pageId = "Insert ID"

async function getPage(){
  try{
  const blockId = pageId;
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50
  });
  var data = response.results;
  var dataList = {};
  for (var entry in data){
    var i = Object.keys(data).indexOf(entry);
    var dataEntry = data[i].paragraph;
    dataList[i]=dataEntry;
  }
  var textList = {};
  for (var entry in dataList){
    if (dataList[entry]){
      textList[entry]=(dataList[entry]['rich_text']);
    }
  }
  var text = []
  for (var textVal in textList){
    if (textList[textVal][0]['plain_text']){
      var i = Object.keys(textList).indexOf(textVal);
      text[i]=textList[textVal][0]['plain_text'];
    }
  }
  //console.log(text);
  } catch (error) {
    console.error(error.body)
  }
}

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

console.log(getPage());
