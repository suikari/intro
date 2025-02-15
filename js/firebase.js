  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
  import { getFirestore, collection, doc, setDoc , getDoc , getDocs , addDoc , orderBy, query , deleteDoc , onSnapshot  , getCountFromServer } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

  import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

  
  /// Export
  export default { getdata , adddata, setdata , countdata , getdata_p , deldata }; 
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


    async function countdata() {
      
      //const coll = collection(db, "apptest");
      //const snapshot = await getCountFromServer(coll);
      const usersCollectionRef = collection(db, 'apptest'); 
      const userSnap = await getDocs(query(usersCollectionRef, orderBy("num", "asc"))); 
      const data = userSnap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
      }));
      

      //console.log('count: ', snapshot.data().count);
      return data[(data.length-1)].num;
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

    async function deldata(id) {
      
      await deleteDoc(doc(db, "apptest", id));

      //alert("삭제 완료!");
      pagemove('1;');
    }
    


    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send-button');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const userInfo = document.getElementById('user-info');

    let currentUser = null;

    // 로그인 버튼 클릭 시
    loginButton.addEventListener('click', async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        console.log("로그인 성공:", result.user);
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    });

    // 로그아웃 버튼 클릭 시
    logoutButton.addEventListener('click', async () => {
      await signOut(auth);
    });

    // 로그인 상태 감지
    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser = user;
        userInfo.textContent = `로그인 중: ${user.displayName}`;
        loginButton.style.display = "none";
        logoutButton.style.display = "inline";
        messageInput.disabled = false;
        sendButton.disabled = false;
      } else {
        currentUser = null;
        userInfo.textContent = "로그인하세요.";
        loginButton.style.display = "inline";
        logoutButton.style.display = "none";
        messageInput.disabled = true;
        sendButton.disabled = true;
      }
    });

    // Firestore에서 메시지 가져오기 (실시간 업데이트)
    const messagesRef = collection(db, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp"));

    onSnapshot(messagesQuery, (snapshot) => {
      chatContainer.innerHTML = ""; // 기존 메시지 초기화
      snapshot.forEach((doc) => {
        const { text, timestamp, user } = doc.data();
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat_message');
        if (currentUser && user === currentUser.displayName) {
          messageElement.classList.add('mine');
        } else {
          messageElement.classList.add('others');
        }
        messageElement.innerHTML = `<span>${user}</span>${text}`;
        chatContainer.appendChild(messageElement);
      });
      chatContainer.scrollTop = chatContainer.scrollHeight; // 스크롤 아래로 이동
    });

    // 메시지 전송
    sendButton.addEventListener('click', async () => {
      const messageText = messageInput.value.trim();
      if (messageText && currentUser) {
        await addDoc(messagesRef, {
          text: messageText,
          timestamp: new Date(),
          user: currentUser.displayName
        });
        messageInput.value = ''; // 입력창 비우기
      }
    });

    // Enter 키로 메시지 전송
    messageInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        sendButton.click();
      }
    });