"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { LoaderCircle } from "lucide-react";

const ModelStatus = ({ params }: { params: Promise<{ Id: string }> }) => {
  const [modellogs, setModalLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Training");
  const scrollRef = useRef(null);
  useEffect(() => {
    const Status = async () => {
      const Id = (await params).Id;
      if (Id) {
        const intervalId = setInterval(async () => {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/model/train/status?requestId=${Id}`
          );
          if (res.status == 200) {
            setLoading(false);
            setModalLogs(res.data.status.logs);
            if (res.data.status.status == "COMPLETED") {
              setStatus("COMPLETED");
              clearInterval(intervalId);
            }
          }
        }, 2000);
      }
    };
    Status();
  }, []);

  useEffect(() => {
    if(scrollRef.current) {
      const scrollContainer : HTMLElement = scrollRef.current;
      const scrollableNode =scrollContainer.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableNode) {
        scrollableNode.scrollTop = scrollableNode.scrollHeight;
      }
    }
  }, [modellogs])
  


  return loading ? (
    <div>
      <div className="flex justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    </div>
  ) : (
    <div className="p-10">
      <div className="my-2">
        <Badge>{status}</Badge>
      </div>
      <ScrollArea ref={scrollRef} className="h-[600px] w-full rounded-md border p-4">
        {modellogs ? (
          modellogs.map((log : {timestamp : string,message : string}) => (
            <div key={log.timestamp}>
              <p>{log.message}</p>
            </div>
          ))
        ) : (
          <div>Working...</div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ModelStatus;
