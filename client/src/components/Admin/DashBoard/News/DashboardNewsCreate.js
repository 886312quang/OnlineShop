import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { postNews, fetchGetNews } from "../../../../services/news";
import RichEditor from "./RichEditor";

export default function DashboardNewsCreate(props) {
  const [inputValue, setInputValue] = useState([]);
  const [cateValue, setCateValue] = useState("");
  const [file, setFile] = useState([]);
  const [newsContent, setNewsContent] = useState("");
  const [newsImg, setNewsImg] = useState([]);
  const [cateList, setCateList] = useState([]);

  const createForm = useRef();
  const cateInput = useRef();

  const handleOnChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchGetNews().then((res) => {
      const cate = Object.values(
        res.data.reduce((a, { newCate }) => {
          a[newCate] = a[newCate] || { newCate };
          return a;
        }, Object.create(null)),
      );
      setCateList(cate);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    const imageArr = Array.from(file);
    imageArr.forEach((image) => {
      formData.append("newImg", image);
    });
    formData.append("newTime", new Date());
    formData.append("newCate", cateValue);
    formData.append("newTitle", inputValue.title);
    formData.append("newContent", newsContent);
    console.log(formData);
    postNews(formData).then(() => {
      props.setCloseCreateFunc(false);
      props.setToastFunc(true);
    });
  };

  const addNewCate = () => {
    setCateList((cateList) => [...cateList, { newCate: inputValue.cate }]);
    cateInput.current.value = "";
  };
  const deleteImg = (event) => {
    const virutalFile = [...file];
    virutalFile.splice(event.target.id, 1);
    setFile(virutalFile);

    const items = [...newsImg];
    items.splice(event.target.id, 1);
    setNewsImg(items);
  };

  return (
    <div
      className={
        props.openMenu === false
          ? "DashboardProductInfo Dashboard-left"
          : "DashboardProductInfo"
      }
    >
      <div className="create-box">
        <div className="create-box-title flex">
          <div className="create-box-title-text">News information</div>
          <div
            className="create-box-title-close flex-center"
            onClick={() => {
              props.setCloseCreateFunc(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          ref={createForm}
          encType="multipart/form-data"
        >
          <div className="create-box-row flex">
            <div className="dashboard-left flex">Title</div>
            <div className="dashboard-right">
              <input
                type="text"
                name="title"
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <div className="create-box-row flex">
            <div className="dashboard-left flex">Images </div>
            <div className="dashboard-right">
              <input
                onChange={(e) => {
                  const files = e.target.files;
                  for (let i = 0; i < files.length; i++) {
                    setNewsImg((news) => [
                      ...news,
                      URL.createObjectURL(files[i]),
                    ]);
                  }
                  const fileArr = Array.prototype.slice.call(files);
                  fileArr.forEach((item) => {
                    setFile((file) => [...file, item]);
                  });
                }}
                type="file"
                name="newsImg"
                className="noborder"
                multiple="multiple"
                style={{ height: "50px" }}
              />
              <div
                className="flex"
                style={{ overflowY: "hidden", flexWrap: "wrap" }}
              >
                {newsImg &&
                  newsImg.map((item, index) => {
                    return (
                      <div key={index} className="create-box-img">
                        <img key={index} src={item} alt=""></img>
                        <div className="create-box-img-overlay">
                          <p id={index} onClick={deleteImg} className="icon">
                            X
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="create-box-row flex">
            <div className="dashboard-left flex">Category </div>
            <div className="dashboard-right flex-center">
              <select
                style={{ width: "350px" }}
                onChange={(event) => {
                  setCateValue(event.target.value);
                }}
                value={cateValue}
              >
                <option></option>
                {cateList.length > 0 &&
                  cateList.map((item, index) => {
                    return <option key={index}>{item.newCate}</option>;
                  })}
              </select>
              <input
                type="text"
                name="cate"
                placeholder="New category?"
                style={{ margin: "0 10px" }}
                onChange={handleOnChange}
                ref={cateInput}
              ></input>
              <div
                className="btn"
                style={{
                  fontSize: "14px",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                  padding: "0 10px",
                  cursor: "pointer",
                  width: "350px",
                  height: "30px",
                }}
                onClick={addNewCate}
              >
                Add
              </div>
            </div>
          </div>
          <div style={{ border: "1px #ddd solid" }}>
            <RichEditor setNewsContent={setNewsContent} />
          </div>
          <div className="flex-center" style={{ marginTop: "40px" }}>
            <button className="create-box-btn btn">Add news</button>
          </div>
        </form>
      </div>
    </div>
  );
}
