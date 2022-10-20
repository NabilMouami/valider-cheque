import mysql from "mysql";

export default async  function handler(req, res) {
    if (req.method !== 'POST') {
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
    console.log(req.body)
    const {nomclient,nomcheque,montant,date_reception,date_echeance} = req.body

    db.query(
        "DELETE FROM actuellement WHERE nomclient=? AND nomcheque=? AND montant=? AND date_reception=? AND date_echeance=?",[nomclient,nomcheque,montant,date_reception,date_echeance],
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