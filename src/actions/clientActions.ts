import { useRouter } from "next/navigation"

export const RedirectTo = () => {
    const router = useRouter()
    router.back()
}