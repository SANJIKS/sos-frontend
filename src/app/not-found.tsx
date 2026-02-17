"use client"
import ErrorPage from '@/appLayer/ErrorPage/ErrorPage'

export default function NotFound() {
    return (
        <ErrorPage
            handel={() => window.location.href = '/'}
            title="Страница не найдена"
            message="К сожалению, запрашиваемая страница не существует или была перемещена."
            buttonName="Вернуться на главную"
        />
    )
}
