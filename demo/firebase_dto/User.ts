import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

class User {
  collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor() {
    // Get the reference to the "users" collection
    this.collection = firebase.firestore().collection("users");
  }

  // Create a new user
  async create(userData: any): Promise<string> {
    const newUserRef = await this.collection.add(userData);
    return newUserRef.id;
  }

  // Read all users
  async readAll(): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    const snapshot = await this.collection.get();
    return snapshot;
  }

  // Read a user by ID
  async read(
    userId: string
  ): Promise<
    firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  > {
    const userDoc = await this.collection.doc(userId).get();
    return userDoc;
  }

  // Update a user by ID
  async update(userId: string, updatedData: any): Promise<void> {
    await this.collection.doc(userId).update(updatedData);
  }

  // Delete a user by ID
  async delete(userId: string): Promise<void> {
    await this.collection.doc(userId).delete();
  }
}

export default User;
