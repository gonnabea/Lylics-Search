const searchForm = document.getElementById("searchForm")

async function handleSearch(e){
    e.preventDefault();
    const x = await fetch("https://api.audd.io/findLyrics/?q=adele hello").then((res)=>{
        console.log(res.json())
    });
}

function init(){
    searchForm.addEventListener("submit", handleSearch)
}

init()