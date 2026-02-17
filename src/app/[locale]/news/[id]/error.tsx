'use client' 
import ErrorPage from '@/appLayer/ErrorPage/ErrorPage'
export default function Error({error,reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
 <ErrorPage 
    title={"Страница не найдена"}
    handel={()=>reset()}
    message={error.message || "Извините, произошла ошибка. Пожалуйста, попробуйте еще раз."}
    buttonName='Попробовать снова'
 />
  )
}