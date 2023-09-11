import Button from '@/components/Button';
import Form, { FormProps, FormValue } from '@/components/Form';
import FormItem from '@/components/FormItem';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { isEmptyObject, isExitNullValue } from '@/utils';
import request from '@/utils/request';
import { useCallback, useRef, useState } from 'react';
import './index.less';

export default function Homepage() {
    const form = useRef<FormProps>(null)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [btnLoading, setBtnLoading] = useState<boolean>(false)
    const [isRegistered, setIsRegistered] = useState<boolean>(false)

    const closeModal = useCallback(() => {
        setModalVisible(false)
        setBtnLoading(false)
        setIsRegistered(false)
    }, [])

    const openModal = () => {
        setModalVisible(true)
    }

    const submit = () => {
        /* 表单提交 */
        form.current?.submitForm((formValue: FormValue) => {
            console.log(formValue)
            let err: string = ''
            if (!formValue || isEmptyObject(formValue) || isExitNullValue(formValue)) {
                err = 'All fields are required'
                return Promise.reject(err)
            }
            const { fullName, email, confirmEmail } = formValue
            if (fullName.length < 3) {
                err = 'Full Name must be at least 3 characters'
                return Promise.reject(err)
            }
            if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
                err = 'Invalid email format'
                return Promise.reject(err)
            }
            if (email !== confirmEmail) {
                err = 'Email and confirm Email do not match'
                return Promise.reject(err)
            }

            //request
            setBtnLoading(true)
            return request({
                url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
                data: {
                    name: formValue.fullName,
                    email: formValue.email
                }
            }).then(val => {
                if (val === 'Registered') {
                    setIsRegistered(true)
                }
                return true
            }).catch(err => {
                throw err
            }).finally(() => {
                setBtnLoading(false)
            })

            // return Promise.resolve(true)
        })
    }
    // const reset = () => {
    //     /* 表单重置 */
    //     form.current?.resetForm()
    // }

    const formElm = (<Form ref={form}>
        <FormItem name="fullName"
        >
            <Input placeholder='Full Name' />
        </FormItem>
        <FormItem name="email"
        >
            <Input placeholder='Email' />
        </FormItem>
        <FormItem name="confirmEmail"
        >
            <Input placeholder='Confirm Email' />
        </FormItem>
        <Button className='formBtn' onClick={submit} loading={btnLoading} loadingText='Sending,Please wait...'>Send</Button>
    </Form>)

    const successTips = (
        <div>
            <div className='tips'>You will be one of the first to experience Broccoli & Co. When we launch.</div>
            <Button className='formBtn' onClick={closeModal}>OK</Button>
        </div>
    )

    return (
        <div className='container'>
            <div className='header'>
                <div className='title'>Broccoli & Co</div>
            </div>
            <div className='middle'>
                <div className='content'>
                    <div className='big'>A better way to enjoy every day.</div>
                    <div className='small'>Be the first to know when we launch.</div>
                    <Button className='launch' onClick={openModal}>Request an invite</Button>
                </div>
            </div>
            <div className='footer'>
                <div>Made with ♥ in Melbourne.</div>
                <div>© 2016 Broccoli & Co. All rights reserved.</div>
            </div>
            <Modal visible={modalVisible} closeModal={closeModal}>
                <div className='resForm'>
                    <div className='formTitle'>{isRegistered ? 'All done!' : 'Request an invite'}</div>
                    <div>{isRegistered ? successTips : formElm}</div>
                </div>
            </Modal>

        </div>
    )
}