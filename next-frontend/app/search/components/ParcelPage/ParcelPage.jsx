"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

function ParcelPage( currentParcel ) {
    const params = useParams();

    return (
        <>{params.parcelpin}</>
    )
}

export default ParcelPage;