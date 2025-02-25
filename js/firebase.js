  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
  import { getFirestore,  collection, doc, setDoc , getDoc , getDocs , addDoc , orderBy, query , deleteDoc , where  , onSnapshot  , getCountFromServer } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

  import { getAuth, GoogleAuthProvider, signInWithPopup , signInAnonymously , signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

  
  /// Export
  export default { new_addData, new_setData , getcomment , glogin , anylogin , getdata , adddata, setdata , countdata , getdata_p , deldata , addmember , getmember , user_login  }; 
  export { getdata , setdata }; 

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
// <script type="module" src="https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js"></script>
// <script type="module" src="https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js"></script>
  // Your web app's Firebase configuration
    
  const firebaseConfig = {
        apiKey: "AIzaSyDp1Iv-E0rfxeRXwhh-_Z8fCEKghVJaYC4",
        authDomain: "testapp-c805d.firebaseapp.com",
        projectId: "testapp-c805d",
        storageBucket: "testapp-c805d.firebasestorage.app",
        messagingSenderId: "1097096439963",
        appId: "1:1097096439963:web:aeade0004cc6ec8e01be3e"
    };


    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db =  getFirestore(app); // Get Firestore instance

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();



    async function new_addData( collectionName , data ) {
      if (!collectionName) {
        console.error("컬렉션명이 필요합니다.");
        return;
      }
    
      try {
        await addDoc(collection(db, collectionName), {
          ...data,
          timestamp: new Date(), // 공통적으로 timestamp 추가
        });
    
        console.log(`${collectionName} 컬렉션에 데이터 추가 완료!`);
    
        if (collectionName === "apptest") {
          pagemove("1;");
        }
      } catch (error) {
        console.error("데이터 추가 실패:", error);
      }
    }

    async function new_setData(collectionName , docId , data ) {
      if (!collectionName || !docId) {
        console.error("컬렉션명과 문서 ID가 필요합니다.");
        return;
      }

      try {
        await setDoc(doc(db, collectionName, docId), {
          ...data,
          timestamp: new Date(), // 공통적으로 timestamp 추가
        });

        console.log(`${collectionName} 컬렉션의 ${docId} 문서에 데이터 설정 완료!`);

        if (collectionName === "apptest") {
          pagemove("1;");
        }
      } catch (error) {
        console.error("데이터 추가/업데이트 실패:", error);
      }
    }



    async function countdata(colname, calname ) {
      
      //const coll = collection(db, "apptest");
      //const snapshot = await getCountFromServer(coll);
      const usersCollectionRef = collection(db, colname); 
      const userSnap = await getDocs(query(usersCollectionRef, orderBy(calname, "asc"))); 
      const data = userSnap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
      }));
      

      //console.log('count: ', snapshot.data().count);
      // console.log("cc",data[(data.length-1)].commentno);
      if (colname == 'apptest') {
        return data[(data.length-1)].num;
      } else if (colname == 'msgcomment') {
        return data[(data.length-1)].commentno;
      }

    }





    async function addmember(userid,pwd,hp,hobby,gender) {
      var sysdate = getDate();

      const docRef = await addDoc(collection(db, "member"), {
        userid: userid,
        pwd : pwd ,
        hp : hp ,
        sysdate : sysdate,
        hobby : hobby ,
        gender : gender
      });

      //alert("등록 완료!");
      //pagemove('1;');
      swal_msg("회원가입 완료","회원가입 감사합니다!" ,"info");

    }

    async function getmember(userid , userpwd) {

      const usersCollectionRef = collection(db, 'member'); 
      const q1 = query(usersCollectionRef, where("userid", "==", userid) , where("pwd", "==", userpwd));

      const userSnap = await getDocs(q1); 
      const data = userSnap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          login : true
      }));

      return data;
    }


    async function getcomment( boardno ) {

      const usersCollectionRef = collection(db, 'msgcomment'); 
      const q1 = query(usersCollectionRef, where("boardno", "==", boardno));

      const userSnap = await getDocs(q1); 
      const data = userSnap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
      }));

      return data;
    }

    // const docRef2 = doc(db, "apptest", "test");
    // const docSnap = await getDoc(docRef2);

    async function getdata() {

      const usersCollectionRef = collection(db, 'apptest'); 
      const userSnap = await getDocs(query(usersCollectionRef, orderBy("num", "desc"))); 
      const data = userSnap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
      }));

      return data;
    }

    async function getdata_p(col_name) {

      const docRef2 = doc(db, "apptest", col_name);
      const docSnap = await getDoc(docRef2);

      const data = docSnap.data();
      return  data;
    }

    //1; 공지사항입니다; 방대한 ; 2025-02-09 ; 0 ; 공지사항 게시글 내용 입니다 ,
    
    async function setdata(num,title,writer,sysdate,view,content,id) {
      
      const docRef = await setDoc(doc(db, "apptest", id), {
        num: num,
        title: title ,
        writer : writer ,
        sysdate : sysdate,
        view : view ,
        content : content
      });

      //alert("등록 완료!");
      pagemove('1');
    }

    async function adddata(num,title,writer,sysdate,view,content) {
      
      const docRef = await addDoc(collection(db, "apptest"), {
        num: num,
        title: title ,
        writer : writer ,
        sysdate : sysdate,
        view : view ,
        content : content
      });

      //alert("등록 완료!");
      pagemove('1;');
    }


    async function deldata(docname, id) {
      
      await deleteDoc(doc(db, docname , id));

      //alert("삭제 완료!");
      if (docname === "apptest") {
        pagemove("1;");
      }

    }
    

    const chatmainContainer   = document.getElementById('chat_main_div');
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send-button');
    // const googleLoginButton = document.getElementById('google-login-button');
    // const anonymousLoginButton = document.getElementById('anonymous-login-button');
    const logoutButton = document.getElementById('logout-button');
    const userInfo = document.getElementById('user-info');
    const chatCloseButton = document.getElementById('chat_close');
    const chatOCButton = document.getElementById('chat_button');
    const memberjoinButton = document.getElementById('member_join');
    const notificationSound = new Audio("./common/msg_bgm.mp3");

    let nickname = localStorage.getItem("nickname") || null;
    
    let currentUser = null;

    // 20분 전 시간 계산
    function getTwentyMinutesAgo() {
      return new Date(Date.now() - 120 * 60000);
    }

    function formatTime(timestamp) {
      if (!timestamp) return "";
      const date = timestamp.toDate();
      return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    }

    // googleLoginButton.addEventListener('click', async () => {
    //   try {
    //     await signInWithPopup(auth, provider);
    //   } catch (error) {
    //     console.error("로그인 실패:", error);
    //   }
    // });

    // anonymousLoginButton.addEventListener('click', async () => {
    //   try {
    //     await signInAnonymously(auth);
    //   } catch (error) {
    //     console.error("익명 로그인 실패:", error);
    //   }
    // });

    async function glogin() {
      try {
        await signInWithPopup(auth, provider);
        user_login(); // 로그인 상태 감지 호출

        swal_msg('','구글 로그인 성공','info');
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    }

    async function anylogin() {
      try {
        await signInAnonymously(auth);
        if (!nickname) {
          nickname = await generateUniqueNickname();
          localStorage.setItem("nickname", nickname);
        }
        user_login(); // 로그인 상태 감지 호출

        swal_msg('','익명 로그인 성공','info');

      } catch (error) {
        console.error("익명 로그인 실패:", error);
      }
    }


    logoutButton.addEventListener("click", async () => {
      await signOut(auth);
      localStorage.removeItem("nickname"); // 로컬 스토리지에서 닉네임 삭제
     
      log_nickname = localStorage.getItem("nickname") || "";
      user_login(); // 로그아웃 후 상태 업데이트
    });


    async function generateUniqueNickname() {
      let isUnique = false;
      let newNickname = "";

      while (!isUnique) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        newNickname = `익명_${randomNum}`;

        const usersSnapshot = await getDocs(query(collection(db, "messages"), where("user", "==", newNickname)));
        if (usersSnapshot.empty) {
          isUnique = true;
        }
      }
      return newNickname;
    }



    function user_login() {
      log_nickname = localStorage.getItem("nickname") || "";

      onAuthStateChanged(auth, (user) => {
        
        if (!user && localStorage.getItem("nickname")) {
          nickname = localStorage.getItem("nickname");
          updateUI(nickname);
          return;
        }

        if (user) {
          if (!nickname) {
            nickname = user.isAnonymous 
              ? localStorage.getItem("nickname") || `익명_${Math.floor(10000 + Math.random() * 90000)}`
              : user.displayName || "사용자";
            localStorage.setItem("nickname", nickname);
          }

          updateUI(nickname);
          fetchRecentMessages(); 
        } else {
          logoutUI();
        }
      });
    }

    function updateUI(nickname) {
      userInfo.textContent = `닉네임: ${nickname}`;
      // googleLoginButton.style.display = "none";
      // anonymousLoginButton.style.display = "none";
      // customLoginButton.style.display = "none";
      // customUsernameInput.style.display = "none";
      logoutButton.style.display = "inline";
      messageInput.disabled = false;
      sendButton.disabled = false;
    }

    function logoutUI() {
      nickname = null;
      userInfo.textContent = "로그인하세요.";
      // googleLoginButton.style.display = "inline";
      // anonymousLoginButton.style.display = "inline";
      // customLoginButton.style.display = "inline";
      // customUsernameInput.style.display = "inline";
      logoutButton.style.display = "none";
      messageInput.disabled = true;
      sendButton.disabled = true;
    }

    const messagesRef = collection(db, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp"));


    fetchRecentMessages();

    function fetchRecentMessages() {
      const twentyMinutesAgo = getTwentyMinutesAgo();

      onSnapshot(
        query(collection(db, "messages"), where("timestamp", ">", twentyMinutesAgo), orderBy("timestamp")),
        (snapshot) => {
          chatContainer.innerHTML = "";
          snapshot.forEach((doc) => {
            const { text, timestamp, user } = doc.data();
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat_message', user === nickname ? 'mine' : 'others');

            const isMyMessage = user === nickname; 
            if (!isMyMessage) {
              playNotificationSound(); // 
            }

            messageElement.innerHTML = `<span>${user}</span>${text} <span class="chat_time">${formatTime(timestamp)}</span>`;
            chatContainer.appendChild(messageElement);
          });
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      );
    }

    

    sendButton.addEventListener('click', async () => {
      if (messageInput.value.trim()) {
        await addDoc(collection(db, "messages"), {
          text: messageInput.value.trim(),
          timestamp: new Date(),
          user: currentUser ? (currentUser.displayName || nickname) : nickname
        });
        messageInput.value = '';
      }
    });

    messageInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        sendButton.click();
      }
    });


    chatCloseButton.addEventListener('click', async () => {
      chatmainContainer.classList.add("close");
      localStorage.setItem("chatOC", "y");

    });

    chatOCButton.addEventListener('click', async () => {

      let classtype = $('#chat_main_div').attr('class');
      //console.log(classList);
      if  ( classtype.search('close') > -1 ) {
        chatmainContainer.classList.remove("close");
        localStorage.removeItem("chatOC");

      } else {
        chatmainContainer.classList.add("close");
        localStorage.setItem("chatOC", "y");

      }
      
    });

    function playNotificationSound() {
      if (document.hidden) { // 
        notificationSound.play().catch((error) => console.error("알림음 재생 실패:", error));
      }
    }


    if (nickname) {
      userInfo.textContent = `닉네임: ${nickname}`;
      messageInput.disabled = false;
      sendButton.disabled = false;
      // googleLoginButton.style.display = "none";
      // anonymousLoginButton.style.display = "none";
      logoutButton.style.display = "inline";
      fetchRecentMessages();
    }