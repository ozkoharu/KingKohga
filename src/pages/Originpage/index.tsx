import React, { useContext, useEffect } from "react";
import { LoadingContext, PageStateContext } from "..";
import { PageLoading } from "../../component/hooks/pageLoading";
import AddRoutePage from "../AddRoutePage";
import CarKanri from "../CarKanri";
import CarMenuPage from "../CarMenuPage";
import CarWatchPage from "../CarWatchPage";
import DestinationMapPage from "../DestinationMapPage";
import EndPage from "../EndPage";
import ExistsRoutePage from "../ExistsRoutePage";
import WelcomePage from "../WelcomePage";


const OriginPage = () => {
    const { page, setPage } = useContext(PageStateContext);
    const { pageLoading, setPageLoading } = useContext(LoadingContext);
    useEffect(() => {
        setPageLoading(true);
    }, []);

    if (page === 0 || page === 8) {

        return (
            <>
                <WelcomePage />
            </>

        )
    } else if (page === 1) {
        return (
            <CarMenuPage />
        )
    } else if (page === 2) {
        return (
            <DestinationMapPage />
        )
    } else if (page === 3) {
        return (
            <ExistsRoutePage />
        )
    } else if (page === 4) {
        return (
            <AddRoutePage />
        )
    } else if (page === 5) {
        return (
            <CarWatchPage />
        )
    } else if (page === 6) {
        return (
            <EndPage />
        )
    } else if (page === 7) {
        return (
            <CarKanri />
        )
    } else {
        /*　NEVER REACHED */
        void 0;
    }
    return <></>
}
export default OriginPage