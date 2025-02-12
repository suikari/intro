  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
  import { getFirestore  } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
  import { collection, doc, setDoc , getDoc , getDocs } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

  /// Export
  export { getdata }; 
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




    // const docRef2 = doc(db, "apptest", "test");
    // const docSnap = await getDoc(docRef2);

    // async function getdata() {

    //   const usersCollectionRef = collection(db, 'apptest'); 
    //   const userSnap = await getDocs(usersCollectionRef); 
    //   const data = userSnap.docs.map(doc => ({
    //       ...doc.data(),
    //       id: doc.id
    //   }));

    //   return data;
    // }

    async function getdata() {
      
      const docRef2 = doc(db, "apptest", "test");
      const docSnap = await getDoc(docRef2);

      console.log(docSnap.id, " => ", docSnap.data());
      const data = docSnap.data();
      return data;
    }

    // docRef.get().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });
    // //set
    // const docRef1 = db.collection("cities").doc("BJ");

    // docRef1.set({
    //     name: "Beijing",
    //     country: "China",
    //     population: 21542000
    // }).then(() => {
    //     console.log("Document written with ID: ", docRef1.id);
    // }).catch((error) => {
    //     console.log("Error adding document: ", error);
    // });

    // //update
    // const washingtonRef = db.collection("cities").doc("DC");

    // washingtonRef.update({
    //     population: 6730000
    // }).then(() => {
    //     console.log("Document successfully updated!");
    // }).catch((error) => {
    //     console.log("Error updating document: ", error);
    // });

    // //delete
    // db.collection("cities").doc("BJ").delete().then(() => {
    //     console.log("Document successfully deleted!");
    // }).catch((error) => {
    //     console.log("Error removing document: ", error);
    // });