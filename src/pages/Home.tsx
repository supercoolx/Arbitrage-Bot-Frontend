import React from "react";
import { Container } from "components/Container";
import { Header } from "components/Header";
import TokenSelect from "components/Home/TokenSelect";
import SwapList from "components/Home/SwapList";

const Home = () => {
    return (
        <Container>
            <Header />
            <div className="flex gap-5">
                <TokenSelect />
                <SwapList />
            </div>
        </Container>
    );
};

export default Home;
