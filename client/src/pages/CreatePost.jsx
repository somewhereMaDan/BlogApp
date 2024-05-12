import { React, useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useGetUserID } from "../hooks/useGetUserID";
import "./CreatePost.css";
import { toast } from "sonner";

export default function CreatePost() {
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageURL] = useState("");
  const [description, setDesc] = useState("");
  const [cookies, _] = useCookies(["access_Token"]);

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
      toast.success("Blog created successfully");
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

    if (!title || !summary) {
      toast.warning("Please fill the title and summary fields");
      return;
    }

    try {
      toast.info("Generating description using A.I");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/generateDesc`,
        { title, summary }
      );

      toast.success("Description generated successfully");

      setDesc(response.data.text);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);

      if (error.response.data.msgg === "SAFETY_ISSUE") {
        toast.warning("Cannot generate explicit content. Please try again.");
        return;
      }

      toast.error("Failed to generate description");
    }
  };


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
              <input
                className="INPUUT"
                value={imageUrl}
                onChange={(e) => setImageURL(e.target.value)}
                type="summary"
                placeholder={"Image URL"}
              />
          </div>
          <div className="generate-description">
            <button
              className="generate-description-btn"
              onClick={(e) => createDescription(e)}
            >
              Generate description using (A.I)
            </button>
          </div>
          <div className="ReactQuill">
            <div className="ReactQuill-div">
              <ReactQuill
                value={description}
                onChange={(e) => setDesc(e)}
                style={{ width: "100%" }}
                className="custom-quill-editor"
              />
              <div className="submit-div">
                <div>
                  <button style={{ marginTop: "10%" }} className="submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
