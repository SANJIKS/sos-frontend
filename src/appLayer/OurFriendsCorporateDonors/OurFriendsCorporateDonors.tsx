import React from 'react';
import s from "./OurFriendsCorporateDonors.module.scss";
import CorporateDonorsGrid from '@/appLayer/CorporateDonorsGrid/CorporateDonorsGrid';

const OurFriendsCorporateDonors = () => {
    return (
        <div className={s.ourFriendsCorporateDonors}>
            <div className={s.info}>
                <CorporateDonorsGrid />
            </div>
        </div>
    )
}

export default OurFriendsCorporateDonors;