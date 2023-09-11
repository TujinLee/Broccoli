import React, { forwardRef, useImperativeHandle, useState } from 'react'
import './index.less'

export interface FormProps {
    children?: React.ReactNode
    submitForm: (callback: (args: any) => Promise<any>) => void
    resetForm: () => void
    setValue: (name: string, value: string) => void
    className?: React.CSSProperties | string
}

export type FormValue = Record<string, string>

const Form = forwardRef((props: FormProps, ref) => {

    const [formData, setFormData] = useState<FormValue>({})
    const [errorMsg, setErrorMsg] = useState<string>('')
    // 提交表单
    const submitForm = (callback: (args: any) => Promise<any>) => {
        callback(formData)
            .then(val => {
                console.log(val)
                setErrorMsg('')
            })
            .catch(err => {
                console.error(err)
                setErrorMsg(err)
            })
    }
    // 重置表单
    const resetForm = () => {
        const resetValue: FormValue = {}
        Object.keys(formData).forEach(item => {
            resetValue[item] = ''
        })
        setFormData(resetValue)
    };
    // 设置表单数据层
    const setValue = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        })

    };
    // 将子组件中的方法暴露给
    useImperativeHandle(ref, () => ({
        submitForm,
        resetForm,
        setValue

    }))
    return (
        <div className={'form ' + (props.className || '')}>
            {React.Children.map(props?.children, (child) => {
                if (child?.type?.type.__COMPONENT_TYPE === 'formItem') {
                    const { name } = child.props
                    const Children = React.cloneElement(child, {
                        key: name,
                        handleChange: setValue,
                        value: formData[name]
                    })
                    return Children
                }
                return child
            })}
            {errorMsg && <div className='error'>{errorMsg}</div>}
        </div>
    )
})
Form.__COMPONENT_TYPE = 'form'

export default React.memo(Form)
