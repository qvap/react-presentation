import React, { useState, useEffect } from "react";

// --- КОНСТАНТЫ ИДЕНТИФИКАЦИИ ДАННЫХ ---
const METADATA = {
  version: "V.2026.ДРИМ.RELEASE",
  location: "SYS.LOC // ООО_ЮНГП // ЦИМ_ЯДРО",
  status: "STATUS // ПРИОРИТЕТ_ВЫБРАН",
  frequency: "100% // АВТОНОМНОСТЬ",
};

// --- НАСТРОЙКИ АНИМАЦИИ КАДРОВ ---
const TOTAL_FRAMES = 18; // Измените на точное количество картинок из архива
const IMAGE_EXTENSION = "jpg"; // Расширение ваших файлов из архива

const SLIDES = [
  {
    id: "01",
    tag: "СТРАТЕГИЯ ЕДИНСТВА",
    title: "ЦИМ РЕВОЛЮЦИЯ",
    subtitle: "ВЫБОР ПРИОРИТЕТНОГО ПО ДЛЯ ООО ЮНГП.",
    body: "Переход и дальнейшее развитие одного направления для создания комплексной ЦИМ. AVEVA ломает ограничения SMART, обеспечивая полную автономность и гибкость архитектуры данных.",
  },
  {
    id: "02",
    tag: "РЕСУРСЫ И КАДРЫ",
    title: "МОДЕРНИЗАЦИЯ",
    subtitle: "ЛИКВИДАЦИЯ ЗАВИСИМОСТИ ОТ ВНЕШНЕГО ОБУЧЕНИЯ.",
    body: "Снижение затрат на подготовку сотрудников до 0 рублей в 2026 году. Запуск внутреннего интерактивного обучающего портала и базы знаний ООО ЮНГП.",
  },
  {
    id: "03",
    tag: "АКТИВНЫЕ СИСТЕМЫ",
    title: "ПОТОК ДАННЫХ",
    subtitle: "АВТОМАТИЗАЦИЯ ВЫГРУЗКИ И ПОРТФЕЛЬ ПРОЕКТОВ.",
    body: "Переход от ручной обработки к непрерывному автоматизированному стриму 3D-моделей в единую среду просмотра.",
  },
  {
    id: "04",
    tag: "АРХИТЕКТУРА ДАННЫХ",
    title: "КАТАЛОГ // ЭВОЛЮЦИЯ",
    subtitle: "ЖЕСТКИЙ КОНТРОЛЬ ПРОТИВ СИСТЕМНОГО ХАОСА.",
    body: "Трансформация каталога AVEVA из разрозненного массива данных 2024 года в регламентированную экосистему 2026 года.",
  },
];

export default function DreamZinePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // Состояние для покадровой анимации
  const [currentFrame, setCurrentFrame] = useState(0);

  const nextSlide = () => {
    setIsGlitching(true);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setIsGlitching(true);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (isGlitching) {
      const timer = setTimeout(() => setIsGlitching(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isGlitching]);

  // Эффект автоматического переключения кадров (работает постоянно)
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % TOTAL_FRAMES);
    }, 120); // 120мс на кадр (~8 кадров в секунду) для аутентичного стоп-моушен эффекта
    return () => clearInterval(frameInterval);
  }, []);

  // Управление с клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden relative p-4 md:p-8 flex flex-col justify-between border-8 border-[#111111] selection:bg-[#CCFF00] selection:text-black">
      {/* Сетка бэкграунда */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.3)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.005)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />

      {/* --- ШАПКА ИНТЕРФЕЙСА --- */}
      <header className="z-20 w-full flex justify-between items-start border-b-2 border-white pb-4 mix-blend-difference">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] tracking-widest text-[#CCFF00]">
            {METADATA.version}
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-none mt-1">
            ДРИМ<span className="text-[#CCFF00]">_</span>CORE
            <span className="text-zinc-600">.SYS</span>
          </h1>
        </div>

        <div className="hidden md:flex flex-col text-right font-mono text-[10px] tracking-wider text-zinc-400 space-y-0.5">
          <div>{METADATA.location}</div>
          <div>{METADATA.status}</div>
          <div className="text-[#CCFF00] animate-pulse">
            {METADATA.frequency}
          </div>
        </div>
      </header>

      {/* --- ОСНОВНОЙ ФРЕЙМ ИНТЕРАКТИВНОГО ЗИНА --- */}
      <main className="z-20 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 relative">
        {/* Фоновый номер слайда */}
        <div className="absolute -left-6 -bottom-12 text-[26vw] font-black text-zinc-900 opacity-20 select-none pointer-events-none tracking-tighter z-0 leading-none">
          {SLIDES[currentSlide].id}
        </div>

        {/* Навигационный индекс слева */}
        <div className="lg:col-span-2 hidden lg:flex flex-col space-y-3 border-l-2 border-[#CCFF00] pl-4 self-start mt-2">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                setIsGlitching(true);
                setCurrentSlide(idx);
              }}
              className={`text-left font-mono text-[11px] uppercase transition-all duration-300 ${
                currentSlide === idx
                  ? "text-[#CCFF00] font-bold tracking-widest translate-x-2"
                  : "text-zinc-600 hover:text-white"
              }`}
            >
              [{slide.id}] {slide.tag}
            </button>
          ))}
        </div>

        {/* Исполнительный контейнер контента */}
        <div
          className={`lg:col-span-8 space-y-6 transition-all duration-150 ${isGlitching ? "skew-x-2 scale-98 opacity-40 blur-[1px]" : "skew-x-0 scale-100 opacity-100 blur-0"}`}
        >
          <div className="flex items-center space-x-3">
            <span className="bg-[#CCFF00] text-black text-xs font-mono px-2 py-0.5 font-bold tracking-wider">
              {SLIDES[currentSlide].tag}
            </span>
            <div className="h-[1px] bg-zinc-800 flex-grow" />
          </div>

          {/* СЛАЙД 01: ДОМИНИРОВАНИЕ AVEVA НАД SMART */}
          {currentSlide === 0 && (
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-none">
                {SLIDES[0].title}
              </h2>
              <p className="text-xl font-bold text-[#CCFF00] tracking-wide max-w-2xl">
                {SLIDES[0].subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="border-2 border-zinc-800 p-4 bg-[#0F0F0F] relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-zinc-800 via-white to-zinc-900 mix-blend-difference transition-opacity duration-300 pointer-events-none" />
                  <div className="font-mono text-xs text-[#CCFF00] mb-2">
                    // ПРЕИМУЩЕСТВА ЭКОСИСТЕМЫ
                  </div>
                  <ul className="text-xs font-mono space-y-2 text-zinc-300 group-hover:text-black z-10 relative">
                    <li>
                      • Автоматическая синхронизация схем Diagrams и геометрии
                      E3D.
                    </li>
                    <li>
                      • Конструкции Tekla Structures воспринимаются как
                      «родные».
                    </li>
                    <li>
                      • Интуитивный интерфейс, упрощающий обучение (схож с
                      Office).
                    </li>
                    <li>
                      • Легкое написание макросов, своя база данных и автономная
                      архитектура.
                    </li>
                  </ul>
                </div>

                <div className="border-2 border-zinc-800 p-4 bg-[#0F0F0F] border-dashed">
                  <div className="font-mono text-xs text-zinc-500 mb-2">
                    // ОГРАНИЧЕНИЯ SMART
                  </div>
                  <ul className="text-xs font-mono space-y-2 text-zinc-400">
                    <li>
                      • Модели строителей — сторонние загрузки без метаданных и
                      замеров.
                    </li>
                    <li>• Крайне тяжело поддается кастомизации под задачи.</li>
                    <li>
                      • Зависит от чужого стандартного движка MS SQL Server.
                    </li>
                    <li>
                      • Жесткая архитектура («эффект деревянности»
                      адаптированного Android).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* СЛАЙД 02: ТРАНСФОРМАЦИЯ КОМПЕТЕНЦИЙ И ОБУЧЕНИЕ */}
          {currentSlide === 1 && (
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-none">
                {SLIDES[1].title}
              </h2>
              <p className="text-xl font-bold text-[#CCFF00] font-mono">
                {SLIDES[1].subtitle}
              </p>

              {/* Таблица кадров */}
              <div className="overflow-x-auto border-2 border-zinc-800 bg-black p-2">
                <div className="font-mono text-[9px] text-zinc-500 mb-1">
                  // ДИНАМИКА ВЛАДЕНИЯ 3D ПО ОТДЕЛАМ
                </div>
                <table className="w-full text-left font-mono text-[11px]">
                  <thead>
                    <tr className="border-b border-zinc-700 text-zinc-400">
                      <th className="p-2">ОТДЕЛ</th>
                      <th className="p-2">ВСЕГО '24</th>
                      <th className="p-2">3D '24</th>
                      <th className="p-2">% '24</th>
                      <th className="p-2 text-[#CCFF00]">ВСЕГО '26</th>
                      <th className="p-2 text-[#CCFF00]">3D '26</th>
                      <th className="p-2 text-[#CCFF00]">% '26</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "МТО",
                        t24: 14,
                        d24: 5,
                        p24: "36%",
                        t26: 7,
                        d26: 7,
                        p26: "100%",
                      },
                      {
                        name: "СанО",
                        t24: 12,
                        d24: 3,
                        p24: "25%",
                        t26: 6,
                        d26: 3,
                        p26: "67%",
                      },
                      {
                        name: "ОА",
                        t24: 17,
                        d24: 3,
                        p24: "18%",
                        t26: 11,
                        d26: 4,
                        p26: "36%",
                      },
                      {
                        name: "НПО",
                        t24: 17,
                        d24: 1,
                        p24: "6%",
                        t26: 12,
                        d26: 2,
                        p26: "16%",
                      },
                      {
                        name: "РТО",
                        t24: 12,
                        d24: 4,
                        p24: "33%",
                        t26: 6,
                        d26: 2,
                        p26: "33%",
                      },
                      {
                        name: "ЭТО",
                        t24: 17,
                        d24: 3,
                        p24: "18%",
                        t26: 12,
                        d26: 4,
                        p26: "33%",
                      },
                      {
                        name: "АСО 1",
                        t24: 18,
                        d24: 6,
                        p24: "33%",
                        t26: 19,
                        d26: "??",
                        p26: "—",
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-zinc-900 hover:bg-zinc-900 transition-colors"
                      >
                        <td className="p-2 font-bold">{row.name}</td>
                        <td className="p-2 text-zinc-500">{row.t24}</td>
                        <td className="p-2 text-zinc-500">{row.d24}</td>
                        <td className="p-2 text-zinc-500">{row.p24}</td>
                        <td className="p-2 text-zinc-300">{row.t26}</td>
                        <td className="p-2 text-[#CCFF00]">{row.d26}</td>
                        <td className="p-2 text-[#CCFF00] font-bold">
                          {row.p26}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Финансовый блок */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="border border-zinc-800 p-2 bg-[#0F0F0F]">
                  <div className="text-[10px] text-zinc-500 font-mono">
                    ПОТРАЧЕНО 2024
                  </div>
                  <div className="text-xs font-mono text-zinc-300 mt-1">
                    2 180 000 ₽
                  </div>
                </div>
                <div className="border border-zinc-800 p-2 bg-[#0F0F0F]">
                  <div className="text-[10px] text-zinc-500 font-mono">
                    ПОТРАЧЕНО 2025
                  </div>
                  <div className="text-xs font-mono text-zinc-300 mt-1">
                    190 000 ₽
                  </div>
                </div>
                <div className="border-2 border-[#CCFF00] p-2 bg-black">
                  <div className="text-[10px] text-[#CCFF00] font-mono">
                    ПОТРАЧЕНО 2026
                  </div>
                  <div className="text-xs font-mono font-bold text-[#CCFF00] mt-1">
                    0 ₽ // ПОРТАЛ ЮНГП
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-zinc-400 bg-zinc-950 p-2 border border-zinc-900">
                • Онлайн-поддержка пользователей в реальном времени <br />•
                Бонус: Прокачка состава ГИПов в понимании пространственного 3D.
              </div>
            </div>
          )}

          {/* СЛАЙД 03: ПРОЕКТЫ И ИНТЕРАКТИВНАЯ ПОКАДРОВАЯ АНИМАЦИЯ */}
          {currentSlide === 2 && (
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-none">
                {SLIDES[2].title}
              </h2>
              <p className="text-xl font-bold text-[#CCFF00] font-mono">
                {SLIDES[2].subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Левая сторона: Текстовые данные стрима */}
                <div className="md:col-span-7 space-y-4">
                  <div className="border-l-2 border-[#CCFF00] bg-black p-3 space-y-3">
                    <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                      // РЕЖИМ ВЫГРУЗКИ МОДЕЛЕЙ
                    </div>
                    <div className="space-y-2 font-mono text-[11px]">
                      <div className="p-2 bg-zinc-900/50">
                        <span className="text-zinc-500">2024:</span> Экспорт в
                        Navisworks производился вручную 2 раза в неделю.
                      </div>
                      <div className="p-2 bg-zinc-900 border border-zinc-800 text-white">
                        <span className="text-[#CCFF00]">2026:</span> Настроена
                        ежедневная автовыгрузка из AVEVA в Navisworks, доступная
                        каждому юзеру.
                      </div>
                    </div>
                  </div>

                  <div className="border border-zinc-800 p-3 bg-[#0F0F0F]">
                    <div className="font-mono text-xs text-zinc-500 mb-1.5">
                      // АКТИВНЫЕ ПРОЕКТЫ В 3D
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                      {[
                        "1476",
                        "1406.1",
                        "1509",
                        "1537",
                        "1490",
                        "1495 (Кустовые площадки + ЦПС)",
                        "1499",
                      ].map((p, i) => (
                        <span
                          key={i}
                          className="bg-zinc-950 px-2 py-1 border border-zinc-800 text-zinc-300"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Правая сторона: ИНТЕРАКТИВНЫЙ ПОКАДРОВЫЙ ПЛЕЕР (ДАННЫЕ ИЗ ВАШЕГО АРХИВА) */}
                <div className="md:col-span-5 border-2 border-white bg-black relative flex flex-col justify-between overflow-hidden min-h-[380px] group">
                  {/* Текстура сетки поверх анимации */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.03)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none z-10" />

                  {/* Контейнер рендеринга текущего кадра */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 bg-zinc-950">
                    <img
                      src={`/animation/frame_${currentFrame}.${IMAGE_EXTENSION}`}
                      alt={`Поток кадров ЦИМ: ${currentFrame}`}
                      className="w-full h-full object-contain filter contrast-125 transition-transform duration-75"
                      onError={(e) => {
                        // Фолбэк-заглушка на случай отсутствия картинок в папке public
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    {/* Стильная системная заглушка, если папка пуста */}
                    <div className="hidden absolute inset-0 flex-col items-center justify-center text-center p-4 font-mono">
                      <div className="text-zinc-700 text-xs animate-pulse">
                        // ANIMATION_STREAM_OFFLINE //
                      </div>
                      <div className="text-[9px] text-zinc-500 mt-2 max-w-[150px]">
                        Разместите кадры в public/animation/
                      </div>
                    </div>
                  </div>

                  {/* Метаданные плеера поверх изображения */}
                  <div className="z-10 p-2 bg-gradient-to-b from-black to-transparent flex justify-between items-center w-full font-mono text-[9px] text-zinc-400">
                    <span>STREAMING: ACTIVE</span>
                    <span className="text-[#CCFF00]">FPS // ~8</span>
                  </div>

                  <div className="z-10 p-2 bg-gradient-to-t from-black to-transparent flex justify-between items-center w-full font-mono text-[9px] text-zinc-400 mt-auto">
                    <span className="text-white font-bold">
                      КАДР: {currentFrame + 1}/{TOTAL_FRAMES}
                    </span>
                    <span className="text-zinc-600">ID_STREAM_2026</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* СЛАЙД 04: МАТРИЦА СРАВНЕНИЯ КАТАЛОГА */}
          {currentSlide === 3 && (
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
                {SLIDES[3].title}
              </h2>
              <p className="text-zinc-400 max-w-xl text-xs font-mono">
                Повышение детализации выпускаемых 3D моделей (трубные каталожные
                элементы, оборудование). Создание параметрического каталога ЮНГП
                и регламента требований к ЦИМ.
              </p>

              {/* Таблица сравнения 2024 vs 2026 */}
              <div className="overflow-y-auto max-h-[260px] border-2 border-zinc-800 p-1 bg-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[10px]">
                  <div className="p-2 bg-[#0F0F0F] border border-zinc-800">
                    <span className="text-[#CCFF00] font-bold">2026 //</span>{" "}
                    Регламентированы правила создания трубопроводных классов
                    AVEVA, внедрены шаблоны.
                  </div>
                  <div className="p-2 bg-zinc-900 opacity-50 text-zinc-500">
                    <span className="text-zinc-400">2024 //</span> Таблицы
                    классов отданы на откуп дисциплинам; отсутствует контроль.
                  </div>

                  <div className="p-2 bg-[#0F0F0F] border border-zinc-800">
                    <span className="text-[#CCFF00] font-bold">2026 //</span>{" "}
                    Проверка заявок на каталожные элементы на соответствие
                    актуальной НТД РФ.
                  </div>
                  <div className="p-2 bg-zinc-900 opacity-50 text-zinc-500">
                    <span className="text-zinc-400">2024 //</span> Отсутствует
                    проверка запрашиваемых элементов на соответствие ГОСТ.
                  </div>

                  <div className="p-2 bg-[#0F0F0F] border border-zinc-800">
                    <span className="text-[#CCFF00] font-bold">2026 //</span>{" "}
                    Введено кодирование элементов внутри каталога для быстрого
                    повторного поиска.
                  </div>
                  <div className="p-2 bg-zinc-900 opacity-50 text-zinc-500">
                    <span className="text-zinc-400">2024 //</span> Элементы
                    каталога обезличены, детали находятся в общем списке.
                  </div>

                  <div className="p-2 bg-[#0F0F0F] border border-zinc-800">
                    <span className="text-[#CCFF00] font-bold">2026 //</span>{" "}
                    Добавлены спецификации на крепежные изделия (авто-участие в
                    подсчете РД).
                  </div>
                  <div className="p-2 bg-zinc-900 opacity-50 text-zinc-500">
                    <span className="text-zinc-400">2024 //</span> Крепеж
                    отсутствует в каталоге, добавляется текстом в РД вручную.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Индикатор прогресса в правой колонке */}
        <div className="lg:col-span-2 flex flex-col items-center lg:items-end justify-center">
          <div className="border-2 border-dashed border-zinc-800 p-4 w-full max-w-[180px] bg-black text-center lg:text-right space-y-4">
            <div className="font-mono text-[10px] text-zinc-500">
              МАТРИЦА_СЛАЙДОВ
            </div>
            <div className="text-4xl font-black tracking-tighter font-mono">
              {SLIDES[currentSlide].id}
              <span className="text-[#CCFF00]">/</span>04
            </div>
            <div className="w-full bg-zinc-800 h-[3px]">
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

      {/* --- НАВИГАЦИОННЫЙ ФУТЕР --- */}
      <footer className="z-20 w-full flex flex-col md:flex-row justify-between items-center border-t-2 border-zinc-800 pt-4 gap-4">
        <div className="font-mono text-[9px] text-zinc-600 order-2 md:order-1 text-center md:text-left uppercase">
          © 2026 ООО ЮНГП // ДРИМ. РАЗРАБОТКА И РЕГЛАМЕНТАЦИЯ ТРЕБОВАНИЙ К 3D
          МОДЕЛЯМ.
        </div>

        <div className="flex items-center space-x-4 order-1 md:order-2 w-full md:w-auto justify-between md:justify-end">
          <span className="font-mono text-[10px] text-zinc-500 uppercase hidden sm:inline">
            Используйте кнопки или клавиши [← / →]
          </span>
          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              onClick={prevSlide}
              className="flex-1 sm:flex-initial border-2 border-white hover:border-[#CCFF00] text-white hover:text-[#CCFF00] px-5 py-1.5 text-xs font-mono uppercase transition-all duration-200 active:scale-95 bg-black"
            >
              НАЗАД
            </button>
            <button
              onClick={nextSlide}
              className="flex-1 sm:flex-initial bg-white text-black hover:bg-[#CCFF00] hover:text-black font-mono text-xs font-bold uppercase px-5 py-1.5 transition-all duration-200 active:scale-95 border-2 border-white hover:border-[#CCFF00]"
            >
              ДАЛЕЕ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
