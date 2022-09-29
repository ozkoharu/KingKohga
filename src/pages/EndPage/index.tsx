import Link from "next/link";
import React from "react";

const EndPage = () => {
    return (
        <>
            <h1>ここは廃車になった愛車を眺めるところです</h1>
            <div>
                <Link href="/WelcomePage">
                    <a>次の車をえらんでくれ</a>
                </Link>
            </div>
        </>
    )
}
export default EndPage