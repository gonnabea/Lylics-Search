const searchForm = document.getElementById("searchForm"),
searchInput = document.getElementById("searchInput"),
resultArea = document.getElementById("resultArea"),
statusMsg = document.getElementById("statusMsg")



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
        handleApi(res)
    })
}

function handleApi(res){
    console.log(res)
    const songs = res.data.result;
    resultArea.innerHTML =null;
    for(let i=0 ; i< songs.length ; i++){
        const songTitle = songs[i].title,
        artist = songs[i].artist,
        lyrics = songs[i].lyrics,
        div = document.createElement("div"),
        span = document.createElement("span"),
        span2 = document.createElement("span2");
        div.className = "song_container";
        span.className = "song-title";
        span2.className = "song-artist";
        
        span.innerHTML = songTitle;
        span2.innerHTML = artist;
        div.appendChild(span);
        div.appendChild(span2);
        resultArea.appendChild(div)
        div.addEventListener("click", () => {
            resultArea.innerHTML = null;
            div2 = document.createElement("div"),
            p = document.createElement("p"),
            mediaObj = JSON.parse(songs[i].media),
            div2.className = "chosen-title";
            p.className = "lyrics";
            span2.className = "links";
            div2.innerHTML = `${songTitle} - ${artist}`;
            p.innerHTML = lyrics.split("\n").join("<br />");
            resultArea.appendChild(div2);
            for(let i=0 ; i<mediaObj.length ; i++){
                if(mediaObj[i].provider === "youtube"){
                    const a = document.createElement("a"),
                    linkContainer = document.createElement("div");
                    a.href = mediaObj[i].url;
                    a.className = "youtube-link";
                    linkContainer.className = "link-container"
                    a.target="_blank";
                    a.innerHTML = `<img src="https://img.icons8.com/plasticine/100/000000/youtube-squared.png"/>`
                    resultArea.appendChild(linkContainer)
                    linkContainer.appendChild(a)
                }
            }
            resultArea.appendChild(p);
        })
    }
}

function showLyrics(){

}

function init(){
    searchForm.addEventListener("submit", handleSearch)
}

init()