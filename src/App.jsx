import { useState, useEffect, useCallback } from "react";

// --- КОНСТАНТЫ ИДЕНТИФИКАЦИИ ДАННЫХ ---
const METADATA = {
  version: "2026",
  location: "SYS.LOC // ООО_ЮНГП // ЦИМ_ЯДРО",
  status: "СТАТУС // ПРИОРИТЕТ_ВЫБРАН",
  frequency: "100% // АВТОНОМНОСТЬ",
};

// --- НАСТРОЙКИ АНИМАЦИИ КАДРОВ ---
const TOTAL_FRAMES = 44;
const IMAGE_EXTENSION = "JPG";
const FRAME_INTERVAL_MS = 360;

const SLIDES = [
  { id: "01", tag: "СТРАТЕГИЧЕСКАЯ ЭКОСИСТЕМА", title: "ТИТУЛЬНЫЙ" },
  {
    id: "02",
    tag: "ТЕХНИЧЕСКОЕ ПРЕВОСХОДСТВО",
    title: "ВЫБОР ПРИОРИТЕТНОГО СОФТА",
  },
  {
    id: "03",
    tag: "ФИЛОСОФИЯ ДИЗАЙНА",
    title: "ФИЛОСОФИЯ И АРХИТЕКТУРА ДАННЫХ",
  },
  { id: "04", tag: "КОМАНДА ДРИМ", title: "СТРУКТУРА ДРИМ" },
  { id: "05", tag: "АУДИТ РЕСУРСОВ", title: "ПОВЫШЕНИЕ 3D-КОМПЕТЕНЦИЙ" },
  { id: "06", tag: "ИНДЕКС ПОРТФЕЛЯ", title: "МАСШТАБИРОВАНИЕ ПОРТФЕЛЯ" },
  { id: "07", tag: "ОПТИМИЗАЦИЯ", title: "ОПТИМИЗАЦИЯ ОБУЧЕНИЯ" },
  { id: "08", tag: "ИНФРАСТРУКТУРА ПОСТАВКИ", title: "ДОСТУП К 3D МОДЕЛЯМ" },
  { id: "09", tag: "ОБЕСПЕЧЕНИЕ КАЧЕСТВА", title: "ОПТИМИЗАЦИЯ МОДЕЛЕЙ" },
  { id: "10", tag: "АУДИТ КОНВЕЙЕРА", title: "ЭВОЛЮЦИЯ КАТАЛОГА" },
  { id: "11", tag: "ИНТЕГРАЦИЯ АСО", title: "TEKLA STRUCTURES" },
  { id: "12", tag: "РЕГЛАМЕНТАЦИЯ", title: "ВНУТРЕННИЙ ДОКУМЕНТ" },
  { id: "13", tag: "МИССИЯ ЗАВЕРШЕНА", title: "ВОПРОСЫ И ОТВЕТЫ" },
];

const TEAM_MEMBERS = [
  {
    name: "Елена Дятлова",
    role: "Начальник Департамента",
    date: "19.11.2024",
    skills: [
      "Координация задач",
      "Стратегия развития 3D",
      "Автоматизация производства",
      "Контроль работоспособности",
      "Обучение сотрудников",
    ],
  },
  {
    name: "Рустам Абдрашитов",
    role: "Главный специалист",
    date: "12.02.2025",
    skills: [
      "Лицензии",
      "Администратор проектов ЛВНГ",
      "Макросы AVEVA",
      "Внедрение ИИ в AVEVA E3D",
    ],
  },
  {
    name: "Регина Кусалиева",
    role: "Ведущий специалист",
    date: "26.05.2025",
    skills: [
      "Каталог",
      "Трубопроводные классы",
      "Стандартизация",
      "Интерактивный каталог оборудования",
    ],
  },
  {
    name: "Игорь Силантьев",
    role: "Главный специалист",
    date: "22.06.2025",
    skills: [
      "Программирование",
      "Администратор Евротэк и БХК",
      "AVEVA Engineering",
      "Обучение сотрудников",
      "Работа с базами данных",
    ],
  },
  {
    name: "Дмитрий Фомин",
    role: "Главный специалист",
    date: "09.02.2026",
    skills: [
      "Tekla Structures",
      "Каталог профилей",
      "Администратор Tekla",
      "Работа с подрядчиками АСО",
    ],
  },
];

export default function DreamZinePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSubSlide, setCurrentSubSlide] = useState(0); // Состояние карусели
  const [currentFrame, setCurrentFrame] = useState(0);
  const [fadeState, setFadeState] = useState("in");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const ANIMATION_DURATION = 300;

  const changeSlide = useCallback(
    (newIndex, targetSubSlide = 0) => {
      if (isTransitioning || newIndex === currentSlide) return;
      setIsTransitioning(true);
      setFadeState("out");

      setTimeout(() => {
        setCurrentSlide(newIndex);
        setCurrentSubSlide(targetSubSlide); // Сброс или установка нужной позиции карусели

        setTimeout(() => {
          setFadeState("in");
          setTimeout(() => {
            setIsTransitioning(false);
          }, ANIMATION_DURATION);
        }, 50); // Небольшая задержка, чтобы React смонтировал новый слайд при opacity-0 перед началом анимации
      }, ANIMATION_DURATION);
    },
    [currentSlide, isTransitioning],
  );

  const nextSlide = useCallback(() => {
    if (currentSlide === 3 && currentSubSlide < TEAM_MEMBERS.length - 1) {
      setCurrentSubSlide((prev) => prev + 1);
      return;
    }
    changeSlide((currentSlide + 1) % SLIDES.length, 0);
  }, [currentSlide, currentSubSlide, changeSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide === 3 && currentSubSlide > 0) {
      setCurrentSubSlide((prev) => prev - 1);
      return;
    }
    const newIndex = (currentSlide - 1 + SLIDES.length) % SLIDES.length;
    changeSlide(newIndex, newIndex === 3 ? TEAM_MEMBERS.length - 1 : 0);
  }, [currentSlide, currentSubSlide, changeSlide]);

  useEffect(() => {
    const frameInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % TOTAL_FRAMES);
    }, FRAME_INTERVAL_MS);
    return () => clearInterval(frameInterval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTransitioning, nextSlide, prevSlide]);

  return (
    <div className="min-h-screen bg-[#050506] text-zinc-100 font-sans overflow-hidden relative flex flex-col justify-between border-8 border-[#111111] selection:bg-[#CCFF00] selection:text-black">
      {/* ----------------------------------------------------------- */}
      {/* --- ГЛОБАЛЬНЫЕ ФОНЫ (Спрятаны под шапкой и футером) --- */}
      {/* ----------------------------------------------------------- */}

      {/* Полноэкранный фон для слайда Tekla */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none ${
          currentSlide === 10 ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={`${import.meta.env.BASE_URL}teklabg.JPG`}
          alt="Tekla Fullscreen Background"
          className="w-full h-full object-cover opacity-50"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        {/* Затемняющий оверлей */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050506] via-[#050506]/70 to-[#050506]/40" />
      </div>

      {/* Базовые декоративные сетки и градиенты бэкграунда */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.3)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/40 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.005)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
      {/* ----------------------------------------------------------- */}

      {/* --- ШАПКА (Имеет фон #050506 и перекрывает картинку) --- */}
      <header className="relative z-30 w-full flex justify-between items-start border-b-2 border-zinc-800 bg-[#050506] px-4 md:px-6 pt-4 md:pt-6 pb-4">
        <div className="flex flex-col">
          <span className="font-mono text-xs tracking-widest text-[#CCFF00]">
            {METADATA.version}
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none mt-1 uppercase">
            ДРИМ
            <span className="text-zinc-600">.ЮНГП</span>
          </h1>
        </div>

        <div className="hidden md:flex flex-col text-right font-mono text-xs tracking-wider text-zinc-400 space-y-0.5">
          <div>{METADATA.location}</div>
          <div>{METADATA.status}</div>
          <div className="text-[#CCFF00] animate-pulse">
            {METADATA.frequency}
          </div>
        </div>
      </header>

      {/* --- ОСНОВНОЙ ФРЕЙМ --- */}
      <main className="z-20 my-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 px-4 md:px-6 relative">
        <div className="absolute -left-6 -bottom-16 text-[28vw] font-black text-zinc-900 opacity-20 select-none pointer-events-none tracking-tighter z-0 leading-none mix-blend-overlay">
          {SLIDES[currentSlide].id}
        </div>

        {/* Сайдбар Матрица (Лево) */}
        <div className="lg:col-span-2 flex flex-col items-center lg:items-start justify-center max-h-[75vh]">
          <div className="border-2 border-dashed border-zinc-800/80 p-4 w-full max-w-[240px] bg-black/80 backdrop-blur-md text-left space-y-4 overflow-y-auto custom-scrollbar">
            <div className="font-mono text-xs text-zinc-500">
              МАТРИЦА_СЛАЙДОВ
            </div>
            <div className="flex flex-col space-y-2">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => changeSlide(idx)}
                  className={`text-left font-mono text-xs uppercase transition-all duration-300 py-1.5 ${
                    currentSlide === idx
                      ? "text-[#CCFF00] font-bold tracking-widest border-l-4 border-[#CCFF00] pl-3 bg-zinc-900/60"
                      : "text-zinc-500 hover:text-white pl-3"
                  }`}
                >
                  [{slide.id}] {slide.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ЦЕНТРАЛЬНЫЙ КОНТЕНТ */}
        <div
          className={`lg:col-span-8 min-h-[560px] flex flex-col justify-center transition-all duration-300 ease-in-out z-20 ${
            fadeState === "out"
              ? "opacity-0 translate-y-6 scale-[0.97] pointer-events-none"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {/* 01: ТИТУЛЬНЫЙ */}
          {currentSlide === 0 && (
            <div className="w-full flex flex-col justify-center items-start relative">
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#C6FF00]/25 rounded-full blur-[120px] pointer-events-none" />
              <span className="text-sm font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 block">
                СТРАТЕГИЧЕСКИЕ ИЗМЕНЕНИЯ // 2026
              </span>
              <h1 className="font-bold text-5xl lg:text-7xl tracking-tight text-white leading-none mb-8">
                DRIM: <br />
                Department development <br />
                <span className="text-[#CCFF00] font-black drop-shadow-[0_0_30px_rgba(198,255,0,0.25)]">
                  & Way Forward
                </span>
              </h1>
              <p className="text-zinc-400 max-w-3xl text-lg lg:text-xl font-light leading-relaxed mb-10">
                Создано при помощи искусственного интеллекта 😎
              </p>
              <div className="flex items-center gap-6">
                <button
                  onClick={nextSlide}
                  className="bg-[#c6ff00] text-black font-bold tracking-wider text-sm lg:text-base px-8 py-4 rounded-md hover:bg-white transition-all cursor-pointer shadow-lg shadow-[#C6FF00]/10 flex items-center gap-3"
                >
                  НАЧАТЬ ПРЕЗЕНТАЦИЮ
                  <i className="fa-solid fa-arrow-right" />
                </button>
                <div className="text-sm font-mono text-zinc-500">
                  ЛИБО НАЖМИТЕ ПРОБЕЛ ДЛЯ ПРОДОЛЖЕНИЯ
                </div>
              </div>
            </div>
          )}

          {/* 02: ВЫБОР ПРИОРИТЕТНОГО СОФТА */}
          {currentSlide === 1 && (
            <div className="w-full max-w-5xl mx-auto space-y-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm font-mono text-[#CCFF00]">
                <span>02 / ТЕХНИЧЕСКОЕ ПРЕИМУЩЕСТВО</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Выбор приоритетного софта для разработки Цифровой Информационной
                модели, дальнейшее развитие одного направления для ООО «ЮНГП»
              </h2>
              <p className="text-zinc-400 text-base lg:text-lg leading-relaxed max-w-3xl">
                Единая экосистема управления информацией с полным контролем
                архитектуры. В отличие от SMART, AVEVA позволяет создавать
                настраиваемые базы данных под специфические требования
                организации.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 max-w-4xl">
                <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-lg">
                  <i className="fa-solid fa-diagram-project text-[#c6ff00] mb-4 text-3xl block" />
                  <h4 className="text-white font-medium text-lg mb-2">
                    P&ID → 3D автоматически
                  </h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Атрибуты оборудования и трубопроводов из AVEVA Diagrams
                    автоматически передаются в 3D-геометрию E3D и документацию.
                  </p>
                </div>
                <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-lg">
                  <i className="fa-solid fa-cubes text-[#c6ff00] mb-4 text-3xl block" />
                  <h4 className="text-white font-medium text-lg mb-2">
                    Нативная интеграция Tekla
                  </h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Строительные конструкции Tekla Structures воспринимаются
                    «родными» элементами AVEVA — с идентификацией профиля,
                    замерами и атрибутами.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 03: ФИЛОСОФИЯ И АРХИТЕКТУРА ДАННЫХ */}
          {currentSlide === 2 && (
            <div className="w-full flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
              <span className="text-sm font-mono tracking-widest text-zinc-500 mb-6 uppercase block">
                03 // Архитектура и философия дизайна
              </span>
              <div className="relative py-12 px-8 bg-zinc-900/80 border border-zinc-800/60 rounded-2xl max-w-4xl">
                <i className="fa-solid fa-quote-left text-zinc-800 text-6xl absolute -top-5 left-6 pointer-events-none" />
                <blockquote className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8 relative z-10 px-6">
                  "AVEVA работает как{" "}
                  <span className="text-[#c6ff00] decoration-[#c6ff00]/40">
                    iOS / iPhone
                  </span>
                  : проприетарные единые структуры данных. SMART работает как{" "}
                  <span className="text-zinc-400">Android</span>: универсальный
                  движок, требующий внешней донастройки."
                </blockquote>
                <cite className="text-sm font-mono text-zinc-400 not-italic uppercase tracking-widest">
                  — Обзор системной инфраструктуры
                </cite>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-12 mt-12 text-left border-t border-zinc-900 pt-8 w-full justify-center">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded bg-[#c6ff00]/10 text-[#c6ff00] text-xl">
                    <i className="fa-solid fa-database" />
                  </div>
                  <div>
                    <h5 className="text-base font-semibold text-white">
                      Пользовательская БД высокой производительности
                    </h5>
                    <p className="text-sm text-zinc-500 max-w-sm mt-1 leading-relaxed">
                      Динамическая пользовательская матрица, нативно
                      разработанная для массивных параллельных нагрузок
                      обработки данных.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block h-12 w-[1px] bg-zinc-800" />
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded bg-zinc-900 text-zinc-500 text-xl">
                    <i className="fa-solid fa-network-wired" />
                  </div>
                  <div>
                    <h5 className="text-base font-semibold text-zinc-400">
                      Стандартные SQL-блоки
                    </h5>
                    <p className="text-sm text-zinc-600 max-w-sm mt-1 leading-relaxed">
                      Традиционные табличные конфигурации, используемые
                      конкурентными пакетами и создающие пределы
                      масштабирования.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 04: СТРУКТУРА ДРИМ */}
          {currentSlide === 3 && (
            <div className="w-full flex flex-col justify-center min-h-[500px]">
              <div className="flex justify-between items-end mb-6 px-4">
                <div>
                  <span className="text-sm font-mono text-[#c6ff00] mb-3 block">
                    04 // КОМАНДА ДРИМ
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    Структура Департамента
                  </h2>
                </div>
                <div className="hidden sm:flex font-mono text-sm text-zinc-500 bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800">
                  <span className="text-white font-bold mr-2">
                    {currentSubSlide + 1}
                  </span>{" "}
                  / {TEAM_MEMBERS.length}
                </div>
              </div>

              <div
                className="relative w-full h-[340px] flex items-center justify-center mt-2"
                style={{ perspective: "1000px" }}
              >
                {TEAM_MEMBERS.map((member, i) => {
                  const offset = i - currentSubSlide;

                  let transformStyle = "";
                  let opacityStyle = "";
                  let zIndex = 10 - Math.abs(offset);
                  let pointerEvents = Math.abs(offset) <= 1 ? "auto" : "none";

                  if (offset === 0) {
                    transformStyle =
                      "translateX(0) translateZ(0) rotateY(0deg) scale(1)";
                    opacityStyle = "1";
                  } else if (offset === -1) {
                    transformStyle =
                      "translateX(-38%) translateZ(-50px) rotateY(12deg) scale(0.85)";
                    opacityStyle = "0.5";
                  } else if (offset === 1) {
                    transformStyle =
                      "translateX(38%) translateZ(-50px) rotateY(-12deg) scale(0.85)";
                    opacityStyle = "0.5";
                  } else if (offset < -1) {
                    transformStyle =
                      "translateX(-70%) translateZ(-150px) rotateY(20deg) scale(0.7)";
                    opacityStyle = "0";
                  } else if (offset > 1) {
                    transformStyle =
                      "translateX(70%) translateZ(-150px) rotateY(-20deg) scale(0.7)";
                    opacityStyle = "0";
                  }

                  return (
                    <div
                      key={i}
                      className="absolute w-full max-w-3xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{
                        transform: transformStyle,
                        opacity: opacityStyle,
                        zIndex,
                        pointerEvents,
                      }}
                      onClick={() => {
                        if (offset !== 0) setCurrentSubSlide(i);
                      }}
                    >
                      <div
                        className={`bg-zinc-900/95 border ${offset === 0 ? "border-[#c6ff00]/60 shadow-[0_0_40px_rgba(198,255,0,0.15)]" : "border-zinc-800"} p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-center md:items-start cursor-${offset === 0 ? "default" : "pointer"} hover:border-[#c6ff00]/40 transition-colors`}
                      >
                        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-zinc-800 pb-6 md:pb-0 md:pr-6 shrink-0">
                          <div
                            className={`w-20 h-20 rounded-full bg-zinc-950 border-2 ${offset === 0 ? "border-[#c6ff00] text-[#c6ff00] shadow-[0_0_15px_rgba(198,255,0,0.2)]" : "border-zinc-700 text-zinc-600"} flex items-center justify-center mb-5 transition-colors`}
                          >
                            <i className="fa-solid fa-user-astronaut text-3xl"></i>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {member.name}
                          </h3>
                          <p className="text-sm font-mono text-[#c6ff00] mb-3">
                            {member.role}
                          </p>
                          <span className="text-xs text-zinc-400 font-mono bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-800">
                            с {member.date}
                          </span>
                        </div>

                        <div className="w-full md:w-2/3 flex flex-col justify-center h-full min-h-[160px]">
                          <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
                            Ключевые компетенции
                          </h4>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {member.skills.map((s, j) => (
                              <span
                                key={j}
                                className="px-3 py-1.5 bg-zinc-950/80 border border-zinc-800/80 rounded-md text-sm text-zinc-300"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-3 mt-6 relative z-10">
                {TEAM_MEMBERS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSubSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSubSlide
                        ? "w-10 bg-[#c6ff00] shadow-[0_0_10px_rgba(198,255,0,0.5)]"
                        : "w-3 bg-zinc-700 hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 05: ПОВЫШЕНИЕ 3D-КОМПЕТЕНЦИЙ */}
          {currentSlide === 4 && (
            <div className="w-full flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="text-sm font-mono text-[#c6ff00] mb-2 block">
                    05 // АУДИТ РЕСУРСОВ
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    Повышение 3D-компетенций подразделений
                  </h2>
                </div>
                <div className="flex items-center gap-1 bg-zinc-900 p-1.5 rounded-lg border border-zinc-800 font-mono text-xs">
                  <span className="bg-zinc-800 text-white px-3 py-1.5 rounded">
                    Табличный вид
                  </span>
                </div>
              </div>
              <div className="w-full overflow-x-auto border border-zinc-800/80 rounded-xl bg-zinc-950/90">
                <table className="w-full text-left text-sm border-collapse font-mono min-w-[700px]">
                  <thead>
                    <tr className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400">
                      <th className="p-4 font-medium uppercase tracking-wider">
                        Класс подразделения
                      </th>
                      <th className="p-4 font-medium uppercase tracking-wider text-center">
                        Штат (24)
                      </th>
                      <th className="p-4 font-medium uppercase tracking-wider text-center">
                        3D уровень (24)
                      </th>
                      <th className="p-4 font-medium uppercase tracking-wider text-center">
                        Доля (24)
                      </th>
                      <th className="p-4 font-medium uppercase tracking-wider text-center text-[#c6ff00]">
                        Штат (26)
                      </th>
                      <th className="p-4 font-medium uppercase tracking-wider text-center text-[#c6ff00]">
                        3D уровень (26)
                      </th>
                      <th className="p-4 font-medium uppercase tracking-wider text-right text-[#c6ff00]">
                        Доля (26)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300">
                    {[
                      {
                        name: "МТО",
                        s24: 14,
                        l24: 5,
                        r24: "36%",
                        s26: 7,
                        t26: 7,
                        r26: "100%",
                        premium: true,
                      },
                      {
                        name: "СанО",
                        s24: 12,
                        l24: 3,
                        r24: "25%",
                        s26: 6,
                        t26: 3,
                        r26: "67%",
                        premium: true,
                      },
                      {
                        name: "ОА",
                        s24: 17,
                        l24: 3,
                        r24: "18%",
                        s26: 11,
                        t26: 5,
                        r26: "45%",
                        premium: false,
                      },
                      {
                        name: "НПО",
                        s24: 17,
                        l24: 1,
                        r24: "6%",
                        s26: 12,
                        t26: 2,
                        r26: "16%",
                        premium: false,
                      },
                      {
                        name: "РТО",
                        s24: 12,
                        l24: 4,
                        r24: "33%",
                        s26: 6,
                        t26: 2,
                        r26: "33%",
                        premium: false,
                      },
                      {
                        name: "ЭТО",
                        s24: 17,
                        l24: 3,
                        r24: "18%",
                        s26: 12,
                        t26: 4,
                        r26: "33%",
                        premium: false,
                      },
                      {
                        name: "АСО 1",
                        s24: 18,
                        l24: 6,
                        r24: "33%",
                        s26: 19,
                        t26: 9,
                        r26: "47%",
                        premium: false,
                      },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-zinc-900/30 transition-colors"
                      >
                        <td className="p-4 font-semibold text-white">
                          {row.name}
                        </td>
                        <td className="p-4 text-center text-zinc-500">
                          {row.s24}
                        </td>
                        <td className="p-4 text-center text-zinc-500">
                          {row.l24}
                        </td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-1 bg-zinc-900 rounded text-zinc-400">
                            {row.r24}
                          </span>
                        </td>
                        <td className="p-4 text-center text-white">
                          {row.s26}
                        </td>
                        <td className="p-4 text-center text-white">
                          {row.t26}
                        </td>
                        <td className="p-4 text-right">
                          <span
                            className={`px-2 py-1 rounded font-bold bg-[#c6ff00]/10 border border-[#c6ff00]/20 text-[#c6ff00]`}
                          >
                            {row.r26}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 06: МАСШТАБИРОВАНИЕ ПОРТФЕЛЯ */}
          {currentSlide === 5 && (
            <div className="w-full flex flex-col justify-center">
              <span className="text-sm font-mono text-[#c6ff00] mb-3 block">
                06 // ИНДЕКС ЕМКОСТИ ПОРТФЕЛЯ
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-10">
                Активное масштабирование портфеля 3D проектов
              </h2>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-sm font-mono">
                    <span className="text-zinc-400">INTERGRAPH SMART</span>
                    <span className="text-white font-bold text-lg">
                      1 406 УПН
                    </span>
                  </div>
                  <div className="h-4 bg-zinc-900/60 border border-zinc-800 rounded-md overflow-hidden relative flex items-center">
                    <div className="absolute inset-y-0 left-0 bg-zinc-800 w-[45%] rounded-r" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-sm font-mono">
                    <span className="text-zinc-400">AVEVA</span>
                    <span className="text-white font-bold text-lg">
                      1 476 БХК
                    </span>
                  </div>
                  <div className="h-4 bg-zinc-900/60 border border-zinc-800 rounded-md overflow-hidden relative flex items-center">
                    <div className="absolute inset-y-0 left-0 bg-zinc-700 w-[48%] rounded-r" />
                  </div>
                </div>
                <div className="py-2 border-b border-dashed border-zinc-800" />
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-sm font-mono">
                    <span className="text-[#c6ff00] font-bold">
                      Активный портфель AVEVA (2026)
                    </span>
                    <span className="text-[#c6ff00] font-bold text-lg">
                      7 ПРОЕКТОВ
                    </span>
                  </div>
                  <div className="h-10 bg-zinc-900/30 border border-[#c6ff00]/30 rounded-md overflow-hidden relative flex items-center px-4 shadow-[0_0_20px_rgba(198,255,0,0.1)]">
                    <div className="absolute inset-y-0 left-0 bg-[#c6ff00] w-full rounded-r" />
                    <span className="z-10 text-xs font-mono font-bold text-black uppercase">
                      100% переход на AVEVA
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 pt-2 font-mono text-xs">
                    {[
                      { id: "1476", name: "БХК" },
                      { id: "1406.1", name: "УПН — Перепроектирование" },
                      { id: "1509", name: "Компрессорная станция" },
                      { id: "1537", name: "Куст №17 Славнефть" },
                      {
                        id: "1490",
                        name: "Энергокомплекс на Лаявожском месторождении",
                      },
                      { id: "1495", name: "ЦПС и кустовые площадки ЛВНГ" },
                      { id: "1499", name: "Пункт сдачи-приема ЛВНГ" },
                    ].map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 text-zinc-400"
                      >
                        <span className="text-[#c6ff00] w-14 shrink-0">
                          {p.id}
                        </span>
                        <span>{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 07: ОПТИМИЗАЦИЯ ОБУЧЕНИЯ */}
          {currentSlide === 6 && (
            <div className="w-full flex flex-col lg:flex-row items-center gap-10 justify-center">
              <div className="w-full lg:w-2/5 space-y-5">
                <span className="text-sm font-mono text-[#c6ff00] block">
                  07 // ОПТИМИЗАЦИЯ РЕСУРСОВ
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                  Сокращение расходов на обучение
                </h2>
                <p className="text-zinc-400 text-base lg:text-lg leading-relaxed">
                  Развивая внутренний корпоративный учебный контур, мы устраняем
                  зависимость от соглашений о обучении у сторонних вендоров и
                  надежно удерживаем знания по архитектуре проектирования внутри
                  компании.
                </p>
              </div>
              <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-xl flex flex-col justify-between min-h-[180px]">
                  <span className="text-xs font-mono text-zinc-500 uppercase">
                    Расходы вендора 2024
                  </span>
                  <div className="my-4">
                    <span className="font-bold text-4xl text-white">2.18M</span>
                    <span className="text-xs text-zinc-400 font-mono block mt-1">
                      РУБ.
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs">
                    Внешнее обучение по валидации технического ПО.
                  </p>
                </div>
                <div className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-xl flex flex-col justify-between min-h-[180px]">
                  <span className="text-xs font-mono text-zinc-500 uppercase">
                    Расходы 2025
                  </span>
                  <div className="my-4">
                    <span className="font-bold text-4xl text-white">190K</span>
                    <span className="text-xs text-zinc-400 font-mono block mt-1">
                      РУБ.
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs">
                    Переход к внутреннему обучение.
                  </p>
                </div>
                <div className="p-6 bg-zinc-900/30 border-2 border-[#c6ff00] rounded-xl flex flex-col justify-between min-h-[180px] relative overflow-hidden shadow-[0_0_30px_rgba(198,255,0,0.04)]">
                  <span className="text-xs font-mono text-[#c6ff00] uppercase tracking-wider">
                    Расходы 2026
                  </span>
                  <div className="my-4">
                    <span className="font-bold text-5xl text-[#c6ff00]">0</span>
                    <span className="text-xs text-[#c6ff00] font-mono block mt-1">
                      РУБ.
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs">
                    Запуск обучающего портала ЮНГП: онлайн-поддержка в реальном
                    времени + пополняемая база знаний.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 08: ДОСТУП К 3D МОДЕЛЯМ */}
          {currentSlide === 7 && (
            <div className="w-full flex flex-col justify-center max-w-5xl mx-auto">
              <span className="text-sm font-mono text-[#c6ff00] mb-3 block">
                08 // ПОСТАВКА ИНФРАСТРУКТУРЫ
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8">
                Демократизация доступа к 3D-моделям
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-4">
                  <div className="flex items-center justify-end">
                    <span className="text-xs bg-zinc-900 px-3 py-1 text-zinc-400 rounded">
                      ОГРАНИЧЕНО
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-zinc-300">
                    Ручные циклы экспорта Navisworks
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Выгрузка Информационной модели в формат просмотра Navisworks
                    осуществлялась дважды в неделю в ручном режиме.
                  </p>
                  <div className="h-[2px] bg-zinc-900 w-full" />
                  <div className="flex items-center gap-3 text-zinc-500 text-sm font-mono">
                    <i className="fa-solid fa-triangle-exclamation" />
                    <span>Окно задержки данных до 72 часов.</span>
                  </div>
                </div>
                <div className="p-8 bg-zinc-900/30 border border-[#c6ff00]/40 rounded-xl space-y-4 shadow-[0_0_20px_rgba(198,255,0,0.02)]">
                  <div className="flex items-center justify-end">
                    <span className="text-xs bg-[#c6ff00]/10 px-3 py-1 text-[#c6ff00] rounded border border-[#c6ff00]/20">
                      АВТОМАТИЗИРОВАНО
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-white">
                    Ежедневная автоматическая синхронизация систем
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    Синхронизация данных и ежедневная автоматическая выгрузка ИМ
                    всех активных проектов в AVEVA без участия человека.
                  </p>
                  <div className="h-[2px] bg-zinc-800/80 w-full" />
                  <div className="flex items-center gap-3 text-[#c6ff00] text-sm font-mono">
                    <i className="fa-solid fa-circle-check" />
                    <span>
                      Немедленный глобальный доступ к проверке геометрии.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 09: ОПТИМИЗАЦИЯ МОДЕЛЕЙ */}
          {currentSlide === 8 && (
            <div className="w-full flex flex-col justify-center">
              <span className="text-sm font-mono text-[#c6ff00] mb-3 block">
                09 // СТАНДАРТЫ ОБЕСПЕЧЕНИЯ КАЧЕСТВА
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8">
                Оптимизация инженерной модели. Повышение детализации объектов.
              </h2>
              <div className="w-full flex flex-col lg:flex-row items-center gap-10 justify-center">
                <div className="w-full lg:w-1/2 h-80 lg:h-[400px] relative border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 flex flex-col justify-between p-4 group">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 bg-zinc-950/40">
                    <img
                      src={`${import.meta.env.BASE_URL}animation/frame_${currentFrame}.${IMAGE_EXTENSION}`}
                      alt={`Поток: ${currentFrame}`}
                      className="w-full h-full object-contain filter contrast-125 transition-all duration-75"
                      onError={(e) => {
                        e.target.style.display = "none";
                        if (e.target.nextSibling)
                          e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="hidden absolute inset-0 flex-col items-center justify-center text-center p-6 font-mono">
                      <div className="text-zinc-700 text-sm animate-pulse">
                        // АНИМАЦИОННЫЙ_ПОТОК_ОФЛАЙН //
                      </div>
                      <div className="text-xs text-zinc-500 mt-2 max-w-[200px]">
                        Разместите кадры в public/animation/
                      </div>
                    </div>
                  </div>
                  <div className="z-10 flex justify-between items-center w-full font-mono text-xs text-zinc-400 bg-zinc-950/95 p-2 rounded border border-zinc-800/40">
                    <span className="text-[#c6ff00] font-bold tracking-widest animate-pulse">
                      ● ОСНОВНОЙ ПОТОК АКТИВЕН
                    </span>
                    <span>{Math.round(1000 / FRAME_INTERVAL_MS)} FPS</span>
                  </div>
                  <div className="z-10 flex justify-between items-center w-full font-mono text-xs text-zinc-400 bg-gradient-to-t from-zinc-950 to-transparent p-2 mt-auto">
                    <span className="text-white font-bold">
                      КАДР: {currentFrame + 1}/{TOTAL_FRAMES}
                    </span>
                    <span className="text-zinc-500">AVEVA_2026</span>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                  <div className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
                    <span className="font-mono font-bold text-xs text-[#c6ff00] tracking-wider block mb-2">
                      ЭТАП 01 // АПГРЕЙД КАТАЛОГА ТРУБНЫХ ЭЛЕМЕНТОВ
                    </span>
                    <h4 className="text-white text-lg font-medium mb-2">
                      Стандартизированные мастер-компоненты
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Повышение детализации каталожных элементов. Создание базы
                      ненормативных деталей различных поставщиков
                    </p>
                  </div>
                  <div className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
                    <span className="font-mono font-bold text-xs text-[#c6ff00] tracking-wider block mb-2">
                      ЭТАП 02 // СОЗДАНИЕ ИНТЕРАКТИВНОГО КАТАЛОГА ОБОРУДОВАНИЯ
                    </span>
                    <h4 className="text-white text-lg font-medium mb-2">
                      Внутренние регламенты фреймворка
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Создание каталога оборудования ЮНГП с возможностью
                      изменения размеров (быстрое создание моделей оборудования
                      из преднастроенного списка)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 10: ЭВОЛЮЦИЯ КАТАЛОГА */}
          {currentSlide === 9 && (
            <div className="w-full flex flex-col justify-center">
              <span className="text-sm font-mono text-[#c6ff00] mb-2 block">
                10 // ОПТИМИЗАЦИЯ КАТАЛОГА
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8">
                Эволюция каталога AVEVA
              </h2>
              <div className="w-full overflow-hidden border border-zinc-800 rounded-xl bg-zinc-950/60 font-mono text-sm">
                <div className="grid grid-cols-3 bg-zinc-900 p-4 font-bold text-zinc-400 border-b border-zinc-800">
                  <div>КОНТРОЛИРУЕМЫЙ ПАРАМЕТР</div>
                  <div>ПРОБЛЕМЫ КАТАЛОГА 2024</div>
                  <div className="text-[#c6ff00]">СТРАТЕГИЧЕСКАЯ ЦЕЛЬ 2026</div>
                </div>
                <div className="divide-y divide-zinc-900/80 text-zinc-300">
                  {[
                    {
                      param: "Управление трубопроводными классами",
                      old: "Таблицы классов отданы дисциплинам без участия ДРИМ; задания в Google-таблице, многократно изменяются, нет фиксации отработки.",
                      new: "Регламентированы правила создания классов AVEVA и выдачи заданий. Внедрены шаблоны.",
                      highlight: false,
                    },
                    {
                      param: "Соответствие НТД / ГОСТ",
                      old: "Отсутствует проверка: элементы добавлялись с параметрами, не существующими в НТД.",
                      new: "Проверка заявок на соответствие актуальной НТД РФ; обязательная обратная связь по выполнению.",
                      highlight: false,
                    },
                    {
                      param: "Кодирование и поиск элементов",
                      old: "Элементы обезличены — нет системы поиска и логики группировки.",
                      new: "Введено кодирование элементов для быстрого поиска, корректировки и переиспользования.",
                      highlight: false,
                    },
                    {
                      param: "Структура каталога",
                      old: "Все детали в общем списке без логики по классу / материалу / типу / изготовителю.",
                      new: "Каталог структурирован, понятен и адаптирован для любого нового сотрудника ДРИМ.",
                      highlight: false,
                    },
                    {
                      param: "Описание деталей",
                      old: "Описание уникальное и создаётся для каждого элемента отдельно — трудно корректировать.",
                      new: "Введён интерактивный ссылочный набор описаний — универсальный и легко редактируемый.",
                      highlight: false,
                    },
                    {
                      param: "Совместимость соединений",
                      old: "Все элементы присоединялись вне зависимости от совместимости по ГОСТ.",
                      new: "Добавлена таблица совместимых соединений — соответствие ГОСТ гарантировано.",
                      highlight: false,
                    },
                    {
                      param: "Учёт крепежа",
                      old: "Крепёж отсутствует в каталоге. Добавляется в РД текстом, в подсчётах не участвует.",
                      new: "Добавлены спецификации на крепёжные изделия — полное включение в 3D и МТО.",
                      highlight: true,
                    },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 p-4 items-start">
                      <div className="font-semibold text-white text-sm pr-4">
                        {row.param}
                      </div>
                      <div className="text-zinc-500 text-sm pr-4">
                        {row.old}
                      </div>
                      <div
                        className={`p-3 rounded text-sm ${row.highlight ? "text-[#c6ff00] font-medium bg-[#c6ff00]/10 border border-[#c6ff00]/20" : "text-zinc-300 bg-zinc-900/60 border border-zinc-800"}`}
                      >
                        {row.new}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 11: TEKLA STRUCTURES */}
          {currentSlide === 10 && (
            <div className="w-full flex flex-col justify-center relative min-h-[500px] z-10">
              <div className="relative z-10 w-full max-w-5xl mx-auto">
                <span className="text-sm font-mono text-[#c6ff00] mb-3 block uppercase tracking-widest drop-shadow-md">
                  11 // ИНТЕГРАЦИЯ АСО
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-10 drop-shadow-lg">
                  Tekla Structures
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  <div className="space-y-4">
                    <div className="p-5 bg-zinc-950/95 border border-zinc-800/80 rounded-xl hover:border-[#c6ff00]/40 transition-colors shadow-lg">
                      <div className="flex items-center gap-3 mb-2 text-[#c6ff00]">
                        <i className="fa-solid fa-arrows-turn-to-dots text-lg"></i>
                        <h4 className="font-medium text-white text-lg">
                          Кросс-платформенность
                        </h4>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Настроен маппинг элементов между AVEVA и Tekla
                        Structures.
                      </p>
                    </div>

                    <div className="p-5 bg-zinc-950/95 border border-zinc-800/80 rounded-xl hover:border-[#c6ff00]/40 transition-colors shadow-lg">
                      <div className="flex items-center gap-3 mb-2 text-[#c6ff00]">
                        <i className="fa-solid fa-robot text-lg"></i>
                        <h4 className="font-medium text-white text-lg">
                          Автоматизация выгрузок
                        </h4>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Настроена автоматическая загрузка и обновление
                        измененных моделей АСО (без участия человека).
                      </p>
                    </div>

                    <div className="p-5 bg-zinc-950/95 border border-zinc-800/80 rounded-xl hover:border-[#c6ff00]/40 transition-colors shadow-lg">
                      <div className="flex items-center gap-3 mb-2 text-[#c6ff00]">
                        <i className="fa-solid fa-list-check text-lg"></i>
                        <h4 className="font-medium text-white text-lg">
                          Ведомости и спецификации
                        </h4>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Выполнена отладка вывода спецификаций и настроено
                        формирование Ведомости объемов работ напрямую из среды.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 md:mt-8">
                    <div className="p-5 bg-zinc-950/95 border border-[#c6ff00]/40 rounded-xl shadow-[0_0_30px_rgba(198,255,0,0.1)]">
                      <div className="flex items-center gap-3 mb-2 text-[#c6ff00]">
                        <i className="fa-solid fa-calculator text-lg"></i>
                        <h4 className="font-medium text-[#c6ff00] text-lg">
                          Интеграция с ЛИРА
                        </h4>
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        Разработана и внедрена пользовательская утилита импорта
                        из расчетного программного комплекса ЛИРА-САПР напрямую
                        в Tekla Structures.
                      </p>
                    </div>

                    <div className="p-5 bg-zinc-950/95 border border-zinc-800/80 rounded-xl hover:border-[#c6ff00]/40 transition-colors shadow-lg">
                      <div className="flex items-center gap-3 mb-2 text-[#c6ff00]">
                        <i className="fa-solid fa-network-wired text-lg"></i>
                        <h4 className="font-medium text-white text-lg">
                          Сетевая архитектура
                        </h4>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Внедрен сетевой ярлык для запуска среды с настроенным
                        автоматическим обновлением компонентов у пользователей.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 12: РЕГЛАМЕНТАЦИЯ ТРЕБОВАНИЙ */}
          {currentSlide === 11 && (
            <div className="w-full flex flex-col lg:flex-row items-stretch gap-10 justify-center">
              {/* Левая половина: Текст */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="text-sm font-mono text-[#c6ff00] mb-3 block uppercase tracking-widest">
                  12 // РЕГЛАМЕНТАЦИЯ ТРЕБОВАНИЙ
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-6 leading-tight">
                  Внутренний регламент ООО «ЮНГП»
                </h2>
                <div className="space-y-4 text-zinc-400 text-sm lg:text-base leading-relaxed">
                  <p>
                    Установление единых минимальных требований к разработке
                    Цифровой информационной модели по всем разделам проектной
                    документации на всех этапах создания 3D промышленного
                    объекта.
                  </p>
                  <p>
                    Описывает методику формирования Информационной модели,
                    определяет базовые правила к структуре, формату,
                    идентификации, каталогу, цветовому отображению, деталировке
                    и наполнению при отсутствии специальных требований
                    контрактов.
                  </p>
                </div>
                <div className="mt-8 p-4 border-l-2 border-[#c6ff00] bg-[#c6ff00]/5 text-zinc-300 font-mono text-xs uppercase tracking-wider">
                  <i className="fa-solid fa-file-signature text-[#c6ff00] mr-2"></i>
                  Утвержден и введен в действие приказом № 15 от 04.03.2026 г.
                </div>
              </div>

              {/* Правая половина: Окно PDF */}
              <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px] relative border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 flex flex-col p-2 group shadow-2xl shadow-black/50">
                {/* Сетка бэкграунда */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

                {/* Верхний статус-бар */}
                <div className="z-10 flex justify-between items-center w-full font-mono text-xs text-zinc-400 bg-zinc-950/95 p-2 rounded border border-zinc-800/60 mb-2 shadow-sm">
                  <span className="text-[#c6ff00] font-bold tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c6ff00] animate-pulse"></span>
                    СИСТЕМА ДОКУМЕНТООБОРОТА
                  </span>
                  <span>PDF_VIEWER_V1.0</span>
                </div>

                {/* Контейнер для PDF */}
                <div className="relative flex-1 w-full bg-zinc-900/50 rounded border border-zinc-800/60 overflow-hidden z-10 flex flex-col">
                  <iframe
                    src={`${import.meta.env.BASE_URL}reglament.pdf`}
                    className="w-full h-full border-none bg-white/90 relative z-20"
                    title="Регламент 3D"
                  />
                  {/* Placeholder на случай, если PDF не загрузится (удобно для демо-режима) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 font-mono text-zinc-600 text-center p-4">
                    <i className="fa-regular fa-file-pdf text-4xl mb-3 text-zinc-700"></i>
                    <span>Загрузка документа...</span>
                    <span className="text-[10px] mt-2">
                      Ожидание public/document.pdf
                    </span>
                  </div>
                </div>

                {/* Нижний статус-бар */}
                <div className="z-10 flex justify-between items-center w-full font-mono text-xs text-zinc-500 bg-gradient-to-t from-zinc-950 to-transparent p-2 mt-2">
                  <span className="text-zinc-400">ПОЛОЖЕНИЕ П3 09-01-2026</span>
                  <span>СТАТУС: АКТИВЕН</span>
                </div>
              </div>
            </div>
          )}

          {/* 13: МИССИЯ ЗАВЕРШЕНА */}
          {currentSlide === 12 && (
            <div className="w-full flex flex-col justify-center items-center text-center relative py-12">
              <div className="absolute w-96 h-96 bg-[#c6ff00]/5 rounded-full blur-[100px] pointer-events-none" />
              <h1 className="font-bold text-7xl md:text-9xl tracking-tight text-white mb-6">
                ВОПРОСЫ<span className="text-[#c6ff00]">?</span>
              </h1>
              <p className="text-zinc-400 font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                Создание единой цифровой архитектуры проектирования для
                инженерного жизненного цикла ООО ЮНГП.
              </p>
              <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-sm">
                <div className="flex items-center gap-3 px-4 py-2 text-zinc-400">
                  <i className="fa-solid fa-microchip text-[#c6ff00] text-lg"></i>
                  <span>ПРЕЗЕНТАЦИЯ ЗАВЕРШЕНА</span>
                </div>
                <div className="hidden sm:block h-6 w-[1px] bg-zinc-800"></div>
                <button
                  onClick={() => changeSlide(0)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-rotate-left mr-2"></i> ПЕРЕЗАПУСТИТЬ
                  ПРЕЗЕНТАЦИЮ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Правый инфо-блок с индикатором прогресса */}
        <div className="lg:col-span-2 flex flex-col items-center lg:items-end justify-center z-10">
          <div className="border-2 border-dashed border-zinc-800/80 p-6 w-full max-w-[220px] bg-black/80 backdrop-blur-md text-center lg:text-right space-y-5">
            <div className="font-mono text-xs text-zinc-500">
              ПРОГРЕСС_СЕССИИ
            </div>
            <div className="text-6xl font-black tracking-tighter font-mono text-white">
              {(currentSlide + 1).toString().padStart(2, "0")}
              <span className="text-zinc-500 text-4xl">/{SLIDES.length}</span>
            </div>
            <div className="w-full bg-zinc-900 h-[3px]">
              <div
                className="bg-[#CCFF00] h-full transition-all duration-300 ease-out"
                style={{
                  width: `${((currentSlide + 1) / SLIDES.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* --- НАВИГАЦИОННЫЙ ФУТЕР (Имеет фон #050506 и перекрывает картинку) --- */}
      <footer className="relative z-30 w-full flex flex-col md:flex-row justify-between items-center border-t-2 border-zinc-800 bg-[#050506] px-4 md:px-6 pb-4 md:pb-6 pt-5 gap-4">
        <div className="font-mono text-[10px] md:text-xs text-zinc-600 order-2 md:order-1 text-center md:text-left uppercase">
          © 2026 ООО ЮНГП // ДРИМ. РАЗРАБОТКА И РЕГЛАМЕНТАЦИЯ ТРЕБОВАНИЙ К 3D
          МОДЕЛЯМ.
        </div>

        <div className="flex items-center space-x-6 order-1 md:order-2 w-full md:w-auto justify-between md:justify-end">
          <span className="font-mono text-[10px] md:text-xs text-zinc-600 uppercase hidden sm:inline">
            Управление: [←] / [→] или Пробел
          </span>
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={prevSlide}
              className="flex-1 sm:flex-initial border-2 border-zinc-700 hover:border-[#CCFF00] text-zinc-400 hover:text-[#CCFF00] px-6 py-2 text-sm font-mono uppercase transition-all duration-200 active:scale-95 bg-black"
            >
              НАЗАД
            </button>
            <button
              onClick={nextSlide}
              className="flex-1 sm:flex-initial bg-zinc-200 text-black hover:bg-[#CCFF00] font-mono text-sm font-bold uppercase px-8 py-2 transition-all duration-200 active:scale-95 border-2 border-transparent"
            >
              ДАЛЕЕ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
