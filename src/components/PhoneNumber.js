import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function PhoneNumber({ value, onChange }) {
  return (
    <>
      <PhoneInput
        placeholder="Enter Your Phone Number"
        country={"in"}
        value={value}
        onChange={onChange}
        inputProps={{
          required: true,
        }}
        containerStyle={{ width: "100%" }}
        inputStyle={{
          width: "100%",
          height: "40px",
          borderRadius: "0.375rem",
          border: "1px solid #E2E8F0", // Chakra's default border color
          fontSize: "1rem",
          paddingLeft: "48px", // Space for the flag
          "&:focus": {
            border: "2px solid #3182CE", // Chakra's blue.500 color
            boxShadow: "0 0 0 1px #3182CE",
            outline: "none",
          },
        }}
        buttonStyle={{
          border: "1px solid #E2E8F0", // Matching border color
          borderRadius: "0.375rem 0 0 0.375rem",
          backgroundColor: "white",
        }}
        containerClass="phone-input-container"
      />
      <style>{`
        .phone-input-container .form-control:focus {
          border-color: #3182CE !important;
          box-shadow: 0 0 0 1px #3182CE !important;
          outline: none !important;
        }
        .phone-input-container .form-control:focus + .flag-dropdown {
          border-color: #3182CE !important;
        }
      `}</style>
    </>
  );
}

export default PhoneNumber;
