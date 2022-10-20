import React from "react";
import { useSelector, useDispatch } from "react-redux";

const details = () => {
  const load = useSelector((state) => state.load);
  const { cheque } = load;
  console.log(cheque);

  return (
    <div>
      <div className="productList">
        <table className="customers">
          <tbody>
            <tr>
              <th>Nom Client</th>
              <th>Nom Cheque</th>
              <th>Type</th>
              <th>Num Cheque</th>
              <th>Montant</th>
              <th>Dates Valides</th>
              <th>Ville</th>
              <th>Date Reception</th>
              <th>Date Echeance</th>
            </tr>
            {cheque.length !== 0 &&
              cheque.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="col-1">
                     {item.nomclient}
                    </td>
                    <td>{item.nomcheque}</td>
                    <td>{item.type}</td>
                    <td>{item.ncheque}</td>
                    <td>{item.montant}</td>
                    <td>{item.banque}</td>
                    <td>{item.ville}</td>
                    <td>{item.date_reception}</td>
                    <td>{item.date_echeance}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default details;
