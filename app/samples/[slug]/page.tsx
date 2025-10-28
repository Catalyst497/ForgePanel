"use client";
import React, { useEffect, useState } from "react";
import { useAppStore } from "../../hooks/useAppStore";
import { useRouter } from "next/navigation";
import { ChevronLeftCircle } from "lucide-react"; // Icons
import { Door } from "@/app/Types";


const doorDetails = ({ params }: any) => {
  const {doors} = useAppStore()
  const router = useRouter();

  const [model, setModel] = useState<null | Door | undefined>(null);
  useEffect(() => {
    // If doors isn't loaded, redirect user
    if (!doors || doors.length === 0) {
      router.push("/"); 
      return;
    }

    const found = doors.find((door: Door) => door.slug === params.slug);
    if (!found) {
      router.push("/"); // redirect if slug not found
    } else {
      setModel(found);
    }
  }, [doors, params.slug, router]);
  return (
    <div>
      <button
        type="button"
        className="samples-back-btn py-2 px-4 mr-auto flex gap-1"
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeftCircle /> <span> Back</span>
      </button>
      <h1 className="capitalize mt-10">{model?.name}</h1>
      <img src={model?.image} alt={model?.name} className="h-[15rem] mt-8" />
      <div className="py-8">Price: ${model?.price}</div>
    </div>
  );
};

export default doorDetails;
