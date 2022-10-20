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
   const datesortie = req.body.datesortie.substr(0,10);
   console.log(datesortie)
   console.log(req.body)
   const observation = req.body.observation;
    const { nomclient,nomcheque, type,ncheque,montant,date_reception,date_echeance} = req.body.datasortie;
    db.query(
        "INSERT INTO sortie (nomclient, nomcheque,type,ncheque,montant,date_sortie,observation,date_reception,date_echeance) VALUES (?,?,?,?,?,?,?,?,?)",
        [nomclient,nomcheque,type,ncheque,montant,datesortie,observation,date_reception,date_echeance],
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