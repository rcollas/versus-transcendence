import { backend } from "lib/backend";
import React from "react";
import { useNavigate } from "react-router-dom";

async function checkUserToken() {
  const navigate = useNavigate();
  const response = await backend.checkToken();
  console.log("La response est ", response);
  if (response.statusCode == "400") {
    navigate("/login");
  }
}
export default checkUserToken;
