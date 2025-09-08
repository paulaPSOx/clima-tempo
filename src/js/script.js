/* Configurações iniciais */
const container = document.getElementById('conteiner');
const body = document.body;
const navbar = document.querySelector('.navbar');
const footer = document.querySelector('.footer');
const apiKey = "a7fa978810324e978fc2296a960b51da";

/* Temas do dia */
const temas = {
  morning: { body: 'linear-gradient(to bottom, #1E3C72, #0078bdff, #ffdd1aff)', card: 'rgba(255, 255, 255, 0.55)', claro: true },
  afternoon: { body: 'linear-gradient(to bottom, #ffbb00ff, #4d024dff, #1e0842ff)', card: 'rgba(255, 255, 255, 0.55)', claro: true },
  night: { body: 'linear-gradient(to bottom, #1e0842ff, #020d4dff, #0b0018ff)', card: 'rgba(255,255,255,0.1)', claro: false },
  madrugada: { body: 'linear-gradient(to bottom, #0b0018ff, #020d4dff, #1E3C72)', card: 'rgba(255,255,255,0.1)', claro: false }
};

/* Retorna o período do dia */
const getPeriodo = hour => {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 23) return 'night';
  return 'madrugada';
};

/* Aplica tema de acordo com a hora */
const aplicarTema = hour => {
  const periodo = getPeriodo(hour);
  const tema = temas[periodo];

  body.classList.remove('morning', 'afternoon', 'night', 'madrugada');
  body.classList.add(periodo);

  body.style.background = tema.body;
  container.style.background = tema.card;
  navbar.style.background = tema.claro ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';
  footer.style.background = tema.claro ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';

  const textoCor = tema.claro ? '#222' : '#fff';
  navbar.style.color = textoCor;
  footer.style.color = textoCor;

  container.querySelectorAll('.col p, .col span, .cidade, .temp')
    .forEach(el => el.style.color = textoCor);

  const inputCidade = document.getElementById('nome-cidade');
  if (inputCidade) inputCidade.style.color = "#000";

  container.querySelectorAll('.col img.icon')
    .forEach(icon => {
      icon.style.filter = tema.claro ? 'invert(100%)' : 'invert(0%)';
    });

  container.style.transition = 'background 1s ease, color 1s ease';
  navbar.style.transition = 'background 1s ease, color 1s ease';
  footer.style.transition = 'background 1s ease, color 1s ease';
};

/* Mostra os dados do clima */
const mostrarClima = data => {
  document.getElementById('cidade').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temp').innerHTML = `${data.main.temp.toFixed(1).toString().replace('.', ',')}<sup>°C</sup>`;
  document.getElementById('hum-n').textContent = `${data.main.humidity}%`;
  document.getElementById('ven-n').textContent = `${data.wind.speed.toFixed(1)} km/h`;

  const clima = data.weather[0].main;
  const img = document.getElementById('img-temp');
  const icons = {
    clouds: "clouds.png",
    clear: "clear.png",
    rain: "rain.png",
    drizzle: "drizzle.png",
    mist: "mist.png",
    snow: "snow.png"
  };
  img.src = `src/imagens/${icons[clima.toLowerCase()] || "clear.png"}`;

  const nowUTC = Date.now() + new Date().getTimezoneOffset() * 60000;
  const localTime = new Date(nowUTC + data.timezone * 1000);
  aplicarTema(localTime.getHours());
};

/* Busca clima por geolocalização */
const buscarPorLocalizacao = () => {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude, longitude } = pos.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      mostrarClima(data);
    } catch (err) {
      console.error("Erro ao buscar localização:", err);
    }
  });
};

/* Busca clima por cidade */
const buscarPorCidade = async cidade => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === 200) {
      mostrarClima(data);
    } else {
      alert("Não foi possível localizar.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao buscar.");
  }
};

/* Evento do formulário de pesquisa */
document.querySelector('#pesquisar').addEventListener('submit', e => {
  e.preventDefault();
  const cidade = document.getElementById('nome-cidade').value.trim();
  if (cidade) buscarPorCidade(cidade);
});

/* Inicializa com geolocalização */
document.addEventListener('DOMContentLoaded', buscarPorLocalizacao);
