import mysql from "mysql";

export default async  function handler(req, res) {
    if (req.method !== 'DELETE') {
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
        "DELETE FROM cheque WHERE id=?",[req.query.id],
        (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("deleted!!");
            }
          }
        );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}