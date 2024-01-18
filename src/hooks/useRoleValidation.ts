import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

const useRoleValidation = async (pageRoles: string[]) => {
    const session = await getServerSession(options)
    const userRoles = session?.user.roles
    const isSuccess = userRoles?.some((role: string) => pageRoles?.includes(role));

    return [isSuccess];

}

export default useRoleValidation;