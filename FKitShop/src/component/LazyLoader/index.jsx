import { Spin } from "antd"
import { Suspense } from "react"


const LazyLoader = ({ children }) => {
    return (
        <Suspense
            fallback={
                <>
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(255,255,255,0.5)]">
                        <Spin size="large" />
                    </div>
                </>
            }>
                {children}
        </Suspense>
    )
}

export default LazyLoader;