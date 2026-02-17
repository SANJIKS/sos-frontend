"use client";

import React, { useEffect, useState } from "react";
import s from "./Contacts.module.scss";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { logger } from '@/shared/lib/logger';

// ✅ Тип для офиса
type Office = {
    id: number;
    name: string;
    office_type: string;
    office_type_display: string;
    address: string;
    phone: string;
    email: string;
    working_hours: string;
    is_main_office: boolean;
    order: number;
};

const ContactsList = () => {
    const t = useTranslations("contacts.list");
    const [offices, setOffices] = useState<Office[]>([]);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const response = await fetch("https://api.sos-kyrgyzstan.org/api/v1/contacts/offices/");
                const data: Office[] = await response.json();
                setOffices(data);
            } catch (error) {
                logger.error("Ошибка при загрузке офисов", error);
            }
        };
        
        fetchOffices();
    }, []);

    const getGoogleMapsUrl = (address: string) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    return (
        <div className={s.contactsList}>
            <h3>{t("title")}</h3>
            <div className={s.items}>
                {offices.map((office) => (
                    <div className={s.item} key={office.id}>
                        <p>{office.name}</p>
                        <ul>
                            {office.email && (
                                <li>
                                    <MdEmail />
                                    <span>{t("common.email")}</span>
                                    <a href={`mailto:${office.email}`} target="_blank" rel="noopener noreferrer">
                                        {office.email}
                                    </a>
                                </li>
                            )}
                            {office.phone && (
                                <li>
                                    <FaPhone />
                                    <span>{t("common.phone")}</span>
                                    <a href={`tel:${office.phone}`} target="_blank" rel="noopener noreferrer">
                                        {office.phone}
                                    </a>
                                </li>
                            )}
                            {office.address && (
                                <li>
                                    <MdLocationOn />
                                    <span>{t("common.address")}</span>
                                    <a
                                        href={getGoogleMapsUrl(office.address)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {office.address}
                                    </a>
                                </li>
                            )}
                            {office.working_hours && (
                                <li>
                                    <BsFillClockFill />
                                    <span>{t("common.workingHours")}</span>
                                    <a>{office.working_hours}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactsList;
