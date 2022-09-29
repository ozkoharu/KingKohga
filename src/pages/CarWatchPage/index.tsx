import Link from "next/link";
import React from "react";

const CarWatchPage = () => {
    return (
        <>
            <h1>愛車を眺めるぜ</h1>
            <div>
                <Link href="/CarMenuPage">
                    <a>車メニューにもどっちゃうもんね</a>
                </Link>
            </div>
        </>
    )
}
export default CarWatchPage