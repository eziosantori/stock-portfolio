import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { db } from "../../firebase";
import { notification } from "antd";
import { store } from "../../store/store";
import { PortfolioItem } from "./types"


export const getUser = () =>{
    const state = store.getState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // console.log(state, state.user.uid);

    if(!state.user.uid){
        notification.error({message: "User not logged in"});
        throw new Error("User login required");
    }

    return state.user;
}
const undefToNull = (object: any) =>{
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            if(object[key] == undefined)
            object[key] = null;
        }
    }
    return object;
}
// export const getPortfolio = async () => {
    //     const res = await fetch('/api/portfolio');
    //     return await res.json();
    // }

export const getPortfolio = async (): Promise<PortfolioItem[]> => {
    const { uid } = getUser();
    const querySnapshot = await getDocs(collection(db, "usersData", uid, "portfolio"));
    const res = querySnapshot.docs.map( doc => doc.data());
    return res as any;

}
export const savePortfolioRecord = async (ticker: string, data: PortfolioItem): Promise<void> => {
    const {uid, email } = getUser();
    const docRef = doc(db, "usersData", uid, "portfolio", ticker);
    const docRefRoot = doc(db, "usersData", uid);
    //const docRef = doc(db, 'intrinsicValues', `${ticker}-${uid}`);
    const dataClear = undefToNull(data);
    await setDoc(docRefRoot, {uid, email}, { merge: true });
    await setDoc(docRef, dataClear, { merge: true });
}


export const getIntrinsicValueData = async (ticker: string): Promise<any> => {
    const {uid } = getUser();
   
    const docRef = doc(db, "usersData", uid, "intrinsicValues", ticker);
    // const docRef = doc(db, "intrinsicValues", `${ticker}-${uid}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}
export const saveIntrinsicValueData = async (ticker: string, data: any): Promise<void> => {
    const {uid, email } = getUser();
    const docRef = doc(db, "usersData", uid, "intrinsicValues", ticker);
    const docPortfRef = doc(db, "usersData", uid, "portfolio", ticker);

    const docRefRoot = doc(db, "usersData", uid);
    //const docRef = doc(db, 'intrinsicValues', `${ticker}-${uid}`);
    const dataClear = undefToNull(data);
    await setDoc(docPortfRef, {fairValue: dataClear.fairValue}, { merge: true });
    await setDoc(docRefRoot, {uid, email}, { merge: true });
    await setDoc(docRef, dataClear, { merge: true });
}