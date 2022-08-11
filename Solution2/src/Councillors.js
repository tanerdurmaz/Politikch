

import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

/*
    Thanks to material-table filtering and sorting is auto, 
    but installing & configuring the library was difficult I spent most of my time trying to find correct versions of react and packages
*/
export const Councillors = () => {

    const [isCouncillors, setIsCouncillors] = useState(true);
    const [councillors, setCouncillors] = useState([]);
    const [affairs, setAffairs] = useState([]);

    const councillorsColumns = [
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
        {
            title: "Last Modified",
            field: "updated",
        },
    ];

    const affairsColumns = [
        {
            title: "ID",
            field: "id",
        },
        {
            title: "Short Id",
            field: "shortId",
        },
        {
            title: "Last Modified",
            field: "updated",
        },
    ];


    useEffect(() => {
        //since data is small I fetch at the start instead of after button click 
        async function fillTable() {
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent("http://ws-old.parlament.ch/councillors?format=json")}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.contents)
                    setCouncillors(JSON.parse(data.contents));
                })
                .catch(console.error);

            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent("http://ws-old.parlament.ch/affairs?format=json")}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.contents)
                    setAffairs(JSON.parse(data.contents));
                })
                .catch(console.error);
        }
        fillTable();
    }, []);



    return (
        <div>
            <div style={{ display: "flex", width: "100%", }}>
                <Button fullWidth style={{ fontSize: "3em" }} onClick={() => { setIsCouncillors(true) }}>Councillors</Button>
                <Button fullWidth style={{ fontSize: "3em" }} onClick={() => { setIsCouncillors(false) }}>Affairs</Button>
            </div>

            <MaterialTable
                title={isCouncillors ? "Councillors" : "Affairs"}
                data={isCouncillors ? councillors : affairs}
                columns={isCouncillors ? councillorsColumns : affairsColumns}
                options={{ search: true, paging: false, filtering: true, exportButton: true }}
            />
        </div>

    );
};