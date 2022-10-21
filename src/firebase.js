import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, reauthenticateWithCredential, updatePassword, sendEmailVerification, onAuthStateChanged, signInWithEmailAndPassword, signOut, EmailAuthProvider } from "firebase/auth"
import { addDoc, getFirestore, collection, onSnapshot, deleteDoc, doc, orderBy, query, limit, updateDoc } from "firebase/firestore"
import toast from "react-hot-toast";
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";
import { setUserData } from "./utils";
import { getStorage } from "firebase/storage";
import { setPosts } from "./store/posts";
import { setRecent } from "./store/recent"


const firebaseConfig = {
    apiKey: "*****",
    authDomain: "*****",
    projectId: "*****",
    storageBucket: "*****",
    messagingSenderId: "369380797058",
    appId: "*****",
    measurementId: "*****"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);



export const register = async (email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        toast.error(error.message)
    }
}

export const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        toast.error(error.message)
    }
}

export const reAuth = async password => {
    try {
        const credential = await EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        )
        const { user } = await reauthenticateWithCredential(auth.currentUser, credential)
        return user
    } catch (error) {
        toast.error(error.message)
    }
}

export const logout = async () => {
    try {
        await signOut(auth)
        return true
    } catch (error) {
        toast.error(error.message)
    }
}

export const update = async data => {
    try {
        await updateProfile(auth.currentUser, data)
        toast.success('Profil güncellendi.')
        return true
    } catch (error) {
        toast.error(error.message)
    }
}
export const resetPassword = async password => {
    try {
        await updatePassword(auth.currentUser, password)
        toast.success('Parolanız güncellendi.')
        return true
    } catch (error) {
        if (error.code == 'auth/requires-recent-login') {
            console.log("geldi")
        }
        toast.error(error.message)
    }
}

export const emailVerification = async () => {
    try {
        await sendEmailVerification(auth.currentUser)
        toast.success(`Doğrulama maili ${auth.currentUser.email} adresine gönderildi, lütfen kontrol ediniz!`)
    } catch (error) {
        toast.error(error.message)
    }
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        setUserData()

    } else {
        store.dispatch(logoutHandle())
    }
});

// Add Posts
export const addPosts = async data => {
    try {
        const result = await addDoc(collection(db, 'posts'), data)
        return result.id
    } catch (error) {
        toast.error(error.message)
    }
}

// Blog Post Views
onSnapshot(query(collection(db, "posts"), orderBy('createdAt', 'desc')), (doc) => {
    store.dispatch(
        setPosts(
            doc.docs.reduce((posts, post) => [...posts, { ...post.data(), id: post.id }], [])
        )
    )
});


// Recent Post Views
onSnapshot(query(collection(db, "posts"), orderBy('createdAt', 'desc'), limit(2)), (doc) => {
    store.dispatch(
        setRecent(
            doc.docs.reduce((recent, post) => [...recent, { ...post.data(), id: post.id }], [])
        )
    )
});

//Update Posts
export const updatePosts = async (id, data) => {
    try {
        const postRef = doc(db, 'posts', id);
        await updateDoc(postRef, data)
        toast.success('Post updated successfully.')
        return true
    } catch (error) {
        toast.error(error.message)
    }
}

// Delete Posts
export const deletePosts = async id => {
    try {
        await deleteDoc(doc(db, 'posts', id))
        toast.success('Post deleted successfully.')
    } catch (error) {
        toast.error(error.message)
    }
}

export default app