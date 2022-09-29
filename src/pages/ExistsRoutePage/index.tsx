import Link from "next/link";
import React from "react";

const ExistsRoutePage = () => {
    return (
        <>
            <h1>既存ルート選択ページです</h1>
            <div>
                <Link href="/CarMenuPage">
                    車メニューページ
                </Link>

            </div>
        </>
    )
}
export default ExistsRoutePage