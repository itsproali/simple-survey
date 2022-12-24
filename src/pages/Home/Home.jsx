import React, { useState } from "react";
import "./Home.css";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Home = () => {
  const [currentSector, setCurrentSector] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const sector = e.target.sector.value;
    const subSector = e.target.subSector.value;
    const terms = e.target.terms.checked;
    const data = { name, email, sector, subSector, terms };
    console.log(data);
  };

  const data = [
    {
      title: "Manufacturing",
      sub: [
        { title: "Construction materials" },
        { title: "Electronics & Optics" },
        {
          title: "Food/Beverage",
          subOfSub: [
            { title: "Bakery/confectionery products" },
            { title: "Beverage" },
            { title: "Fish/fish products" },
            { title: "Meat/meat products" },
            { title: "Milk/dairy products" },
            { title: "Sweets/snack food" },
            { title: "Other (Food/Beverage)" },
          ],
        },
        {
          title: "Furniture",
          subOfSub: [
            { title: "Bathroom/sauna" },
            { title: "Bedroom" },
            { title: "Children's room" },
            { title: "Kitchen" },
            { title: "Living room" },
            { title: "Office" },
            { title: "Outdoor" },
            { title: "Project furniture" },
            { title: "Other (furniture)" },
          ],
        },
        {
          title: "Machinery",
          subOfSub: [
            { title: "Machinery components" },
            { title: "Machinery tools" },
            { title: "manufacture of machinery" },
            { title: "Maritime" },
            { title: "Aluminium and steel workboats" },
            { title: "Boat/Yacht building" },
            { title: "Ship repair and conversion" },
            { title: "Metal Structures" },
            { title: "Repair and maintenance service" },
            { title: "Other (Machinery)" },
          ],
        },
        { title: "Metal working", subOfSub: [] },
      ],
    },
    {
      title: "Service",
      sub: [
        { title: "Business Services" },
        { title: "Engineering" },
        {
          title: "Information Technology",
          subOfSub: [
            { title: "Data Processing, Web portals" },
            { title: "Programming" },
            { title: "Software, Hardware" },
            { title: "Telecommunications" },
          ],
        },
        { title: "Tourism" },
        { title: "Translation service" },
        {
          title: "Transport and Logistics",
          subOfSub: [
            { title: "Air" },
            { title: "Rail" },
            { title: "Road" },
            { title: "Water" },
          ],
        },
      ],
    },
    {
      title: "Others",
      sub: [
        { title: "Creative Industries" },
        { title: "Evergy Technology" },
        { title: "Environment" },
      ],
    },
  ];

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
              >
                <option value={null} disabled selected>
                  -- Select a Sector ---
                </option>
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
            <input type="checkbox" name="terms" id="terms" />
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
