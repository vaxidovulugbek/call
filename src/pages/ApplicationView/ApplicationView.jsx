import React from 'react'
import './ApplicationView.scss'
import call from 'assets/images/svg/call-Button.svg'
function ApplicationViev() {
  return (
    <div className='app-view row'>
      <div className='app-view__info'>
          <div className='app-view__info-application'>
              <div className='d-flex justify-content-between'>
                <p className='app-view__info-text'>Zayavka #1494482</p>
                <img className='app-view__info-img' src={call} alt="call" />
              </div>
              <p className='app-view__info-id'>#1494482</p>
              <p className='app-view__info-unsorted'>Tartiblanmagan <span>(23.12.2022)</span></p>
              <div className='app-view__info-lines d-flex'><span className='app-view__info-fline'></span><span className='app-view__info-lline'></span></div>
          </div>
          <div className='app-view__info-content'>
            <div className='app-view__info-user'>
              <div className='app-view__info-item d-flex align-items-center'>
                <p className='app-view__info-subtext'>Менеджер:</p>
                <p className='app-view__info-userName'>Хамидов Каримбой</p>
              </div>
              <div className='app-view__info-item'>
                  <div className='d-flex align-items-center justify-content-between app-view__info-item-top'>
                      <p className='app-view__info-subtext'>Izzat Rakhmatov</p>
                      <p className='app-view__info-subtext'>23.12.2022</p>
                  </div>
                  <div className='d-flex'>
                      <div>
                          <p className='app-view__info-item-subtext'>ФИО:</p>
                          <p className='app-view__info-item-subtext'>Номер телефона:</p>
                          <p className='app-view__info-item-subtext'>Тема обращении:</p>
                          <p className='app-view__info-item-subtext'>Канал рекламы:</p>
                      </div>
                      <div>
                          <p className='app-view__info-item-text'>Хамидов Каримбой</p>
                          <p className='app-view__info-item-text'>+998 93 741 44 41</p>
                          <p className='app-view__info-item-text'>Обучение за рубежом</p>
                          <p className='app-view__info-item-text'>Facebook</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
      </div>

      <div className='app-view__content'>
        <div className='app-view__content-scroll'>
        <span className='app-view__content-top'><p>Сегодня</p></span>
        <div className='app-view__content-main'>
            <p className='app-view__content-text'>Сегодня 14:55 создан заявка</p>
            <div className='app-view__content-item'>
              <div className='app-view__info-item-top d-flex align-items-center justify-content-between'>
                <p className='app-view__info-subtext'>Izzat Rakhmatov</p>
                <p className='app-view__info-subtext'>23.12.2022</p>
              </div>
              <div className='d-flex'>
                  <div>
                      <p className='app-view__content-item-subtext'>ФИО:</p>
                      <p className='app-view__content-item-subtext'>Номер телефона:</p>
                      <p className='app-view__content-item-subtext'>Тема обращении:</p>
                      <p className='app-view__content-item-subtext'>Канал рекламы:</p>
                      <p className='app-view__content-item-subtext'>Описание:</p>
                  </div>
                  <div>
                      <p className='app-view__info-item-text'>Хамидов Каримбой</p>
                      <p className='app-view__info-item-text'>+998 93 741 44 41</p>
                      <p className='app-view__info-item-text'>Обучение за рубежом</p>
                      <p className='app-view__info-item-text'>Facebook</p>
                      <p className='app-view__info-item-text'>Chet elda o’qishni xohlaydi, lekin IELTS va TOEFL sertifikatlari yo’q</p>
                  </div>
              </div>
            </div>
       
            <p className='app-view__content-subtext'>Сегодня 14:57 Администратор для поля “Канал реклама” установил значение</p>
            <p className='app-view__content-subtext'>Сегодня 14:58 Администратор назначил ответственный менеджер “Хамидов Каримбой”</p>
            <p className='app-view__content-subtext'>Сегодня 14:58 от: Администратор кому:ответственный менеджер “Хамидов Каримбой”:  <span> Ingliz tili kursiga yozib qo’ying, 6 oy davomiylikdagi kursimizga</span></p>
          </div>
        </div>
        <div className='app-view__content-area'>
          <p className='app-view__content-subtext'><span className='app-view__content-bl'>Чат</span> для <span className='app-view__content-bl'>Хамидов Каримбой</span>: <span className='app-view__content-bold'>Ingliz tili kursiga yozib qo’ying, 6 oy davomiylikdagi kursimizga</span></p>
          <textarea className="app-view__content-textarea" name="chatarea"></textarea>
        </div>
      </div>
    </div>
  )
}

export default ApplicationViev