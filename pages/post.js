import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Topbar from "../components/Topbar";

import axios from "axios";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Sidebar from "../components/Sidebar";
export default function PostScreen() {
  const [post, setUser] = useState({
    nomclient: "",
    nomcheque: "",
    type: "",
    ncheque: "",
    montant: "",
    banque: "",
    ville: "",
    datereception: "",
    dateecheance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...post,
      [name]: value,
    });
  };
  const handleRadio1 = (value) => {
    setUser({
      ...post,
      type: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("/api/postdata", post).then(() => {
      toast.success("Success: Vous avez ajouter les information sur payement.");
    });
  };
  return (
    <div>
      <Fragment>
        {Cookie.get("emailamal") ? (
          <>
            <Topbar />

            <div style={{ display: "flex" }}>
              <Sidebar />

              <div className="login validation">
                <h3>Validation:</h3>
                <form onSubmit={submitHandler}>
                  <div>
                    <label>Nom De Client:</label>
                    <input
                      type="text"
                      name="nomclient"
                      placeholder="Nom De Client..."
                      value={post.nomclient}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Nom/Cheque:</label>
                    <input
                      type="text"
                      name="nomcheque"
                      placeholder="Cheque De Client Principale..."
                      value={post.nomcheque}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Type:</label>
                    <RadioGroup onChange={handleRadio1} horizontal>
                      <RadioButton value="Cheque">Cheque</RadioButton>
                      <RadioButton value="Trit">Trit</RadioButton>
                    </RadioGroup>
                  </div>

                  <div>
                    <label>N Cheque/LCN:</label>
                    <input
                      type="text"
                      name="ncheque"
                      placeholder="Numero De Cheque..."
                      value={post.ncheque}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Montant:</label>
                    <input
                      type="text"
                      name="montant"
                      placeholder="Montant..."
                      value={post.montant}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Nom De Banque:</label>
                    <input
                      type="text"
                      value={post.banque}
                      onChange={handleChange}
                      placeholder="Nom De Banque ..."
                      name="banque"
                    />
                  </div>
                  <div>
                    <label>Ville:</label>
                    <input
                      type="text"
                      value={post.ville}
                      onChange={handleChange}
                      placeholder="Ville ..."
                      name="ville"
                    />
                  </div>
                  <div>
                    <label>Date De Reception De Cheque:</label>
                    <input
                      type="date"
                      value={post.datereception}
                      onChange={handleChange}
                      placeholder="Date Reception ..."
                      name="datereception"
                    />
                  </div>
                  <div>
                    <label>Date D'Echeance:</label>
                    <input
                      type="date"
                      value={post.dateecheance}
                      onChange={handleChange}
                      placeholder="Date Echeance ..."
                      name="dateecheance"
                    />
                  </div>

                  <button type="submit" className="btn">
                    Enregistrer
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <li>
            <Link href="/">
              <a>Login!!</a>
            </Link>
          </li>
        )}
      </Fragment>
    </div>
  );
}
