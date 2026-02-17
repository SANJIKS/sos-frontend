import React from "react";
import s from "./NewsDetailsPage.module.scss";
import ShareModal from "@/shared/ui/ShareModal/ShareModal";
import { SwiperNews } from "./module";
import { NewsItem } from "./type";
// import { useParams } from "next/navigation";
const NewsDetailsPage = ({ news }: { news: NewsItem }) => {
  
 const date = new Date(news.created_at);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className={s.news}>
      <div className={s.title}>
        <span>{formattedDate}</span>
        <h1>{news.title}</h1>
        <p>{news.excerpt}</p>
      </div>

      <SwiperNews images={news.images} />

      <div className={s.description}>
        <div dangerouslySetInnerHTML={{ __html: news.content }} />
        <ShareModal />
      </div>
    </div>
  );
};

export default NewsDetailsPage;
