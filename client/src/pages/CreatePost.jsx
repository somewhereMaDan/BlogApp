import { React, useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useGetUserID } from "../hooks/useGetUserID";
import "./CreatePost.css";

export default function CreatePost() {
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageURL] = useState("");
  const [description, setDesc] = useState("");
  const [cookies, _] = useCookies(["access_Token"]);
  const [APIresponse, setAPIresponse] = useState("");
  const [Loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plainTextDesc = getPlainText(description);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        {
          title,
          summary,
          imageUrl,
          description: plainTextDesc,
          userOwner: userID,
        },
        {
          headers: { authorization: cookies.access_Token },
        }
      );
      setTitle("");
      setSummary("");
      setImageURL("");
      setDesc("");
      navigate("/");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPlainText = (value) => {
    const div = document.createElement("div");
    div.innerHTML = value;
    return div.textContent || div.innerText || "";
  };

  const createDescription = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Could you Please Provie me description about 100-150 words with of Title - 
                ${title}, Summary = ${summary}. 
                And no need to mention Title and Summary name at the top just give me a description for it.`,
              },
            ],
          },
        ],
      };

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDvdKaAqQsbJim30noP8mfkHNAl0Y8pwhM`,
        requestBody
      );
      setAPIresponse(
        response.data.candidates.map((candidate) =>
          candidate.content.parts.map((part) => part.text)
        )
      );
      // setDesc(APIresponse?.[0][0]);
      // console.log("Inside Api Response, description: " + description);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // if (Loading == false) {
  //   console.log(APIresponse?.[0][0]);
  //   setDesc(APIresponse?.[0][0]);
  // }
  // console.log("description: " + description);

  useEffect(() => {
    if (!Loading) {
      setDesc(APIresponse?.[0]?.[0] || "");
    }
  }, [Loading, APIresponse]);
  console.log(description);
  return (
    <div className="Create-Post">
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <div className="Create-Post-Title">
            <input
              className="INPUUT"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="title"
              placeholder={"Title"}
            />
          </div>
          <div className="Summary">
            <input
              className="INPUUT"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              type="summary"
              placeholder={"Summary"}
            />
          </div>
          <div className="INPUUT-file">
            <div className="img-input-div">
              <div>Image URL </div>
              <input
                className="img-input"
                value={imageUrl}
                onChange={(e) => setImageURL(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className="ReactQuill">
            <div className="ReactQuill-div">
              <ReactQuill
                value={description}
                onChange={(e) => setDesc(e)}
                style={{ width: "100%" }}
                className="custom-quill-editor"
              />
            </div>
            <div className="generate-description">
              <button
                className="generate-description-btn"
                onClick={(e) => createDescription(e)}
              >
                Generate description
              </button>
            </div>
          </div>
          <div className="submit-div">
            <div>
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
