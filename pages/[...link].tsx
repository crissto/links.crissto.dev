import { readFile } from 'fs/promises'
import type { GetServerSidePropsContext } from 'next'

export default function Link({ link }: { link: string }) {
  return <p>{link}</p>
}


export const getServerSideProps = async ({params}: GetServerSidePropsContext) => {
    const links = await readFile("links.json", "utf-8")
    const jsonLinks = JSON.parse(links)

    if (params?.link) {
        return {
            redirect: {
                destination: jsonLinks[params.link as string],
                permanent: false
            }
        }
    }

    return {
        redirect: {
            destination: "https://crissto.dev",
            permanent: false
        }
    }
}


