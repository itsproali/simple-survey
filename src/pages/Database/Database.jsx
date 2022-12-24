import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Database.css";

const Database = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all sector information from the database
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://simple-servey-server.onrender.com/users"
      );
      if (data.success) {
        setData(data.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // Call the asynchronous function
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="database_container">
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Sector</th>
            <th>Sub-sector</th>
            <th>Terms</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.sector}</td>
              <td>{item.subSector || "None"}</td>
              <td className={`${item.terms ? "agree" : "disagree"}`}>
                {item.terms ? "Agree" : "Disagree"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Database;
