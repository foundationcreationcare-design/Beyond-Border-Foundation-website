import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown,
  Droplets, HeartHandshake, Leaf, Menu, ShieldCheck, Stethoscope, Utensils,
  X,
} from 'lucide-react';

const queryClient = new QueryClient();
type Language = 'en' | 'fr';

const copy = {
  en: {
    announce: 'Working alongside communities across southwestern DRC',
    home: 'Home', about: 'Our approach', work: 'Our work', updates: 'Field notes', give: 'Support our work',
    eyebrow: 'Beyond Border Foundation · Grand Bandundu & nearby Kongo Central',
    title: 'A future built,',
    titleAccent: 'together.',
    intro: 'We work with communities across southwestern Democratic Republic of the Congo to strengthen the essentials of a healthy, hopeful life.',
    explore: 'Explore our work', ourPlace: 'Where we work',
    placeTitle: 'Rooted in the realities of the region.',
    placeText: 'Our focus is Grand Bandundu—Kwilu, Kwango and Mai-Ndombe—and nearby Kongo Central. Here, distance, infrastructure and seasonal conditions can shape everyday access to food, safe water, healthcare and education.',
    placeFoot: 'A broad geographic focus, not a claim of active programming in every community.',
    principles: ['Listen first', 'Work with local knowledge', 'Share decisions and accountability'],
    aboutTag: 'How we work',
    aboutTitle: 'Local priorities. Shared responsibility.',
    aboutText: 'Lasting progress starts by listening. We aim to work with communities, local actors and partners—supporting practical responses shaped by people who understand their own context.',
    approachNote: 'Our commitments are a starting point. Project details, partners and results will be shared here as they are confirmed and documented.',
    focusTag: 'What we focus on',
    focusTitle: 'The foundations of wellbeing.',
    focusIntro: 'Our areas of focus connect immediate needs with the conditions that help families and communities thrive over time.',
    foodTitle: 'Food & nutrition', foodText: 'Emergency food support and nutrition, delivered with dignity and attention to local needs.',
    waterTitle: 'Clean water & WASH', waterText: 'Safer water, sanitation and hygiene practices that protect health at home and in community spaces.',
    healthTitle: 'Primary health', healthText: 'Support for essential care and prevention, including community awareness during epidemic risks.',
    educationTitle: 'Education', educationText: 'Learning opportunities and supportive environments where children and young people can keep building their futures.',
    lifeTitle: 'Livelihoods', lifeText: 'Practical pathways that strengthen household resilience and locally grounded ways to earn a living.',
    updatesTag: 'From the field',
    updatesTitle: 'Notes, when there is something to share.',
    updatesIntro: 'We will publish dated updates with enough context to be useful—and without sharing personal stories or images without consent.',
    updateLabel: 'Field update', updatePending: 'A dated field update will appear here once it is verified and ready to share.',
    updatePlaceholder: 'Editorial placeholder · replace with a dated, approved field note.',
    updateLater: 'More updates will be added as they are available.',
    accountability: 'Accountability',
    accountabilityTitle: 'Clear about what is known—and what is not.',
    accountabilityText: 'We will share project information and financial reporting as they are established. We do not publish unverified figures, promise outcomes, or imply that a service is active where it has not been confirmed.',
    transparent: 'What we will make visible',
    transparencies: ['Where activities take place, when confirmed', 'How funds are allocated and reported', 'What has changed—and what remains a challenge'],
    giveTag: 'Support community-led work',
    giveTitle: 'Your support should be met with clarity.',
    giveText: 'We are preparing transparent ways to contribute. No donation channel or payment processing is configured on this website yet.',
    giveUnavailable: 'Giving channels not yet configured',
    giveNote: 'Please do not send payment details through this site. Donation methods and organizational details will be published after they are verified.',
    contactPlaceholder: 'Contact information to be added after verification.',
    footerLine: 'A community-centered foundation working across southwestern DRC.',
    footerSmall: 'Built on respect, shared responsibility and honest reporting.',
    language: 'Language',
    navOpen: 'Open navigation', navClose: 'Close navigation',
  },
  fr: {
    announce: 'Aux côtés des communautés du sud-ouest de la RDC',
    home: 'Accueil', about: 'Notre approche', work: 'Nos domaines', updates: 'Actualités', give: 'Nous soutenir',
    eyebrow: 'Beyond Border Foundation · Grand Bandundu et Kongo Central voisin',
    title: 'Un avenir à bâtir,',
    titleAccent: 'ensemble.',
    intro: 'Nous travaillons avec les communautés du sud-ouest de la République démocratique du Congo pour renforcer les fondements d’une vie saine et porteuse d’espoir.',
    explore: 'Découvrir nos domaines', ourPlace: 'Où nous travaillons',
    placeTitle: 'Ancrés dans les réalités de la région.',
    placeText: 'Notre zone d’intérêt est le Grand Bandundu — Kwilu, Kwango et Mai-Ndombe — ainsi que le Kongo Central voisin. Ici, les distances, les infrastructures et les saisons peuvent influencer l’accès quotidien à l’alimentation, à l’eau potable, aux soins de santé et à l’éducation.',
    placeFoot: 'Une zone géographique générale, et non une affirmation d’activités dans chaque communauté.',
    principles: ['Écouter d’abord', 'S’appuyer sur les savoirs locaux', 'Partager les décisions et la redevabilité'],
    aboutTag: 'Notre manière d’agir',
    aboutTitle: 'Des priorités locales. Une responsabilité partagée.',
    aboutText: 'Les progrès durables commencent par l’écoute. Nous voulons travailler avec les communautés, les acteurs locaux et les partenaires, en appuyant des réponses concrètes définies par celles et ceux qui connaissent leur contexte.',
    approachNote: 'Nos engagements sont un point de départ. Les détails des projets, partenaires et résultats seront publiés ici lorsqu’ils auront été confirmés et documentés.',
    focusTag: 'Nos domaines d’action',
    focusTitle: 'Les fondements du bien-être.',
    focusIntro: 'Nos domaines relient les besoins immédiats aux conditions qui permettent aux familles et aux communautés de s’épanouir dans la durée.',
    foodTitle: 'Alimentation & nutrition', foodText: 'Aide alimentaire d’urgence et nutrition, dans le respect de la dignité et des besoins locaux.',
    waterTitle: 'Eau potable & WASH', waterText: 'Eau plus sûre, assainissement et hygiène pour protéger la santé à la maison et dans les espaces communautaires.',
    healthTitle: 'Soins de santé primaires', healthText: 'Appui aux soins essentiels et à la prévention, y compris la sensibilisation communautaire face aux risques épidémiques.',
    educationTitle: 'Éducation', educationText: 'Des possibilités d’apprentissage et des environnements favorables aux enfants et aux jeunes.',
    lifeTitle: 'Moyens de subsistance', lifeText: 'Des pistes concrètes pour renforcer la résilience des ménages et les activités économiques locales.',
    updatesTag: 'Sur le terrain',
    updatesTitle: 'Des nouvelles, quand nous avons quelque chose à partager.',
    updatesIntro: 'Nous publierons des informations datées et utiles, sans partager de récits ou d’images personnels sans consentement.',
    updateLabel: 'Actualité terrain', updatePending: 'Une actualité datée sera publiée ici après vérification et validation.',
    updatePlaceholder: 'Espace éditorial · remplacer par une note datée et approuvée.',
    updateLater: 'D’autres nouvelles seront ajoutées lorsqu’elles seront disponibles.',
    accountability: 'Redevabilité',
    accountabilityTitle: 'Dire clairement ce qui est établi — et ce qui ne l’est pas.',
    accountabilityText: 'Nous partagerons les informations sur les projets et les rapports financiers dès qu’ils seront établis. Nous ne publions pas de chiffres non vérifiés, ne promettons pas de résultats et ne suggérons pas qu’un service est actif sans confirmation.',
    transparent: 'Ce que nous rendrons public',
    transparencies: ['Les lieux d’activité, une fois confirmés', 'L’affectation et le suivi des fonds', 'Les progrès réalisés et les défis qui persistent'],
    giveTag: 'Soutenir une action menée avec les communautés',
    giveTitle: 'Votre soutien mérite une information claire.',
    giveText: 'Nous préparons des moyens transparents de contribuer. Aucun canal de don ni traitement de paiement n’est encore configuré sur ce site.',
    giveUnavailable: 'Canaux de don non configurés',
    giveNote: 'Veuillez ne pas transmettre d’informations de paiement via ce site. Les modes de don et les renseignements organisationnels seront publiés après vérification.',
    contactPlaceholder: 'Coordonnées à ajouter après vérification.',
    footerLine: 'Une fondation au service des communautés du sud-ouest de la RDC.',
    footerSmall: 'Fondée sur le respect, la responsabilité partagée et la transparence.',
    language: 'Langue',
    navOpen: 'Ouvrir la navigation', navClose: 'Fermer la navigation',
  },
} satisfies Record<Language, Record<string, string | string[]>>;

function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [givingNotice, setGivingNotice] = useState(false);
  const t = copy[language];
  const focusAreas = [
    { title: t.foodTitle, text: t.foodText, icon: Utensils, number: '01' },
    { title: t.waterTitle, text: t.waterText, icon: Droplets, number: '02' },
    { title: t.healthTitle, text: t.healthText, icon: Stethoscope, number: '03' },
    { title: t.educationTitle, text: t.educationText, icon: BookOpen, number: '04' },
    { title: t.lifeTitle, text: t.lifeText, icon: Leaf, number: '05' },
  ];
  const nav = [
    { href: '#top', label: t.home }, { href: '#approach', label: t.about },
    { href: '#work', label: t.work }, { href: '#updates', label: t.updates },
  ];
  const closeMobile = () => setMobileOpen(false);
  const setLang = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
  };

  return (
    <div className="site-shell grain">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-3">
        {language === 'en' ? 'Skip to content' : 'Aller au contenu'}
      </a>
      <div className="bg-[#244b39] px-5 py-2 text-center text-[11px] font-medium tracking-[.04em] text-[#f3eddd]" data-testid="text-announcement">
        {t.announce}
      </div>
      <header className="sticky top-0 z-40 border-b border-[#d9d2c3] bg-[#f6f2e8]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#top" aria-label="Beyond Border Foundation home" className="flex items-center gap-3" data-testid="link-home">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#335c47] text-[#335c47]">
              <span className="serif text-[22px] leading-none">B</span>
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-bold tracking-[.13em] text-[#234b39]">BEYOND BORDER</span>
              <span className="mt-1 block text-[9px] font-semibold tracking-[.22em] text-[#6e7668]">FOUNDATION</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => <a className="nav-link text-[12px] font-medium text-[#405348] transition-colors hover:text-[#234b39]" href={item.href} key={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>{item.label}</a>)}
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-[#d9d2c3] p-1" aria-label={t.language}>
              <button onClick={() => setLang('en')} aria-pressed={language === 'en'} className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${language === 'en' ? 'bg-[#234b39] text-[#f6f2e8]' : 'text-[#586459]'}`} data-testid="button-language-en">EN</button>
              <button onClick={() => setLang('fr')} aria-pressed={language === 'fr'} className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${language === 'fr' ? 'bg-[#234b39] text-[#f6f2e8]' : 'text-[#586459]'}`} data-testid="button-language-fr">FR</button>
            </div>
            <a href="#give" className="inline-flex items-center gap-2 rounded-full bg-[#d87a5b] px-5 py-3 text-[11px] font-bold tracking-wide text-[#fff8ee] transition-transform hover:-translate-y-0.5" data-testid="link-support-nav">
              {t.give} <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setLang(language === 'en' ? 'fr' : 'en')} aria-label={language === 'en' ? 'Passer en français' : 'Switch to English'} className="rounded-full border border-[#d9d2c3] px-3 py-2 text-[10px] font-bold" data-testid="button-language-mobile">{language.toUpperCase()}</button>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? t.navClose : t.navOpen} aria-expanded={mobileOpen} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9d2c3]" data-testid="button-mobile-menu">
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {mobileOpen && <nav aria-label="Mobile navigation" className="border-t border-[#d9d2c3] bg-[#f6f2e8] px-6 py-4 lg:hidden">
          {nav.map((item) => <a onClick={closeMobile} className="block border-b border-[#e6dfd0] py-3 text-sm text-[#304c3c]" href={item.href} key={item.href}>{item.label}</a>)}
          <a onClick={closeMobile} href="#give" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#d87a5b] px-5 py-3 text-xs font-bold text-white">{t.give}<ArrowUpRight size={14} /></a>
        </nav>}
      </header>

      <main id="main-content">
        <section id="top" className="hero-art relative flex min-h-[670px] items-end text-[#f7f1e5] md:min-h-[710px]">
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-24 md:px-14 md:pb-[104px]">
            <div className="max-w-[770px]">
              <p className="eyebrow reveal text-[#f0b89b]">{t.eyebrow}</p>
              <h1 className="serif reveal reveal-delay mt-7 text-[clamp(3.8rem,9vw,7.7rem)] leading-[.88] tracking-[-.05em]">
                {t.title}<br /><span className="italic text-[#f0b89b]">{t.titleAccent}</span>
              </h1>
              <p className="reveal mt-7 max-w-[540px] text-[15px] leading-7 text-[#f3eddd]/90 md:text-[17px] md:leading-8">{t.intro}</p>
              <div className="reveal mt-9 flex flex-wrap items-center gap-5">
                <a href="#work" className="inline-flex items-center gap-3 rounded-full bg-[#f2ecdd] px-6 py-4 text-[12px] font-bold text-[#244b39] transition-transform hover:-translate-y-1" data-testid="link-explore-work">
                  {t.explore}<ArrowDownRight size={15} />
                </a>
                <a href="#place" className="text-[12px] font-semibold text-[#f3eddd] underline decoration-[#f0b89b]/70 underline-offset-4 hover:decoration-[#f3eddd]" data-testid="link-geography">{t.ourPlace}</a>
              </div>
            </div>
            <div className="absolute bottom-7 right-6 hidden items-center gap-3 text-[10px] tracking-[.1em] text-white/70 md:flex">
              <span className="h-px w-10 bg-white/50" /> SOUTHWESTERN DRC
            </div>
          </div>
          <div className="absolute bottom-0 right-[16%] top-0 hidden w-px bg-white/10 md:block" />
        </section>

        <section id="place" className="section-pad map-lines grid gap-12 bg-[#e9e8d9] md:grid-cols-[.95fr_1.05fr] md:items-center md:gap-24">
          <div>
            <p className="eyebrow text-[#ba654a]">{t.ourPlace}</p>
            <h2 className="serif mt-5 max-w-[520px] text-[clamp(2.5rem,5vw,4.4rem)] leading-[.99] tracking-[-.035em] text-[#244b39]">{t.placeTitle}</h2>
          </div>
          <div className="max-w-[620px]">
            <p className="text-[15px] leading-8 text-[#46584b]">{t.placeText}</p>
            <div className="mt-8 flex flex-wrap gap-2" aria-label="Geographic focus">
              {['Kwilu', 'Kwango', 'Mai-Ndombe', 'Kongo Central'].map((region) => <span key={region} className="rounded-full border border-[#9ca996] px-4 py-2 text-[11px] font-semibold tracking-wide text-[#34513f]" data-testid={`tag-region-${region.toLowerCase().replace(' ', '-')}`}>{region}</span>)}
            </div>
            <p className="mt-5 text-[11px] leading-5 text-[#6b7569]">{t.placeFoot}</p>
          </div>
        </section>

        <section id="approach" className="section-pad bg-[#f6f2e8]">
          <div className="grid gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-24">
            <div>
              <p className="eyebrow text-[#ba654a]">{t.aboutTag}</p>
              <h2 className="serif mt-5 text-[clamp(2.6rem,5.6vw,5rem)] leading-[.96] tracking-[-.04em] text-[#244b39]">{t.aboutTitle}</h2>
            </div>
            <div className="pt-1">
              <p className="max-w-[610px] text-[16px] leading-8 text-[#46584b]">{t.aboutText}</p>
              <ul className="mt-8 space-y-4 border-t border-[#d9d2c3] pt-6">
                {(t.principles as string[]).map((item, index) => <li className="flex items-center gap-4 text-[13px] font-semibold text-[#324a3b]" key={item}>
                  <span className="serif text-[18px] italic text-[#cc7253]">0{index + 1}</span>{item}
                </li>)}
              </ul>
              <p className="mt-7 max-w-[570px] border-l-2 border-[#d87a5b] pl-4 text-[11px] leading-6 text-[#6b7569]">{t.approachNote}</p>
            </div>
          </div>
        </section>

        <section id="work" className="section-pad bg-[#234b39] text-[#f6f2e8]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[#f0b89b]">{t.focusTag}</p>
              <h2 className="serif mt-5 text-[clamp(2.7rem,5.6vw,5rem)] leading-[.96] tracking-[-.04em]">{t.focusTitle}</h2>
            </div>
            <p className="max-w-[380px] text-[13px] leading-7 text-[#d6ded2]">{t.focusIntro}</p>
          </div>
          <div className="mt-14 grid border-t border-[#779081]/50 md:grid-cols-2">
            {focusAreas.map(({ title, text, icon: Icon, number }, index) => <article key={number} className={`focus-card border-b border-[#779081]/50 py-7 md:px-7 ${index % 2 === 0 ? 'md:border-r md:pl-0' : 'md:pr-0'} ${index === 0 ? 'md:pr-8' : ''} ${index === 1 ? 'md:pl-8' : ''} ${index === 2 ? 'md:pr-8' : ''} ${index === 3 ? 'md:pl-8' : ''} ${index === 4 ? 'md:col-span-2 md:pr-0' : ''}`}>
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#86a08f]/60 text-[#e9ae91]"><Icon size={19} strokeWidth={1.5} /></span>
                <span className="serif text-[15px] italic text-[#9eb1a1]">{number}</span>
              </div>
              <h3 className="serif mt-7 text-[27px] leading-tight">{title}</h3>
              <p className="mt-3 max-w-[440px] text-[13px] leading-6 text-[#d6ded2]">{text}</p>
            </article>)}
          </div>
          <a href="#updates" className="mt-9 inline-flex items-center gap-3 text-[12px] font-semibold text-[#efb397] hover:text-white" data-testid="link-work-updates">{t.updates}<ArrowRight size={14} /></a>
        </section>

        <section id="updates" className="section-pad bg-[#f2eee4]">
          <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
            <div>
              <p className="eyebrow text-[#ba654a]">{t.updatesTag}</p>
              <h2 className="serif mt-5 text-[clamp(2.6rem,5.3vw,4.5rem)] leading-[.98] tracking-[-.04em] text-[#244b39]">{t.updatesTitle}</h2>
              <p className="mt-6 max-w-[380px] text-[13px] leading-7 text-[#59665a]">{t.updatesIntro}</p>
            </div>
            <div className="border-y border-[#d4cebf]">
              <article className="update-card py-7" data-testid="card-field-update">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#e6dfd0] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] text-[#405348]">{t.updateLabel}</span>
                  <span className="text-[10px] text-[#777e70]">{language === 'en' ? 'Date to be added' : 'Date à ajouter'}</span>
                </div>
                <h3 className="serif mt-5 text-[25px] text-[#244b39]">{t.updatePending}</h3>
                <p className="mt-3 max-w-[600px] text-[12px] leading-6 text-[#697267]">{t.updatePlaceholder}</p>
                <span aria-hidden="true" className="update-arrow mt-5 inline-flex text-[#bb6c50]"><ArrowRight size={18} /></span>
              </article>
              <div className="border-t border-[#d4cebf] py-5 text-[11px] text-[#697267]">{t.updateLater}</div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-[#e7e6d7]">
          <div className="grid gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-24">
            <div>
              <p className="eyebrow text-[#ba654a]">{t.accountability}</p>
              <h2 className="serif mt-5 text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[.98] tracking-[-.04em] text-[#244b39]">{t.accountabilityTitle}</h2>
            </div>
            <div className="pt-2">
              <p className="text-[14px] leading-7 text-[#4e5d50]">{t.accountabilityText}</p>
              <div className="mt-8 border-t border-[#c8cabb] pt-6">
                <p className="eyebrow text-[#6e7668]">{t.transparent}</p>
                <ul className="mt-5 space-y-4">
                  {(t.transparencies as string[]).map((item) => <li key={item} className="flex gap-3 text-[12px] leading-5 text-[#46584b]"><Check size={15} className="mt-0.5 shrink-0 text-[#4c775d]" />{item}</li>)}
                </ul>
              </div>
              <div className="mt-9 flex items-start gap-4 rounded-sm border border-[#c8cabb] bg-[#efeee4] p-5">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#45684f]" />
                <p className="text-[11px] leading-5 text-[#566257]">{t.contactPlaceholder}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="give" className="section-pad bg-[#d77b5d] text-[#fff7ec]">
          <div className="grid gap-12 md:grid-cols-[1fr_.8fr] md:items-center md:gap-20">
            <div>
              <p className="eyebrow text-[#633c31]">{t.giveTag}</p>
              <h2 className="serif mt-5 max-w-[650px] text-[clamp(2.8rem,6vw,5.6rem)] leading-[.93] tracking-[-.045em]">{t.giveTitle}</h2>
              <p className="mt-6 max-w-[570px] text-[14px] leading-7 text-[#fff2e5]">{t.giveText}</p>
            </div>
            <div className="rounded-sm border border-[#f3b29a]/70 bg-[#cc7254] p-6 md:p-8">
              <div className="flex items-center gap-3">
                <HeartHandshake size={21} />
                <h3 className="text-[13px] font-bold">{t.giveUnavailable}</h3>
              </div>
              <p className="mt-4 text-[12px] leading-6 text-[#fff1e3]">{t.giveNote}</p>
              <button type="button" onClick={() => setGivingNotice(true)} className="mt-6 inline-flex items-center gap-2 border-b border-white/70 pb-1 text-[11px] font-bold" data-testid="button-giving-status">
                {givingNotice ? (language === 'en' ? 'Status noted' : 'Statut noté') : t.giveUnavailable}
                {givingNotice ? <Check size={13} /> : <ChevronDown size={13} />}
              </button>
              {givingNotice && <p role="status" className="mt-3 text-[11px] leading-5 text-white/90">{t.giveNote}</p>}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1d3d30] px-6 py-11 text-[#f6f2e8] md:px-12">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-9 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#top" className="flex items-center gap-3" data-testid="link-footer-home">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#91a294]"><span className="serif text-[19px]">B</span></span>
              <span className="text-[11px] font-bold tracking-[.14em]">BEYOND BORDER FOUNDATION</span>
            </a>
            <p className="mt-4 max-w-[430px] text-[11px] leading-5 text-[#bfcbc0]">{t.footerLine}</p>
          </div>
          <div className="md:text-right">
            <p className="text-[10px] text-[#bfcbc0]">{t.footerSmall}</p>
            <p className="mt-3 text-[9px] uppercase tracking-[.13em] text-[#94a497]">© Beyond Border Foundation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
