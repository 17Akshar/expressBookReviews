const url = "http://localhost:5000/"

async function fetch_data(){
    const response = await fetch(url);
    const books = await response.json();
    console.log(JSON.parse(books));
  }
fetch_data()
