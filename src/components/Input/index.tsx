import React from "react"
import './index.less'

interface InputProps {
    onChange?: () => void
    value?: string
    placeholder?: string
}

const Input: React.FC<InputProps> & { __COMPONENT_TYPE: string } = ({ onChange, value, placeholder = 'please input' }) => {
    return <input className="input" placeholder={placeholder}
        onChange={(e) => (onChange && onChange(e.target.value))}
        value={value}
    />
}
// /* 给Component 增加标签 */
Input.__COMPONENT_TYPE = 'input'

export default React.memo(Input)