import AnnotatedLogo from "./AnnotatedLogo";

export default function Home() {
  return (
    <main className="page">
      <div className="topbar">
        <span>annotica.ru</span>
        <span className="status">
          <span className="status-dot" />
          Идёт разметка
        </span>
      </div>

      <AnnotatedLogo />

      <div className="title-block">
        <h1 className="wordmark">ANNOTICA</h1>
        <p className="tagline">Платформа обработки данных для ИИ · December 2026</p>
      </div>
    </main>
  );
}
