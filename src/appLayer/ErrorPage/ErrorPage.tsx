import React from 'react';
import s from './ErrorPage.module.scss';
import Image from 'next/image';

const ErrorPage = ({
    handel,
    title = "404 - Page Not Found",
    message = "The page you are looking for does not exist.",
    buttonName = "Go Back"
}: {
    handel?: () => void;
    title?: string;
    message?: string;
    buttonName?: string;
}) => {


  return (
    <div className={s.errorPage}>
        <div className={s.image}>
           <Image 
               src="/icons/error/error-page-icons.svg" 
               alt="404" 
               fill 
           />
        </div>
        <div className={s.contend}>
            <h1 className={s.title}>{title}</h1>
            <p className={s.message}>{message}</p>
            <button className={s.button} onClick={handel || (() => window.history.back())}>
                {buttonName}
            </button>
        </div>
    </div>
  );
}

export default ErrorPage;
