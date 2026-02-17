"use client"
import React, { useState } from 'react'
import s from './ShareModal.module.scss'

import {
    TelegramShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    FacebookShareButton,
    TelegramIcon,
    WhatsappIcon,
    TwitterIcon,
    FacebookIcon,
} from "next-share";
import { usePathname } from 'next/navigation';
import { IoShareSocialOutline } from 'react-icons/io5';
const ShareModal = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const shareUrl = typeof window !== "undefined"
        ? window.location.origin + pathname
        : "";
    return (
        <>
            <button className={s.shareBtn} onClick={() => setOpen(true)}>
                <IoShareSocialOutline fill="#00AEEF" />
                Поделиться
            </button>
            {
                open && (
                    <div className={s.shareModal}>
                        <div className={s.modalContent}>
                            <h3>Поделиться через:</h3>

                            <div className={s.buttons}>
                                <TelegramShareButton url={shareUrl}  >
                                    <div className={s.option}>
                                        <TelegramIcon size={32} round />
                                        <span>Telegram</span>
                                    </div>
                                </TelegramShareButton>

                                <WhatsappShareButton url={shareUrl} separator=":: ">
                                    <div className={s.option}>
                                        <WhatsappIcon size={32} round />
                                        <span>WhatsApp</span>
                                    </div>
                                </WhatsappShareButton>

                                <TwitterShareButton url={shareUrl}  >
                                    <div className={s.option}>
                                        <TwitterIcon size={32} round />
                                        <span>Twitter</span>
                                    </div>
                                </TwitterShareButton>
                                <FacebookShareButton url={shareUrl} >
                                    <div className={s.option}>
                                        <FacebookIcon size={32} round />
                                        <span>Facebook</span>
                                    </div>
                                </FacebookShareButton>
                            </div>

                            <button className={s.closeBtn} onClick={() => setOpen(false)}>
                                Закрыть
                            </button>
                        </div>
                    </div>
                )
            }

        </>

    )
}

export default ShareModal