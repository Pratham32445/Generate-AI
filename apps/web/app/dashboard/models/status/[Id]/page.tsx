"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ModelStatus = ({ params }: { params: Promise<{ Id: string }> }) => {
  const [modellogs, setModalLogs] = useState([]);
  useEffect(() => {
    const Status = async () => {
      const Id = (await params).Id;
      if (Id) {
        const intervalId = setInterval(async () => {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/model/train/status?requestId=${Id}`
          );
          if (res.status == 200) {
            setModalLogs(res.data.status.logs);
            if (res.data.status.status == "COMPLETED") {
              clearInterval(intervalId);
            }
          }
        }, 2000);
      }
    };
    Status();
  }, []);

  return (
    <div>
      {modellogs &&
        modellogs.map((log) => (
          <div key={log.timestamp}>
            <p>{log.message}</p>
          </div>
        ))}
    </div>
  );
};

export default ModelStatus;
