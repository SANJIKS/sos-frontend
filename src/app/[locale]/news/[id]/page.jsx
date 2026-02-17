
import NewsDetailsPage from '@/appLayer/NewsDetailsPage/NewsDetailsPage';
import { $apiClient } from '@/shared/api/api_client';
import { NewsItem } from '../../../../appLayer/NewsDetailsPage/type';
import axios from 'axios';

export default async function Page({ params }) {

  const res = await axios.get(`https://api.sos-kyrgyzstan.org/api/v1/news/news/${params.id}/?lang=${params.locale}`);

  if (!res.data) {
    throw new Error('Ошибка при загрузке новости');
  }

  return <NewsDetailsPage news={res.data} />;

}