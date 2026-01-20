import { useState } from "react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TiDocumentDelete } from "react-icons/ti";
import PropTypes from "prop-types";
import { api_base_url } from "../pages/Helper";
import { useNavigate } from "react-router-dom";

function Docs({ docs }) {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const [error, setError] = useState("");
  const userId = sessionStorage.getItem('userId')

  const navigate = useNavigate();

  const openDocument = (id) => {
    try {
      fetch(`${api_base_url}/openDoc`, {
        mode: "cors",
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
          docId: id,
        }),
      })
        .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate(`/createDocs/${data?.doc?._id}`);
        } else {
          setError(data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDoc = (id, docID) => {
    let doc = document.getElementById(docID);
    fetch(`${api_base_url}/deleteDoc`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        docId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsDeleteModelShow(false);
          alert(data.message);
          doc.remove();
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
      });
  };

  return (
    <>
      <div id={`doc-${docs._id}`} className="px-28">
        <div className="bg-zinc-900 w-full h-20 rounded-md flex items-center justify-between mb-3">
          <div className="px-4 flex items-center">
            <button onClick={() => openDocument(docs._id)}>
              <i className="text-4xl  p-[10px]">
                <IoDocumentTextSharp />
              </i>
            </button>
            <div className="pl-3">
              <h3 className="font-semibold">{docs.title}</h3>
              <p className="text-xs">
                Created In: {new Date(docs.date).toDateString()} | Last Updated:{" "}
                {new Date(docs.lastUpdate).toDateString()}
              </p>
            </div>
          </div>
          <button
            className="text-red-600 text-3xl pr-8 cursor-pointer"
            onClick={() => setIsDeleteModelShow(true)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
      {isDeleteModelShow && (
        <div className="deleteDocModelCon fixed top-0 left-0 right-0 bottom-0 bg-zinc-800/60 w-screen h-screen flex items-center justify-center">
          <div className="deleteModel w-[500px] h-[220px] bg-zinc-900 rounded-[20px] px-[30px] py-[25px]">
            <h3 className="text-2xl">Delete Document</h3>
            <div className="flex item-center gap">
              <i className="text-red-700 text-[100px]">
                <TiDocumentDelete />
              </i>
              <div className="p-5">
                <h3>Do You Want to Delete This Document?</h3>
                <p className="text-xs text-zinc-500">Delete or Cancel</p>
              </div>
            </div>
            <div className="flex">
              <button
                className="deletebtn text-base bg-red-600 w-1/2 h-9 rounded-md flex items-center justify-center"
                onClick={() => deleteDoc(docs._id, `doc-${docs._id}`)}
              >
                Delete
              </button>
              <button
                className="cancelbtn w-1/2 bg-black ml-2 rounded-md"
                onClick={() => setIsDeleteModelShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Prop validation
Docs.propTypes = {
  docs: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
  }).isRequired,
};

export default Docs;
