"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useSession } from "next-auth/react"
import { dateFormat } from '@/lib/dateFormat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toolbar from "@/modules/PageToolbar";
import Content from '@/modules/Content';

import Link from "next/link";
// import ManagementTable from "@/modules/ManagementTable"
import { Button, Chip, Loading } from "@/components";
// import { Switch } from "antd";
import { ManagementDrawer, OrderList } from '@/modules';
// import OrderList from '@/modules/OrderList';

function isTheme(value: string | undefined): value is "light" | "dark" {
    return value === "light" || value === "dark";
}

const Pages = (props: any) => {
    const { resolvedTheme } = useTheme()
    const theme = isTheme(resolvedTheme) ? resolvedTheme : "light";
    const { data: session, status } = useSession()
    const [tableBody, setTableBody] = useState([])
    const [drawerData, setDrawerData] = useState({})
    const [drawerState, setDrawerState] = useState<"open" | "close">("close");
    const [action, setAction] = useState<"add" | "edit">("add");
    const [selectedItemId, setSelectedItemId] = useState<string>("")
    const [selectedRows, setSelectedRows] = useState<string | React.Key[]>();
    const [loading, setLoading] = useState(true)

    const tableHeader = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            className: 'title'
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
            render: (value: any) => {
                return (
                    <Link href={value} target="_blank" >{value}</Link>
                )
            }
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (value: any) => {
                return (
                    <span>
                        <FontAwesomeIcon icon={value} />
                        <span>  {value}</span>
                    </span>
                )
            }
        },
        {
            title: 'Publish',
            dataIndex: 'publish',
            key: 'publish',
            // render: (value: any, data: any) => {
            //     return (
            //         // <Switch defaultChecked={data.isPublish} onChange={() => handlePublishClick(data.id, !data.isPublish)} />
            //     )
            // }
        },
        {
            title: 'Created By',
            dataIndex: 'createdByEmail',
            key: 'createdByEmail',
            render: (value: any) => {
                return <Chip theme={theme} size="M" status="default" >{value}</Chip>
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: any) => {
                const date = new Date(value);
                const formattedDate = date.toLocaleString('ro-RO', dateFormat).replace(',', '');
                return formattedDate
            }
        },
        {
            title: 'Updated By',
            dataIndex: 'updatedByEmail',
            key: 'updatedByEmail',
            render: (value: any) => {
                return <Chip theme={theme} size="M" status="default" >{value}</Chip>
            }
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (value: any) => {
                const date = new Date(value);
                const formattedDate = date.toLocaleString('ro-RO', dateFormat).replace(',', '');
                return formattedDate
            }
        },
    ]

    const getNavigationItems = async () => {
        const response = await fetch('/api/pages', { method: 'GET' });
        const data = await response.json();
        return data;
    };

    const getUserById = async (id: any) => {
        if (id) {
            const response = await fetch(`/api/users?id=${id}`, { method: 'GET' });
            const user = await response.json();
            return user;
        }
    };

    const getNavigationData = () => {
        setLoading(true)
        getNavigationItems().then((data) => {

            console.log(data.result)
            Promise.all(
                data.result.map((item: any) =>
                    Promise.all([
                        getUserById(item.createdById),
                        getUserById(item.updatedById)
                    ]).then(([createdByUser, updatedByUser]) => ({
                        ...item,
                        createdByEmail: createdByUser?.email,
                        updatedByEmail: updatedByUser?.email
                    }))
                )
            ).then((mergedData: any) => {
                const filteredData = mergedData.filter((item: any) => item.isPublish);
                console.log(filteredData)
                const parentOptions = filteredData.map((item: any) => ({
                    label: item.label,
                    value: item.id,
                }));
                console.log("Merged Data: ", mergedData)
                setTableBody(mergedData)
                setLoading(false)
                // setParent(parentOptions)
            });
        });
    }

    const publishHandler = async (id: string | string[] | React.Key[] | undefined, value: boolean) => {

        const response = await fetch(`/api/navigation?id=${id}`, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isPublish: value })
        }).then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error);
        })
    }

    const handlePublishClick = (id: string, value: boolean) => {
        publishHandler(id, value)
    }

    const handleCreateNewItem = () => {
        setAction("add")
        setDrawerState("open")
        setDrawerData({})
    }

    const handleAddItemChild = async (id: string) => {
        setSelectedRows(id)
        setAction("add")
        setDrawerState("open")
    }

    const handleEditItem = async (id: string) => {
        console.log(id)
        setSelectedRows(id)
        const item = tableBody.find((item: any) => item.id === id)

        if (item) {
            console.log("*** START TABLE ITEM ***")
            console.log(item)
            console.log("*** END TABLE ITEM ***")
            setDrawerData(item)
        } else {
            console.log("Item not found!")
        }
        setAction("edit")
        setDrawerState("open")
    }

    const handleDeleteItem = async (id: string | string[] | React.Key[] | undefined) => {
        console.log(id)
        const response = await fetch(`/api/navigation?ids=${id}`, {
            method: 'DELETE'
        }).then((data) => {
            getNavigationData()
            console.log(`Navigation item deleted successfully ${id}`);
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const stateUpdate = (newState: any) => {
        setDrawerState(newState)
    }

    const toolbarLeft = (
        <div style={{ "display": "flex", "gap": "10px" }}>
            {/* <Select id="001" placeholder="Select..." width="250px" options={fakeOptions} theme={theme} surface="2" onChange={(value: any) => console.log(value)} />
            <Select id="002" placeholder="Select..." width="250px" options={fakeOptions} theme={theme} surface="2" onChange={(value: any) => console.log(value)} />
            <Select id="003" placeholder="Select something..." width="250px" options={fakeOptions} isMulti={true} surface="2" theme={theme} onChange={(value: any) => console.log(value)} />
            <Select id="004" placeholder="Select something..." width="250px" options={fakeOptions} isMulti={true} surface="2" isSearchable={true} theme={theme} onChange={(value: any) => console.log(value)} /> */}
        </div>
    )

    const toolbarRight = (
        <>
            <Button type="button" size="M" variant="solid" status="fail" shade="100" content="icon" onClick={() => handleDeleteItem(selectedRows)} disabled={!selectedRows?.length ? true : false}>
                <FontAwesomeIcon icon="trash" />
            </Button>
            <Button type="button" size="M" variant="solid" status="accent" content="icon" onClick={() => handleCreateNewItem()}>
                <FontAwesomeIcon icon="plus" />
            </Button>
        </>
    )

    useEffect(() => {
        getNavigationData()
        // console.log("*** START TABLE BODY ***")
        // console.log(tableBody)
        // console.log("*** END TABLE BODY ***")
        // console.log(action)
    }, [])

    return (
        <>
            <Content>
                <Content.Header>
                    <Toolbar left={toolbarLeft} right={toolbarRight} />
                </Content.Header>
                <Content.Body>
                    {/* <ManagementTable theme={theme} header={tableHeader} body={tableBody} onAdd={handleAddItemChild} onEdit={handleEditItem} onDelete={handleDeleteItem} onSelectedRowKeysChange={(selectedRowKeys) => setSelectedRows(selectedRowKeys)} /> */}
                    <OrderList theme={theme} header={tableHeader} body={tableBody} onAdd={handleAddItemChild} onEdit={handleEditItem} onDelete={handleDeleteItem} onSelectedRowKeysChange={(selectedRowKeys) => setSelectedRows(selectedRowKeys)} loading={loading} />
                </Content.Body>
            </Content>
            <ManagementDrawer theme={theme} state={drawerState} session={session} action={action} data={drawerData} selectedItemId={selectedRows} onStateUpdate={stateUpdate} getNavigationData={getNavigationData} />
        </>
    )
}

export default Pages  
