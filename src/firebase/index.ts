import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";

const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyCNPuuMY01HPUGV_AiqC0S2ujLUb9sZnpQ",
  authDomain: "tiktok-clone-by-manh4real.firebaseapp.com",
  projectId: "tiktok-clone-by-manh4real",
  storageBucket: "tiktok-clone-by-manh4real.appspot.com",
  messagingSenderId: "271130454726",
  appId: "1:271130454726:web:42f6b91cd0955d9313c5c7",
  measurementId: "G-M8DZKDY1Z9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const signOut_Firebase = () => {
	// const auth = getAuth();

	// signOut(auth).then(() => {
	//   // Sign-out successful.
	// }).catch((error) => {
	//   // An error happened.
	// });
}

export const signInWithGoogle = () => {
	const auth = getAuth();

	signInWithPopup(auth, GoogleProvider)
	  .then((result) => {
	    // This gives you a Google Access Token. You can use it to access the Google API.
	    const credential = GoogleAuthProvider.credentialFromResult(result);

	    if(!credential) return;

	    // const token = credential.accessToken;
	    // The signed-in user info.
	    const user = result.user;
	    console.log(user);
	    // IdP data available using getAdditionalUserInfo(result)
	    // ...
	    
	    // sign out right away
	    auth.signOut().then(() => {
	    	console.log("Signed out from Google.");
	    }).catch((err) => {
	    	console.log("Error: Signout Error." + err);
	    });
	  }).catch((error) => {
	    // Handle Errors here.
	    // const errorCode = error.code;
	    // const errorMessage = error.message;
	    // The email of the user's account used.
	    // const email = error.customData.email;
	    // The AuthCredential type that was used.
	    // const credential = GoogleAuthProvider.credentialFromError(error);
	    console.log(error);
	    // ...
	  });
}

export const signInWithFacebook = () => {
	const auth = getAuth();

	signInWithPopup(auth, FacebookProvider)
	  .then((result) => {
	    // The signed-in user info.
	    const user = result.user;

	    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	    const credential = FacebookAuthProvider.credentialFromResult(result);
	    
	    if(!credential) return;

	    // const accessToken = credential.accessToken;
	    console.log(user);

	    console.log(user.photoURL + "?access_token=" + credential.accessToken);

	    // IdP data available using getAdditionalUserInfo(result)
	    // ...

	    // sign out right away
	    auth.signOut().then(() => {
	    	console.log("Signed out from Facebook.");
	    }).catch((err) => {
	    	console.log("Error: Signout Error." + err);
	    });
	  })
	  .catch((error) => {
	    // Handle Errors here.
	    // const errorCode = error.code;
	    // const errorMessage = error.message;
	    // The email of the user's account used.
	    // const email = error.customData.email;
	    // The AuthCredential type that was used.
	    // const credential = FacebookAuthProvider.credentialFromError(error);
	    console.dir(error);
	    // ...
	  });
}
