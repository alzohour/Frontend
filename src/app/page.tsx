'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

const CoverageMap = dynamic(() => import('./components/CoverageMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '520px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 800 }}>
      جاري تحميل خريطة المنطقة الشرقية...
    </div>
  ),
});

// Counter hook for trust numbers
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

// Services Data (6 Core Services)
const servicesData = [
  {
    id: 'apartments',
    title: 'تنظيف الشقق السكنية',
    desc: 'تنظيف شامل للغرف، المجالس، المطابخ، والواجهات الزجاجية بأعلى معايير الدقة.',
    badge: 'الأكثر طلباً',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    whatsappText: 'السلام عليكم، أود الاستفسار عن حجز خدمة تنظيف الشقق السكنية'
  },
  {
    id: 'villas',
    title: 'تنظيف الفلل والقصور',
    desc: 'طواقم متخصصة لتغطية المساحات الكبيرة، الأدوار المتعددة، الملاحق، والحدائق الخارجية.',
    badge: 'طاقم متكامل',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    whatsappText: 'السلام عليكم، أود الاستفسار عن حجز خدمة تنظيف الفلل'
  },
  {
    id: 'steam',
    title: 'غسيل الكنب والمفروشات بالبخار',
    desc: 'إزالة أصعب البقع والدهون وقتل 99.9% من الجراثيم مع الحفاظ التام على جودة الأقمشة.',
    badge: 'بخار حار 120°C',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
    whatsappText: 'السلام عليكم، أود الاستفسار عن خدمة غسيل الكنب والمفروشات بالبخار'
  },
  {
    id: 'marble',
    title: 'جلي وتلميع الرخام والبلاط',
    desc: 'معالجة الخدوش، إزالة البهتان، وتلميع الرخام بأقراص الألماس الإيطالية لإعادة بريقه.',
    badge: 'كرستال إيطالي',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
    whatsappText: 'السلام عليكم، أود الاستفسار عن خدمة جلي وتلميع الرخام'
  },
  {
    id: 'kitchens',
    title: 'تنظيف وتعقيم المطابخ والحمامات',
    desc: 'إذابة الدهون المستعصية عن الجدران والشفاطات وتطهير الأحواض والأسطح بمواد مرخصة.',
    badge: 'إذابة دهون عميقة',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=800&auto=format&fit=crop',
    whatsappText: 'السلام عليكم، أود الاستفسار عن خدمة تنظيف وتعقيم المطابخ'
  },
  {
    id: 'post-construction',
    title: 'تنظيف ما بعد التشطيب والترميم',
    desc: 'كشط بقايا الدهانات والجبس والأسمنت وتجهيز العقار بالكامل للسكن الفوري المباشر.',
    badge: 'جاهزية سكن فورية',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
    whatsappText: 'السلام عليكم، أود الاستفسار عن خدمة تنظيف ما بعد التشطيب والترميم'
  }
];

// Before & After Scenarios
const baScenarios = [
  {
    id: 'sofa',
    tabTitle: 'غسيل الكنب بالبخار',
    title: 'إزالة أصعب بقع القهوة والزيوت من أطقم الكنب المخملية',
    description: 'استخدام أجهزة حقن وشفط البخار الحار لإعادة نضارة القماش وألوانه الأصلية دون الإضرار بالأنسجة.',
    beforeImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'marble',
    tabTitle: 'جلي وتلميع الرخام',
    title: 'معالجة فواصل الرخام وإزالة البهتان واستعادة لمعة المرآة',
    description: 'جلي بأقراص الألماس المتدرجة مع معالجة بالكريستال لحماية الرخام وإعطائه لمعاناً يدوم طويلاً.',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'kitchen',
    tabTitle: 'تنظيف دهون المطابخ',
    title: 'تطهير وإزالة الشحوم المتراكمة من الشفاطات والأسطح',
    description: 'تطبيق منظفات آمنة ومذيبة للزيوت المتكلسة على جدران السيراميك والمواقد وخزائن المطبخ.',
    beforeImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=1200&auto=format&fit=crop'
  }
];

// Customer Testimonials (Authentic Eastern Province reviews)
const testimonialsData = [
  {
    name: 'أبو فهد الخالدي',
    city: 'الدمام',
    district: 'حي الشاطئ',
    service: 'تنظيف فيلا شامل وجلي رخام',
    rating: 5,
    date: 'منذ 3 أيام',
    text: 'ما شاء الله تبارك الله، دقة متناهية في المواعيد وأمانة عالية في العمل. عمالة مدربة وأجهزة بخار حديثة شالت بقع في الكنب كنت فاقد الأمل فيها. الرخام رجع كأنه جديد تماماً.'
  },
  {
    name: 'أم عبد الرحمن الدوسري',
    city: 'الخبر',
    district: 'حي الحزام الذهبي',
    service: 'غسيل كنب ومفروشات بالبخار',
    rating: 5,
    date: 'منذ أسبوع',
    text: 'طلبتهم لغسيل طقم مجلس رجال كبير وموكيت الصالة، الشغل يفتح النفس والريحة بعد التعقيم ممتازة وموادهم ما تسبب أي حساسية للأطفال. أشكر المشرف على حرصه ومتابعته الدقيقة.'
  },
  {
    name: 'م. راشد العتيبي',
    city: 'الظهران',
    district: 'حي الدوحة',
    service: 'تنظيف ما بعد التشطيب',
    rating: 5,
    date: 'منذ أسبوعين',
    text: 'تعاملت مع شركات كثيرة في الشرقية، لكن الزهور متميزين في الأمانة والدقة في المواعيد وجودة المواد المستخدمة. عمالة محترمة وأجهزة حديثة، تسلمت شقتي جاهزة تماماً للسكن بدون أي غبار.'
  }
];

// Coverage Cities Data
const coverageCities = [
  {
    id: 'dammam',
    name: 'الدمام',
    districts: ['حي الشاطئ', 'الفيصلية', 'الفاخرية', 'النزهة', 'المزروعية', 'طيبة', 'الشعلة'],
    badge: 'تغطية فورية',
    lat: 26.4207,
    lng: 50.0888
  },
  {
    id: 'khobar',
    name: 'الخبر',
    districts: ['الحزام الذهبي', 'الحزام الأخضر', 'الراكة الجنوبية', 'الكورنيش', 'العليا', 'اليرموك'],
    badge: 'تغطية فورية',
    lat: 26.2172,
    lng: 50.1971
  },
  {
    id: 'dhahran',
    name: 'الظهران',
    districts: ['حي الدوحة', 'حي الدانة', 'حي القصور', 'حي الجامعة', 'أرامكو'],
    badge: 'تغطية فورية',
    lat: 26.2750,
    lng: 50.1481
  },
  {
    id: 'saihat-qatif',
    name: 'سيهات والقطيف',
    districts: ['الكوثر', 'الغدير', 'الزهراء', 'المجيدية', 'الناصرة', 'الشاطئ'],
    badge: 'تغطية يومية',
    lat: 26.4842,
    lng: 50.0406
  }
];

// Luxury Chapter Divider Between Sections
function SectionDivider() {
  return (
    <div className="section-chapter-divider" aria-hidden="true">
      <div className="divider-track">
        <div className="divider-gem"></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const phoneNumber = '0570094733';
  const whatsappUrl = 'https://wa.me/966570094733';
  const emailAddress = 'alzohour2@gmail.com';

  // Intersection Observer for Section Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

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

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchEnd = () => setIsDragging(false);
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  const currentScenario = baScenarios[activeScenarioIndex];

  return (
    <>
      {/* ================= 01. HEADER & NAVIGATION ================= */}
      <header className="header">
        <div className="header-container-fluid">
          <a href="#" className="brand-logo-link" aria-label="الزهور للتنظيف والخدمات المنزلية">
            <img src="/logo.png" alt="شعار شركة الزهور للتنظيف" className="brand-logo-img" />
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-menu" aria-label="القائمة الرئيسية">
            <a href="#" className="nav-link active">الرئيسية</a>
            <a href="#services" className="nav-link">خدماتنا</a>
            <a href="#why-us" className="nav-link">لماذا الزهور؟</a>
            <a href="#results" className="nav-link">قبل وبعد</a>
            <a href="#testimonials" className="nav-link">آراء العملاء</a>
            <a href="#coverage" className="nav-link">مناطق الخدمة</a>
            <a href="#faq" className="nav-link">الأسئلة الشائعة</a>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <a
              href={`${whatsappUrl}?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدمات%20التنظيف`}
              target="_blank"
              rel="noreferrer"
              className="header-whatsapp-pill"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z" />
              </svg>
              <span>واتساب مباشر</span>
            </a>

            <a href={`tel:${phoneNumber}`} className="header-phone-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{phoneNumber}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="تبديل القائمة المتنقلة"
              type="button"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <a href="#" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span>الرئيسية</span>
              <span>←</span>
            </a>
            <a href="#services" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span>خدماتنا</span>
              <span>←</span>
            </a>
            <a href="#why-us" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span>لماذا الزهور؟</span>
              <span>←</span>
            </a>
            <a href="#results" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span>قبل وبعد</span>
              <span>←</span>
            </a>
            <a href="#coverage" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span>مناطق التغطية</span>
              <span>←</span>
            </a>
            <a href="#faq" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span>الأسئلة الشائعة</span>
              <span>←</span>
            </a>

            <div className="mobile-drawer-actions">
              <a
                href={`${whatsappUrl}?text=السلام%20عليكم،%20أرغب%20في%20حجز%20خدمة%20تنظيف`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <span>تواصل عبر واتساب</span>
              </a>
              <a href={`tel:${phoneNumber}`} className="btn btn-primary" style={{ width: '100%' }}>
                <span>اتصال مباشر: {phoneNumber}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ================= 02. HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🇸🇦</span>
              <span>الشركة الأولى المعتمدة بالمنطقة الشرقية</span>
            </div>

            <h1 className="hero-title">
              نظافة احترافية <br />
              <span className="highlight">لراحة تستحقها</span>
            </h1>

            <p className="hero-desc">
              خدمات تنظيف متكاملة للمنازل والمجالس والسجاد والمفروشات وأكثر، بأيدي طواقم مدربة وأجهزة حديثة تصل إليك أينما كنت في المنطقة الشرقية.
            </p>

            <div className="hero-cta-group">
              <a href={`tel:${phoneNumber}`} className="btn btn-primary">
                <span>احجز خدمتك الآن</span>
                <span>←</span>
              </a>

              <a
                href={`${whatsappUrl}?text=السلام%20عليكم،%20أرغب%20في%20طلب%20خدمة%20تنظيف%20منزلي`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z" />
                </svg>
                <span>تواصل عبر واتساب</span>
              </a>
            </div>

            <div className="hero-trust-badges">
              <div className="trust-badge-item">
                <span className="trust-icon-box">✓</span>
                <span>عمالة مدربة وموثوقة</span>
              </div>
              <div className="trust-badge-item">
                <span className="trust-icon-box">✓</span>
                <span>مواعيد دقيقة ومرنة</span>
              </div>
              <div className="trust-badge-item">
                <span className="trust-icon-box">✓</span>
                <span>تغطية واسعة لكافة المدن</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= 04. SERVICES SECTION ================= */}
      <section id="services" className="section services-section reveal-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">حلول نظافة متكاملة</span>
            <h2 className="section-title">خدمات مصممة لتلبي كل احتياجات منزلك</h2>
            <p className="section-desc">
              نجمع بين أحدث المعدات والكوادر الاحترافية لتقديم نتائج استثنائية تفوق توقعاتك في كل زيارة.
            </p>
          </div>

          <div className="services-grid">
            {servicesData.map((service) => (
              <div key={service.id} className="service-card-clean">
                <div className="service-img-wrapper">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <span className="service-badge">{service.badge}</span>
                </div>
                <div className="service-body">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc-clean">{service.desc}</p>
                  <a
                    href={`${whatsappUrl}?text=${encodeURIComponent(service.whatsappText)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="service-btn-clean"
                  >
                    <span>طلب الخدمة عبر واتساب</span>
                    <span>←</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= 05. WHY CHOOSE AL-ZOHOUR (Asymmetric Layout) ================= */}
      <section id="why-us" className="section why-us-section reveal-on-scroll">
        <div className="container">
          <div className="why-us-split">
            <div className="why-us-lead">
              <span className="section-tag">معايير الجودة السعودية</span>
              <h2>لماذا يفضل سكان المنطقة الشرقية الزهور؟</h2>
              <p>
                لأننا لا نقدم مجرد تنظيف عادي، بل نوفر راحة بال متكاملة. نلتزم بأعلى معايير الدقة والأمانة لحماية أثاثك وعائلتك بمواد مرخصة وتقنيات متقدمة.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={`tel:${phoneNumber}`} className="btn btn-primary">
                  <span>تحدث مع المشرف المباشر</span>
                  <span>←</span>
                </a>
                <a
                  href={`${whatsappUrl}?text=السلام%20عليكم،%20أود%20معرفة%20الضمانات%20المقدمة%20على%20الخدمات`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  <span>استفسر عن الضمان</span>
                </a>
              </div>
            </div>

            <div className="why-us-benefits-list">
              <div className="why-benefit-row">
                <div className="why-benefit-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="why-benefit-text">
                  <h4>فريق محترف وموثوق</h4>
                  <p>عمالة نظامية مدربة بإشراف مباشر وأمانة تامة تضمن خصوصية بيتك والحفاظ على مقتنياتك.</p>
                </div>
              </div>

              <div className="why-benefit-row">
                <div className="why-benefit-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 2v7.31"></path>
                    <path d="M14 9.3V1.99"></path>
                    <path d="M8.5 2h7"></path>
                    <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
                    <path d="M5.52 16h12.96"></path>
                  </svg>
                </div>
                <div className="why-benefit-text">
                  <h4>معدات ومنتجات متخصصة</h4>
                  <p>أجهزة بخار حار وماكينات جلي رخام إيطالية ومنظفات مرخصة وآمنة 100% على الأطفال وكبار السن.</p>
                </div>
              </div>

              <div className="why-benefit-row">
                <div className="why-benefit-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="why-benefit-text">
                  <h4>مواعيد مرنة والتزام صارم</h4>
                  <p>نصل إليك في الوقت المحدد بدقة ونوفر خيارات حجز تناسب جدولك وأوقات فراغك بكل سهولة.</p>
                </div>
              </div>

              <div className="why-benefit-row">
                <div className="why-benefit-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 12 11 14 15 10"></polyline>
                  </svg>
                </div>
                <div className="why-benefit-text">
                  <h4>تغطية واسعة وضمان الرضا</h4>
                  <p>نخدم أهم مدن الشرقية مع التزام صارم بإعادة تقديم الخدمة مجاناً في حال وجود أي ملاحظة دون نقاش.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= 06. HOW IT WORKS (4 Professional Steps) ================= */}
      <section id="how-it-works" className="section timeline-section reveal-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">تجربة سهلة ومريحة</span>
            <h2 className="section-title">كيف تبدأ معنا؟ في 4 خطوات بسيطة</h2>
            <p className="section-desc">من لحظة تواصلك وحتى استلام منزلك معقماً ولامعاً دون أي عناء منك.</p>
          </div>

          <div className="timeline-pro-grid">
            <div className="timeline-pro-card">
              <div className="timeline-card-top">
                <div className="timeline-step-badge">01</div>
                <div className="timeline-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
              </div>
              <h3 className="timeline-step-title">احجز في دقيقة</h3>
              <p className="timeline-step-desc">
                تواصل عبر واتساب أو الهاتف، وحدد نوع الخدمة وموقعك والوقت الأنسب لجدولك اليومي.
              </p>
            </div>

            <div className="timeline-pro-card">
              <div className="timeline-card-top">
                <div className="timeline-step-badge">02</div>
                <div className="timeline-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
              </div>
              <h3 className="timeline-step-title">وصول الفريق المجهز</h3>
              <p className="timeline-step-desc">
                يصل طاقمنا المتخصص في الموعد ومعه أحدث أجهزة البخار والجلي والمنظفات الأصلية.
              </p>
            </div>

            <div className="timeline-pro-card">
              <div className="timeline-card-top">
                <div className="timeline-step-badge">03</div>
                <div className="timeline-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="m4.93 4.93 2.83 2.83"></path>
                    <path d="m16.24 16.24 2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="m4.93 19.07 2.83-2.83"></path>
                    <path d="m16.24 7.76 2.83-2.83"></path>
                  </svg>
                </div>
              </div>
              <h3 className="timeline-step-title">تنفيذ احترافي دقيق</h3>
              <p className="timeline-step-desc">
                تنظيف عميق ومعالجة متخصصة لكل زاوية مع مراعاة كافة تفاصيل وخامات الأثاث والرخام.
              </p>
            </div>

            <div className="timeline-pro-card">
              <div className="timeline-card-top">
                <div className="timeline-step-badge">04</div>
                <div className="timeline-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
              <h3 className="timeline-step-title">استلم بيتك مع الضمان</h3>
              <p className="timeline-step-desc">
                عاين كل ركن براحة بال تامة؛ لا يتم السداد إلا بعد رضاك الكامل والتأكد من جودة النتيجة.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= 07. BEFORE & AFTER (Interactive Comparison) ================= */}
      <section id="results" className="section ba-section reveal-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">دليل بصري حقيقي</span>
            <h2 className="section-title">نتائج تتحدث عنا (قبل وبعد)</h2>
            <p className="section-desc">اسحب المقبض التفاعلي يميناً ويساراً لترى الفارق الاستثنائي في النظافة واللمعان.</p>
          </div>

          {/* Category Tabs */}
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

          {/* Draggable Slider Container */}
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
              {/* After Image */}
              <div className="ba-layer ba-layer-after">
                <img src={currentScenario.afterImg} alt={`بعد: ${currentScenario.title}`} />
              </div>

              {/* Before Image Clipped */}
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

              {/* Badges */}
              <span className="ba-label-badge ba-label-before">قبل التنظيف</span>
              <span className="ba-label-badge ba-label-after">بعد التنظيف ✨</span>

              {/* Slider Line & Button */}
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
                <span>شاهد الفرق بنفسك — احجز خدمتك</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= 08. CUSTOMER REVIEWS (Social Proof) ================= */}
      <section id="testimonials" className="section testimonials-section reveal-on-scroll">
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
              <span>←</span>
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= 09. COVERAGE & FULL-WIDTH INTERACTIVE MAP ================= */}
      <section id="coverage" className="section coverage-section reveal-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">تغطية شاملة وسريعة</span>
            <h2 className="section-title">نصلك أينما كنت في المنطقة الشرقية</h2>
            <p className="section-desc">
              فرق عمل متنقلة ومجهزة بأحدث المعدات لخدمة جميع أحياء المدن الرئيسية. انقر على أي مدينة للتفاصيل.
            </p>
          </div>

          {/* City Filter Pills (Show All or Focus City) */}
          <div className="map-filter-bar">
            <button
              type="button"
              className={`map-filter-pill ${selectedCityId === null ? 'active' : ''}`}
              onClick={() => setSelectedCityId(null)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>جميع مناطق الشرقية (عرض شامل)</span>
            </button>
            {coverageCities.map((city) => (
              <button
                key={city.id}
                type="button"
                className={`map-filter-pill ${selectedCityId === city.id ? 'active' : ''}`}
                onClick={() => setSelectedCityId(city.id)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{city.name}</span>
              </button>
            ))}
          </div>

          {/* Full Width Wide Map Card (No Side Cards) */}
          <div className="leaflet-wide-map-card">
            <CoverageMap
              cities={coverageCities}
              selectedCityId={selectedCityId}
              onSelectCity={(id) => setSelectedCityId(id)}
              whatsappUrl={whatsappUrl}
            />
          </div>

          {/* Bottom Bar below map */}
          <div className="coverage-footer-bar">
            <div className="coverage-footer-text">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>نخدم جميع أحياء الدمام، الخبر، الظهران، سيهات والقطيف وضواحيها. هل حيك غير مذكور؟</span>
            </div>
            <a
              href={`${whatsappUrl}?text=السلام%20عليكم،%20هل%20تخدمون%20حياً%20خارج%20النطاق%20المباشر؟`}
              target="_blank"
              rel="noreferrer"
              className="coverage-footer-btn"
            >
              <span>تواصل مع المشرف الميداني عبر واتساب ({phoneNumber})</span>
              <span>←</span>
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= 10. FAQ SECTION ================= */}
      <section id="faq" className="section faq-section reveal-on-scroll">
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
                <span>كيف يتم تحديد سعر الخدمة؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                يتم تحديد التكلفة بكل شفافية بناءً على نوع الخدمة (شقق، فلل، أطقم كنب، جلي رخام) ومساحة المكان أو عدد القطع، دون أي رسوم خفية أو تكاليف إضافية بعد الاتفاق.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <span>هل يمكنني طلب الخدمة في نفس اليوم (حجز فوري)؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                نعم، لدينا فرق طوارئ وتغطية سريعة في الدمام والخبر والظهران للطلبات العاجلة حسب توفر الفرق في منطقتك وقت الطلب.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <span>كم تستغرق مدة تنفيذ عملية التنظيف؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                يعتمد ذلك على حجم العمل؛ تنظيف الشقق والمجالس يستغرق من ساعتين إلى 4 ساعات، والفلل الكبيرة وما بعد التشطيب من 4 إلى 8 ساعات مع طاقم متعدد لضمان الإنجاز السريع.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <span>هل تقدمون ضماناً على النظافة وجودة العمل؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                بالتأكيد! نلتزم بضمان الرضا بنسبة 100%، حيث تتم معاينة المكان مع المشرف قبل السداد، وفي حال وجود أي ملاحظة يعاد تنظيفها فوراً دون أي تكلفة إضافية.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <span>هل يمكنني الجمع بين أكثر من خدمة في نفس الزيارة؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                نعم وبكل تأكيد، كما نوفر باقات خصم خاصة عند الجمع بين تنظيف الشقق وغسيل الكنب بالبخار أو جلي الرخام معاً.
              </p>
            </details>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= 11. FINAL CTA ================= */}
      <section className="section reveal-on-scroll" style={{ paddingBottom: '70px', paddingTop: '40px' }}>
        <div className="cta-container">
          <div className="cta-banner">
            <div className="cta-content">
              <h2>جاهز لبيت أنظف؟</h2>
              <p>خل فريق الزهور يهتم بالتنظيف، وأنت استمتع بالراحة واللمعان الذي يليق بك.</p>
            </div>

            <div className="cta-actions">
              <a
                href={`${whatsappUrl}?text=السلام%20عليكم،%20جاهز%20لحجز%20خدمة%20تنظيف%20مع%20الزهور`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z" />
                </svg>
                <span>احجز الآن عبر واتساب</span>
              </a>

              <a href={`tel:${phoneNumber}`} className="btn btn-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>اتصال مباشر: {phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 12. FOOTER ================= */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* About */}
            <div className="footer-about">
              <img src="/logo.png" alt="الزهور للتنظيف" style={{ height: '60px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
              <p>
                شركة الزهور للتنظيف والخدمات المنزلية بالمنطقة الشرقية. خبرة تمتد لأكثر من 5 سنوات في تقديم حلول النظافة المتخصصة للمنازل، الفلل، المفروشات، والرخام بأعلى مقاييس الجودة والأمانة.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-col-title">روابط سريعة</h4>
              <ul className="footer-links-list">
                <li><a href="#">الرئيسية</a></li>
                <li><a href="#services">خدماتنا</a></li>
                <li><a href="#why-us">لماذا الزهور؟</a></li>
                <li><a href="#how-it-works">كيف تبدأ؟</a></li>
                <li><a href="#results">نتائج قبل وبعد</a></li>
                <li><a href="#coverage">مناطق التغطية</a></li>
                <li><a href="#faq">الأسئلة الشائعة</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="footer-col-title">خدماتنا</h4>
              <ul className="footer-links-list">
                <li><a href="#services">تنظيف الشقق السكنية</a></li>
                <li><a href="#services">تنظيف الفلل والقصور</a></li>
                <li><a href="#services">غسيل الكنب بالبخار</a></li>
                <li><a href="#services">جلي وتلميع الرخام</a></li>
                <li><a href="#services">تنظيف دهون المطابخ</a></li>
                <li><a href="#services">تنظيف ما بعد التشطيب</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="footer-col-title">معلومات التواصل</h4>
              <ul className="footer-contact-list">
                <li>
                  <span className="footer-contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  <span>هاتف: <a href={`tel:${phoneNumber}`} style={{ color: '#ffffff' }}>{phoneNumber}</a></span>
                </li>
                <li>
                  <span className="footer-contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z" />
                    </svg>
                  </span>
                  <span>واتساب: <a href={whatsappUrl} target="_blank" rel="noreferrer" style={{ color: '#25d366' }}>تواصل فوري</a></span>
                </li>
                <li>
                  <span className="footer-contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <span>البريد: {emailAddress}</span>
                </li>
                <li>
                  <span className="footer-contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <span>المنطقة الشرقية، المملكة العربية السعودية</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Local SEO Cities Strip */}
          <div className="footer-cities-seo">
            <div className="footer-cities-title">مناطق الخدمة المباشرة في المنطقة الشرقية:</div>
            <div className="footer-cities-tags">
              <span className="footer-city-tag">الدمام</span>
              <span className="footer-city-separator">·</span>
              <span className="footer-city-tag">الخبر</span>
              <span className="footer-city-separator">·</span>
              <span className="footer-city-tag">الظهران</span>
              <span className="footer-city-separator">·</span>
              <span className="footer-city-tag">القطيف</span>
              <span className="footer-city-separator">·</span>
              <span className="footer-city-tag">سيهات</span>
              <span className="footer-city-separator">·</span>
              <span className="footer-city-tag">الجبيل</span>
              <span className="footer-city-separator">·</span>
              <span className="footer-city-tag">الأحساء</span>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} شركة الزهور للتنظيف والخدمات المنزلية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href={`${whatsappUrl}?text=السلام%20عليكم،%20أرغب%20في%20طلب%20خدمة%20تنظيف`}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        aria-label="تواصل عبر واتساب"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z" />
        </svg>
      </a>
    </>
  );
}
