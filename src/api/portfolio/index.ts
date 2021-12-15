import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";

export const getPortfolio = async () => {
    const res = await fetch('/api/portfolio');
    return await res.json();
}

export const getIntrinsicValueData = async (ticker: string): Promise<any> => {
    const docRef = doc(db, "intrinsicValues", ticker);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}
export const saveIntrinsicValueData = async (ticker: string, data: any): Promise<void> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const auth = useAuth();
    const cityRef = doc(db, 'intrinsicValues', ticker);
    await setDoc(cityRef, data, { merge: true });

}