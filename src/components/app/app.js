import { Component } from "react";

import Header from "../header/header"
import MainSection from  "../mainSection/mainSection"
import Footer from "../footer/footer";

export default class App extends Component {
    render() {
        return (
            <>
                <header>
                    <Header />
                </header>
                
                <MainSection />
                
                <footer>
                    <Footer />
                </footer>
            </>
        )
    }
}