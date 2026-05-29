import { useState, useEffect, useCallback } from "react";

// --- КОНСТАНТЫ ИДЕНТИФИКАЦИИ ДАННЫХ ---
const METADATA = {
  version: "2026",
  location: "SYS.LOC // ООО_ЮНГП // ЦИМ_ЯДРО",
  status: "СТАТУС // ПРИОРИТЕТ_ВЫБРАН",
  frequency: "100% // АВТОНОМНОСТЬ",
};

// --- НАСТРОЙКИ АНИМАЦИИ КАДРОВ ---
const TOTAL_FRAMES = 18;
const IMAGE_EXTENSION = "jpg";

const SLIDES = [
  { id: "01", tag: "СТРАТЕГИЧЕСКАЯ ЭКОСИСТЕМА", title: "ТИТУЛЬНЫЙ" },
  { id: "02", tag: "ТЕХНИЧЕСКОЕ ПРЕВОСХОДСТВО", title: "ИНТЕГРАЦИЯ AVEVA E3D" },
  {
    id: "03",
    tag: "ФИЛОСОФИЯ ДИЗАЙНА",
    title: "ФИЛОСОФИЯ И АРХИТЕКТУРА ДАННЫХ",
  },
  { id: "04", tag: "СИНЕРГИЯ ЭКОСИСТЕМЫ", title: "TEKLA И ДИАГРАММЫ" },
  { id: "05", tag: "АРХИТЕКТУРНАЯ СВОБОДА", title: "ГИБКОСТЬ ПЛАТФОРМЫ" },
  { id: "06", tag: "АУДИТ РЕСУРСОВ", title: "ПРОФЕССИОНАЛИЗМ 3D" },
  { id: "07", tag: "ИНДЕКС ПОРТФЕЛЯ", title: "МАСШТАБИРОВАНИЕ ПОРТФЕЛЯ" },
  { id: "08", tag: "ОПТИМИЗАЦИЯ", title: "ОПТИМИЗАЦИЯ ОБУЧЕНИЯ" },
  { id: "09", tag: "ИНФРАСТРУКТУРА ПОСТАВКИ", title: "ДОСТУП К 3D МОДЕЛЯМ" },
  { id: "10", tag: "ОБЕСПЕЧЕНИЕ КАЧЕСТВА", title: "ОПТИМИЗАЦИЯ МОДЕЛЕЙ" },
  { id: "11", tag: "АУДИТ КОНВЕЙЕРА", title: "ЭВОЛЮЦИЯ КАТАЛОГА" },
  { id: "12", tag: "МИССИЯ ЗАВЕРШЕНА", title: "ВОПРОСЫ И ОТВЕТЫ" },
];

export default function DreamZinePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [fadeState, setFadeState] = useState("in");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const ANIMATION_DURATION = 300;

  const changeSlide = useCallback(
    (newIndex) => {
      if (isTransitioning || newIndex === currentSlide) return;
      setIsTransitioning(true);
      setFadeState("out");

      setTimeout(() => {
        setCurrentSlide(newIndex);
        setTimeout(() => {
          setFadeState("in");
          setTimeout(() => {
            setIsTransitioning(false);
          }, ANIMATION_DURATION);
        }, 50);
      }, ANIMATION_DURATION);
    },
    [currentSlide, isTransitioning],
  );

  const nextSlide = useCallback(
    () => changeSlide((currentSlide + 1) % SLIDES.length),
    [changeSlide, currentSlide],
  );
  const prevSlide = useCallback(
    () => changeSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length),
    [changeSlide, currentSlide],
  );

  useEffect(() => {
    const frameInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % TOTAL_FRAMES);
    }, 120);
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
    <div className="min-h-screen bg-[#050506] text-zinc-100 font-sans overflow-hidden relative p-4 md:p-6 flex flex-col justify-between border-8 border-[#111111] selection:bg-[#CCFF00] selection:text-black">
      {/* Сетка бэкграунда */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.3)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/40 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.005)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />

      {/* --- ШАПКА --- */}
      <header className="z-20 w-full flex justify-between items-start border-b-2 border-zinc-800 pb-4 mix-blend-difference">
        <div className="flex flex-col">
          <span className="font-mono text-xs tracking-widest text-[#CCFF00]">
            {METADATA.version}
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none mt-1 uppercase">
            ОТДЕЛ<span className="text-[#CCFF00]">_</span>ДРИМ
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
      <main className="z-20 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 relative">
        <div className="absolute -left-6 -bottom-16 text-[28vw] font-black text-zinc-900 opacity-20 select-none pointer-events-none tracking-tighter z-0 leading-none">
          {SLIDES[currentSlide].id}
        </div>

        {/* Сайдбар Матрица (Лево) */}
        <div className="lg:col-span-2 flex flex-col items-center lg:items-start justify-center max-h-[75vh]">
          <div className="border-2 border-dashed border-zinc-800 p-4 w-full max-w-[240px] bg-black/80 backdrop-blur-md text-left space-y-4 overflow-y-auto custom-scrollbar">
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
                      : "text-zinc-600 hover:text-white pl-3"
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
              ? "opacity-0 translate-y-6 scale-[0.97] blur-sm pointer-events-none"
              : "opacity-100 translate-y-0 scale-100 blur-0"
          }`}
        >
          {/* 01 */}
          {currentSlide === 0 && (
            <div className="w-full flex flex-col justify-center items-start relative">
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#C6FF00]/25 rounded-full blur-[120px] pointer-events-none" />
              <span className="text-sm font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 block">
                СТРАТЕГИЧЕСКИЕ ИЗМЕНЕНИЯ // 2026
              </span>
              <h1 className="font-bold text-6xl lg:text-8xl tracking-tight text-white leading-none mb-8">
                ПРИОРИТЕТ <br />
                <span className="text-[#CCFF00] font-black drop-shadow-[0_0_30px_rgba(198,255,0,0.25)]">
                  ПРОГРАММНОГО
                </span>
                <br />
                ВЫБОРА
              </h1>
              <p className="text-zinc-400 max-w-3xl text-lg lg:text-xl font-light leading-relaxed mb-10">
                Выбор приоритетного ПО для ООО ЮНГП, а также дальнейшее развитие
                одного направления для создания ЦИМ
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

          {/* 02 */}
          {currentSlide === 1 && (
            <div className="w-full flex flex-col lg:flex-row items-center gap-10 justify-center">
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center gap-2 text-sm font-mono text-[#CCFF00]">
                  <span>02 / ТЕХНИЧЕСКОЕ ПРЕИМУЩЕСТВО</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                  The Strategic Shift:
                  <br />
                  AVEVA E3D Integration
                </h2>
                <p className="text-zinc-400 text-base lg:text-lg leading-relaxed">
                  Transitioning to a unified Information Management ecosystem
                  yields complete baseline architectural control. Unlike
                  standard Intergraph SMART engines, AVEVA creates customizable
                  micro-databases matching the custom needs of the organization.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-lg">
                    <i className="fa-solid fa-diagram-project text-[#c6ff00] mb-3 text-2xl block" />
                    <h4 className="text-white font-medium text-base mb-2">
                      Diagram Sync
                    </h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Automated telemetry parity matching between P&ID schemes
                      and core 3D geometry objects.
                    </p>
                  </div>
                  <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-lg">
                    <i className="fa-solid fa-cubes text-[#c6ff00] mb-3 text-2xl block" />
                    <h4 className="text-white font-medium text-base mb-2">
                      Tekla Parity
                    </h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Native import configuration pathways for complex
                      structural frames directly into design matrix pipelines.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-80 lg:h-[420px] relative border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 flex flex-col justify-between p-4 group">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
                <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 bg-zinc-950/40">
                  <img
                    src={`/animation/frame_${currentFrame}.${IMAGE_EXTENSION}`}
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
                <div className="z-10 flex justify-between items-center w-full font-mono text-xs text-zinc-400 bg-zinc-950/80 backdrop-blur-sm p-2 rounded border border-zinc-800/40">
                  <span className="text-[#c6ff00] font-bold tracking-widest animate-pulse">
                    ● ОСНОВНОЙ ПОТОК АКТИВЕН
                  </span>
                  <span>FPS // ~8</span>
                </div>
                <div className="z-10 flex justify-between items-center w-full font-mono text-xs text-zinc-400 bg-gradient-to-t from-zinc-950 to-transparent p-2 mt-auto">
                  <span className="text-white font-bold">
                    КАДР: {currentFrame + 1}/{TOTAL_FRAMES}
                  </span>
                  <span className="text-zinc-500">ID_CORE_MATRIX_2026</span>
                </div>
              </div>
            </div>
          )}

          {/* 03 */}
          {currentSlide === 2 && (
            <div className="w-full flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
              <span className="text-sm font-mono tracking-widest text-zinc-500 mb-6 uppercase block">
                03 // Архитектура и философия дизайна
              </span>
              <div className="relative py-12 px-8 bg-zinc-900/20 border border-zinc-800/60 rounded-2xl max-w-4xl backdrop-blur-md">
                <i className="fa-solid fa-quote-left text-zinc-800 text-6xl absolute -top-5 left-6 pointer-events-none" />
                <blockquote className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8 relative z-10 px-6">
                  "AVEVA работает точно как{" "}
                  <span className="text-[#c6ff00] underline decoration-wavy decoration-[#c6ff00]/40">
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

          {/* 04 */}
          {currentSlide === 3 && (
            <div className="w-full flex flex-col lg:flex-row items-center gap-10 justify-center">
              <div className="w-full lg:w-1/2 h-80 bg-zinc-950 border border-zinc-800 rounded-xl relative overflow-hidden order-2 lg:order-1 flex items-center justify-center p-8">
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between text-sm font-mono text-zinc-500 border-b border-zinc-900 pb-3">
                    <span>ПРИЕМ ПАКЕТА ДАННЫХ</span>
                    <span className="text-[#c6ff00]">СООТВЕТСТВУЕТ</span>
                  </div>
                  <div className="h-3 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-[#c6ff00] w-full rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-3">
                    <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-lg text-center">
                      <span className="block text-3xl font-bold text-white">
                        100%
                      </span>
                      <span className="text-xs text-zinc-500 font-mono uppercase block mt-1">
                        Синхронизация атрибутов
                      </span>
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-lg text-center">
                      <span className="block text-3xl font-bold text-white">
                        0 мс
                      </span>
                      <span className="text-xs text-zinc-500 font-mono uppercase block mt-1">
                        Задержка
                      </span>
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-lg text-center">
                      <span className="block text-3xl font-bold text-[#c6ff00]">
                        Нативно
                      </span>
                      <span className="text-xs text-zinc-500 font-mono uppercase block mt-1">
                        Загрузка Tekla
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6 order-1 lg:order-2">
                <div className="text-sm font-mono text-[#c6ff00]">
                  04 // СИНЕРГИЯ ЭКОСИСТЕМЫ
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                  Синергия экосистемы:
                  <br />
                  Tekla и связи диаграмм
                </h2>
                <div className="space-y-4">
                  <div className="p-5 bg-zinc-900/30 border-l-4 border-[#c6ff00] rounded-r-lg">
                    <h4 className="text-white font-semibold text-lg mb-1">
                      Прямой конвейер Tekla Structures
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Структурные объекты безошибочно импортируются в целевой
                      массив как локальные смарт-элементы данных, исключая сбои
                      стороннего преобразования.
                    </p>
                  </div>
                  <div className="p-5 bg-zinc-900/30 border-l-4 border-zinc-700 rounded-r-lg">
                    <h4 className="text-zinc-300 font-semibold text-lg mb-1">
                      Матрица автоматизации диаграмм AVEVA
                    </h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Классификации трубопроводов мгновенно загружают
                      параметрические переменные прямо в проектные слои без
                      ручных циклов правки.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 05 */}
          {currentSlide === 4 && (
            <div className="w-full flex flex-col justify-center">
              <span className="text-sm font-mono text-[#c6ff00] mb-3 block">
                05 // АРХИТЕКТУРНАЯ СВОБОДА
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8">
                Стандарты гибкости платформы
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-zinc-900/20 border border-zinc-800 rounded-xl hover:border-[#c6ff00]/30 transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-zinc-900 flex items-center justify-center text-[#c6ff00] text-2xl mb-5 group-hover:bg-[#c6ff00] group-hover:text-black transition-all">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                  </div>
                  <h3 className="font-semibold text-xl text-white mb-2">
                    Современный интуитивный интерфейс
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Фреймворк приложения использует эргономичные принципы
                    пакетов MS Office, ускоряя циклы адаптации.
                  </p>
                </div>
                <div className="p-8 bg-zinc-900/20 border border-zinc-800 rounded-xl hover:border-[#c6ff00]/30 transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-zinc-900 flex items-center justify-center text-[#c6ff00] text-2xl mb-5 group-hover:bg-[#c6ff00] group-hover:text-black transition-all">
                    <i className="fa-solid fa-code"></i>
                  </div>
                  <h3 className="font-semibold text-xl text-white mb-2">
                    Управление скриптами PML
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Язык программируемых макросов открывает глубокое управление
                    автоматизацией без привлечения внешних консультантов.
                  </p>
                </div>
                <div className="p-8 bg-zinc-900/20 border border-zinc-800 rounded-xl hover:border-[#c6ff00]/30 transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-zinc-900 flex items-center justify-center text-[#c6ff00] text-2xl mb-5 group-hover:bg-[#c6ff00] group-hover:text-black transition-all">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <h3 className="font-semibold text-xl text-white mb-2">
                    Операционная автономность
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Выделенные внутренние базы данных обеспечивают чистые
                    информационные таблицы, которые отлично работают без
                    ограничений по масштабу.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 06 */}
          {currentSlide === 5 && (
            <div className="w-full flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="text-sm font-mono text-[#c6ff00] mb-2 block">
                    06 // КОРПОРАТИВНЫЙ АУДИТ РЕСУРСОВ
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    3D-компетенция подразделений
                  </h2>
                </div>
                <div className="flex items-center gap-1 bg-zinc-900 p-1.5 rounded-lg border border-zinc-800 font-mono text-xs">
                  <span className="bg-zinc-800 text-white px-3 py-1.5 rounded">
                    Матричный вид
                  </span>
                </div>
              </div>
              <div className="w-full overflow-x-auto border border-zinc-800/80 rounded-xl bg-zinc-950/40 backdrop-blur-sm">
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
                        3D ур. (24)
                      </th>
                      <th className="p-4 font-medium uppercase tracking-wider text-center">
                        Доля (24)
                      </th>
                      <th className="p-4 font-medium uppercase tracking-wider text-center text-[#c6ff00]">
                        Штат (26)
                      </th>
                      <th className="p-4 font-medium uppercase tracking-wider text-center text-[#c6ff00]">
                        Цель (26)
                      </th>
                      <th className="p-4 font-medium uppercase tracking-wider text-right text-[#c6ff00]">
                        Доля (26)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300">
                    {[
                      {
                        name: "МТО (закупки)",
                        s24: 14,
                        l24: 5,
                        r24: "36%",
                        s26: 7,
                        t26: 7,
                        r26: "100%",
                        premium: true,
                      },
                      {
                        name: "СанО (санитарная схема)",
                        s24: 12,
                        l24: 3,
                        r24: "25%",
                        s26: 6,
                        t26: 3,
                        r26: "67%",
                        premium: true,
                      },
                      {
                        name: "ОА (архитектурный комплекс)",
                        s24: 17,
                        l24: 3,
                        r24: "18%",
                        s26: 11,
                        t26: 4,
                        r26: "36%",
                        premium: false,
                      },
                      {
                        name: "НПО (технологическая компоновка)",
                        s24: 17,
                        l24: 1,
                        r24: "6%",
                        s26: 12,
                        t26: 2,
                        r26: "16%",
                        premium: false,
                      },
                      {
                        name: "РТО (проектирование оборудования)",
                        s24: 12,
                        l24: 4,
                        r24: "33%",
                        s26: 6,
                        t26: 2,
                        r26: "33%",
                        premium: false,
                      },
                      {
                        name: "ЭТО (электрика)",
                        s24: 17,
                        l24: 3,
                        r24: "18%",
                        s26: 12,
                        t26: 4,
                        r26: "33%",
                        premium: false,
                      },
                      {
                        name: "АСО 1 (конструктивная группа)",
                        s24: 18,
                        l24: 6,
                        r24: "33%",
                        s26: 19,
                        t26: "??",
                        r26: "—",
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
                            className={`px-2 py-1 rounded font-bold ${row.premium ? "bg-[#c6ff00]/10 border border-[#c6ff00]/20 text-[#c6ff00]" : "bg-zinc-800 text-zinc-400"}`}
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

          {/* 07 */}
          {currentSlide === 6 && (
            <div className="w-full flex flex-col justify-center">
              <span className="text-sm font-mono text-[#c6ff00] mb-3 block">
                07 // ИНДЕКС ЕМКОСТИ ПОРТФЕЛЯ
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-10">
                Активное масштабирование 3D-портфеля
              </h2>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-sm font-mono">
                    <span className="text-zinc-400">
                      Портфель INTERGRAPH SMART (база 2024)
                    </span>
                    <span className="text-white font-bold text-lg">
                      1 406 ЕД.
                    </span>
                  </div>
                  <div className="h-8 bg-zinc-900/60 border border-zinc-800 rounded-md overflow-hidden relative flex items-center px-4">
                    <div className="absolute inset-y-0 left-0 bg-zinc-800 w-[45%] rounded-r" />
                    <span className="z-10 text-xs font-mono text-zinc-400">
                      Объем устаревшей архитектуры
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-sm font-mono">
                    <span className="text-zinc-400">
                      Трасса AVEVA Production (базовая линия 2024)
                    </span>
                    <span className="text-white font-bold text-lg">
                      1 476 ЕД.
                    </span>
                  </div>
                  <div className="h-8 bg-zinc-900/60 border border-zinc-800 rounded-md overflow-hidden relative flex items-center px-4">
                    <div className="absolute inset-y-0 left-0 bg-zinc-700 w-[48%] rounded-r" />
                    <span className="z-10 text-xs font-mono text-zinc-300">
                      Первичный след интеграции
                    </span>
                  </div>
                </div>
                <div className="py-2 border-b border-dashed border-zinc-800" />
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-sm font-mono">
                    <span className="text-[#c6ff00] font-bold">
                      Целевая AVEVA (ядро 2026)
                    </span>
                    <span className="text-[#c6ff00] font-bold text-lg">
                      РАСШИРЕННЫЙ ПОРТФЕЛЬ (1 500+)
                    </span>
                  </div>
                  <div className="h-10 bg-zinc-900/30 border border-[#c6ff00]/30 rounded-md overflow-hidden relative flex items-center px-4 shadow-[0_0_20px_rgba(198,255,0,0.1)]">
                    <div className="absolute inset-y-0 left-0 bg-[#c6ff00] w-[92%] rounded-r" />
                    <span className="z-10 text-sm font-mono font-bold text-black uppercase">
                      Стратегический фокус: кластерные площадки + CPS 1490,
                      1495, 1499
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 08 */}
          {currentSlide === 7 && (
            <div className="w-full flex flex-col lg:flex-row items-center gap-10 justify-center">
              <div className="w-full lg:w-2/5 space-y-5">
                <span className="text-sm font-mono text-[#c6ff00] block">
                  08 // ОПТИМИЗАЦИЯ РЕСУРСОВ
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
                <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-[#c6ff00] animate-pulse"></div>
                  <span className="text-sm font-mono text-zinc-300">
                    Активен конвейер развертывания внутреннего портала.
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-xl flex flex-col justify-between min-h-[180px]">
                  <span className="text-xs font-mono text-zinc-500 uppercase">
                    Базовый уровень расходов вендора за 2024
                  </span>
                  <div className="my-4">
                    <span className="font-bold text-5xl text-white">2.18M</span>
                    <span className="text-xs text-zinc-400 font-mono block mt-1">
                      ПОДТВЕРЖДЕННЫЙ ОТТОК РУБ.
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs">
                    Карта расходов на внешнее обучение по валидации технического
                    ПО.
                  </p>
                </div>
                <div className="p-6 bg-zinc-900/30 border-2 border-[#c6ff00] rounded-xl flex flex-col justify-between min-h-[180px] relative overflow-hidden shadow-[0_0_30px_rgba(198,255,0,0.04)]">
                  <span className="text-xs font-mono text-[#c6ff00] uppercase tracking-wider">
                    Прогноз цели на 2026
                  </span>
                  <div className="my-4">
                    <span className="font-bold text-6xl md:text-7xl text-[#c6ff00]">
                      0.00
                    </span>
                    <span className="text-xs text-[#c6ff00] font-mono block mt-1">
                      ОБЩИЕ РАСХОДЫ РУБ.
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs">
                    Путь к полностью самодостаточной цифровой инфраструктуре
                    обучения.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 09 */}
          {currentSlide === 8 && (
            <div className="w-full flex flex-col justify-center max-w-5xl mx-auto">
              <span className="text-sm font-mono text-[#c6ff00] mb-3 block">
                09 // ПОСТАВКА ИНФРАСТРУКТУРЫ
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8">
                Демократизация доступа к 3D-моделям
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">
                      ПРОЦЕСС РАЗВЕРТЫВАНИЯ 2024
                    </span>
                    <span className="text-xs bg-zinc-900 px-3 py-1 text-zinc-400 rounded">
                      ОГРАНИЧЕНО
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-zinc-300">
                    Ручные циклы экспорта Navisworks
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Структуры данных компилировались вручную только дважды в
                    календарную неделю, создавая узкие места координации и
                    задержки отслеживания между внешними офисами управления
                    площадками.
                  </p>
                  <div className="h-[2px] bg-zinc-900 w-full" />
                  <div className="flex items-center gap-3 text-zinc-500 text-sm font-mono">
                    <i className="fa-solid fa-triangle-exclamation" />
                    <span>Окно задержки данных до 72 часов.</span>
                  </div>
                </div>
                <div className="p-8 bg-zinc-900/30 border border-[#c6ff00]/40 rounded-xl space-y-4 shadow-[0_0_20px_rgba(198,255,0,0.02)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#c6ff00]">
                      ПРОЕКТНАЯ ДОРОЖНАЯ КАРТА 2026
                    </span>
                    <span className="text-xs bg-[#c6ff00]/10 px-3 py-1 text-[#c6ff00] rounded border border-[#c6ff00]/20">
                      АВТОМАТИЗИРОВАНО
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-white">
                    Ежедневная автоматическая синхронизация систем
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    Демоны автоматических скриптов каждую ночь компилируют и
                    выгружают единые массивы моделей прямо в общие слои доступа
                    к проектам, обеспечивая чистые циклы проверки.
                  </p>
                  <div className="h-[2px] bg-zinc-800/80 w-full" />
                  <div className="flex items-center gap-3 text-[#c6ff00] text-sm font-mono">
                    <i className="fa-solid fa-circle-check" />
                    <span>
                      Немедленный глобальный доступ к проверке телеметрии.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 10 */}
          {currentSlide === 9 && (
            <div className="w-full flex flex-col justify-center">
              <span className="text-sm font-mono text-[#c6ff00] mb-3 block">
                10 // СТАНДАРТЫ ОБЕСПЕЧЕНИЯ КАЧЕСТВА
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8">
                Оптимизация инженерной модели
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
                  <span className="font-mono font-bold text-xs text-[#c6ff00] tracking-wider block mb-2">
                    ЭТАП 01 // СТАБИЛИЗАЦИЯ КАТАЛОГА
                  </span>
                  <h4 className="text-white text-lg font-medium mb-2">
                    Стандартизированные мастер-компоненты
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Создание единой базы данных для стандартизированных
                    корпоративных конфигураций оборудования с заранее
                    настроенными параметрическими настройками.
                  </p>
                </div>
                <div className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
                  <span className="font-mono font-bold text-xs text-[#c6ff00] tracking-wider block mb-2">
                    ЭТАП 02 // НОРМАТИВНЫЕ МАКЕТЫ
                  </span>
                  <h4 className="text-white text-lg font-medium mb-2">
                    Внутренние регламенты фреймворка
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Публикация современных технических документов, точно
                    определяющих, как должны быть организованы и структурированы
                    3D-компоненты проекта.
                  </p>
                </div>
                <div className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
                  <span className="font-mono font-bold text-xs text-[#c6ff00] tracking-wider block mb-2">
                    ЭТАП 03 // СООТВЕТСТВИЕ НОРМАМ
                  </span>
                  <h4 className="text-white text-lg font-medium mb-2">
                    Контрольные точки стандартизации ГОСТ
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Применение автоматизированных скриптов валидации для
                    подтверждения полного соответствия государственным
                    инженерным стандартам России на всех слоях модели.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 11 */}
          {currentSlide === 10 && (
            <div className="w-full flex flex-col justify-center">
              <span className="text-sm font-mono text-[#c6ff00] mb-2 block">
                11 // АУДИТ ОПТИМИЗАЦИИ КОНВЕЙЕРА
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8">
                Эволюция каталога AVEVA
              </h2>
              <div className="w-full overflow-hidden border border-zinc-800 rounded-xl bg-zinc-950/60 font-mono text-sm">
                <div className="grid grid-cols-3 bg-zinc-900 p-4 font-bold text-zinc-400 border-b border-zinc-800">
                  <div>КОНТРОЛИРУЕМЫЙ ПАРАМЕТР</div>
                  <div>ПРОФИЛЬ РАЗВЕРТЫВАНИЯ 2024</div>
                  <div className="text-[#c6ff00]">СТРАТЕГИЧЕСКАЯ ЦЕЛЬ 2026</div>
                </div>
                <div className="divide-y divide-zinc-900/80 text-zinc-300">
                  <div className="grid grid-cols-3 p-4 items-center">
                    <div className="font-semibold text-white">
                      Управление структурой классов
                    </div>
                    <div className="text-zinc-500 text-sm pr-4">
                      Неконтролируемые изменения фиксировались в локальных
                      файлах Google Sheets.
                    </div>
                    <div className="text-zinc-300 bg-zinc-900/60 border border-zinc-800 p-3 rounded text-sm">
                      Строгие шаблоны проверки, которыми владеет внутренняя
                      команда CAD-управления.
                    </div>
                  </div>
                  <div className="grid grid-cols-3 p-4 items-center">
                    <div className="font-semibold text-white">
                      Соответствие стандартам ГОСТ
                    </div>
                    <div className="text-zinc-500 text-sm pr-4">
                      Компоненты иногда создавались с неверными
                      пользовательскими размерами.
                    </div>
                    <div className="text-zinc-300 bg-zinc-900/60 border border-zinc-800 p-3 rounded text-sm">
                      Обязательные системные проверки с автоматизированными
                      сообщениями об ошибках.
                    </div>
                  </div>
                  <div className="grid grid-cols-3 p-4 items-center">
                    <div className="font-semibold text-white">
                      Схемы идентификаторов деталей
                    </div>
                    <div className="text-zinc-500 text-sm pr-4">
                      Неструктурированные списки имен компонентов, вызывающие
                      задержки выбора.
                    </div>
                    <div className="text-zinc-300 bg-zinc-900/60 border border-zinc-800 p-3 rounded text-sm">
                      Кодированные шаблоны именования, задающие правила
                      категоризации смарт-логики.
                    </div>
                  </div>
                  <div className="grid grid-cols-3 p-4 items-center">
                    <div className="font-semibold text-white">
                      Массивы отслеживания крепежа
                    </div>
                    <div className="text-zinc-500 text-sm pr-4">
                      Исключены из начальных 3D-слоев; добавлялись вручную при
                      проверках расчетов.
                    </div>
                    <div className="text-[#c6ff00] font-medium bg-[#c6ff00]/10 border border-[#c6ff00]/20 p-3 rounded text-sm">
                      Полное включение в 3D-моделирование для мгновенной
                      выгрузки в МТО-пайплайны.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 12 */}
          {currentSlide === 11 && (
            <div className="w-full flex flex-col justify-center items-center text-center relative py-12">
              <div className="absolute w-96 h-96 bg-[#c6ff00]/5 rounded-full blur-[100px] pointer-events-none" />
              <span className="text-sm font-mono tracking-[0.4em] text-[#c6ff00] mb-4 block uppercase">
                МИССИЯ ОСНОВНОГО ФРЕЙМВОРКА ЗАВЕРШЕНА
              </span>
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
                  <span>КОНТРОЛЬ СИСТЕМЫ: СТАБИЛЬНО</span>
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
          <div className="border-2 border-dashed border-zinc-800 p-6 w-full max-w-[220px] bg-black text-center lg:text-right space-y-5">
            <div className="font-mono text-xs text-zinc-500">
              ПРОГРЕСС_СЕССИИ
            </div>
            <div className="text-6xl font-black tracking-tighter font-mono text-white">
              {(currentSlide + 1).toString().padStart(2, "0")}
              <span className="text-zinc-800 text-4xl">/12</span>
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

      {/* --- НАВИГАЦИОННЫЙ ФУТЕР БРУТАЛИЗМ --- */}
      <footer className="z-20 w-full flex flex-col md:flex-row justify-between items-center border-t-2 border-zinc-800 pt-5 gap-4">
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
