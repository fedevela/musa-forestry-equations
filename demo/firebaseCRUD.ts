import firebase from "./firebase";

const firestore = firebase.firestore();

export function updateUser(
  uid: string | undefined,
  data: firebase.firestore.UpdateData
) {
  return firestore.collection("users").doc(uid).update(data);
}

export function createUser(
  uid: string | undefined,
  data: Partial<firebase.firestore.DocumentData>
) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
