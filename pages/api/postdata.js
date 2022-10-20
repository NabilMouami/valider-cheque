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
   const datereception = req.body.datereception;
   const dateecheance = req.body.dateecheance;

    const { nomclient,nomcheque, type,ncheque,montant,banque,ville} = req.body;
    db.query(
        "INSERT INTO cheque (nomclient, nomcheque,type,ncheque,montant,banque,ville,date_reception,date_echeance) VALUES (?,?,?,?,?,?,?,?,?)",
        [nomclient,nomcheque,type,ncheque,montant,banque,ville,datereception,dateecheance],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");

          }
        }
      );
    db.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}