import React, {useState} from "react";
import Country from "../Country.json";
import Currency from "../Currency.json";
import { v4 as uuidv4 } from "uuid";

const CountryCurrency = () => {

const [countries,setCountries] = useState(Country);
const [rates,setRate] = useState(Currency);

console.log("countries", countries);
console.log("rates", rates);

const [searchCountry, setSearchCountry] = useState();
console.log("searchCountry", searchCountry);
const [city, setCity] = useState('')
console.log("Currency",city)
const [rate,setRatee] = useState("")
console.log("Rate",rate)

function ratte()
  {
    var t = document.getElementById("country").value
    setSearchCountry(t)
    for (let index = 0; index < countries.length; index++) 
    {
      const element = countries[index];
      if(element.country == t)
      {
        setCity(element.currency_code)
        for (let index = 0; index < rates.length; index++) 
        {
          const elem = rates[index];
          if(element.currency_code == elem.code)
            setRatee(elem.rate)
        }
      }
    }  
  }

  return (
    <React.Fragment>
      <section>
        <div>
          {/* header section */}
          
          {/* body section */}
          <div className="grid justify-center mt-14 mx-5">
            <div className="space-y-10">
              <select
               id="country"
               value={searchCountry}
               onChange={ratte}>
                <option value="" hidden>
                  Select Country
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
              <br></br>
              <input
                id = "currency"
                type="text"
                placeholder="Currency"
                value={city}
                onChange={ratte}
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CountryCurrency;