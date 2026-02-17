import React from 'react';
import s from './Question.module.scss';
import Button from "@/shared/ui/Button/Button";

const Question = () => {
    return (
        <section className={s.container}>
            <h1>Остались вопросы? Напишите нам!</h1>
            <p>Если у вас есть какие-либо вопросы или вам нужна дополнительная информация, наша команда готова помочь!
                Не стесняйтесь обращаться к нам с вашими вопросами, и мы ответим вам как можно скорее. Ваше любопытство
                и взаимодействие имеют для нас большое значение, поскольку мы вместе работаем над поддержкой детей и
                семей. Смело задавайте вопросы, и давайте вместе оказывать положительное воздействие!</p>
            <Button theme={'red'} className={s.btn}>Связаться с нами</Button>
        </section>
    );
};

export default Question;