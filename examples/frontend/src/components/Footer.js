import React from "react";


const Footer = () => {
  return (
    <div class="container-lg mt-auto">
      <div class="row justify-content-center">
        <div class="col col-sm-6 col-md-3 text-center">
          <p>
            <strong>TODO-заметки для проектов</strong>
          </p>
          <p>
            <ul class="list-unstyled">
              <li><a href="#">Домашняя</a></li>
              <li><a href="#">Новости</a></li>
              <li><a href="#">Войти</a></li>
            </ul>
          </p>
        </div>
        <div class="col-sm-6 col-md-3 text-center">
          <p>
            <strong>Для исследователей</strong>
          </p>
          <p>
            <ul class="list-unstyled">
              <li><a href="#">Положения &amp; Условия</a></li>
              <li><a href="#">Конфиденциальность &amp; Cookies</a></li>
              <li><a href="#">Документация по API</a></li>
              <li><a href="#">Документация по сайту</a></li>
            </ul>
          </p>
        </div>
        <div class="col-sm-6 col-md-3 text-center">
          <p>
            <strong>Мы в социальных сетях</strong>
          </p>
          <p>
            <div class="row justify-content-around">
              <div><a href="#"><i class="fab fa-vk fa-2x"></i></a></div>
              <div><a href="#">
                <i class="fab fa-odnoklassniki fa-2x"></i></a>
              </div>
              <div><a href="#"><i class="fab fa-github fa-2x"></i></a></div>
            </div>
          </p>
          <p>
            <strong>Приложение</strong>
          </p>
          <p>
            <div class="row justify-content-around">
              <div><a href="#"><i class="fab fa-app-store fa-2x"></i></a></div>
              <div><a href="#">
                <i class="fab fa-google-play fa-2x"></i></a>
              </div>
              <div><a href="#"><i class="fab fa-windows fa-2x"></i></a></div>
            </div>
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div>
          <p><small>2022 &copy; All rights reserved</small></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;