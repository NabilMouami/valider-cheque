import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { load } from "../store/load/action";
import Cookie from "js-cookie";
import axios from "axios";
const Topbar = () => {

 const [news,setNew]= useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  //get current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  const logout = () => {
    Cookie.remove("emailamal");
    router.push("/");
  };
  useEffect(()=> {
    const res =  axios.get("/api/getpost").then((res)=> {
       const New = res.data.filter((item)=> item.date_echeance === today)
       setNew(New);  
    });

  },[])
  const Load=(items)=> {
    dispatch(load(items));
    router.push("/details")
  }
  return (
    <div className="topbar">
     <div className="icons">
        <div className="icon" onClick={()=> Load(news)}>
          <img src="/notification.jpg" className="iconImg" alt="img" />
          {
            news.length >0 &&
            <div className="counter">{news.length}</div>
          }
        </div>
        </div>
        <div className="topRight">
          <button className="logout" onClick={logout}>
            se déconnecter
          </button>
        </div>
    </div>
  );
};


export default Topbar;
