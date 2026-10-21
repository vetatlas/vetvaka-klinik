import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  Leaf,
  PawPrint,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";

type View = "home" | "assessment" | "library";

const species = [
  { name: "Sığır", short: "SI" },
  { name: "Koyun", short: "KO" },
  { name: "Keçi", short: "KE" },
  { name: "Kedi", short: "KD" },
  { name: "Köpek", short: "KP" },
  { name: "At", short: "AT" },
];

const symptomOptions = [
  "İştah değişikliği",
  "Halsizlik",
  "Öksürük",
  "İshal",
  "Kusma",
  "Topallık",
  "Ağrı belirtisi",
  "Ateş şüphesi",
  "Solunumda değişiklik",
  "Davranış değişikliği",
];

const libraryModules = [
  {
    id: "assessment",
    title: "Tanı değerlendirme şablonu",
    eyebrow: "KLİNİK İÇERİK ALANI",
    description: "Öykü, muayene bulguları, ayırıcı tanılar ve tanı testleri için yapılandırılmış kayıt alanı.",
    icon: Activity,
    sections: ["Öykü ve risk faktörleri", "Muayene bulguları", "Ayırıcı tanılar", "Tanı testleri ve kaynaklar"],
  },
  {
    id: "care",
    title: "Tedavi protokolü şablonu",
    eyebrow: "KLİNİK İÇERİK ALANI",
    description: "Hekim onaylı yaklaşım, izlem ve hasta güvenliği notlarını kaynaklarıyla düzenlemek için taslak.",
    icon: HeartPulse,
    sections: ["Endikasyon ve kapsam", "Hekimce doğrulanmış uygulama", "İzlem ve yeniden değerlendirme", "Kontrendikasyon ve kaynaklar"],
  },
  {
    id: "urgent",
    title: "Önceliklendirme akışı şablonu",
    eyebrow: "KLİNİK İÇERİK ALANI",
    description: "Klinik ekip tarafından tanımlanıp doğrulanacak aciliyet ve yönlendirme basamakları için alan.",
    icon: ShieldCheck,
    sections: ["Klinik öncelik ölçütleri", "Değerlendirme basamakları", "Ekip içi yönlendirme", "Onaylayan ve güncelleme tarihi"],
  },
];

function AppMark() {
  return (
    <div className="brand-lockup">
      <div className="brand-mark"><Leaf size={20} strokeWidth={2.2} /></div>
      <div>
        <div className="brand-name">VetVaka</div>
        <div className="brand-caption">KLİNİK ÇALIŞMA ALANI</div>
      </div>
    </div>
  );
}

function SpeciesChips({
  value,
  onChange,
  compact = false,
}: {
  value: string;
  onChange: (name: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "species-options compact" : "species-options"} role="group" aria-label="Hayvan türü seçimi">
      {species.map((animal) => (
        <button
          type="button"
          key={animal.name}
          className={`species-option ${value === animal.name ? "selected" : ""}`}
          onClick={() => onChange(animal.name)}
          aria-pressed={value === animal.name}
        >
          <span className="species-initials">{animal.short}</span>
          <span>{animal.name}</span>
        </button>
      ))}
    </div>
  );
}

function SafetyNote({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="safety-note" role="note">
      <div className="safety-icon"><ShieldCheck size={18} /></div>
      <div className="safety-copy">
        <strong>Demo arayüz · Klinik içerik doğrulanmadı</strong>
        <span>Bu taslak tanı veya tedavi önermez. Klinik kararlar muayene ve güncel, doğrulanmış kaynaklarla veteriner hekim tarafından verilmelidir.</span>
      </div>
      <button className="icon-button note-dismiss" type="button" onClick={onDismiss} aria-label="Uyarıyı kapat"><X size={17} /></button>
    </div>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<View>("home");
  const [selectedSpecies, setSelectedSpecies] = useState("Sığır");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [showSafetyNote, setShowSafetyNote] = useState(true);

  const filteredModules = useMemo(() => {
    const normalized = searchTerm.trim().toLocaleLowerCase("tr-TR");
    if (!normalized) return libraryModules;
    return libraryModules.filter((module) =>
      `${module.title} ${module.description} ${module.eyebrow}`.toLocaleLowerCase("tr-TR").includes(normalized),
    );
  }, [searchTerm]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((current) =>
      current.includes(symptom) ? current.filter((item) => item !== symptom) : [...current, symptom],
    );
    setSummaryVisible(false);
  };

  const openAssessment = () => {
    setActiveView("assessment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLibrary = () => {
    setActiveView("library");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetAssessment = () => {
    setSelectedSymptoms([]);
    setAge("");
    setDuration("");
    setNotes("");
    setSummaryVisible(false);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <AppMark />
        <div className="sidebar-label">ÇALIŞMA ALANI</div>
        <nav className="side-nav" aria-label="Ana gezinme">
          <button type="button" className={`nav-item ${activeView === "home" ? "active" : ""}`} onClick={() => setActiveView("home")}>
            <Activity size={18} /><span>Genel bakış</span>
          </button>
          <button type="button" className={`nav-item ${activeView === "assessment" ? "active" : ""}`} onClick={openAssessment}>
            <ClipboardList size={18} /><span>Belirti değerlendirme</span><span className="nav-count">01</span>
          </button>
          <button type="button" className={`nav-item ${activeView === "library" ? "active" : ""}`} onClick={openLibrary}>
            <BookOpen size={18} /><span>Hastalık & protokoller</span>
          </button>
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-species-card">
          <div className="sidebar-card-icon"><PawPrint size={17} /></div>
          <div><strong>6 tür için tasarlandı</strong><span>Sığırdan ata, evcil dostlara</span></div>
        </div>
        <div className="sidebar-footer">
          <span className="status-dot" /> Demo çalışma alanı
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="mobile-brand"><AppMark /></div>
          <div className="topbar-context"><span className="breadcrumb-muted">Klinik alanı</span><ChevronRight size={14} /><span>{activeView === "home" ? "Genel bakış" : activeView === "assessment" ? "Belirti değerlendirme" : "Hastalık & protokoller"}</span></div>
          <div className="topbar-right"><span className="demo-pill"><span className="status-dot" /> Taslak mod</span><div className="avatar-mark">VH</div></div>
        </header>

        <main className="content-area">
          {showSafetyNote && <SafetyNote onDismiss={() => setShowSafetyNote(false)} />}

          {activeView === "home" && (
            <>
              <section className="welcome-row">
                <div>
                  <div className="eyebrow">VETERİNER HEKİMLER İÇİN</div>
                  <h1>Her vakada, <em>güvenle.</em></h1>
                  <p className="welcome-subtitle">Belirtileri düzenleyin, klinik kaynaklara tek bir yerden ulaşın.</p>
                </div>
                <div className="welcome-aside"><span className="welcome-aside-mark"><Stethoscope size={18} /></span><span>Önce iyi soru,<br /><strong>sonra iyi karar.</strong></span></div>
              </section>

              <section className="hero-panel">
                <div className="hero-copy">
                  <span className="hero-kicker"><Sparkles size={14} /> KLİNİK AKIŞINIZI DÜZENLEYİN</span>
                  <h2>Doğru sorular,<br /><em>daha net bir vaka.</em></h2>
                  <p>Belirti değerlendirme ve protokol arşivi aynı çalışma alanında. İlk adımınızı seçin.</p>
                  <div className="hero-actions">
                    <button className="button button-primary" type="button" onClick={openAssessment}>Vaka değerlendirmesi başlat <ArrowRight size={17} /></button>
                    <button className="button button-text" type="button" onClick={openLibrary}>Protokolleri keşfet <ChevronRight size={17} /></button>
                  </div>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
                  <div className="art-sun" />
                  <div className="art-center"><div className="art-center-icon"><PawPrint size={31} /></div><span>iyi bakım<br />birlikte başlar</span></div>
                  {species.map((animal, index) => <div key={animal.name} className={`art-animal animal-${index}`}><span>{animal.short}</span></div>)}
                  <div className="art-leaf leaf-one"><Leaf size={28} /></div><div className="art-leaf leaf-two"><Leaf size={20} /></div>
                </div>
                <div className="hero-footnote"><span className="footnote-dot" /> 6 hayvan türü <span className="footnote-divider" /> Taslak çalışma alanı</div>
              </section>

              <div className="section-heading"><div><div className="eyebrow">HIZLI ERİŞİM</div><h2>Bugün nasıl yardımcı olalım?</h2></div><span className="section-note">İki araç, tek çalışma alanı</span></div>
              <section className="action-grid">
                <button className="action-card assessment-card" type="button" onClick={openAssessment}>
                  <span className="action-icon green-icon"><ClipboardList size={21} /></span>
                  <span className="action-label">01 · VAKA AKIŞI</span>
                  <strong>Belirtileri<br />değerlendir</strong>
                  <span className="action-description">Öykü ve bulguları düzenli bir vaka özetine dönüştürün.</span>
                  <span className="action-link">Değerlendirmeye başla <ArrowRight size={16} /></span>
                  <span className="card-watermark"><Activity size={72} /></span>
                </button>
                <button className="action-card library-card" type="button" onClick={openLibrary}>
                  <span className="action-icon terracotta-icon"><Search size={21} /></span>
                  <span className="action-label">02 · BİLGİ ARŞİVİ</span>
                  <strong>Hastalık ve<br />protokol ara</strong>
                  <span className="action-description">Klinik kaynak ve protokol kayıtlarına tek ekrandan ulaşın.</span>
                  <span className="action-link terracotta-link">Arşivi aç <ArrowRight size={16} /></span>
                  <span className="card-watermark"><BookOpen size={72} /></span>
                </button>
              </section>

              <section className="bottom-grid">
                <div className="species-panel">
                  <div className="panel-heading"><div><div className="eyebrow">KAPSAM</div><h3>Tek alan, altı tür</h3></div><PawPrint size={20} /></div>
                  <div className="species-grid">
                    {species.map((animal) => <div className="species-tile" key={animal.name}><span className="tile-initials">{animal.short}</span><span>{animal.name}</span><Check size={14} /></div>)}
                  </div>
                </div>
                <div className="library-status-panel">
                  <div className="panel-heading"><div><div className="eyebrow">İÇERİK DURUMU</div><h3>Güvenilirlik önce gelir</h3></div><ShieldCheck size={20} /></div>
                  <p>Bu başlangıç taslağında doğrulanmış hastalık, tanı veya tedavi içeriği bulunmuyor. Protokol alanı, klinik kaynaklar incelenip uzman onayı alındıktan sonra doldurulmak üzere hazırlandı.</p>
                  <button type="button" className="subtle-link" onClick={openLibrary}>Şablonları görüntüle <ArrowRight size={15} /></button>
                </div>
              </section>
            </>
          )}

          {activeView === "assessment" && (
            <>
              <section className="page-intro">
                <div><div className="eyebrow">YAPILANDIRILMIŞ VAKA AKIŞI</div><h1>Belirti <em>değerlendirme</em></h1><p>Vaka bilgilerini düzenleyin. Bu demo tanı hesaplamaz; yalnızca seçtiklerinizi özetler.</p></div>
                <button className="button button-quiet" type="button" onClick={() => setActiveView("home")}>Genel bakışa dön</button>
              </section>
              <div className="assessment-layout">
                <section className="form-panel">
                  <div className="form-section-heading"><span className="step-number">1</span><div><h2>Tür ve temel bilgiler</h2><p>Tür seçimi klinik değerlendirmeyi bağlama oturtur.</p></div></div>
                  <SpeciesChips value={selectedSpecies} onChange={(value) => { setSelectedSpecies(value); setSummaryVisible(false); }} />
                  <div className="field-row">
                    <label className="field"><span>Yaş / dönem <small>(isteğe bağlı)</small></span><input value={age} onChange={(event) => setAge(event.target.value)} placeholder="Örn. 4 yaş / erişkin" /></label>
                    <label className="field"><span>Belirti süresi <small>(isteğe bağlı)</small></span><input value={duration} onChange={(event) => setDuration(event.target.value)} placeholder="Örn. 2 gündür" /></label>
                  </div>
                  <div className="form-section-heading symptom-heading"><span className="step-number">2</span><div><h2>Gözlenen belirtiler</h2><p>Bir veya daha fazla belirti seçebilirsiniz.</p></div></div>
                  <div className="symptom-grid">
                    {symptomOptions.map((symptom) => {
                      const checked = selectedSymptoms.includes(symptom);
                      return <button key={symptom} type="button" className={`symptom-option ${checked ? "checked" : ""}`} aria-pressed={checked} onClick={() => toggleSymptom(symptom)}><span className="checkbox-mark">{checked && <Check size={13} />}</span>{symptom}</button>;
                    })}
                  </div>
                  <label className="field notes-field"><span>Ek klinik not <small>(demo alanı; kaydedilmez)</small></span><textarea value={notes} onChange={(event) => { setNotes(event.target.value); setSummaryVisible(false); }} placeholder="Öykü veya muayeneden eklemek istediğiniz bilgileri yazın…" rows={3} /></label>
                  <div className="form-actions"><button className="button button-primary" type="button" onClick={() => setSummaryVisible(true)}>Vaka özetini oluştur <ArrowRight size={16} /></button><button className="button button-text reset-button" type="button" onClick={resetAssessment}>Alanları temizle</button></div>
                </section>
                <aside className="assessment-side">
                  <div className="side-card safety-side-card"><div className="side-card-icon"><ShieldCheck size={19} /></div><h3>Klinik karar hekime aittir</h3><p>Belirti benzerliği tek başına tanı koydurmaz. Muayene, anamnez ve uygun tanı yöntemleriyle klinik değerlendirme yapılmalıdır.</p><div className="side-card-rule" /><span className="side-card-caption">Bu arayüz demo amaçlıdır.</span></div>
                  <div className={`summary-card ${summaryVisible ? "summary-ready" : ""}`}>
                    <div className="summary-card-top"><span className="summary-icon"><ClipboardList size={18} /></span><span className="summary-label">VAKA ÖZETİ</span></div>
                    {summaryVisible ? <>
                      <h3>Seçimleriniz hazır</h3>
                      <div className="summary-detail"><strong>Tür</strong><span>{selectedSpecies}</span></div>
                      {age && <div className="summary-detail"><strong>Yaş / dönem</strong><span>{age}</span></div>}
                      {duration && <div className="summary-detail"><strong>Süre</strong><span>{duration}</span></div>}
                      <div className="summary-detail summary-symptoms"><strong>Belirtiler</strong><span>{selectedSymptoms.length ? selectedSymptoms.join(", ") : "Belirti seçilmedi"}</span></div>
                      {notes && <div className="summary-detail summary-symptoms"><strong>Ek not</strong><span>{notes}</span></div>}
                      <div className="summary-disclaimer"><ShieldCheck size={15} /><span>Otomatik tanı veya tedavi önerisi üretilmedi. Girdiğiniz bilgiler bu oturumda saklanmaz.</span></div>
                    </> : <>
                      <h3>Vaka bilgileri<br />burada görünecek</h3>
                      <p>Tür, belirtiler ve ek notları seçtikten sonra özetinizi görüntüleyin.</p>
                      <div className="summary-placeholder"><span /><span /><span /></div>
                    </>}
                  </div>
                  <div className="workflow-hint"><Sparkles size={16} /><span><strong>Sıradaki aşama</strong> · Klinik olarak doğrulanmış içerikler bu taslağa sonradan eklenebilir.</span></div>
                </aside>
              </div>
            </>
          )}

          {activeView === "library" && (
            <>
              <section className="page-intro library-intro">
                <div><div className="eyebrow">KLİNİK BİLGİ ALANI</div><h1>Hastalık & <em>protokoller</em></h1><p>Kaynakları izlenebilir, uzman onaylı klinik içerik için düzenlenmiş arşiv taslağı.</p></div>
                <button className="button button-primary" type="button" onClick={openAssessment}>Yeni vaka <ArrowRight size={16} /></button>
              </section>
              <section className="library-search-panel">
                <div className="search-heading"><div className="search-icon-badge"><Search size={19} /></div><div><h2>Arşivde ara</h2><p>Hastalık adı, klinik başlık veya protokol türü</p></div></div>
                <label className="search-box"><Search size={18} /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Örn. tanı, tedavi, önceliklendirme…" aria-label="Arşivde ara" />{searchTerm && <button type="button" className="icon-button" onClick={() => setSearchTerm("")} aria-label="Aramayı temizle"><X size={16} /></button>}</label>
                <div className="library-filter-row"><span className="filter-caption">TÜR KAPSAMI</span><SpeciesChips value={selectedSpecies} onChange={setSelectedSpecies} compact /></div>
              </section>
              <div className="library-result-header"><div><div className="eyebrow">KÜTÜPHANE YAPISI</div><h2>İçerik şablonları</h2></div><span className="draft-count">{filteredModules.length} taslak alan</span></div>
              {filteredModules.length > 0 ? <section className="module-grid">
                {filteredModules.map((module) => {
                  const Icon = module.icon;
                  const isExpanded = expandedModule === module.id;
                  return <article className={`module-card ${isExpanded ? "expanded" : ""}`} key={module.id}>
                    <div className="module-card-head"><span className="module-icon"><Icon size={19} /></span><span className="module-status">İÇERİK EKLENMEDİ</span></div>
                    <div className="module-eyebrow">{module.eyebrow}</div><h3>{module.title}</h3><p>{module.description}</p>
                    {isExpanded && <div className="module-outline"><strong>Şablon bölümleri</strong>{module.sections.map((section) => <div key={section} className="outline-row"><span className="outline-bullet" />{section}</div>)}<div className="source-note"><ShieldCheck size={14} /> Yayın öncesi kaynak ve veteriner hekim onayı gerekir.</div></div>}
                    <button type="button" className="module-link" onClick={() => setExpandedModule(isExpanded ? null : module.id)}>{isExpanded ? "Bölümleri gizle" : "Şablon bölümlerini gör"}<ChevronRight size={15} className={isExpanded ? "rotate-chevron" : ""} /></button>
                  </article>;
                })}
              </section> : <div className="empty-results"><Search size={22} /><strong>Bu aramayla eşleşen şablon bulunamadı.</strong><span>Arama terimini değiştirebilir veya temizleyebilirsiniz.</span></div>}
              <div className="library-warning"><ShieldCheck size={18} /><div><strong>Önemli güvenlik notu</strong><span>Bu taslakta hastalıklara özel tanı, ilaç, doz veya tedavi protokolü yer almıyor. Gerçek içerikler kullanılmadan önce güvenilir kaynaklarla doğrulanmalı, tür ve hasta bağlamında uzmanlarca incelenmeli ve sürüm/tarih bilgisiyle yönetilmelidir.</span></div></div>
            </>
          )}

          <footer className="page-footer"><span>VetVaka · Taslak çalışma alanı</span><span>Demo arayüz · Klinik karar yerine geçmez</span></footer>
        </main>
      </div>
    </div>
  );
}
