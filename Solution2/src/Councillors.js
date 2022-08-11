

import MaterialTable from "material-table";
import React, { useEffect, useState, forwardRef } from "react";
import { Button } from "@material-ui/core";

import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import Search from '@material-ui/icons/Search';


const tableIcons = {
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
};
/*
    Thanks to material-table filtering and sorting is auto, 
    but installing & configuring the library was difficult I spent most of my time trying to find correct versions of react and packages
*/
export const Councillors = () => {

    const [isCouncillors, setIsCouncillors] = useState(true);
    const [councillors, setCouncillors] = useState([]);
    const [affairs, setAffairs] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const isMobile = window.innerWidth <= 500;

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
        <div style={{ overflow: "auto", width: "100vw", height: "100vh" }}>
            <div style={{ display: "flex", width: "100%", position: "sticky", top: 0, zIndex: 99 }}>
                <Button fullWidth style={{ fontSize: isMobile ? "1em" : "3em", backgroundColor: isCouncillors ? "black" : "white", color: isCouncillors ? "white" : "black" }} onClick={() => { setIsCouncillors(true) }}>Councillors</Button>
                <Button fullWidth style={{ fontSize: isMobile ? "1em" : "3em", backgroundColor: !isCouncillors ? "black" : "white", color: !isCouncillors ? "white" : "black" }} onClick={() => { setIsCouncillors(false) }}>Affairs</Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <MaterialTable
                    title={isCouncillors ? "Councillors" : "Affairs"}
                    data={isCouncillors ? councillors : affairs}
                    columns={isCouncillors ? councillorsColumns : affairsColumns}
                    onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                    options={{
                        search: true,
                        paging: false,
                        filtering: true,
                        rowStyle: rowData => ({
                            backgroundColor: (selectedRow === rowData.tableData.id) ? '#000' : '#FFF',
                            color: (selectedRow === rowData.tableData.id) ? '#FFF' : '#000',
                        })
                    }}
                    icons={tableIcons}


                />
            </div>

        </div>

    );
};