import { Component } from "react";

import Header from "../Header/Header"
import MainSection from  "../MainSection/MainSection"
import Footer from "../Footer/Footer";

export default class App extends Component {
    render() {
        return (
            <>
                <Header />
                <MainSection />
                <Footer />
            </>
        )
    }
}