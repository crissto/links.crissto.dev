import { type GetServerSidePropsContext } from "next"

export default function Home() {
    return (
        <div>Home</div>
    )
}

export const getServerSideProps = async ({params}: GetServerSidePropsContext) => {

    return {
        redirect: {
            destination: "https://crissto.dev",
            permanent: false
        }
    }
}