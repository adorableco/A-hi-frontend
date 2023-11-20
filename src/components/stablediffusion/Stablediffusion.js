/** @format */

import { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Stablediffusion.css";
import axios from "axios";
import Loading from "../Loading";

export default function Stablediffusion() {
  const [result, setResult] = useState();
  const [imageInput, setImageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onChange(e) {
    setImageInput(e.target.value);
  }

  async function generateImage(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://43.201.240.250:8080/diffusion",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: imageInput }),
        },
      );

      const data = response.data;
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data);
      console.log(result);
      setImageInput("");
      setIsLoading(false);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      generateImage(e);
    }
  };

  return (
    <div className='imagePromptContainer'>
      <div className='promptbox'>
        <p style={{ margin: "0" }}>프롬프트</p>
      </div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <textarea
          className='ImagePrompt'
          onChange={onChange}
          onKeyDown={handleOnKeyPress}
        ></textarea>
        <button onClick={generateImage} type='button' className='imageBtn'>
          생성하기{" "}
          <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#04364a" }} />
        </button>
      </form>
      {isLoading ? <Loading /> : null}
      <div className='promptbox' style={{ marginLeft: "3px" }}>
        <p style={{ margin: "0" }}>생성 결과</p>
      </div>
      <div className='resultBox'>
        <img src={result} style={{ width: "500px" }}></img>
      </div>
    </div>
  );
}