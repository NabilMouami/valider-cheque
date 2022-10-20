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
    const { email, password} = req.body
    console.log(email)

    db.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) {
            res.send({ err: err });
          }
          if (result.length > 0) {
            // req.session.user = result; //create a session
            // console.log(req.session.user);
          
            res.send(result);           
    
          } else {
            res.status(401).send({ message: "Invalid Email or Password." });
          }
      }
    );
    db.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}