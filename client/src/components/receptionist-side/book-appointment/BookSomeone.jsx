import React, { useEffect, useState } from "react";

function BookSomeone(props) {
  const [employeeCity, setEmployeeCity] = useState({
    isCity: null,
    code: null,
  });
  const suffix = ["Jr.", "Jr. II", "Sr.", "II", "III"];
  const relation = [
    "Parent",
    "Guardian",
    "Child",
    "Spouse",
    "Sibling",
    "Relative",
  ];
  const defaultStyle = {
    top: "10px",
    left: "5px",
    fontSize: "1rem",
  };

  const minimizedStyle = {
    top: "0px",
    fontSize: "0.6rem",
  };
  const [cityMunicipality, setCityMunicipality] = useState({
    city: null,
    municipality: null,
    code: null,
  });
  function handleInputChange(e) {
    const name = e.target.name;
    props.handleBookSomeone(e, "someOne");
  }

  function handleCityChange(e) {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const name = selectedOption.getAttribute("name");
    // const value = selectedOption.getAttribute("value");
    const id = selectedOption.getAttribute("id");

    if (name === "city") {
      setCityMunicipality({
        city: true,
        municipality: false,
        code: id,
      });
    } else {
      setCityMunicipality({
        city: false,
        municipality: true,
        code: id,
      });
    }
  }

  var formattedDate = formatDate(new Date());

  // Function to format date as "yyyymmdd"
  function formatDate(date) {
    var year = date.getFullYear();
    var month = padZero(date.getMonth() + 1); // Adding 1 because getMonth() returns zero-based month
    var day = padZero(date.getDate());
    return year + "-" + month + "-" + day;
  }
  function padZero(number) {
    return (number < 10 ? "0" : "") + number;
  }

  function handleBlurState(e) {
    props.handleBlurState(e);
  }
  function handleFocusState(e) {
    props.handleFocusState(e);
  }

  // console.log(props.appointSomeone);

  useEffect(() => {
    const foundCity = props.ncr.find((city) => {
      return city.name === props.appointSomeone.city.value;
    });
    // console.log(foundCity);
    if (foundCity) {
      if (foundCity.isCity) {
        setCityMunicipality({
          city: true,
          municipality: false,
          code: foundCity.code,
        });
      } else {
        setCityMunicipality({
          city: false,
          municipality: true,
          code: foundCity.code,
        });
      }
    }
  }, [props.ncr, props.barangays]);
  // console.log(props);
  return (
    <div>
      <h5>Provide Information of the Patient</h5>
      <div className="appoint-someone">
        <div className="input-group">
          <input
            type="text"
            className="lg-blue-3"
            name="lastname"
            value={
              props.appointSomeone.lastname.value &&
              props.appointSomeone.lastname.value
            }
            onChange={handleInputChange}
            required
          />
          <span className="floating-label lg-blue-3">Last Name</span>
        </div>
        <div className="input-group">
          <input
            type="text"
            className="lg-blue-3"
            name="firstname"
            value={
              props.appointSomeone.firstname.value &&
              props.appointSomeone.firstname.value
            }
            onChange={handleInputChange}
            required
          />
          <span className="floating-label lg-blue-3">First Name</span>
        </div>
        <div className="input-group">
          <input
            type="text"
            className="lg-blue-3"
            name="middlename"
            value={
              props.appointSomeone.middlename.value &&
              props.appointSomeone.middlename.value
            }
            onChange={handleInputChange}
            onBlur={handleBlurState}
            onFocus={handleFocusState}
          />
          <span
            className="floating-label lg-blue-3"
            style={
              props.appointSomeone.middlename.isFocused
                ? minimizedStyle
                : props.appointSomeone.middlename.value
                ? minimizedStyle
                : defaultStyle
            }
          >
            Middle Name
          </span>
        </div>
        <div className="input-group">
          <select
            className="lg-blue-3"
            name="suffix"
            onChange={handleInputChange}
            value={props.appointSomeone.suffix.value}
            style={!props.appointSomeone.suffix.value ? { color: "white" } : {}}
            onBlur={handleBlurState}
            onFocus={handleFocusState}
          >
            <option value="">...</option>
            {suffix.map((i, id) => {
              return <option key={id}>{i}</option>;
            })}
          </select>
          <span
            className="floating-label lg-blue-3"
            style={
              props.appointSomeone.suffix.isFocused
                ? minimizedStyle
                : props.appointSomeone.suffix.value
                ? minimizedStyle
                : defaultStyle
            }
          >
            Suffix Name
          </span>
        </div>
        <div className="input-group">
          <input
            type="date"
            className="lg-blue-3"
            max={formattedDate}
            name="birthdate"
            value={
              props.appointSomeone.birthdate.value &&
              props.appointSomeone.birthdate.value
            }
            onChange={handleInputChange}
            onBlur={handleBlurState}
            onFocus={handleFocusState}
            style={
              props.appointSomeone.birthdate
                ? props.appointSomeone.birthdate.value
                  ? {}
                  : { color: "white", userSelect: "none" }
                : { color: "white", userSelect: "none" }
            }
            // style={{color: "white"}}
            required
          />
          <span
            className="floating-label lg-blue-3"
            style={
              props.appointSomeone.birthdate.isFocused
                ? minimizedStyle
                : props.appointSomeone.birthdate.value
                ? minimizedStyle
                : defaultStyle
            }
          >
            Birthdate
          </span>
        </div>
        
        <div className="input-group">
          <select
            className="lg-blue-3"
            name="sex"
            value={
              props.appointSomeone.sex.value &&
              props.appointSomeone.sex.value
            }
            onChange={handleInputChange}
            required
          >
            <option value="">...</option>
            <option>Male</option>
            <option>Female</option>
            
          </select>
          <span className="floating-label lg-blue-3">Sex</span>
        </div>
        <div className="input-group">
          <select
            className="lg-blue-3"
            name="relationship"
            value={
              props.appointSomeone.relationship.value &&
              props.appointSomeone.relationship.value
            }
            onChange={handleInputChange}
            required
          >
            <option value="">...</option>
            {relation.map((i, id) => {
              return <option key={id}>{i}</option>;
            })}
          </select>
          <span className="floating-label lg-blue-3">Relationship</span>
        </div>

        <div className="input-group">
          <input
            type="text"
            className="lg-blue-3"
            name="street"
            value={
              props.appointSomeone.street.value &&
              props.appointSomeone.street.value
            }
            onChange={handleInputChange}
            required
          />
          <span className="floating-label lg-blue-3 street-address">
            House No., Bldg, Street Name
          </span>
        </div>

        <div className="input-group">
          <select className="lg-blue-3" value={"Metro-Manila"} name="suffix">
            <option>...</option>
            <option>Metro-Manila</option>
          </select>
          <span className="floating-label lg-blue-3">Province</span>
        </div>

        <div className="input-group">
          <select
            className="lg-blue-3"
            name="city"
            value={
              props.appointSomeone.city.value && props.appointSomeone.city.value
            }
            onChange={(e) => {
              handleInputChange(e);
              handleCityChange(e);
            }}
            onLoad={(e) => {
              handleCityChange(e);
            }}
          >
            <option>...</option>
            {props.ncr &&
              props.ncr
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((city, id) => {
                  return (
                    <option
                      key={id}
                      name={!city.isCity ? "municipality" : "city"}
                      id={city.code}
                    >
                      {city.name}
                    </option>
                  );
                })}
          </select>
          <span className="floating-label lg-blue-3">City/Municipality</span>
        </div>

        <div className="input-group">
          <select
            className="lg-blue-3"
            name="barangay"
            value={
              props.appointSomeone.barangay.value &&
              props.appointSomeone.barangay.value
            }
            onChange={handleInputChange}
          >
            <option value="">...</option>

            {props.ncr &&
              props.barangays &&
              props.barangays
                .filter((barangay) =>
                  !cityMunicipality.municipality
                    ? barangay.cityCode === cityMunicipality.code
                    : barangay.municipalityCode === cityMunicipality.code
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((barangay, index) => {
                  return <option key={index}>{barangay.name}</option>;
                })}
          </select>
          <span className="floating-label lg-blue-3" style={{color: "#379cbd"}}>Barangay</span>
        </div>

        <div className="input-group">
          <input
            type="tel"
            pattern="[0-9]{4}"
            className="lg-blue-3"
            name="zip"
            required
            value={
              props.appointSomeone.zip.value &&
              props.appointSomeone.zip.value
            }
            style={
              props.appointSomeone.zip.value && !props.appointSomeone.zip.valid
                ? { outline: "red 2px  solid", border: "none" }
                : {}
            }
            onChange={handleInputChange}
          />
          <span
            className="floating-label lg-blue-3"
            style={
              props.appointSomeone.zip.value && !props.appointSomeone.zip.valid
                ? { ...minimizedStyle, color: "red" }
                : {}
            }
          >
            Zip/Postal Code
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookSomeone;
