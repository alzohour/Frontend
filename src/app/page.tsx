'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Animated Counter Hook
function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

// Before & After Scenarios Data
const baScenarios = [
  {
    id: 'sofa',
    tabTitle: 'غسيل الكنب بالبخار',
    title: 'تنظيف وتطهير أطقم الكنب والمفروشات بالبخار الحار',
    description: 'إزالة تامة للبقع الصعبة، الأتربة العميقة، والروائح مع استعادة رونق ولون القماش الأصلي وتجفيف سريع.',
    beforeImg: 'https://images.unsplash.com/photo-1583847268964-b28ce8f30098?q=80&w=1200&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
    tag: 'غسيل بالبخار الحار'
  },
  {
    id: 'floors',
    tabTitle: 'جلي وتلميع الرخام',
    title: 'جلي وترويب وتلميع الرخام والأرضيات بأقراص الألماس',
    description: 'إزالة الخدوش والرواسب السطحية وتلميع كريستالي عالي اللمعان يدوم طويلاً ويعيد للأرضيات فخامتها.',
    beforeImg: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1200&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    tag: 'تلميع كريستالي'
  },
  {
    id: 'kitchen',
    tabTitle: 'تنظيف دهون المطابخ',
    title: 'إذابة الدهون المستعصية والزيوت من الشفاطات والأفران',
    description: 'تنظيف عميق لكافة أسطح وخزائن المطبخ، إزالة تراكمات الزيوت المتصلبة والتعقيم الكامل لمحيط الطهي.',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
    tag: 'إذابة الدهون 100%'
  }
];

// Realistic Reviews Data
const testimonialsData = [
  {
    name: 'أحمد السالم',
    city: 'الدمام',
    district: 'حي الشاطئ',
    service: 'تنظيف فيلا بعد التشطيب',
    rating: 5,
    date: 'منذ 3 أيام',
    text: 'ما شاء الله تبارك الله، شغل احترافي بمعنى الكلمة. أزالوا كل بقع البوية والأسمنت من النوافذ والأرضيات بدون أي خدش. الفريق جاء في موعده تماماً والمشرف كان حريصاً على أدق التفاصيل.'
  },
  {
    name: 'سارة القحطاني',
    city: 'الخبر',
    district: 'حي الحزام الذهبي',
    service: 'غسيل كنب وسجاد بالبخار',
    rating: 5,
    date: 'منذ أسبوع',
    text: 'الكنب كان فيه بقع قهوة وعصير صعبة جداً وتوقعت ما تروح، لكن بعد تنظيفهم بالبخار رجع كأنه جديد ورائحة التعقيم تفوح في الصالة. أسعارهم ممتازة وخدمتهم سريعة جداً.'
  },
  {
    name: 'م. فهد الدوسري',
    city: 'الظهران',
    district: 'حي الدوحة',
    service: 'تنظيف شامل دوري للشقة',
    rating: 5,
    date: 'منذ أسبوعين',
    text: 'تعاملت مع شركات كثيرة في الشرقية، لكن الزهور متميزين في الأمانة والدقة في المواعيد وجودة المواد المستخدمة. عمالة محترمة وأجهزة حديثة. معتمد عندهم بشكل شهري.'
  }
];

// Coverage Cities Data
const coverageCities = [
  {
    id: 'dammam',
    name: 'الدمام',
    districts: ['حي الشاطئ', 'الفيصلية', 'الفاخرية', 'النزهة', 'المزروعية', 'طيبة', 'الشعلة'],
    badge: 'تغطية فورية',
    coords: { top: '38%', left: '56%' }
  },
  {
    id: 'khobar',
    name: 'الخبر',
    districts: ['الحزام الذهبي', 'الحزام الأخضر', 'الراكة الجنوبية', 'الكورنيش', 'العليا', 'اليرموك'],
    badge: 'تغطية فورية',
    coords: { top: '65%', left: '70%' }
  },
  {
    id: 'dhahran',
    name: 'الظهران',
    districts: ['حي الدوحة', 'حي الدانة', 'حي القصور', 'حي الجامعة', 'أرامكو'],
    badge: 'تغطية فورية',
    coords: { top: '56%', left: '42%' }
  },
  {
    id: 'saihat-qatif',
    name: 'سيهات والقطيف',
    districts: ['الكوثر', 'الغدير', 'الزهراء', 'المجيدية', 'الناصرة', 'الشاطئ'],
    badge: 'تغطية يومية',
    coords: { top: '22%', left: '38%' }
  }
];

export default function Home() {
  const [statsInView, setStatsInView] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState('dammam');

  const statsRef = useRef<HTMLElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const phoneNumber = "0570094733";
  const whatsappUrl = "https://wa.me/966570094733";
  const emailAddress = "alzohour2@gmail.com";

  // Intersection Observer for Stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Slider Drag Handlers
  const handleMove = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const regionsCount = useCounter(20, 1800, statsInView);
  const yearsCount = useCounter(7, 1500, statsInView);
  const clientsCount = useCounter(12, 2000, statsInView);
  const satisfactionCount = useCounter(99, 1800, statsInView);

  const currentScenario = baScenarios[activeScenarioIndex];

  return (
    <>
      {/* ================= Header ================= */}
      <header className="header">
        <div className="container header-container">
          <a href="#hero" className="brand-logo-link">
            <img
              src="/logo.png"
              alt="الزهور للتنظيف والخدمات المنزلية"
              className="brand-logo-img"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-menu">
            <a href="#hero" className="nav-link active">الرئيسية</a>
            <a href="#services" className="nav-link">خدماتنا</a>
            <a href="#results" className="nav-link">قبل وبعد</a>
            <a href="#testimonials" className="nav-link">آراء العملاء</a>
            <a href="#why-us" className="nav-link">لماذا نحن</a>
            <a href="#coverage" className="nav-link">مناطق الخدمة</a>
            <a href="#faq" className="nav-link">الأسئلة الشائعة</a>
          </nav>

          {/* Action Buttons */}
          <div className="header-actions">
            <a 
              href={`${whatsappUrl}?text=السلام%20عليكم،%20أود%20الاستفسار%20عن%20خدمات%20التنظيف`} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-whatsapp" 
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z"/>
              </svg>
              <span>واتساب مباشر</span>
            </a>

            <a href={`tel:${phoneNumber}`} className="btn btn-primary" style={{ padding: '0.65rem 1.2rem', fontSize: '0.92rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{phoneNumber}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button 
              className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="القائمة الرئيسية"
              type="button"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <a href="#hero" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>الرئيسية</span>
              <span>←</span>
            </a>
            <a href="#services" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>خدماتنا</span>
              <span>←</span>
            </a>
            <a href="#results" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>قبل وبعد (تفاعلي)</span>
              <span>←</span>
            </a>
            <a href="#testimonials" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>تجارب العملاء</span>
              <span>←</span>
            </a>
            <a href="#why-us" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>لماذا نحن</span>
              <span>←</span>
            </a>
            <a href="#coverage" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>مناطق التغطية بالشرقية</span>
              <span>←</span>
            </a>
            <a href="#faq" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>الأسئلة الشائعة</span>
              <span>←</span>
            </a>

            <div className="mobile-drawer-actions">
              <a 
                href={`${whatsappUrl}?text=السلام%20عليكم،%20أود%20الاستفسار%20عن%20خدمات%20التنظيف`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-whatsapp" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={closeMobileMenu}
              >
                <span>تواصل عبر واتساب</span>
              </a>

              <a 
                href={`tel:${phoneNumber}`} 
                className="btn btn-secondary" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={closeMobileMenu}
              >
                <span>اتصال هاتفياً ({phoneNumber})</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ================= 1. Simpler & Stronger Hero ================= */}
      <section id="hero" className="hero">
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨</span>
              <span>الخيار الأول للنظافة بالدمام والمنطقة الشرقية</span>
            </div>

            <h1 className="hero-title">
              نظافة تدوم...<br />
              <span className="highlight">وراحة تدوم أكثر</span>
            </h1>

            <p className="hero-desc">
              خدمات تنظيف وتعقيم عميقة للمنازل، الفلل، الشقق، والمفروشات بالبخار. نعتمد أحدث المعدات العالمية ومواد تنظيف آمنة 100% مع ضمان تام على جودة التنفيذ.
            </p>

            <div className="hero-cta-group">
              <a 
                href={`${whatsappUrl}?text=السلام%20عليكم،%20أرغب%20في%20طلب%20عرض%20سعر%20وحجز%20موعد%20تنظيف`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-whatsapp" 
                style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z" />
                </svg>
                <span>احجز موعدك الآن عبر واتساب</span>
              </a>

              <a href={`tel:${phoneNumber}`} className="btn btn-white" style={{ padding: '0.9rem 1.8rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>اتصل مباشرة</span>
              </a>
            </div>

            <div className="hero-trust-badges">
              <div className="trust-badge-item">
                <div className="trust-icon-box">✓</div>
                <span>طاقم عمالة مدرب وموثوق</span>
              </div>
              <div className="trust-badge-item">
                <div className="trust-icon-box">✓</div>
                <span>أجهزة بخار وجلي حديثة</span>
              </div>
              <div className="trust-badge-item">
                <div className="trust-icon-box">✓</div>
                <span>ضمان الرضا 100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. Concise Services Cards ================= */}
      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">حلول نظافة شاملة</span>
            <h2 className="section-title">خدمات تلبي كل احتياجات منزلك</h2>
            <p className="section-desc">تنفيذ فوري بأعلى معايير الجودة ومعدات مجهزة لكافة المساحات.</p>
          </div>

          <div className="services-grid">
            {/* Service 1 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop" alt="تنظيف الشقق" />
                <span className="service-badge">الأكثر طلباً</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">تنظيف الشقق السكنية</h3>
                <div className="service-highlight-chips">
                  <span className="service-chip"><span className="dot"></span> تنظيف دوري وعميق</span>
                  <span className="service-chip"><span className="dot"></span> مسح وتلميع الأرضيات</span>
                  <span className="service-chip"><span className="dot"></span> تنظيف النوافذ والأسطح</span>
                </div>
                <a href={`${whatsappUrl}?text=استفسار%20عن%20حجز%20خدمة%20تنظيف%20الشقق`} target="_blank" rel="noreferrer" className="service-btn-book">
                  <span>طلب الخدمة عبر واتساب</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            {/* Service 2 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" alt="تنظيف الفلل" />
                <span className="service-badge">شامل ومتكامل</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">تنظيف المنازل والفلل</h3>
                <div className="service-highlight-chips">
                  <span className="service-chip"><span className="dot"></span> طاقم مجهز للمساحات الكبيرة</span>
                  <span className="service-chip"><span className="dot"></span> جلي المجالس والدرج</span>
                  <span className="service-chip"><span className="dot"></span> غسيل الأحواش والواجهات</span>
                </div>
                <a href={`${whatsappUrl}?text=استفسار%20عن%20حجز%20خدمة%20تنظيف%20الفلل`} target="_blank" rel="noreferrer" className="service-btn-book">
                  <span>طلب الخدمة عبر واتساب</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            {/* Service 3 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" alt="تنظيف الكنب والمفروشات" />
                <span className="service-badge">بخار حار</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">غسيل الكنب والسجاد بالبخار</h3>
                <div className="service-highlight-chips">
                  <span className="service-chip"><span className="dot"></span> إزالة تامة لأصعب البقع</span>
                  <span className="service-chip"><span className="dot"></span> تعقيم ضد البكتيريا وحشرات الفراش</span>
                  <span className="service-chip"><span className="dot"></span> تجفيف سريع في المكان</span>
                </div>
                <a href={`${whatsappUrl}?text=استفسار%20عن%20حجز%20خدمة%20غسيل%20الكنب%20بالبخار`} target="_blank" rel="noreferrer" className="service-btn-book">
                  <span>طلب الخدمة عبر واتساب</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            {/* Service 4 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=800&auto=format&fit=crop" alt="جلي وتلميع الرخام" />
                <span className="service-badge">ألماس وكريستال</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">جلي وتلميع الرخام والبلاط</h3>
                <div className="service-highlight-chips">
                  <span className="service-chip"><span className="dot"></span> ماكينات جلي حديثة</span>
                  <span className="service-chip"><span className="dot"></span> تسوية الترويبة والفواصل</span>
                  <span className="service-chip"><span className="dot"></span> لمعان كريستالي فائق</span>
                </div>
                <a href={`${whatsappUrl}?text=استفسار%20عن%20حجز%20خدمة%20جلي%20الرخام`} target="_blank" rel="noreferrer" className="service-btn-book">
                  <span>طلب الخدمة عبر واتساب</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            {/* Service 5 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop" alt="تنظيف المطابخ" />
                <span className="service-badge">إذابة الدهون</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">تنظيف وتعقيم المطابخ</h3>
                <div className="service-highlight-chips">
                  <span className="service-chip"><span className="dot"></span> إذابة زيوت الأفران والشفاطات</span>
                  <span className="service-chip"><span className="dot"></span> غسيل وتلميع الخزائن والرخام</span>
                  <span className="service-chip"><span className="dot"></span> تطهير شامل لمحيط الطهي</span>
                </div>
                <a href={`${whatsappUrl}?text=استفسار%20عن%20حجز%20خدمة%20تنظيف%20المطابخ`} target="_blank" rel="noreferrer" className="service-btn-book">
                  <span>طلب الخدمة عبر واتساب</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            {/* Service 6 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop" alt="تنظيف بعد التشطيب" />
                <span className="service-badge">تسليم فوري للسكن</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">تنظيف ما بعد التشطيب والترميم</h3>
                <div className="service-highlight-chips">
                  <span className="service-chip"><span className="dot"></span> كشط بقايا الدهانات والأسمنت</span>
                  <span className="service-chip"><span className="dot"></span> تلميع الزجاج والشبابيك</span>
                  <span className="service-chip"><span className="dot"></span> جاهزية تامة للسكن الفوري</span>
                </div>
                <a href={`${whatsappUrl}?text=استفسار%20عن%20حجز%20خدمة%20تنظيف%20بعد%20التشطيب`} target="_blank" rel="noreferrer" className="service-btn-book">
                  <span>طلب الخدمة عبر واتساب</span>
                  <span>←</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. Interactive Before/After Comparison Slider ================= */}
      <section id="results" className="section ba-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">دليل بصري حقيقي</span>
            <h2 className="section-title">نتائج تتحدث عنا (قبل وبعد)</h2>
            <p className="section-desc">اسحب الخط التفاعلي يميناً ويساراً لترى الفرق الاستثنائي في مستوى النظافة واللمعان.</p>
          </div>

          {/* Scenario Tabs */}
          <div className="ba-scenario-tabs">
            {baScenarios.map((scenario, index) => (
              <button
                key={scenario.id}
                className={`ba-tab-btn ${activeScenarioIndex === index ? 'active' : ''}`}
                onClick={() => {
                  setActiveScenarioIndex(index);
                  setSliderPos(50);
                }}
                type="button"
              >
                {scenario.tabTitle}
              </button>
            ))}
          </div>

          {/* Interactive Slider Container */}
          <div className="ba-slider-container">
            <div 
              ref={sliderContainerRef}
              className="ba-interactive-stage"
              onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                setIsDragging(true);
                handleMove(e.touches[0].clientX);
              }}
            >
              {/* After Layer (Background) */}
              <div className="ba-layer ba-layer-after">
                <img src={currentScenario.afterImg} alt={`بعد: ${currentScenario.title}`} />
              </div>

              {/* Before Layer (Clipped by slider position) */}
              <div 
                className="ba-layer ba-layer-before" 
                style={{ width: `${sliderPos}%` }}
              >
                <img 
                  src={currentScenario.beforeImg} 
                  alt={`قبل: ${currentScenario.title}`}
                  style={{ width: sliderContainerRef.current ? `${sliderContainerRef.current.clientWidth}px` : '100%' }}
                />
              </div>

              {/* Labels */}
              <span className="ba-label-badge ba-label-before">قبل التنظيف</span>
              <span className="ba-label-badge ba-label-after">بعد التنظيف ✨</span>

              {/* Draggable Divider Handle */}
              <div 
                className="ba-slider-handle-line" 
                style={{ left: `${sliderPos}%` }}
              >
                <div className="ba-slider-handle-button">
                  <span>⇄</span>
                </div>
              </div>
            </div>

            <div className="ba-slider-footer">
              <div className="ba-slider-info">
                <h3>{currentScenario.title}</h3>
                <p>{currentScenario.description}</p>
              </div>
              <a 
                href={`${whatsappUrl}?text=استفسار%20عن%20خدمة%20${encodeURIComponent(currentScenario.tabTitle)}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-whatsapp"
                style={{ flexShrink: 0 }}
              >
                <span>احجز مثل هذه النتيجة</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. Real Testimonials & Social Proof ================= */}
      <section id="testimonials" className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">تجارب حقيقية</span>
            <h2 className="section-title">ماذا يقول عملاؤنا في الشرقية؟</h2>
            <p className="section-desc">آراء موثقة من مئات العائلات التي وضعت ثقتها بنا في الدمام والخبر والظهران.</p>
          </div>

          <div className="testimonials-grid">
            {testimonialsData.map((testi, idx) => (
              <div key={idx} className="testimonial-card-pro">
                <div>
                  <div className="testi-header">
                    <div className="testi-stars">{'★'.repeat(testi.rating)}</div>
                    <span className="testi-service-tag">{testi.service}</span>
                  </div>
                  <p className="testi-quote">"{testi.text}"</p>
                </div>

                <div className="testi-author-row">
                  <div className="testi-avatar">{testi.name[0]}</div>
                  <div className="testi-author-info">
                    <h4>
                      <span>{testi.name}</span>
                      <span className="testi-verified-icon" title="عميل موثق">✓</span>
                    </h4>
                    <span className="testi-location">{testi.district} - {testi.city} ({testi.date})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a 
              href={`${whatsappUrl}?text=السلام%20عليكم،%20أرغب%20في%20معرفة%20العروض%20الحالية%20للعملاء%20الجدد`} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-primary"
            >
              <span>انضم لعملائنا السعداء واحجز الآن</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= 5. Timeline / How It Works (Breaks Card Fatigue) ================= */}
      <section id="how-it-works" className="section timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">تجربة سهلة ومريحة</span>
            <h2 className="section-title">كيف تبدأ معنا؟ في 3 خطوات بسيطة</h2>
            <p className="section-desc">من التواصل وحتى استلام منزلك لامعاً ومعقماً دون أي مجهود منك.</p>
          </div>

          <div className="timeline-track">
            <div className="timeline-step-item">
              <div className="timeline-step-header">
                <div className="timeline-number">1</div>
                <div className="timeline-line"></div>
              </div>
              <h3 className="timeline-step-title">احجز في دقيقة</h3>
              <p className="timeline-step-desc">
                تواصل عبر الواتساب أو الاتصال، حدد نوع الخدمة وموقعك والوقت الأنسب لجدولك اليومي.
              </p>
            </div>

            <div className="timeline-step-item">
              <div className="timeline-step-header">
                <div className="timeline-number">2</div>
                <div className="timeline-line"></div>
              </div>
              <h3 className="timeline-step-title">وصول الفريق المجهز</h3>
              <p className="timeline-step-desc">
                يصل طاقمنا المتخصص في الموعد المحدد ومعه كافة أجهزة البخار والجلي ومواد التعقيم الآمنة.
              </p>
            </div>

            <div className="timeline-step-item">
              <div className="timeline-step-header">
                <div className="timeline-number">3</div>
                <div className="timeline-line"></div>
              </div>
              <h3 className="timeline-step-title">استلم بيتك مع الضمان</h3>
              <p className="timeline-step-desc">
                عاين كل ركن براحة بال تامة؛ لا يتم السداد إلا بعد رضاك الكامل والتأكد من مطابقة النتيجة لتوقعاتك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. Split Why Us (No Cards) ================= */}
      <section id="why-us" className="section why-us-section">
        <div className="container">
          <div className="why-us-split">
            <div className="why-us-lead">
              <span className="section-tag">معايير لا نقبل المساومة عليها</span>
              <h2>لماذا يفضل سكان الشرقية خدمات "الزهور"؟</h2>
              <p>
                لا نقدم مجرد تنظيف سطحي، بل نمنحك بيئة صحية ومعقمة تضمن راحة عائلتك عبر طاقم خبير ومعدات حديثة تضمن الحفاظ على أثاثك وأرضياتك.
              </p>
              <a href={`tel:${phoneNumber}`} className="btn btn-primary" style={{ padding: '0.85rem 1.8rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>تحدث مباشرة مع المشرف: {phoneNumber}</span>
              </a>
            </div>

            <div className="why-us-benefits-list">
              <div className="why-benefit-row">
                <div className="why-benefit-icon">🛡️</div>
                <div className="why-benefit-text">
                  <h4>ضمان الرضا 100% وإعادة الخدمة</h4>
                  <p>إن وجدت أي ملاحظة على جودة التنظيف، نقوم بمعالجتها فوراً ودون أي رسوم إضافية.</p>
                </div>
              </div>

              <div className="why-benefit-row">
                <div className="why-benefit-icon">🌿</div>
                <div className="why-benefit-text">
                  <h4>مواد تنظيف وتعقيم أصلية وآمنة</h4>
                  <p>نستخدم منظفات مرخصة وصديقة للبيئة آمنة تماماً على الأطفال وكبار السن والحيوانات الأليفة.</p>
                </div>
              </div>

              <div className="why-benefit-row">
                <div className="why-benefit-icon">⚡</div>
                <div className="why-benefit-text">
                  <h4>التزام صارم بالمواعيد والسرعة</h4>
                  <p>نصل في الوقت المحدد بالدقيقة وننجز المهام بكفاءة عالية دون إهدار وقتك.</p>
                </div>
              </div>

              <div className="why-benefit-row">
                <div className="why-benefit-icon">💰</div>
                <div className="why-benefit-text">
                  <h4>شفافية تامة وأسعار منافسة</h4>
                  <p>أسعار واضحة ومحددة مسبقاً تشمل كامل الأجهزة والمواد دون أي تكاليف خفية.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Stats Section ================= */}
      <section ref={statsRef} className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="stat-number-wrapper">
                <span className="stat-number">{regionsCount}</span>
                <span className="stat-suffix">+</span>
              </div>
              <div className="stat-label">حي ومنطقة نخدمها</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <div className="stat-number-wrapper">
                <span className="stat-number">{yearsCount}</span>
                <span className="stat-suffix">+</span>
              </div>
              <div className="stat-label">سنوات خبرة بالشرقية</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="stat-number-wrapper">
                <span className="stat-number">{clientsCount}</span>
                <span className="stat-suffix">K+</span>
              </div>
              <div className="stat-label">عميل سعيد ومستمر</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </div>
              <div className="stat-number-wrapper">
                <span className="stat-number">{satisfactionCount}</span>
                <span className="stat-suffix">%</span>
              </div>
              <div className="stat-label">نسبة رضا العملاء</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. Service Coverage Areas (Interactive Map & Pins) ================= */}
      <section id="coverage" className="section coverage-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">تغطية شاملة وسريعة</span>
            <h2 className="section-title">نصلك أينما كنت في المنطقة الشرقية</h2>
            <p className="section-desc">فرق عمل متنقلة ومجهزة بأحدث المعدات لخدمة جميع أحياء المدن الرئيسية.</p>
          </div>

          <div className="coverage-layout">
            {/* Interactive Visual Map Card */}
            <div className="map-display-card">
              <div className="map-card-header">
                <h3>
                  <span>🗺️</span>
                  <span>خريطة التغطية الميدانية بالمنطقة الشرقية</span>
                </h3>
                <span className="map-live-badge">
                  <span className="map-live-dot"></span>
                  <span>فرق جاهزة للتحرك</span>
                </span>
              </div>

              <div className="map-canvas-visual">
                <div className="map-canvas-overlay"></div>
                <div className="map-grid-lines"></div>

                {/* Animated Map Pins */}
                {coverageCities.map((city) => (
                  <div
                    key={city.id}
                    className={`map-pin-marker ${selectedCityId === city.id ? 'active' : ''}`}
                    style={{ top: city.coords.top, left: city.coords.left }}
                    onClick={() => setSelectedCityId(city.id)}
                  >
                    <div className="pin-radar-ring"></div>
                    <div className="pin-bubble-content">
                      <span className="pin-icon-dot"></span>
                      <span>{city.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cities Tiles List */}
            <div className="coverage-cities-column">
              {coverageCities.map((city) => (
                <div
                  key={city.id}
                  className={`coverage-city-tile ${selectedCityId === city.id ? 'active' : ''}`}
                  onClick={() => setSelectedCityId(city.id)}
                >
                  <div className="coverage-city-header">
                    <div className="coverage-city-title-group">
                      <span style={{ fontSize: '1.2rem' }}>📍</span>
                      <h3 className="coverage-city-title">{city.name}</h3>
                    </div>
                    <span className="coverage-city-badge">{city.badge}</span>
                  </div>

                  <div className="coverage-neighborhoods">
                    {city.districts.map((d, dIdx) => (
                      <span key={dIdx} className="neighborhood-tag">{d}</span>
                    ))}
                  </div>

                  <a
                    href={`${whatsappUrl}?text=السلام%20عليكم،%20أرغب%20في%20طلب%20خدمة%20تنظيف%20في%20${encodeURIComponent(city.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="coverage-city-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>احجز فريق العمل في {city.name}</span>
                    <span>←</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ Section ================= */}
      <section id="faq" className="section faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">الأسئلة الشائعة</span>
            <h2 className="section-title">كل ما تود معرفته قبل طلب الخدمة</h2>
            <p className="section-desc">إجابات واضحة ومباشرة لأكثر الأسئلة تكراراً لتوضيح كل التفاصيل.</p>
          </div>

          <div className="faq-list">
            <details className="faq-item" open>
              <summary>
                <span>هل تقومون بتوفير مواد وأجهزة التنظيف معكم؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                نعم، يصل الفريق ومعه كافة المعدات والأجهزة الحديثة (أجهزة البخار الحار، ماكينات جلي وتلميع الرخام، مكانس الشفط العميق) بالإضافة لمواد التنظيف والتعقيم المعتمدة والآمنة 100%.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <span>ما هي المدن والأحياء التي تغطونها بالشرقية؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                نغطي كافة أحياء الدمام، الخبر، الظهران، سيهات، والقطيف وكافة المناطق المجاورة مع إمكانية الوصول في نفس اليوم للحجوزات العاجلة.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <span>كيف يتم احتساب سعر الخدمة؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                تعتمد الأسعار على نوع الخدمة (شقق، فلل، غسيل كنب بالبخار، جلي رخام) ومساحة المكان. نوفر عروضاً وباقات مميزة جداً عند التواصل المباشر معنا على {phoneNumber}.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <span>ماذا لو كانت لدي ملاحظة على النظافة بعد انتهاء العمل؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                رضاكم هو الأهم! لن يغادر المشرف إلا بعد معاينتكم للمكان والتأكد التام من نظافته، وفي حال وجود أي ملاحظة نقوم بإعادة تنظيفها فوراً دون أي تكلفة إضافية.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ================= Call To Action Section ================= */}
      <section className="section" style={{ padding: '0 0 5rem 0' }}>
        <div className="container">
          <div className="cta-banner">
            <div className="cta-content">
              <h2>جاهز لمنزل يلمع نظافة وتعقيماً؟</h2>
              <p>تواصل معنا الآن عبر الواتساب واحصل على موعدك مع خصم خاص للعملاء الجدد!</p>
            </div>
            <div className="cta-actions">
              <a 
                href={`${whatsappUrl}?text=السلام%20عليكم،%20أرغب%20في%20طلب%20خدمة%20تنظيف%20والاستفادة%20من%20خصم%20العملاء%20الجدد`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-white" 
                style={{ color: '#0f8a65', fontWeight: 800, padding: '0.95rem 2rem' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z" />
                </svg>
                <span>احجز موعدك الآن عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Footer ================= */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <a href="#hero" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
                <img
                  src="/logo.png"
                  alt="الزهور"
                  style={{ height: '64px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
              </a>
              <p>
                المؤسسة الرائدة في تقديم حلول النظافة والتعقيم الشامل للمنازل والفلل والمفروشات بالدمام والمنطقة الشرقية، بخبرة سنوات وفريق عمل محترف وضمان 100%.
              </p>
            </div>

            <div>
              <h4 className="footer-col-title">روابط سريعة</h4>
              <ul className="footer-links-list">
                <li><a href="#hero">الرئيسية</a></li>
                <li><a href="#services">خدماتنا</a></li>
                <li><a href="#results">قبل وبعد (تفاعلي)</a></li>
                <li><a href="#testimonials">تجارب العملاء</a></li>
                <li><a href="#why-us">لماذا نحن</a></li>
                <li><a href="#coverage">مناطق التغطية</a></li>
                <li><a href="#faq">الأسئلة الشائعة</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">خدماتنا</h4>
              <ul className="footer-links-list">
                <li><a href="#services">تنظيف الشقق السكنية</a></li>
                <li><a href="#services">تنظيف الفلل والقصور</a></li>
                <li><a href="#services">غسيل الكنب بالبخار</a></li>
                <li><a href="#services">جلي وتلميع الرخام</a></li>
                <li><a href="#services">تنظيف دهون المطابخ</a></li>
                <li><a href="#services">تنظيف بعد التشطيب</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">تواصل معنا</h4>
              <ul className="footer-contact-list">
                <li>
                  <div className="footer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <a href={`tel:${phoneNumber}`} style={{ color: 'inherit' }}>{phoneNumber}</a>
                </li>
                <li>
                  <div className="footer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <a href={`mailto:${emailAddress}`} style={{ color: 'inherit' }}>{emailAddress}</a>
                </li>
                <li>
                  <div className="footer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <span>الدمام، الخبر، الظهران، سيهات، القطيف - المملكة العربية السعودية</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            © 2026 الزهور للتنظيف والخدمات المنزلية. جميع الحقوق محفوظة
          </div>
        </div>
      </footer>

      {/* ================= Floating WhatsApp Button ================= */}
      <a
        href={`${whatsappUrl}?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدمات%20التنظيف`}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        title="تواصل معنا عبر واتساب"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z" />
        </svg>
      </a>
    </>
  );
}
