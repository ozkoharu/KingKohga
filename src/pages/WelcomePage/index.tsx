import Link from "next/link"
import React from "react"
import { BaseHeader } from "../../component/template/Header/BaseHeader"
const WelcomePage = () => {
    return (
        <>
            <div>
                <Link href="/CarMenuPage">
                    <a>車を使う</a>
                </Link>
            </div>
            <div>
                <Link href="/CarManagePage">
                    <a>車管理マネージャ</a>
                </Link>
            </div>
        </>
    )
}
export default WelcomePage;