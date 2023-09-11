import React from "react";
import './index.less';

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className?: React.CSSProperties | string
    loading?: boolean
    loadingText?: string
}

export default React.memo<ButtonProps>(({ children, onClick, className, loading = false, loadingText }) => {
    return <button className={'button ' + className} onClick={onClick} disabled={loading}>{loading ? loadingText : children}</button>
})