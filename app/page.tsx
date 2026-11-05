import { Fragment } from "react";
import AnnotatedLogo from "./AnnotatedLogo";
import { LeadFormProvider, OpenLeadForm } from "./LeadForm";
import NerDemo from "./NerDemo";

function LogoMark() {
  return (
    <svg viewBox="0 0 640 640" aria-hidden="true">
      <path d="M180 48 L552 348 L332 414 Z" fill="#f4f4f5" stroke="#f4f4f5" strokeWidth="24" strokeLinejoin="round" />
      <path d="M116 540 L578 400 L466 540 Z" fill="#f4f4f5" stroke="#f4f4f5" strokeWidth="24" strokeLinejoin="round" />
    </svg>
  );
}

const FLOW = ["Файлы CSV · TXT", "Единая схема полей", "Пайплайн моделей", "Проверка на эталоне"];
const EXPORTS = ["JSONL", "CSV", "Hugging Face Datasets", "Parquet"];

const SECURITY = [
  { title: "Установка у вас", text: "Платформа разворачивается на ваших серверах, без доступа в интернет." },
  { title: "Локальные модели", text: "LLM и BERT работают на ваших GPU. Тексты не уходят во внешние API." },
  { title: "Хранение в России", text: "Облачная версия размещена в российских дата-центрах." },
];

const STEPS = [
  { title: "Заявка", text: "Опишите задачу и объём данных. Ответим в течение рабочего дня.", cls: "active" },
  { title: "Демо на ваших данных", text: "Размечаем пробную выборку и показываем точность на эталоне.", cls: "next" },
  { title: "Доступ к платформе", text: "Открываем рабочее пространство в облаке или разворачиваем у вас.", cls: "" },
];

export default function Home() {
  return (
    <LeadFormProvider>
      <div id="top" className="page">
        <header className="header">
          <nav className="nav">
            <a href="#top" className="brand">
              <LogoMark />
              <span>ANNOTICA</span>
            </a>
            <div className="nav-links">
              <a href="#corpus">Корпус</a>
              <a href="#top">О компании</a>
              <a href="#contacts">Контакты</a>
            </div>
            <div className="nav-actions">
              <OpenLeadForm className="btn-primary btn-sm">Оставить заявку</OpenLeadForm>
              <span className="login" title="Вход откроется позже" aria-disabled="true">
                Войти<span className="soon-badge">СКОРО</span>
              </span>
            </div>
          </nav>
        </header>

        <main className="main">
          <section className="hero">
            <AnnotatedLogo />
            <div className="hero-text">
              <h1 className="wordmark">ANNOTICA</h1>
              <p className="lead">
                Мультимодальная платформа и инфраструктурный слой данных для искусственного интеллекта.
              </p>
              <p className="hero-sub">
                Собираем, размечаем и проверяем данные, обучаем и оцениваем модели, запускаем их в вашем контуре.
              </p>
              <span className="hero-status">Сайт в разработке · скоро</span>
            </div>
          </section>

          <section id="corpus" className="section corpus">
            <div className="corpus-head">
              <div className="corpus-title">
                <div className="corpus-tag">
                  <i />
                  <span className="eyebrow" style={{ color: "#9db8e8" }}>
                    Корпус
                  </span>
                </div>
                <h2 className="h2">Разметка текстовых датасетов командой и моделью</h2>
              </div>
              <p className="corpus-desc">
                Загрузите файлы, задайте схему и виды разметки. Модель делает первый проход, люди проверяют
                спорное, на выходе готовый датасет.
              </p>
            </div>

            <div className="cards">
              <div className="card">
                <div className="demo">
                  <span className="demo-quote">«Курьер привёз заказ на три дня позже»</span>
                  <div className="chips">
                    <span className="chip on">Доставка</span>
                    <span className="chip">Качество</span>
                    <span className="chip">Цена</span>
                    <span className="chip">Возврат</span>
                  </div>
                </div>
                <div className="card-caption">
                  <span className="card-title">Классификация</span>
                  <span className="card-text">Одна или несколько категорий на текст.</span>
                </div>
              </div>

              <NerDemo />

              <div className="card">
                <div className="demo">
                  <span className="demo-quote">«Вкус отличный, но упаковка порвалась»</span>
                  <div className="scale">
                    <span />
                    <span />
                    <span className="on" />
                    <span />
                    <span />
                  </div>
                  <div className="scale-labels">
                    <span>НЕГАТИВ</span>
                    <span style={{ color: "#e0b26a" }}>СМЕШАННАЯ</span>
                    <span>ПОЗИТИВ</span>
                  </div>
                </div>
                <div className="card-caption">
                  <span className="card-title">Тональность</span>
                  <span className="card-text">Оценка по шкале, в том числе по отдельным аспектам.</span>
                </div>
              </div>

              <div className="card">
                <div className="demo relation">
                  <span className="node per">Иван Иванов</span>
                  <div className="edge">
                    <span className="edge-label">РАБОТАЕТ_В</span>
                    <span className="arrow" />
                  </div>
                  <span className="node org">Аннотика</span>
                </div>
                <div className="card-caption">
                  <span className="card-title">Связи</span>
                  <span className="card-text">Отношения между найденными сущностями.</span>
                </div>
              </div>

              <div className="card">
                <div className="demo compare">
                  <div className="answer">
                    <span className="mono">ОТВЕТ A</span>
                    <i />
                    <i style={{ width: "70%" }} />
                  </div>
                  <div className="answer best">
                    <span className="mono">ОТВЕТ B · ЛУЧШЕ</span>
                    <i />
                    <i style={{ width: "85%" }} />
                  </div>
                </div>
                <div className="card-caption">
                  <span className="card-title">Сравнение ответов</span>
                  <span className="card-text">Выбор лучшего ответа модели для дообучения.</span>
                </div>
              </div>

              <div className="card">
                <div className="demo pipeline">
                  <div className="pipe-row">
                    <span className="who">LLM</span>
                    <span className="pill">Доставка</span>
                  </div>
                  <div className="pipe-row">
                    <span className="who">BERT</span>
                    <span className="pill">Доставка</span>
                  </div>
                  <div className="pipe-row">
                    <span className="who">ЧЕЛОВЕК</span>
                    <span className="pill skip">не требуется</span>
                    <span className="pipe-ok">2/2 ✓</span>
                  </div>
                </div>
                <div className="card-caption">
                  <span className="card-title">Модели и проверка</span>
                  <span className="card-text">LLM и BERT размечают первыми, человек смотрит только расхождения.</span>
                </div>
              </div>
            </div>

            <div className="flow">
              <span className="flow-label">ПУТЬ ДАННЫХ</span>
              {FLOW.map((step) => (
                <Fragment key={step}>
                  <span className="flow-step">{step}</span>
                  <span className="flow-arrow">→</span>
                </Fragment>
              ))}
              <span className="flow-step final">Готовый датасет</span>
              <OpenLeadForm className="link-btn">Оставить заявку →</OpenLeadForm>
            </div>

            <div className="exports muted">
              <span className="flow-label">ЭКСПОРТ</span>
              {EXPORTS.map((f) => (
                <span key={f} className="format">
                  {f}
                </span>
              ))}
            </div>
          </section>

          <section id="security" className="section">
            <div className="security-head">
              <span className="eyebrow" style={{ color: "#6fc7a3" }}>
                Безопасность
              </span>
              <h2 className="h2">Данные остаются в вашем контуре</h2>
            </div>
            <div className="features">
              {SECURITY.map((f, i) => (
                <div key={f.title} className="feature">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="card-title">{f.title}</span>
                  <span className="feature-text">{f.text}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="start" className="section">
            <div className="section-head">
              <span className="eyebrow" style={{ color: "#9db8e8" }}>
                Как начать
              </span>
              <h2 className="h2">Три шага до первого датасета</h2>
            </div>
            <div className="steps">
              {STEPS.map((s, i) => (
                <div key={s.title} className="step">
                  <span className={`step-num ${s.cls}`}>{i + 1}</span>
                  <span className="card-title">{s.title}</span>
                  <span className="feature-text">{s.text}</span>
                </div>
              ))}
            </div>
            <OpenLeadForm className="btn-primary btn-lg">Оставить заявку</OpenLeadForm>
          </section>
        </main>

        <footer id="contacts" className="footer">
          <span>© 2026 ООО «Аннотика»</span>
          <span>Данные · Модели · Инфраструктура</span>
        </footer>
      </div>
    </LeadFormProvider>
  );
}
