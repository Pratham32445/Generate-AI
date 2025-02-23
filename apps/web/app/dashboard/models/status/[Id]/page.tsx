import React from "react";
import axios from "axios";

const ModelStatus = async ({
  params,
}: {
  params: Promise<{ Id: string }>;
}) => {
  const Id = (await params).Id;
  
  const getStatus = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/model/train/status?requestId=${Id}`
    )
  };
  getStatus();
  return <div>
  </div>;
};

export default ModelStatus;
