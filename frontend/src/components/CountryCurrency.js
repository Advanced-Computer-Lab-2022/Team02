import React, {useState} from "react";
import Country from "../Country.json";
import { v4 as uuidv4 } from "uuid";

const CountryCurrency = () => {

const [countries,setCountries] = useState(Country);
  console.log("countries", countries);

  const [searchCountry, setSearchCountry] = useState();
  console.log("searchCountry", searchCountry);

  const [city, setCity] = useState()

  console.log(city)


  const capital = countries.find((obj) => {
    if (obj.country === searchCountry) {
      return true;
    }
    return false;
  });

  console.log("capital", capital);

  return (
    <React.Fragment>
      <section>
        <div className="bg-white w-auto h-96 mx-5 mt-40 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
          {/* header section */}
          <h3>Select your country:</h3>
          {/* body section */}
          <div className="grid justify-center mt-14 mx-5">
            <div className="space-y-10">
              <select
               id="country"
               value={searchCountry}
               onChange={(e) => setSearchCountry(e.target.value)}
               className=" w-full h-14 text-xl rounded-lg">
                <option value="" hidden>
                  --Select Country--
                </option>
                {
                countries.map((item) => {
                  return (
                    <option key={uuidv4()} value={item.country}>
                      {item.country}
                    </option>
                  );
                })}
              </select>
                <br></br><br></br>
              <input
                id = "currency"
                type="text"
                placeholder="Currency"
                className="w-full h-14 text-xl rounded-lg"
                value={ capital && capital.currency_code || ""}
                onChange={e =>setCity(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CountryCurrency;