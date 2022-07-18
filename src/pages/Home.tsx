import React from "react";
import { Header } from "components/Header";
import TokenSelect from "components/Home/TokenSelect";
import SwapList from "components/Home/SwapList";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex gap-5">
                <TokenSelect />
                <SwapList />
            </div>
        </div>
    );
};

export default Home;
