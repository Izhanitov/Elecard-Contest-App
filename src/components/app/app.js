import { Component } from "react";

import Header from "../header/header"
import MainSection from  "../mainSection/mainSection"
import Footer from "../footer/footer";

export default class App extends Component {
    render() {
        return (
            <>
                <header className="fixed-top w-5 bg-primary bg-gradient shadow-sm">
                    <Header />
                </header>
                <section className="mt-5 ms-1 me-1 mb-5">
                    <MainSection />
                </section>                
                <footer className="fixed-bottom bg-light bg-gradient shadow-sm border-top border-secondary">
                    <Footer />
                </footer>
            </>
        )
    }
}