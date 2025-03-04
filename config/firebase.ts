import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import  serviceAccount from "../challenge-4-42add-firebase-adminsdk-fbsvc-a58ec4f644.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();
const db = getFirestore();
export {auth, db };
