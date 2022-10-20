import mysql from "mysql";

export default async  function handler(req, res) {
    if (req.method !== 'GET') {
        return;
      }
  const db = await mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "123456789",
    database: "habitatcheck",
    dateStrings: true,
    insecureAuth: true,
  });
  try {
    db.query(
        "SELECT * FROM actuellement",
        (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}