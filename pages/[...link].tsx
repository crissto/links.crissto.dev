import type { GetServerSidePropsContext } from 'next'
import links from '../links.json'

export default function Link({ link }: { link: string }) {
  return <p>{link}</p>
}


export const getServerSideProps = async ({params}: GetServerSidePropsContext) => {
    
    if (params?.link) {
        return {
            redirect: {
                destination: (links as Record<string, string>)[params.link as string],
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


