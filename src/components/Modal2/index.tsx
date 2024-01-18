'use client'
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import { IPropsModal } from './interface';
import sx from '@/styles/component.module.scss';


const Modal2 = ({ children }: IPropsModal) => {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.back()
    }, [router])

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss()
            }
        },
        [onDismiss, overlay, wrapper]
    )

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss()
        },
        [onDismiss]
    )

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onKeyDown])

    return (
        <div className={sx["modal2"]} ref={overlay} onClick={onClick}>
            <div className={sx["modal2-outer"]} ref={wrapper}>
                {/* {title && <h2 className={sx["modal-title"]}>{title}</h2>} */}
                {/* {onClose &&
                    <div className={sx["modal-close-button"]}>
                        <Button type="button" mode="secondary" variant="solid" status="accent" shade="100" size="XS" content="icon" onClick={onClose} >
                            <Icon value="close" />
                        </Button>
                    </div>
                } */}
                <div className={sx["modal2-inner"]}>
                    {children}
                </div>
                {/* <div className={sx["modal-actions"]}>
                    <Button type="button" mode="secondary" variant="outline" status="accent" shade="150" size="S" content="text" onClick={onCancel}><Icon value="close" /> Cancel</Button>
                    <Button type="submit" mode="primary" variant="solid" status="fail" size="S" content="text" onClick={onConfirm} ><Icon value="trash" /> Delete</Button>
                </div> */}
            </div>
        </div>
    )
}

export default Modal2
