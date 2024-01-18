
import { getUsers } from "@/lib/getData";
import { usersHeader } from "@/lib/tableHeader";
import { Content, TableWithSelect, Side, Toolbar } from "@/modules";
import Section from "@/modules/Section";
import { redirect } from "next/navigation";

const Users = async () => {
    const users = await getUsers();
    console.log(users)
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //     redirect('/auth/login?callbackUrl=/Users')
    // }
    // console.log(session)
    return (
        <Content>
            <Content.Header>
                <Toolbar />
            </Content.Header>
            <Content.Body orient="horizontal" leftWidth="1fr" rightWidth="300px">
                <TableWithSelect dataHeading={usersHeader} dataBody={users} />
                <Side>
                    bla bla balasdfasdf
                </Side>
            </Content.Body>
        </Content>
    );
}

export default Users