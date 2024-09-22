import { useEffect } from 'react';

const Pay = () => {
  useEffect(() => {
    // Создаем элемент script
    const script = document.createElement('script');
    script.src = "https://api.cryptocloud.plus/static/pay_btn/js/app.js";
    script.async = true;

    // Добавляем элемент script в body
    document.body.appendChild(script);

    // Возвращаем функцию для очистки при размонтировании компонента
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Pay</h1>
      <link href="https://api.cryptocloud.plus/static/pay_btn/css/app.css" rel="stylesheet" />
			{/* @ts-ignore  */}
      <vue-widget
        shop_id="oPzZZYd8ybHQChdy"
        api_key="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTWpVMk5ETT0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiJhMzg3MGYxMTVmNjhmMDQxN2RmNjRjY2VhNDlhMzE1NmE2MDc0ZjhhMjQ3OGVhYmU4YjFmYWJjY2Q1ZGI3MDBiIiwiZXhwIjo4ODEyNjU1NDY0NH0.aFLngU3Hwg7F3zkAdWgCpLtjPf8C3LJn5Riqj6V-2NE"
        background="#fff"
        color="#000"
        border_color="#000"
        logo="color"
        width="350px"
        currency="USD"
        amount="1000"
        text_btn="CryptoCloud"
      />
    </div>
  );
};

export default Pay;