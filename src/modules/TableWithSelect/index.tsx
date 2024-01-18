"use client"

import { Checkbox, Table, TableActions, TableHead, TableRow, TableBody, TableCell } from "@/components";
import { useState } from "react";

const TableWithSelect = ({ dataHeading, dataBody }: any) => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]); // State to store selected row IDs
    const [indeterminate, setIndeterminate] = useState(false)
    const [selectAll, setSelectAll] = useState(false); // State to track select all checkbox


    console.log("Data Heading", dataHeading)
    console.log("Data Body", dataBody)

    const handleSelectAll = () => {
        setSelectAll((prevSelectAll) => !prevSelectAll);
        if (selectAll) {
            setIndeterminate(false)
            setSelectedRows([]);
        } else {
            setIndeterminate(false)
            setSelectedRows(dataBody.map((item: any) => item.id));
        }
    };

    const handleRowSelect = (item: any) => {
        const isSelected = selectedRows.includes(item.id);

        let updatedSelectedRows = [];
        if (isSelected) {
            updatedSelectedRows = selectedRows.filter((rowId: any) => rowId !== item.id);
        } else {
            updatedSelectedRows = [...selectedRows, item.id];
        }

        if (updatedSelectedRows.length > 0 && updatedSelectedRows.length < dataBody.length) {
            setIndeterminate(true)
            setSelectAll(false)
        } else if (updatedSelectedRows.length === dataBody.length) {
            setIndeterminate(false)
            setSelectAll(true)
        } else {
            setIndeterminate(false)
            setSelectAll(false)
        }

        setSelectedRows(updatedSelectedRows);
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell size="inline">
                        <Checkbox id="header" checked={selectAll} indeterminate={indeterminate} onChange={handleSelectAll} />
                    </TableCell>
                    {
                        dataHeading?.map((item: any) => {
                            return item.title && <TableCell key={item.key} size={item?.size} style={item?.style}>{item.title}</TableCell>
                        })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    dataBody?.map((item: any, index: number) => {

                        return (
                            <TableRow key={index}>
                                <TableCell size="inline">
                                    <Checkbox id={`body-${index}`} checked={selectedRows.includes(item.id)} indeterminate={false} onChange={() => handleRowSelect(item)} />
                                </TableCell>
                                {dataHeading.map((header: any, index: number) => {
                                    return (
                                        <TableCell key={index} size={header?.size} style={header?.style}>
                                            {header.render ? header.render(item) : item[header.key]}
                                        </TableCell>
                                    )
                                })}
                                <TableActions data={item.id} />
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export default TableWithSelect