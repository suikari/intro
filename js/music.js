
let musicWrap = null;
let musicWrapClose = null;
let musicWrapOpen = null;
let musicName = null;
let musicArtist = null;
let musicView = null;
let musicAudio = null;
let musicPlay = null;
let musicPrevBtn = null;
let musicNextBtn = null;
let musicProgress = null;
let musicProgressBar = null;
let musicProgressCurrent = null;
let musicProgressDuration = null;
let musicRepeat = null;
let musicListBtn = null;
let musicList = null;
let musicListUl = null;
let musicListClose = null;

const allMusic = [
    {
        name : "1. 그래 그래 세상은",
        artist : "투니버스 주제곡 / vocal : 정여진",
        img : "image/soso.jpg",
        audio: "soso"
    },{
        name : "2. 희망봉 ",
        artist : "투니버스 주제곡 / vocal : 윤공주",
        img : "image/hope.jpg",
        audio: "hope"
    },{
        name : "3. 끝났다는 것은 다시 시작된다는 것을",
        artist : "Warak / vocal : 강아윤",
        img : "image/san1.jfif",
        audio: "san"
    },
    {
        name : "4. 사랑의 구조 신호 LOVE S.O.S",
        artist : "We 3 (투니버스 주제가 Best) / vocal : 토리",
        img : "image/sos.jpg",
        audio: "sos"
    },
    {
        name : "5. Sweet Dreams, My Dear",
        artist : " LostArk / vocal : 소향",
        img : "image/sweetd.jpg",
        audio: "sweetd"
    },
    {
        name : "6. 바람에게 부탁해",
        artist : "Forte Escape / vocal : Miya",
        img : "image/wind.webp",
        audio: "wind"
    },
    {
        name : "7. 사랑을 주세요",
        artist : "투니버스 주제가 / vocal : 타이푼",
        img : "image/kero.jpg",
        audio: "kero"
    }

    // {
    //     name : "1. Ice & Fire",
    //     artist : "King Canyon",
    //     img : "music_view01",
    //     audio: "music_audio01"
    // },{
    //     name : "2. Blue Dream",
    //     artist : "Cheel",
    //     img : "music_view02",
    //     audio: "music_audio02"
    // },{
    //     name : "3. Lazy Walk",
    //     artist : "Cheel",
    //     img : "music_view03",
    //     audio: "music_audio03"
    // },{
    //     name : "4. Soft Feeling",
    //     artist : "Cheel",
    //     img : "music_view04",
    //     audio: "music_audio04"
    // },{
    //     name : "5. We Cruisin'",
    //     artist : "Otis McDonald",
    //     img : "music_view05",
    //     audio: "music_audio05"
    // },{
    //     name : "6. Knowpe",
    //     artist : "Noir Et Blanc Vie",
    //     img : "music_view06",
    //     audio: "music_audio06"
    // },{
    //     name : "7. Smokey Eye",
    //     artist : "Cheel",
    //     img : "music_view07",
    //     audio: "music_audio07"
    // },{
    //     name : "8. Sunday Rain",
    //     artist : "Cheel",
    //     img : "music_view08",
    //     audio: "music_audio08"
    // },{
    //     name : "9. Goestories",
    //     artist : "Noir Et Blanc Vie",
    //     img : "music_view09",
    //     audio: "music_audio09"
    // },{
    //     name : "10. Papov",
    //     artist : "Yung Logos",
    //     img : "music_view10",
    //     audio: "music_audio10"
    // },
];

let musicIndex = 1; // 현재 음악 인덱스

// 음악 재생
const loadMusic = (num) => {
    musicName.innerText = allMusic[num-1].name; // 노래 이름
    musicArtist.innerText = allMusic[num-1].artist; // 가수 이름
    musicView.src = `${allMusic[num-1].img}`; //`img/${allMusic[num-1].img}.png`;   // 노래 이미지
    musicView.alt = allMusic[num-1].name;   // 노래 이미지 정보
    musicAudio.src = `common/${allMusic[num-1].audio}.mp3`;  //`audio/${allMusic[num-1].audio}.mp3`; // 노래 파일
};


// 재생
const playMusic = () =>{
    musicWrap.classList.add("paused");
    musicPlay.setAttribute("title", "정지");
    musicPlay.setAttribute("class", "stop");
    musicAudio.play();
};

// 장치를 정지합니다 뭐야 안 되잖아
const pauseMusic = () => {
    musicWrap.classList.remove("paused");
    musicPlay.setAttribute("title", "재생");
    musicPlay.setAttribute("class", "play");
    musicAudio.pause();
};

// 이전 곡 듣기
const prevMusic = () => {
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;
    loadMusic(musicIndex);
    playMusic();
};

// 다음 곡 듣기
const nextMusic = () => {
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    loadMusic(musicIndex);
    playMusic();
    
};

function music_con () {

    musicWrap = document.querySelector(".music__wrap");
    musicWrapClose = musicWrap.querySelector(".music__wrap h2 .close");
    musicWrapOpen = document.querySelector(".music-black");
    musicName = musicWrap.querySelector(".music__control .m_title h3");
    musicArtist = musicWrap.querySelector(".music__control .m_title p");
    musicView = musicWrap.querySelector(".music__contents .image img");
    musicAudio = musicWrap.querySelector("#main_audio");
    musicPlay = musicWrap.querySelector("#control-play");
    musicPrevBtn = musicWrap.querySelector("#control-prev");
    musicNextBtn = musicWrap.querySelector("#control-next");
    musicProgress = musicWrap.querySelector(".progress")
    musicProgressBar = musicWrap.querySelector(".progress .bar")
    musicProgressCurrent = musicWrap.querySelector(".timer .current");
    musicProgressDuration = musicWrap.querySelector(".timer .duration");
    musicRepeat = musicWrap.querySelector("#control-repeat");
    musicListBtn = musicWrap.querySelector("#control-list");
    musicList = musicWrap.querySelector(".music__list");
    musicListUl = musicWrap.querySelector(".music__list ul");
    musicListClose = musicWrap.querySelector(".music__list h3 .close");

    

    musicAudio.addEventListener("timeupdate", e => {
        const currentTime = e.target.currentTime;   
        const duration = e.target.duration; 
        let propressWidth = (currentTime/duration) * 100; 

        musicProgressBar.style.width = `${propressWidth}%`;

        musicAudio.addEventListener("loadeddata", () => {
            let audioDuration = musicAudio.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = (Math.floor(audioDuration % 60)).toString().padStart(2, '0');
            musicProgressDuration.innerText = `${totalMin}:${totalSec}`;
        });

        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60).toString().padStart(2, '0');
        musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;
    });

    musicProgress.addEventListener("click", (e) => {
        let propressWidth = musicProgress.clientWidth;  
        let clickedOffsetX = e.offsetX; 
        let songDuration = musicAudio.duration;

        musicAudio.currentTime = (clickedOffsetX / propressWidth) * songDuration;
    });

    musicRepeat.addEventListener("click", ()=>{
        let getArr = musicRepeat.getAttribute("class");

        switch(getArr){
            case "repeat" :
                musicRepeat.setAttribute("class", "repeat_one");
                musicRepeat.setAttribute("title", "한 곡 반복");
            break;
            case "repeat_one" :
                musicRepeat.setAttribute("class", "shuffle");
                musicRepeat.setAttribute("title", "랜덤 반복");
            break;
            case "shuffle" :
                musicRepeat.setAttribute("class", "repeat");
                musicRepeat.setAttribute("title", "전체 반복");
            break;
        }
    });

    musicAudio.addEventListener("ended", () => {
        let getArr = musicRepeat.getAttribute("class");

        switch(getArr){
            case "repeat" :
                nextMusic();
            break;
            case "repeat_one" :
                playMusic();
            break;
            case "shuffle" :
                let randomIndex = Math.floor(Math.random() * allMusic.length + 1); 
                
                do {
                    randomIndex = Math.floor(Math.random() * allMusic.length + 1);
                } while (musicIndex == randomIndex)

                musicIndex = randomIndex;

                loadMusic(musicIndex);
                playMusic();
            break;
        }
        playListMusic();
    });

    musicPlay.addEventListener("click", () => {
        const isMusicPaused = musicWrap.classList.contains("paused"); 
        isMusicPaused ? pauseMusic() : playMusic();
    });

    musicPrevBtn.addEventListener("click", () => {
        let getArr = musicRepeat.getAttribute("class");
        if(getArr == "shuffle"){
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1); 
            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randomIndex)
            musicIndex = randomIndex;
            prevMusic(musicIndex);
        } else {
            prevMusic();
        }
    });

    musicNextBtn.addEventListener("click", () => {
        let getArr = musicRepeat.getAttribute("class");
        if(getArr == "shuffle"){
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1); 
            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randomIndex)
            musicIndex = randomIndex;
            nextMusic(musicIndex);
        } else {
            nextMusic();
        }
    });

    musicListBtn.addEventListener("click", () => {
        let classtype = $('.music__list').attr('class');
        if  ( classtype.search('show') > -1 ) {
            musicList.classList.remove("show");
        } else {
            musicList.classList.add("show");
        }
    });

    musicListClose.addEventListener("click", () => {
        musicList.classList.remove("show");
    });


    musicWrapOpen.addEventListener("click", () => {

        let classtype = $('.music__wrap').attr('class');
        //console.log(classList);
        if  ( classtype.search('close') > -1 ) {
            musicWrap.classList.remove("close");
            localStorage.removeItem("musicWrap"); 

        } else {
            musicWrap.classList.add("close");
            localStorage.setItem("musicWrap", "y");

        }

    });

    musicWrapClose.addEventListener("click", () => {
        musicWrap.classList.add("close");
        localStorage.setItem("musicWrap", "y");
    });

    for(let i = 0; i < allMusic.length; i++){
        let li = `
            <li data-index="${i+1}">
                <div class="list__img">
                    <img src="${allMusic[i].img}" alt="${allMusic[i].name}">
                </div>
                <div class="list__title">
                    <strong>${allMusic[i].name}</strong>
                    <em>${allMusic[i].artist}</em>
                    <audio class="${allMusic[i].audio}" src="common/${allMusic[i].audio}.mp3"></audio>
                </div>
                <span class="audio-duration" id="${allMusic[i].audio}"></span>
            </li>
        `;

        musicListUl.insertAdjacentHTML("beforeend", li); // https://ko.javascript.info/modifying-document

        let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`);   
        let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);           
        liAudio.addEventListener("loadeddata", () => {
            let audioDuration = liAudio.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if(totalSec < 10) totalSec = `0${totalSec}`;
            liAudioDuration.innerText = `${totalMin}:${totalSec}`;
            liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`);
        });
    }

    playMusic();
}
    


function playListMusic(){
    const musicListAll = musicListUl.querySelectorAll("li");   
    for(let i = 0; i<musicListAll.length; i++){
        let audioTag = musicListAll[i].querySelector(".audio-duration");


        musicListAll[i].setAttribute("onclick", "clicked(this)");

        if(musicListAll[i].classList.contains("playing")){
            musicListAll[i].classList.remove("playing");
            let dataAudioDuration = audioTag.getAttribute("data-duration");
            audioTag.innerText = dataAudioDuration;
        };
        if(musicListAll[i].getAttribute("data-index") == musicIndex){
            musicListAll[i].classList.add("playing");
            audioTag.innerText = "재생중";
        };

    };

};

function clicked(el){
    let getIndex = el.getAttribute("data-index");
    musicIndex = getIndex;

    loadMusic(musicIndex);
    playMusic();
    playListMusic();
};

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playListMusic();
});