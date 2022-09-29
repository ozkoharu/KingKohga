import Link from "next/link";
import React from "react";

const CarMenuPage = () => {
    return (
        <>
            <div>
                <Link href="/DestinationMapPage">
                    <a>新規ルート開拓</a>
                </Link>
            </div>
            <div>
                <Link href="/ExistsRoutePage">
                    <a>既存ルートで行く</a>
                </Link>
            </div>
            <div>
                <Link href="/CarWatch">
                    <a>俺の愛車見ちゃうよ</a>
                </Link>
            </div>
            <div>
                <Link href="/EndPage">
                    <a>車を愛車を廃車にしちゃうぞ</a>
                </Link>
            </div>
        </>
    )
}
export default CarMenuPage;