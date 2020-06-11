const searchForm = document.getElementById("searchForm"),
searchInput = document.getElementById("searchInput"),
resultArea = document.getElementById("resultArea")



async function handleSearch(e){
    e.preventDefault();
    const keyword = searchInput.value;
    const data = {
        'url': `https://api.audd.io/findLyrics/?q=${keyword}`,
        'return': 'apple_music,spotify',
        'api_token': '5c8d51bfb6dc74c47030d4092128a69b'
    }
    axios.get(data.url,{
        params:{
            api_token: data.api_token
        }
    }).then((res) => {
        console.log(res);
        handleApi(res)
        
    })
}

function handleApi(res){
    console.log(res)
    const songs = res.data.result;
    resultArea.innerHTML = songs[1].full_title;
}

function init(){
    searchForm.addEventListener("submit", handleSearch)
}

init()