'use client';

import { convertDateObjectToLabel } from "../../utils/utilities.js";
import ParcelInfoHeaderBox from "./ParcelInfoHeaderBox";
import EnforcementCard from "./EnforcementCard";
import styles from './parcelpin.module.css';
// import PageSelectorButton from "../components/PageSelectorButton/PageSelectorButton.jsx";
import { useState } from "react";
import PageSelectorButtonWrapper from "../components/PageSelectorButton/PageSelectorButtonWrapper.js";

export default function ParcelPage({ parcel }) {    
    const transferDate = convertDateObjectToLabel(new Date(parcel.last_transfer_date));
    const infoBoxes = [
        ['Parcel ID', parcel.parcel],
        ['Parcel Owner', parcel.parcel_owner],
        ['Last Transfer Date', transferDate],
        ['Tax Delinquency', parcel.taxdelinquencyamount || 0],
    ];
    
    const enforcement = [
        ['Civil Tickets', parcel.civil_tickets],
        ['Code Violations', parcel.code_violations],
        ['311 Complaints', parcel.complaints_311],
        ['Health Complaints', parcel.complaints_health],
    ];

    return (
        <>
            <PageSelectorButtonWrapper
                currentRoute={''}  // Overview page
                parcelpin={parcel.parcel}
            />

            <div className={styles.parcelInfoHeader}>
                {infoBoxes.map((row) => ( 
                    <ParcelInfoHeaderBox 
                        key={row[0]}
                        label={row[0]}
                        value={row[1]}
                    />
                ))}            
            </div>
            <div className={styles.cardWrapper}>
                {enforcement.map((row) => (
                    <EnforcementCard 
                        key={row[0]}
                        label={row[0]}
                        value={row[1]}
                    />
                ))} 
            </div>
        </>
    )
}
