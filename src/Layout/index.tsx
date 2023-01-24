import Footer from "./Footer"
import Header from "./Header"



type props = {
    children: React.ReactNode
}

export default function Layout({ children }: props) {

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}