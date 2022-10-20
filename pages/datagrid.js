import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from "@mui/x-data-grid-premium";
import Modal from "@mui/material/Modal";

import React, { useEffect, useState } from "react";
import { GrTrash, GrUpdate } from "react-icons/gr";
import Button from "@mui/material/Button";

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
export default function DataGridDemo() {
  const [data, setData] = useState([]);
  const [datafil, setDataFil] = useState([]);
  const [date, setDate] = useState(new Date());
  const [datesortie, setDateSortie] = useState(new Date());
  //let datereelsortie= datesortie.toISOString().split('T')[0];
  console.log(datesortie);

  const [datasortie, setDataSortie] = useState([]);

  const [observation, setObservation] = useState("");
  const datas = {
    datasortie,
    datesortie,
    observation,
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    padding: 20,
    height: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const res = axios.get("/api/getpost").then((res) => {
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
  const deleteClient = (id) => {
    axios.delete(`api/client/${id}`).then((res) => {
      console.log(res.data);
    });
  };

  const addActuelle = (item) => {
    axios.post("/api/actuallity/post", item).then((res) => {
      console.log(res.data);
    });
  };
  const addSortie = (item) => {
    setOpen(true);

    setDataSortie(item);
  };
  const saveSortie = () => {
    axios.post("/api/sortie/post", datas).then((res) => {
      console.log(res.data);
    });
  };
  function popup(id, clientname) {
    Swal.fire({
      title: "Êtes vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez " + clientname,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClient(id);
        Swal.fire("Supprimé!", "Le client a été supprimé.", "success");
      }
    });
  }

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

      width: 160,
      editable: true,
    },
    {
      field: "montant",
      headerName: "Montant",
      headerClassName: "super-app-theme--cell",

      sortable: false,
      width: 120,
    },
    {
      field: "type",
      headerName: "Type",
      headerClassName: "super-app-theme--cell",

      width: 100,
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
      field: "ville",
      headerName: "Ville",
      headerClassName: "super-app-theme--cell",

      width: 100,
      editable: true,
    },
    {
      field: "banque",
      headerName: "Banque",
      headerClassName: "super-app-theme--cell",

      width: 100,
      editable: true,
    },
    {
      headerName: "Actions",
      headerClassName: "super-app-theme--cell",

      field: "",
      width: 160,
      renderCell: (params) => (
        <div>
          <span style={{ color: "red" }}>
            <GrTrash
              onClick={() => {
                popup(params.row);
              }}
            />
            <Button onClick={() => addActuelle(params.row)}>Actuel</Button>

            <Button onClick={() => addSortie(params.row)}>sortie</Button>
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Topbar />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Sidebar />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <label>Choisir une date a afficher: </label>
            <input
              type="date"
              onChange={(event) => {
                setDateSortie(event.target.value);
              }}
            />
            <label>
              <br />
              Une Observation:
            </label>

            <textarea
              cols="70"
              rows="5"
              onChange={(event) => {
                setObservation(event.target.value);
              }}
            ></textarea>
            <Button onClick={() => saveSortie()}>Save</Button>
          </Box>
        </Modal>
     
        <Box sx={{ height: 600, width: "100%",'& .super-app-theme--cell': {
          backgroundColor: '#66CDAA',
          color: '#1a3e72',
          fontWeight: '600',
        }, }}>
          <DataGrid
            rows={datafil}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
        
      </div>
    </div>
  );
}
