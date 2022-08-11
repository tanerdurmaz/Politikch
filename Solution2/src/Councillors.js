

import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";

/*
    Thanks to material-table filtering and sorting is auto, 
    but installing & configuring the library was difficult I spent most of my time trying to find correct versions of react and packages
*/
export const Councillors = () => {

    const [data, setData] = useState([]);
    const columns = [
        {
            title: "ID",
            field: "id",
        },
        {
            title: "First Name",
            field: "firstName",
        },
        {
            title: "Last Name",
            field: "lastName",
        },
        /*
        {
            title: "Active",
            field: "active",
        },
        {
            title: "Official Denomination",
            field: "officialDenomination",
        },
        {
            title: "Salutation Letter",
            field: "salutationLetter",
        },
        {
            title: "Salutation Title",
            field: "salutationTitle",
        },*/
        {
            title: "Last Modified",
            field: "updated",
        },
    ];

    useEffect(() => {
        async function fillTable() {
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent("http://ws-old.parlament.ch/councillors?format=json")}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.contents)
                    setData(JSON.parse(data.contents));
                })
                .catch(console.error);
        }
        fillTable();
    }, []);



    return (
        <MaterialTable
            title="Councillors"
            data={data}
            columns={columns}
            options={{ search: true, paging: false, filtering: true, exportButton: true }}
        />
    );
};