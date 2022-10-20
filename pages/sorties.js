import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from "@mui/x-data-grid-premium";
import React, { useEffect, useState } from "react";
import { GrTrash, GrUpdate } from "react-icons/gr";
import axios from "axios";
import Swal from "sweetalert2";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

/*const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
*/
export default function sorties() {
  const [data, setData] = useState([]);
  const [datafil, setDataFil] = useState([]);
  const [date, setDate] = useState(new Date());
  const actionButton = (params) => {
    console.log(params.row);
    alert("clicked");
  };
  console.log(date.toString().substr(0, 8));

  const columns = [
    {
      field: "nomclient",
      headerName: "Nom Client",
      headerClassName: "super-app-theme--cell",

      width: 120,
      editable: true,
    },
    {
      field: "nomcheque",
      headerName: "Nom Cheque",
      headerClassName: "super-app-theme--cell",

      width: 120,
      editable: true,
    },
    {
      field: "ncheque",
      headerName: "Num Cheque",
      headerClassName: "super-app-theme--cell",

      width: 150,
      editable: true,
    },
    {
      field: "montant",
      headerName: "Montant",
      headerClassName: "super-app-theme--cell",

      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      headerClassName: "super-app-theme--cell",

      width: 100,
      editable: true,
    },
    {
      field: "date_sortie",
      headerName: "Date Sortie",
      headerClassName: "super-app-theme--cell",

      width: 110,
      editable: true,
    },
    {
      field: "date_reception",
      headerName: "Date Reception",
      headerClassName: "super-app-theme--cell",

      width: 110,
      editable: true,
    },
    {
      field: "date_echeance",
      headerName: "Date Echeance",
      headerClassName: "super-app-theme--cell",

      width: 110,
      editable: true,
    },
    {
      field: "observation",
      headerName: "Observation",
      headerClassName: "super-app-theme--cell",

      width: 160,
      editable: true,
    },
    {
      headerName: "Actions",
      headerClassName: "super-app-theme--cell",

      field: "",
      width: 80,
      renderCell: (params) => (
        <div>
          <GrTrash onClick={() => popup(params.row)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const res = axios.get("/api/sortie/getpost").then((res) => {
      setData(res.data);
      setDataFil(res.data);
    });
  }, []);

  const filterDate = (e) => {
    e.preventDefault();
    if (data.length == 0) {
      return location.reload();
    }
    const newFilter = data.filter((colab) =>
      colab.date_echeance.includes(date)
    );
    setDataFil(newFilter);
  };

  //POP-UP delete confirmation!
  const deleteClient = (item) => {
    axios.post("api/actuallity/deletepost", item).then((res) => {
      console.log(res.data);
    });
  };

  function popup(item) {
    Swal.fire({
      title: "Êtes vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez " + item.nomcheque,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClient(item);
        Swal.fire("Supprimé!", "Le client a été supprimé.", "success");
      }
    });
  }
  return (
    <div>
      <Topbar />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Sidebar />

        <Box sx={{ height: 600, width: "100%",'& .super-app-theme--cell': {
          backgroundColor: '#DC143C',
          color: '#1a3e72',
          fontWeight: '600',
        }, }}>
          <DataGrid
            rows={datafil}
            disableSelectionOnClick
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>
    </div>
  );
}
