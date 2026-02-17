import  React from "react";
import FAQPage from "@/appLayer/FAQPage/FAQPage";
import { $apiClient } from "@/shared/api/api_client";

type TResponse = {
    answer: string
    id: number
    number_of_questions: number
    question: string
}
const page = async () => {
    const response = await $apiClient.get<TResponse[]>('/faq')
    return <FAQPage faq={response.data as TResponse[]} />
}
export  default page