import React, { useRef } from "react";
import "../../../App.css";
import "../../Styles/Dashboard.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function DashboardLiveChat(props) {
  const [allChatData, setAllChatData] = useState([]);
  const [constAllChatData, setConstAllChatData] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [roomIndex, setRoomIndex] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [openTimeTooltip, setOpenTimeTooltip] = useState("");

  const messageRef = useRef([]);

  useEffect(() => {
    if (window.innerWidth <= 700) {
      setRoomIndex(null);
    }

    console.log(allChatData);
  }, []);

  const handleOnChange = (e) => {
    setChatInput(e.target.value);
  };

  const sendChatInput = (e) => {
    e.preventDefault();
    if (chatInput === "") {
      return;
    }
    const data = {
      fromAdmin: true,
      text: chatInput,
      time: new Date(),
      roomId: roomId,
    };
  };

  const filterOnSearch = (value) => {
    const search = [];
    for (let i in constAllChatData) {
      if (constAllChatData[i].chatName.toLowerCase().includes(value)) {
        search.push(constAllChatData[i]);
      }
    }
    setAllChatData(search);
  };
  const sortDateChat = [...allChatData];
  if (allChatData.length > 0) {
    sortDateChat.sort((a, b) => {
      var dateA = new Date(a.chatContent[a.chatContent.length - 1].time);
      var dateB = new Date(b.chatContent[b.chatContent.length - 1].time);
      return dateB - dateA;
    });
  }
  return (
    <div className="boxchat-admin flex">
      <div className="boxchat-left">
        <div className="boxchat-search">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              filterOnSearch(e.target.value);
            }}
          />
        </div>
        <div className="boxchat-list">
          {sortDateChat.length > 0 &&
            sortDateChat.map((item, index) => {
              const date = new Date(
                item.chatContent[item.chatContent.length - 1].time,
              );
              const toDay = new Date();
              const day = date.getDay();
              const dayInMonth = date.getDate();
              const month = date.getMonth() + 1;
              const hour = date.getHours();
              const minute = date.getMinutes();
              let strTime = "";
              if (dayInMonth === toDay.getDate()) {
                if (hour < 10) {
                  strTime += `- 0${hour}`;
                } else {
                  strTime += `- ${hour}`;
                }
                if (minute < 10) {
                  strTime += `:0${minute}`;
                } else {
                  strTime += `:${minute}`;
                }
              }
              if (dayInMonth < toDay.getDate()) {
                strTime = `- T${day}`;
              }
              if (toDay.getDate() - dayInMonth > 6) {
                strTime = "";
                if (dayInMonth < 10) {
                  strTime += `- 0${dayInMonth}`;
                } else {
                  strTime += `- ${dayInMonth}`;
                }
                if (month < 10) {
                  strTime += `/0${month}`;
                } else {
                  strTime += `/${month}`;
                }
              }
              return (
                <div
                  key={index}
                  className={
                    roomIndex === index
                      ? "boxchat-item flex boxchat-item-active"
                      : "boxchat-item flex"
                  }
                  onClick={() => {
                    setRoomId(item.sessionId);
                    setRoomIndex(index);
                    setTimeout(() => {
                      if (messageRef.current)
                        messageRef.current.scrollIntoView({
                          behavior: "smooth",
                        });
                    }, 10);
                  }}
                >
                  <div
                    className="boxchat-avt flex-center"
                    style={{ pointerEvents: "none" }}
                  >
                    {item.userInfo && (
                      <img src={item.userInfo.userAvt} alt=""></img>
                    )}
                    {!item.userInfo && (
                      <img
                        src={
                          "http://pe.heromc.net:4000/images/16f9bbf512b66a228f7978e34d8fb163"
                        }
                        alt=""
                      ></img>
                    )}
                  </div>
                  <div
                    className="flex-col"
                    style={{
                      pointerEvents: "none",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="boxchat-name">{item.chatName}</p>
                    <div className="boxchat-first flex">
                      {item.chatContent[item.chatContent.length - 1]
                        .fromAdmin === true && (
                        <p>
                          Bạn:{" "}
                          {item.chatContent[item.chatContent.length - 1].text}
                        </p>
                      )}
                      {!item.chatContent[item.chatContent.length - 1]
                        .fromAdmin && (
                        <p>
                          {item.chatContent[item.chatContent.length - 1].text}
                        </p>
                      )}
                      <p>{strTime}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {typeof roomIndex === "number" && window.innerWidth <= 700 && (
        <div className="boxchat-mobile flex">
          <div className="boxchat-mobile-header flex">
            <div
              className="boxchat-mobile-header-leave"
              onClick={() => {
                setRoomIndex(null);
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ pointerEvents: "none" }}
              />
            </div>
            {sortDateChat.length > 0 && (
              <div className="boxchat-box-info">
                <div className="boxchat-box-avt flex-center">
                  {sortDateChat[Number(roomIndex)].userInfo && (
                    <img
                      src={sortDateChat[Number(roomIndex)].userInfo.userAvt}
                      alt=""
                    ></img>
                  )}
                  {!sortDateChat[Number(roomIndex)].userInfo && (
                    <img
                      src={
                        "http://pe.heromc.net:4000/images/16f9bbf512b66a228f7978e34d8fb163"
                      }
                      alt=""
                    ></img>
                  )}
                </div>
                <div className="flex-center">
                  {sortDateChat[Number(roomIndex)].userInfo && (
                    <p className="boxchat-name">
                      {sortDateChat[Number(roomIndex)].chatName}
                    </p>
                  )}
                  {!sortDateChat[Number(roomIndex)].userInfo && (
                    <div className="flex" style={{ alignItems: "flex-end" }}>
                      <p className="boxchat-name">
                        {sortDateChat[Number(roomIndex)].chatName}
                      </p>
                      <p
                        style={{
                          marginLeft: "5px",
                          color: "#777",
                          fontSize: "16px",
                          fontFamily: "sans-serif",
                        }}
                      >
                        (anonymous)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="boxchat-mobile-main">
            <div className="boxchat-contents">
              {sortDateChat.length > 0 && (
                <div className="flex-col chat-box-list">
                  {sortDateChat[roomIndex].chatContent.map((item, index) => {
                    const date = new Date(item.time);
                    const toDay = new Date();
                    const day = date.getDay();
                    const dayInMonth = date.getDate();
                    const month = date.getMonth() + 1;
                    const hour = date.getHours();
                    const minute = date.getMinutes();
                    let chatTime = "";
                    if (dayInMonth === toDay.getDate()) {
                      if (hour < 10) {
                        chatTime += `0${hour}`;
                      } else {
                        chatTime += `${hour}`;
                      }
                      if (minute < 10) {
                        chatTime += `:0${minute}`;
                      } else {
                        chatTime += `:${minute}`;
                      }
                    }
                    if (dayInMonth < toDay.getDate()) {
                      chatTime = `T${day}`;
                    }
                    if (toDay.getDate() - dayInMonth > 6) {
                      chatTime = "";
                      if (dayInMonth < 10) {
                        chatTime += `0${dayInMonth}`;
                      } else {
                        chatTime += `${dayInMonth}`;
                      }
                      if (month < 10) {
                        chatTime += `/0${month}`;
                      } else {
                        chatTime += `/${month}`;
                      }
                    }
                    return (
                      <div ref={messageRef} key={index} className="chat-list">
                        {item.fromAdmin !== true && (
                          <div
                            className="box-chat-clienttext"
                            onMouseEnter={() => {
                              setOpenTimeTooltip(item.time);
                            }}
                            onMouseLeave={() => {
                              setOpenTimeTooltip("");
                            }}
                          >
                            <p>{item.text}</p>
                            {openTimeTooltip === item.time && (
                              <div className="time-tooltip-client flex-center">
                                <p>{chatTime}</p>
                              </div>
                            )}
                          </div>
                        )}
                        {item.fromAdmin === true && (
                          <div
                            className="box-chat-admintext"
                            onMouseEnter={() => {
                              setOpenTimeTooltip(item.time);
                            }}
                            onMouseLeave={() => {
                              setOpenTimeTooltip("");
                            }}
                          >
                            <p style={{ pointerEvents: "none" }}>{item.text}</p>
                            {openTimeTooltip === item.time && (
                              <div className="time-tooltip flex-center">
                                <p>{chatTime}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="boxchat-type boxchat-mobile-type">
            <form onSubmit={sendChatInput} className="boxchat-type-form">
              <input
                type="text"
                onChange={handleOnChange}
                value={chatInput}
                placeholder="Type your message..."
              ></input>
              <button>Send</button>
            </form>
          </div>
        </div>
      )}
      <div className="boxchat-main">
        <div className="boxchat-box">
          {sortDateChat.length > 0 && (
            <div className="boxchat-box-info">
              <div className="boxchat-box-avt flex-center">
                {sortDateChat[Number(roomIndex)].userInfo && (
                  <img
                    src={sortDateChat[Number(roomIndex)].userInfo.userAvt}
                    alt=""
                  ></img>
                )}
                {!sortDateChat[Number(roomIndex)].userInfo && (
                  <img
                    src={
                      "http://pe.heromc.net:4000/images/16f9bbf512b66a228f7978e34d8fb163"
                    }
                    alt=""
                  ></img>
                )}
              </div>
              <div className="flex-center">
                {sortDateChat[Number(roomIndex)].userInfo && (
                  <p className="boxchat-name">
                    {sortDateChat[Number(roomIndex)].chatName}
                  </p>
                )}
                {!sortDateChat[Number(roomIndex)].userInfo && (
                  <div className="flex" style={{ alignItems: "flex-end" }}>
                    <p className="boxchat-name">
                      {sortDateChat[Number(roomIndex)].chatName}
                    </p>
                    <p
                      style={{
                        marginLeft: "5px",
                        color: "#777",
                        fontSize: "16px",
                        fontFamily: "sans-serif",
                      }}
                    >
                      (anonymous)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="boxchat-contents">
            {sortDateChat.length > 0 && window.innerWidth > 700 && (
              <div className="flex-col chat-box-list">
                {sortDateChat[roomIndex].chatContent.map((item, index) => {
                  const date = new Date(item.time);
                  const toDay = new Date();
                  const day = date.getDay();
                  const dayInMonth = date.getDate();
                  const month = date.getMonth() + 1;
                  const hour = date.getHours();
                  const minute = date.getMinutes();
                  let chatTime = "";
                  if (dayInMonth === toDay.getDate()) {
                    if (hour < 10) {
                      chatTime += `0${hour}`;
                    } else {
                      chatTime += `${hour}`;
                    }
                    if (minute < 10) {
                      chatTime += `:0${minute}`;
                    } else {
                      chatTime += `:${minute}`;
                    }
                  }
                  if (dayInMonth < toDay.getDate()) {
                    chatTime = `T${day}`;
                  }
                  if (toDay.getDate() - dayInMonth > 6) {
                    chatTime = "";
                    if (dayInMonth < 10) {
                      chatTime += `0${dayInMonth}`;
                    } else {
                      chatTime += `${dayInMonth}`;
                    }
                    if (month < 10) {
                      chatTime += `/0${month}`;
                    } else {
                      chatTime += `/${month}`;
                    }
                  }
                  return (
                    <div ref={messageRef} key={index} className="chat-list">
                      {item.fromAdmin !== true && (
                        <div
                          className="box-chat-clienttext"
                          onMouseEnter={() => {
                            setOpenTimeTooltip(item.time);
                          }}
                          onMouseLeave={() => {
                            setOpenTimeTooltip("");
                          }}
                        >
                          <p>{item.text}</p>
                          {openTimeTooltip === item.time && (
                            <div className="time-tooltip-client flex-center">
                              <p>{chatTime}</p>
                            </div>
                          )}
                        </div>
                      )}
                      {item.fromAdmin === true && (
                        <div
                          className="box-chat-admintext"
                          onMouseEnter={() => {
                            setOpenTimeTooltip(item.time);
                          }}
                          onMouseLeave={() => {
                            setOpenTimeTooltip("");
                          }}
                        >
                          <p style={{ pointerEvents: "none" }}>{item.text}</p>
                          {openTimeTooltip === item.time && (
                            <div className="time-tooltip flex-center">
                              <p>{chatTime}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="boxchat-type">
          <form onSubmit={sendChatInput} className="boxchat-type-form">
            <input
              type="text"
              onChange={handleOnChange}
              value={chatInput}
              placeholder="Type your message..."
            ></input>
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
