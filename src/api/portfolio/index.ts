import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { db } from "../../firebase";
import { notification } from "antd";
import { store } from "../../store/store";


export const getUid = () =>{
    const state = store.getState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // console.log(state, state.user.uid);

    if(!state.user.uid){
        notification.error({message: "User not logged in"});
        throw new Error("User login required");
    }

    return state.user.uid;
}
// export const getPortfolio = async () => {
    //     const res = await fetch('/api/portfolio');
    //     return await res.json();
    // }
// export const getPortfolio = async (): Promise<any> => {
//     const uid = getUid();
//     const docRef = doc(db, "portfolio", uid);  
//     const docSnap = await getDoc(docRef);
//     return docSnap.data();
// }
// export const savePortfolio = async (data: any): Promise<void> => {

//     const uid = getUid();
//     const cityRef = doc(db, 'portfolio', uid);
//     await setDoc(cityRef, data, { merge: true });

// }
export const getPortfolio = async (): Promise<any> => {
    const uid = getUid();
    const querySnapshot = await getDocs(collection(db, "usersData", uid, "portfolio"));
    const res = querySnapshot.docs.map( doc => doc.data());
    return res;
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    // const docRef = doc(db, "usersData", uid, "portfolio");
    // // const docRef = doc(db, "intrinsicValues", `${ticker}-${uid}`);
    // const docSnap = await getDoc(docRef);
    // return docSnap.data();
}
export const savePortfolioRecord = async (ticker: string, data: any): Promise<void> => {
    const uid = getUid();
    const docRef = doc(db, "usersData", uid, "portfolio", ticker);
    //const docRef = doc(db, 'intrinsicValues', `${ticker}-${uid}`);
    await setDoc(docRef, data, { merge: true });
}


export const getIntrinsicValueData = async (ticker: string): Promise<any> => {
    const uid = getUid();
   
    const docRef = doc(db, "usersData", uid, "intrinsicValues", ticker);
    // const docRef = doc(db, "intrinsicValues", `${ticker}-${uid}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}
export const saveIntrinsicValueData = async (ticker: string, data: any): Promise<void> => {
    const uid = getUid();
    const docRef = doc(db, "usersData", uid, "intrinsicValues", ticker);
    //const docRef = doc(db, 'intrinsicValues', `${ticker}-${uid}`);
    await setDoc(docRef, data, { merge: true });
}