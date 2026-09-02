'use client';

import React, { useState, useEffect, useRef } from 'react';

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
      // Ease out cubic
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

export default function Home() {
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

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

  const regionsCount = useCounter(20, 1800, statsInView);
  const yearsCount = useCounter(7, 1500, statsInView);
  const clientsCount = useCounter(12, 2000, statsInView);
  const satisfactionCount = useCounter(99, 1800, statsInView);

  return (
    <>
      {/* ================= Header ================= */}
      <header className="header">
        <div className="container header-container">
          <a href="#hero" className="brand-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.png"
              alt="الزهور للتنظيف والخدمات المنزلية"
              className="brand-logo-img"
            />
          </a>

          <nav className="nav-menu">
            <a href="#hero" className="nav-link active">الرئيسية</a>
            <a href="#services" className="nav-link">خدماتنا</a>
            <a href="#how-it-works" className="nav-link">كيف نعمل</a>
            <a href="#features" className="nav-link">لماذا نحن</a>
            <a href="#results" className="nav-link">قبل وبعد</a>
            {/* <a href="#testimonials" className="nav-link">آراء العملاء</a> */}
            <a href="#faq" className="nav-link">الأسئلة الشائعة</a>
          </nav>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a href="tel:0501234567" className="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>050 123 4567</span>
            </a>
          </div>
        </div>
      </header>

      {/* ================= Hero Section (100vh Full Screen) ================= */}
      <section id="hero" className="hero">
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>✨</span>
              <span>الخيار الأول للنظافة والتعقيم بالمنطقة الشرقية</span>
            </div>

            <h1 className="hero-title">
              نظافة تدوم...<br />
              <span className="highlight">راحة تدوم أكثر</span>
            </h1>

            <p className="hero-desc">
              نقدم خدمات تنظيف احترافية للمنازل والشقق والفلل في الدمام، الخبر، والظهران بأحدث أجهزة التعقيم ومواد تنظيف آمنة 100%.
            </p>

            <div className="hero-cta-group">
              <a href="https://wa.me/966501234567" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ background: '#25d366', color: '#fff' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z" />
                </svg>
                <span>تواصل عبر واتساب</span>
              </a>
              <a href="tel:0501234567" className="btn btn-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>اتصل الآن</span>
              </a>
            </div>

            <div className="hero-trust-badges">
              <div className="trust-badge-item">
                <div className="trust-icon-box">✓</div>
                <span>عمالة مدربة ومحترفة</span>
              </div>
              <div className="trust-badge-item">
                <div className="trust-icon-box">✓</div>
                <span>منتجات تنظيف آمنة</span>
              </div>
              <div className="trust-badge-item">
                <div className="trust-icon-box">✓</div>
                <span>ضمان جودة الخدمة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Services Section (IMAGE CARDS) ================= */}
      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">خدماتنا الاحترافية</span>
            <h2 className="section-title">خدمات تنظيف متكاملة تلبي احتياجاتك</h2>
            <p className="section-desc">نستخدم أحدث التقنيات وأفضل مواد التنظيف المعتمدة لتقديم تجربة تنظيف فريدة لمنزلك أو مكتبك.</p>
          </div>

          <div className="services-grid">
            {/* Service 1 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop"
                  alt="تنظيف الشقق"
                />
                <span className="service-badge">الأكثر طلباً</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">تنظيف الشقق السكنية</h3>
                <p className="service-desc">
                  تنظيف دوري أو عميق لكافة أنواع الشقق، مسح وتلميع الأرضيات، تنظيف النوافذ والأسطح وإزالة الأتربة بدقة متناهية.
                </p>
                <div className="service-features-list">
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> تنظيف عميق لكافة الغرف
                  </div>
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> تلميع السيراميك والباركيه
                  </div>
                </div>
                <a href="https://wa.me/966501234567?text=استفسار%20عن%20تنظيف%20الشقق" target="_blank" rel="noreferrer" className="service-action-link">
                  <span>احجز الخدمة الآن</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            {/* Service 2 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                  alt="تنظيف المنازل والفلل"
                />
                <span className="service-badge">شامل وعميق</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">تنظيف المنازل والفلل</h3>
                <p className="service-desc">
                  تنظيف شامل وعميق لكافة أركان المنزل، يشمل المجالس، الأدراج، الأحواش، والتعقيم الشامل لكافة الطوابق والمرافق.
                </p>
                <div className="service-features-list">
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> طاقم عمل متكامل ومجهز
                  </div>
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> جلي وتلميع الرخام والبلاط
                  </div>
                </div>
                <a href="https://wa.me/966501234567?text=استفسار%20عن%20تنظيف%20الفلل" target="_blank" rel="noreferrer" className="service-action-link">
                  <span>احجز الخدمة الآن</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            {/* Service 3 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop"
                  alt="تنظيف المطابخ"
                />
                <span className="service-badge">إزالة الدهون</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">تنظيف المطابخ</h3>
                <p className="service-desc">
                  إزالة أصعب تراكمات الزيوت والدهون من الشفاطات، الأفران، والخزائن مع تلميع الأسطح والرخام وتعقيم الأجهزة.
                </p>
                <div className="service-features-list">
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> إذابة الزيوت والدهون المستعصية
                  </div>
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> تعقيم شامل وحماية للأسطح
                  </div>
                </div>
                <a href="https://wa.me/966501234567?text=استفسار%20عن%20تنظيف%20المطابخ" target="_blank" rel="noreferrer" className="service-action-link">
                  <span>احجز الخدمة الآن</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            {/* Service 4 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
                  alt="تنظيف الحمامات"
                />
                <span className="service-badge">تعقيم شامل</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">تنظيف وتعقيم الحمامات</h3>
                <p className="service-desc">
                  تعقيم شامل وإزالة الروائح الكريهة والترسبات الجيرية من السيراميك والمراحيض مع تلميع المرايا والزجاج.
                </p>
                <div className="service-features-list">
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> إزالة الترسبات الجيرية والصدأ
                  </div>
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> تعطير وتطهير عميق
                  </div>
                </div>
                <a href="https://wa.me/966501234567?text=استفسار%20عن%20تنظيف%20الحمامات" target="_blank" rel="noreferrer" className="service-action-link">
                  <span>احجز الخدمة الآن</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            {/* Service 5 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"
                  alt="تنظيف المفروشات"
                />
                <span className="service-badge">غسيل بالبخار</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">تنظيف المفروشات والكنب</h3>
                <p className="service-desc">
                  تنظيف الكنب والسجاد والمراتب باحترافية عبر البخار الحار وماكينات الشفط العميق لإزالة البقع العنيدة.
                </p>
                <div className="service-features-list">
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> تجفيف سريع وحماية للألوان
                  </div>
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> تعقيم ضد البكتيريا وحشرات الفراش
                  </div>
                </div>
                <a href="https://wa.me/966501234567?text=استفسار%20عن%20تنظيف%20المفروشات" target="_blank" rel="noreferrer" className="service-action-link">
                  <span>احجز الخدمة الآن</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            {/* Service 6 */}
            <div className="service-card-pro">
              <div className="service-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop"
                  alt="تنظيف بعد التشطيب"
                />
                <span className="service-badge">تسليم فوري</span>
              </div>
              <div className="service-body">
                <h3 className="service-title">تنظيف ما بعد التشطيب</h3>
                <p className="service-desc">
                  إزالة بقايا الدهان، الأسمنت، والجبس من المباني الجديدة والمجددة لتكون مهيأة تماماً للسكن الفوري.
                </p>
                <div className="service-features-list">
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> كشط وإزالة بقع البويات والأسمنت
                  </div>
                  <div className="service-feature-point">
                    <span style={{ color: 'var(--primary)' }}>●</span> تنظيف وتلميع النوافذ والشبابيك
                  </div>
                </div>
                <a href="https://wa.me/966501234567?text=استفسار%20عن%20تنظيف%20بعد%20التشطيب" target="_blank" rel="noreferrer" className="service-action-link">
                  <span>احجز الخدمة الآن</span>
                  <span>←</span>
                </a>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="https://wa.me/966501234567" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.9rem 2.2rem' }}>
              <span>عرض جميع الخدمات والتفاصيل</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= How It Works Section ================= */}
      <section id="how-it-works" className="section steps-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">سهولة وسرعة</span>
            <h2 className="section-title">كيف نعمل؟ احصل على خدمتك في 3 خطوات</h2>
            <p className="section-desc">خطوات بسيطة ومريحة تفصلك عن منزل نظيف ومعقم بالكامل بدون أي عناء.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num-bubble">1</div>
              <h3>تواصل وحدد موعدك</h3>
              <p>تواصل معنا عبر الواتساب أو الاتصال، وحدد نوع الخدمة المطلوبة والوقت الأنسب لجدولك.</p>
            </div>

            <div className="step-card">
              <div className="step-num-bubble">2</div>
              <h3>وصول الفريق المجهز</h3>
              <p>يصلك طاقمنا المتخصص في الوقت المحدد ومعه كافة الأجهزة والمواد المنظفة الآمنة 100%.</p>
            </div>

            <div className="step-card">
              <div className="step-num-bubble">3</div>
              <h3>استلم بيتك معقماً ولامعاً</h3>
              <p>عاين النتائج براحة بال تامة مع ضمان جودة الخدمة وإمكانية إعادة التنظيف في حال وجود ملاحظات.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Features / Why Choose Us ================= */}
      <section id="features" className="section features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">لماذا نحن؟</span>
            <h2 className="section-title">لماذا تختار الزهور؟</h2>
            <p className="section-desc">نضع معايير استثنائية لتقديم تجربة خدمة تفوق توقعاتك وتضمن راحتك التامة.</p>
          </div>

          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3>أسعار تنافسية</h3>
              <p>أفضل جودة بأفضل الأسعار في السوق مع عروض حصرية ومستمرة.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>فريق متخصص</h3>
              <p>عمالة مدربة على أعلى معايير النظافة والتعقيم والتعامل الراقي.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>مرونة في المواعيد</h3>
              <p>نختار الوقت المناسب لك بكل سهولة على مدار أيام الأسبوع.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>موثوقون ومعتمدون</h3>
              <p>نلتزم بالمواعيد والجودة في كل زيارة لضمان رضاكم الدائم.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Stats Section (IDEAL POSITION: After Why Us & Before Results) ================= */}
      <section ref={statsRef} className="stats-section">
        <div className="stats-glow-left"></div>
        <div className="stats-glow-right"></div>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="stat-number-wrapper">
                <span className="stat-number">{regionsCount}</span>
                <span className="stat-suffix">+</span>
              </div>
              <div className="stat-label">منطقة وحي نخدمها</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <div className="stat-number-wrapper">
                <span className="stat-number">{yearsCount}</span>
                <span className="stat-suffix">+</span>
              </div>
              <div className="stat-label">سنوات خبرة وتميز</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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

      {/* ================= Before & After Section ================= */}
      <section id="results" className="section ba-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">نتائج تتحدث عنا</span>
            <h2 className="section-title">نتائج تتحدث عنا</h2>
            <p className="section-desc">نقدم نظافة عميقة تعيد للمكان رونقه وجماله الطبيعي.</p>
          </div>

          <div className="ba-grid">
            {/* Card 1: Kitchen Clean */}
            <div className="ba-card">
              <div className="ba-images-duo">
                <div className="ba-img-side">
                  <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop"
                    alt="قبل تنظيف المطبخ"
                  />
                  <span className="ba-pill">قبل</span>
                </div>
                <div className="ba-divider-line"></div>
                <div className="ba-img-side">
                  <img
                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop"
                    alt="بعد تنظيف المطبخ"
                  />
                  <span className="ba-pill after">بعد التنظيف</span>
                </div>
              </div>
              <div className="ba-card-info">
                <h4>تنظيف عميق وإزالة دهون المطبخ</h4>
                <p>إذابة الزيوت والدهون المستعصية وتلميع الرخام</p>
              </div>
            </div>

            {/* Card 2: Sofa steam cleaning */}
            <div className="ba-card">
              <div className="ba-images-duo">
                <div className="ba-img-side">
                  <img
                    src="https://images.unsplash.com/photo-1583847268964-b28ce8f30098?q=80&w=600&auto=format&fit=crop"
                    alt="قبل تنظيف الكنب"
                  />
                  <span className="ba-pill">قبل</span>
                </div>
                <div className="ba-divider-line"></div>
                <div className="ba-img-side">
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop"
                    alt="بعد تنظيف الكنب"
                  />
                  <span className="ba-pill after">بعد التنظيف</span>
                </div>
              </div>
              <div className="ba-card-info">
                <h4>غسيل وتطهير أطقم الكنب بالبخار</h4>
                <p>إزالة البقع الصعبة واستعادة إشراقة القماش</p>
              </div>
            </div>

            {/* Card 3: Floor / Tile polishing */}
            <div className="ba-card">
              <div className="ba-images-duo">
                <div className="ba-img-side">
                  <img
                    src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=600&auto=format&fit=crop"
                    alt="قبل جلي الأرضيات"
                  />
                  <span className="ba-pill">قبل</span>
                </div>
                <div className="ba-divider-line"></div>
                <div className="ba-img-side">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                    alt="بعد جلي الأرضيات"
                  />
                  <span className="ba-pill after">بعد التنظيف</span>
                </div>
              </div>
              <div className="ba-card-info">
                <h4>جلي وترويب وتلميع السيراميك</h4>
                <p>إزالة الشوائب وتلميع كريستالي يدوم طويلاً</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Testimonials Section (Temporarily commented for Supabase backend integration) =================
      <section id="testimonials" className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">تجارب حقيقية</span>
            <h2 className="section-title">ماذا يقول عملاؤنا عن خدمات الزهور؟</h2>
            <p className="section-desc">فخورون برأي آلاف العائلات التي وضعت ثقتها بنا في الدمام وكافة مدن الشرقية.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div>
                <div className="stars-rating">★★★★★</div>
                <p className="testimonial-text">
                  "ما شاء الله تبارك الله، طلبت تنظيف شقة كاملة بعد التشطيب والشغل كان في قمة الروعة والدقة. الفريق محترم جداً والتزم بالوقت المحدد."
                </p>
              </div>
              <div className="client-info">
                <div className="client-avatar">أ</div>
                <div className="client-meta">
                  <h4>أحمد السالم</h4>
                  <span>حي الشاطئ - الدمام</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div>
                <div className="stars-rating">★★★★★</div>
                <p className="testimonial-text">
                  "غسيل الكنب والسجاد رجّع الصالة كأنها جديدة تماماً! إزالة تامة للبقع الصعبة مع رائحة تعقيم جميلة جداً. أكيد راح أتعامل معكم دائماً."
                </p>
              </div>
              <div className="client-info">
                <div className="client-avatar">س</div>
                <div className="client-meta">
                  <h4>سارة القحطاني</h4>
                  <span>حي الحزام الذهبي - الخبر</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div>
                <div className="stars-rating">★★★★★</div>
                <p className="testimonial-text">
                  "خدمة ممتازة وسريعة جداً. طلبت تنظيف فيلا قبل مناسبة بيوم واحد وجاء الفريق بمعدات متطورة وأنجزوا الشغل بأعلى احترافية."
                </p>
              </div>
              <div className="client-info">
                <div className="client-avatar">ف</div>
                <div className="client-meta">
                  <h4>فهد الدوسري</h4>
                  <span>حي الدوحة - الظهران</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ============================================================================================================= */}

      {/* ================= FAQ Section ================= */}
      <section id="faq" className="section faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">الأسئلة الشائعة</span>
            <h2 className="section-title">كل ما تود معرفته قبل طلب الخدمة</h2>
            <p className="section-desc">إليك إجابات لأكثر الأسئلة تكراراً لتوضيح كافة التفاصيل.</p>
          </div>

          <div className="faq-list">
            <details className="faq-item" open>
              <summary>
                <span>هل تقومون بتوفير مواد وأجهزة التنظيف معكم؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                نعم، يصل فريق العمل ومعه كامل المعدات والأجهزة الحديثة (أجهزة البخار، ماكينات جلي وتلميع الأرضيات، مكانس الشفط العميق) بالإضافة لكافة مواد ومساحيق التنظيف والتعقيم المعتمدة والآمنة 100%.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <span>ما هي المدن والمناطق التي تغطونها؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                نغطي حالياً كافة أحياء مدينة الدمام، والخبر، والظهران، وسيهات، والقطيف وكافة المناطق المجاورة في المنطقة الشرقية.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <span>كيف يتم احتساب الأسعار؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                تعتمد الأسعار على مساحة المكان، عدد الغرف، ونوع الخدمة المطلوبة (تنظيف دوري، عميق، أو بعد التشطيب). نوفر عروضاً وأسعاراً خاصة جداً ومناسبة للجميع عند التواصل معنا.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <span>ماذا لو لم أكن راضياً عن مستوى النظافة؟</span>
                <span className="faq-icon-arrow">▼</span>
              </summary>
              <p className="faq-answer">
                رضاكم أولويتنا القصوى! لا يتم سداد المبلغ إلا بعد معاينتكم للمكان والتأكد من جودة العمل التامة، وفي حال وجود أي ملاحظة نقوم بإعادة تنظيفها فوراً دون أي تكلفة إضافية.
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
              <h2>جاهز لخدمة نظافة مميزة؟</h2>
              <p>تواصل معنا الآن واحصل على موعد يناسبك</p>
            </div>
            <div className="cta-actions">
              <a href="https://wa.me/966501234567?text=السلام%20عليكم،%20أرغب%20في%20طلب%20خدمة%20تنظيف" target="_blank" rel="noreferrer" className="btn btn-white" style={{ color: '#0f8a65', fontWeight: 800, padding: '0.95rem 2rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.417 0-8 3.582-8 8 0 1.411.368 2.738 1.011 3.896l-1.074 3.924 4.021-1.054c1.115.608 2.387.954 3.742.954 4.418 0 8-3.582 8-8s-3.582-7.72-8-7.72z" />
                </svg>
                <span>تواصل عبر واتساب</span>
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
                المؤسسة الرائدة في تقديم حلول النظافة والتعقيم الشامل للمنازل والفلل والمنشآت التجارية بالدمام والمنطقة الشرقية، بخبرة سنوات وفريق عمل محترف.
              </p>
            </div>

            <div>
              <h4 className="footer-col-title">روابط سريعة</h4>
              <ul className="footer-links-list">
                <li><a href="#hero">الرئيسية</a></li>
                <li><a href="#services">خدماتنا</a></li>
                <li><a href="#how-it-works">كيف نعمل</a></li>
                <li><a href="#features">لماذا نحن</a></li>
                <li><a href="#results">قبل وبعد</a></li>
                {/* <li><a href="#testimonials">آراء العملاء</a></li> */}
                <li><a href="#faq">الأسئلة الشائعة</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">خدماتنا</h4>
              <ul className="footer-links-list">
                <li><a href="#services">تنظيف الشقق السكنية</a></li>
                <li><a href="#services">تنظيف الفلل والقصور</a></li>
                <li><a href="#services">تنظيف المطابخ والدهون</a></li>
                <li><a href="#services">تنظيف وتعقيم الحمامات</a></li>
                <li><a href="#services">غسيل الكنب والمفروشات</a></li>
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
                  <span>050 123 4567</span>
                </li>
                <li>
                  <div className="footer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <span>info@alzohour-clean.com</span>
                </li>
                <li>
                  <div className="footer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <span>الدمام، الخبر، الظهران - المملكة العربية السعودية</span>
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
        href="https://wa.me/966501234567?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدمات%20التنظيف"
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
