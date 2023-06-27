ymaps.ready(function () {
  var myMap = new ymaps.Map(
    "map",
    {
      center: [59.931887, 30.333488],
      zoom: 12.5,
    },
    {
      searchControlProvider: "yandex#search",
    }
  );

  // Создаём шаблон Icon.
  var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div style="color: #FFFFFF; font-weight: bold;"><i>$[properties.iconContent]</i></div>'
  );

  var addresses = [
    {
      address: "г. Санкт-Петербург, 2-я Советская улица, 25А",
      balloonContent: "2-я Советская улица, 25А",
    },
    {
      address: "г. Санкт-Петербург, Наличная ул., 28/16Б",
      balloonContent: "Наличная ул., 28/16Б",
    },
    {
      address: "г. Санкт-Петербург, Московский проспект, 130",
      balloonContent: "Московский проспект, 130",
    },
  ];

  // Итерируемся по массиву объектов с адресами и создаем метки на карте.
  addresses.forEach((address) => {
    // Создаем экземпляр геокодера.
    var myGeocoder = ymaps.geocode(address.address);

    // Обрабатываем результаты геокодирования.
    myGeocoder
      .then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);

        var myPlacemark = new ymaps.Placemark(
          firstGeoObject.geometry.getCoordinates(),
          {
            balloonContent: address.balloonContent,
          },
          {
            iconLayout: "default#imageWithContent",
            iconImageHref: "../assets/img/point.svg",
            iconImageSize: [29, 42],
            iconImageOffset: [-12, -24],
            iconContentOffset: [15, 15],
            iconContentLayout: MyIconContentLayout,
          }
        );

        // Добавляем метку на карту.
        myMap.geoObjects.add(myPlacemark);
      })
      .catch(function (err) {
        console.error("error:" + err);
      });
  });

  const elements = document.querySelectorAll('[id="address-btn"]');

  Array.prototype.forEach.call(elements, function (element) {
    element.addEventListener("click", function () {
      const lat = parseFloat(this.getAttribute("data-lat"));
      const lng = parseFloat(this.getAttribute("data-lng"));
      myMap.setZoom(16);
      myMap.panTo([lat, lng], {
        flying: true,
        duration: 500,
      });
    });
  });
});
