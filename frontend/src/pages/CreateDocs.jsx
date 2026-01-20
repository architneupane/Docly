import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import 
import Navbar from "../components/Navbar";
import { api_base_url } from "./Helper";
import "../App.css";

function CreateDocs() {
  let { docId } = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const userId = sessionStorage.getItem("userId")

  const updateDoc = () => {
    fetch(`${api_base_url}/updateDoc`, {
      mode: "cors",
      method: "post",
      // inform server about data format that data is in json format
      headers: {
        "content-type": "application/json",
      },
      // convert javascript object to JSON string and sends data in json format
      body: JSON.stringify({
        userId,
        docId,
        content,
      }),
    })
      // it helps to handle the response data in a structured format
      .then((res) => res.json())
      // receives parsed data as response
      .then((data) => {
        if (data.success) {
          setError(data.message);
        } else {
          setError(data.message);
        }
      });
  };

  useEffect(() => {
    fetch(api_base_url + "/getDoc", {
      mode: "cors",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        docId: docId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          setError(data.message);
        } else {
          setContent(data.doc.content);
        }
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
        setError("An error occurred while fetching the document.");
      });
  },[]);

  return (
    <>
      <div className="w-full h-screen bg-zinc-800 text-white ">
        <Navbar />
        <div className="px-[100px] pt-5">
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1} // tabIndex of textarea
            onChange={(e) => {
              setContent(e);
              updateDoc();
            }} // setContent is a function that updates value of content with input field , e is a event object which contains new value of content
          />
        </div>
      </div>
    </>
  );
}

export default CreateDocs;
