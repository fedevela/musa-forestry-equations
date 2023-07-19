import { NextApiRequest, NextApiResponse } from "next";
import { executeSQLAll, executeSQLRun } from "../../demo/dbSQLite";
import { IUser, isAnIUser } from "../../demo/dbmodel/user";

export default function getAllData(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { uid } = req.query;
    return executeSQLAll(
      `SELECT * FROM user ${!uid ? "" : " where uid = ?"}`,
      !uid ? [] : [uid]
    ).then((rows) => {
      res.json(rows);
    });
  } else if (req.method === "POST") {
    const incomingUser = req.body[0] || req.body;

    //if user is invalid, stop
    if (isAnIUser(incomingUser) === false) {
      res.status(500).send("Invalid User");
      return;
    }

    //create new user
    return executeSQLRun(
      `
      INSERT INTO
          user (
              uid,
              email,
              emailVerified,
              displayName,
              isAnonymous,
              photoURL,
              createdAt,
              lastLoginAt
          )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?);
  `,
      [
        incomingUser.uid,
        incomingUser.email,
        incomingUser.emailVerified,
        incomingUser.displayName,
        incomingUser.isAnonymous,
        incomingUser.photoURL,
        incomingUser.createdAt,
        incomingUser.lastLoginAt,
      ]
    ).then(() => {
      //success
      res.status(200).send("Success!");
    });
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
