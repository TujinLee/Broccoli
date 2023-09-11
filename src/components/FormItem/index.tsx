import React, { ReactElement } from "react"
import './index.less'

interface FormItemProps {
    children?: React.ReactNode
    name: string
    handleChange?: () => void
    value?: string
    label?: ReactElement | string
}

const FormItem: React.FC<FormItemProps> & { __COMPONENT_TYPE: string } = (props) => {
    const { children, name, handleChange, value = '', label = '' } = props
    const onChange = (value) => {
        /* 通知上一次value 已经改变 */
        handleChange(name, value)
    }
    return <div className="formItem" >
        {!!label && <span>{label}:</span>}
        {
            React.isValidElement(children) && children.type.type.__COMPONENT_TYPE === 'input'
                ? React.cloneElement(children, { onChange, value })
                : null
        }
    </div>

}

FormItem.__COMPONENT_TYPE = 'formItem'

export default React.memo(FormItem)


