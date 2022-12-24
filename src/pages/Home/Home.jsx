import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Home.css";

/**
 * Go to assets/data.json to explore the structure of the Data
 *
 * Go to assets/users.json to explore the structure of saving user provided informations
 *
 */

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSector, setCurrentSector] = useState(null);

  // Get all sector information from the database
  const getSectors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://simple-servey-server.onrender.com/sectors"
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
    getSectors();
  }, []);

  // Handle Save Information
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Please wait a moment", { id: "loading" });
    const name = e.target.name.value;
    const email = e.target.email.value;
    const sector = e.target.sector.value;
    const subSector = e.target?.subSector?.value || "";
    const terms = e.target.terms.checked;
    const data = { name, email, sector, subSector, terms };
    if (email && name && sector && terms) {
      const { result } = await axios.put(
        "https://simple-servey-server.onrender.com/save",
        data
      );
      toast.remove("loading");
      toast.success("Info Saved successfully", { id: "success" });
      console.log(result);
    }
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <h1 className="page_title">
        Welcome to <span className="blue_color">Simple Survey</span>
      </h1>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <h3 className="form_title">Please enter your Information</h3>
          {/* Name */}
          <div className="input_field">
            <label htmlFor="name">
              <FaUserAlt size={20} />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your Full Name"
                required
              />
            </label>
          </div>

          {/* Email */}
          <div className="input_field">
            <label htmlFor="email">
              <MdEmail size={20} />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Full Email"
                required
              />
            </label>
          </div>

          {/* Sector */}
          <div className="input_field">
            <label htmlFor="sector">
              <span>Sector:</span>
              <select
                name="sector"
                id="sector"
                onChange={(e) => setCurrentSector(e.target.value)}
                required
              >
                {data.map((sector) => (
                  <>
                    <option key={sector.title} value={sector.title} disabled>
                      {sector.title}
                    </option>
                    {sector.sub.map((sub) => (
                      <option key={sub.title} value={sub.title}>
                        {sub.title}
                      </option>
                    ))}
                  </>
                ))}
              </select>
            </label>
          </div>

          {/* Children-Sector */}
          {currentSector && (
            <div className="input_field">
              <label htmlFor="subSector">
                <span>Sub-sector:</span>
                <select name="subSector" id="subSector">
                  {data.map((sector) => (
                    <>
                      {sector.sub.map((sub) => (
                        <>
                          {sub.title === currentSector &&
                            sub.subOfSub &&
                            sub.subOfSub.map((item) => (
                              <option key={item.title} value={item.title}>
                                {item.title}
                              </option>
                            ))}
                        </>
                      ))}
                    </>
                  ))}
                </select>
              </label>
            </div>
          )}

          {/* Terms */}
          <label htmlFor="terms" className="terms">
            <input type="checkbox" name="terms" id="terms" required />
            <span>Agree to Terms & Conditions</span>
          </label>

          {/* Submit */}
          <label htmlFor="submit" className="submit_btn_wrapper">
            <input type="submit" value="" />
            <button className="submit_btn">Save</button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Home;
