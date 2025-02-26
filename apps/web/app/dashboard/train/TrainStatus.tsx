import React, { useCallback, useEffect } from "react";
import axios from "axios";

const TrainStatus = ({ requestId }: { requestId: string }) => {

  const getLogs = useCallback(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/model/train/status?requestId=${requestId}`
    );
    return res.data;
  },[requestId]);
  
  useEffect(() => {
    setInterval(() => {
      getLogs().then((logs) => {
        console.log(logs);
      });
    }, 2000);
  }, [getLogs]);

  return <div></div>;
};

export default TrainStatus;
