import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { SITE, addressLine } from '../lib/site';
import { useI18n } from '../lib/i18n';

function Legal({ path, title, description, intro, children }: { path: string; title: string; description: string; intro: string; children: React.ReactNode }) {
  const { lang, t } = useI18n();
  return (
    <>
      <Seo path={path} title={title} description={description} jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: title, path }], lang)]} />
      <PageHeader title={title} crumbs={[{ label: title }]} intro={intro} />
      <div className="prose-block mx-auto max-w-3xl px-4 py-10 text-lg sm:px-6">
        {lang === 'ne' && (
          <p role="note" className="rounded-xl bg-navy/5 p-4 font-semibold text-navy">{t('legal.note')}</p>
        )}
        {children}
      </div>
    </>
  );
}

const Contact = () => {
  const { lang } = useI18n();
  return lang === 'ne' ? (
    <p>
      प्रश्न छ? {SITE.name}, {addressLine}
      {SITE.email && <> मा लेख्नुहोस्, वा <a href={`mailto:${SITE.email}`}>{SITE.email}</a> मा इमेल गर्नुहोस्</>}।
    </p>
  ) : (
    <p>
      Questions? Write to {SITE.name}, {addressLine}
      {SITE.email && <>, or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a></>}.
    </p>
  );
};

function PrivacyEn() {
  return (
    <Legal
      path="/privacy"
      title="Privacy policy"
      description="How PNGA collects and uses information from this website."
      intro="We collect as little as we can, and we use it only to help you."
    >
      <h2>What we collect</h2>
      <p>
        We collect only what you type into our forms: your name, phone number, email address, preferred language, and
        your message. Our waiver, volunteer and photo-release forms also collect your typed signature, an emergency
        contact, and the names and ages of any children you list. Please do not include your immigration status,
        health details, or other sensitive information.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to your question or request.</li>
        <li>To connect you with a PNGA volunteer or a trusted outside service, if you ask us to.</li>
      </ul>
      <p>We do not sell your information or use it for advertising.</p>
      <h2>Who can see it</h2>
      <p>
        Form messages are delivered by email to PNGA volunteers who handle requests. We use a form service (EmailJS)
        to deliver them. Newsletter email addresses are saved in the same private Sheet and used only to send the newsletter; every email has an unsubscribe option, and the unsubscribe page at /unsubscribe removes the address. Waiver, volunteer and photo-release forms are also saved in a private Google Sheet that only
        a few PNGA volunteers can open.
      </p>
      <h2>How long we keep it</h2>
      <p>We keep messages only as long as needed to respond, and delete help requests after about 12 months. We keep signed waivers, volunteer agreements and photo releases for as long as PNGA needs the record, and you can ask us to remove your details.</p>
      <h2>Other services</h2>
      <p>
        This website loads fonts from Google Fonts and photos from Google Drive and Google Photos, and it reads its
        news, events, photo, board and program lists from published Google Sheets. Those services may see that your
        browser requested them. We do not use advertising or tracking cookies.
      </p>
      <h2>Your choices</h2>
      <p>You can ask us to correct or delete what you sent us.</p>
      <Contact />
    </Legal>
  );
}

function TermsEn() {
  return (
    <Legal
      path="/terms"
      title="Terms of use"
      description="Terms for using the PNGA website."
      intro="Plain rules for using this website."
    >
      <h2>Information on this site</h2>
      <p>
        We work to keep this site accurate, but it is provided as is. Event details can change, so please confirm
        with us if it matters.
      </p>
      <h2>Not professional advice</h2>
      <p>
        PNGA is a volunteer organization. Nothing on this site is legal, medical, financial or immigration advice.
      </p>
      <h2>Links to other websites</h2>
      <p>
        Some links go to services that are not run by PNGA. We are not responsible for their content or
        services.
      </p>
      <h2>Our content</h2>
      <p>You may share links to our pages. Please ask before copying photos or text for other uses.</p>
      <Contact />
    </Legal>
  );
}

function AccessibilityEn() {
  return (
    <Legal
      path="/accessibility"
      title="Accessibility"
      description="PNGA's commitment to an accessible website."
      intro="This website should work for everyone, including seniors and people using assistive technology."
    >
      <h2>Our goal</h2>
      <p>
        We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2, level AA. The site uses large text and
        buttons, high-contrast colors, headings and landmarks for screen readers, and full keyboard navigation.
      </p>
      <h2>Tell us about a problem</h2>
      <p>If something on this site is hard to use, please tell us and we will work to fix it.</p>
      <Contact />
    </Legal>
  );
}

function PrivacyNe() {
  return (
    <Legal
      path="/privacy"
      title="गोपनीयता नीति"
      description="PNGA ले यस वेबसाइटबाट जानकारी कसरी सङ्कलन र प्रयोग गर्छ।"
      intro="हामी सकेसम्म कम जानकारी सङ्कलन गर्छौँ, र तपाईंलाई सहयोग गर्न मात्र प्रयोग गर्छौँ।"
    >
      <h2>हामीले के सङ्कलन गर्छौँ</h2>
      <p>
        हामी तपाईंले हाम्रा फारममा टाइप गरेको कुरा मात्र सङ्कलन गर्छौँ: तपाईंको नाम, फोन नम्बर, इमेल ठेगाना, मन पर्ने भाषा र
        तपाईंको सन्देश। हाम्रा वेभर, स्वयंसेवक र फोटो-प्रयोग सहमति फारमले तपाईंको टाइप गरिएको हस्ताक्षर, आपतकालीन सम्पर्क
        व्यक्ति, र तपाईंले उल्लेख गरेका बालबालिकाको नाम र उमेर पनि सङ्कलन गर्छन्। कृपया आफ्नो अध्यागमन अवस्था, स्वास्थ्यसम्बन्धी
        विवरण वा अन्य संवेदनशील जानकारी नलेख्नुहोस्।
      </p>
      <h2>हामी यसलाई कसरी प्रयोग गर्छौँ</h2>
      <ul>
        <li>तपाईंको प्रश्न वा अनुरोधको जवाफ दिन।</li>
        <li>तपाईंले भनेमा, तपाईंलाई PNGA का स्वयंसेवक वा भरपर्दो बाहिरी सेवासँग जोड्न।</li>
      </ul>
      <p>हामी तपाईंको जानकारी बेच्दैनौँ वा विज्ञापनका लागि प्रयोग गर्दैनौँ।</p>
      <h2>यसलाई को-कसले हेर्न सक्छन्</h2>
      <p>
        फारमका सन्देशहरू अनुरोध सम्हाल्ने PNGA का स्वयंसेवकलाई इमेलबाट पठाइन्छ। यसका लागि हामी फारम सेवा (EmailJS) प्रयोग
        गर्छौँ। न्यूजलेटरका इमेल ठेगाना सोही निजी सिट (Sheet) मा सुरक्षित गरिन्छन् र न्यूजलेटर पठाउन मात्र प्रयोग गरिन्छन्; हरेक
        इमेलमा सदस्यता खारेज गर्ने विकल्प हुन्छ, र /unsubscribe पृष्ठले ठेगाना हटाउँछ। वेभर, स्वयंसेवक र फोटो-प्रयोग सहमति फारम
        पनि निजी गुगल सिटमा सुरक्षित गरिन्छन्, जुन केही PNGA स्वयंसेवकले मात्र खोल्न सक्छन्।
      </p>
      <h2>हामी कति समयसम्म राख्छौँ</h2>
      <p>
        हामी सन्देशहरू जवाफ दिन आवश्यक रहेसम्म मात्र राख्छौँ, र सहयोगका अनुरोधहरू करिब १२ महिनापछि मेटाउँछौँ। हस्ताक्षर गरिएका
        वेभर, स्वयंसेवक सम्झौता र फोटो-प्रयोग सहमति PNGA लाई अभिलेख चाहिएसम्म राख्छौँ, र तपाईं आफ्नो विवरण हटाउन भन्न सक्नुहुन्छ।
      </p>
      <h2>अन्य सेवाहरू</h2>
      <p>
        यो वेबसाइटले गुगल फन्ट्सबाट फन्ट, गुगल ड्राइभ र गुगल फोटोबाट तस्बिर लोड गर्छ, र प्रकाशित गुगल सिटबाट समाचार, आयोजना,
        फोटो, समिति र कार्यक्रमका सूची पढ्छ। ती सेवाहरूले तपाईंको ब्राउजरले तिनलाई अनुरोध गरेको देख्न सक्छन्। हामी विज्ञापन वा
        ट्र्याकिङ कुकीहरू प्रयोग गर्दैनौँ।
      </p>
      <h2>तपाईंका रोजाइहरू</h2>
      <p>तपाईं हामीलाई पठाएको कुरा सच्याउन वा मेटाउन भन्न सक्नुहुन्छ।</p>
      <Contact />
    </Legal>
  );
}

function TermsNe() {
  return (
    <Legal
      path="/terms"
      title="प्रयोगका सर्तहरू"
      description="PNGA वेबसाइट प्रयोगका सर्तहरू।"
      intro="यो वेबसाइट प्रयोग गर्ने सरल नियमहरू।"
    >
      <h2>यस साइटमा भएको जानकारी</h2>
      <p>
        हामी यो साइट सही राख्न प्रयास गर्छौँ, तर यो जस्ताको तस्तै उपलब्ध गराइएको हो। आयोजनाका विवरण बदलिन सक्छन्, त्यसैले
        महत्त्वपूर्ण भए हामीसँग पुष्टि गर्नुहोस्।
      </p>
      <h2>व्यावसायिक सल्लाह होइन</h2>
      <p>PNGA स्वयंसेवकद्वारा चल्ने संस्था हो। यस साइटमा भएको कुनै पनि कुरा कानुनी, चिकित्सकीय, वित्तीय वा अध्यागमन सल्लाह होइन।</p>
      <h2>अन्य वेबसाइटका लिङ्क</h2>
      <p>केही लिङ्कहरू PNGA ले नचलाएका सेवामा जान्छन्। तिनका सामग्री वा सेवाको जिम्मेवारी हामी लिँदैनौँ।</p>
      <h2>हाम्रो सामग्री</h2>
      <p>तपाईं हाम्रा पृष्ठका लिङ्क बाँड्न सक्नुहुन्छ। अन्य प्रयोजनका लागि फोटो वा पाठ कपी गर्नुअघि कृपया सोध्नुहोस्।</p>
      <Contact />
    </Legal>
  );
}

function AccessibilityNe() {
  return (
    <Legal
      path="/accessibility"
      title="पहुँचयोग्यता"
      description="पहुँचयोग्य वेबसाइटप्रतिको PNGA को प्रतिबद्धता।"
      intro="यो वेबसाइट ज्येष्ठ नागरिक र सहयोगी प्रविधि प्रयोग गर्ने मानिसहरू लगायत सबैका लागि काम गर्नुपर्छ।"
    >
      <h2>हाम्रो लक्ष्य</h2>
      <p>
        हामी वेब सामग्री पहुँचयोग्यता निर्देशिका (WCAG) २.२, स्तर AA पूरा गर्ने लक्ष्य राख्छौँ। साइटमा ठूला अक्षर र बटन, उच्च कन्ट्रास्ट
        रङ, स्क्रिन रिडरका लागि शीर्षक र ल्यान्डमार्क, र पूर्ण किबोर्ड नेभिगेसन प्रयोग गरिएको छ।
      </p>
      <h2>समस्याबारे हामीलाई भन्नुहोस्</h2>
      <p>यस साइटमा केही प्रयोग गर्न गाह्रो भए, कृपया हामीलाई भन्नुहोस्, हामी त्यसलाई सुधार्न काम गर्नेछौँ।</p>
      <Contact />
    </Legal>
  );
}

export function Privacy() {
  return useI18n().lang === 'ne' ? <PrivacyNe /> : <PrivacyEn />;
}
export function Terms() {
  return useI18n().lang === 'ne' ? <TermsNe /> : <TermsEn />;
}
export function Accessibility() {
  return useI18n().lang === 'ne' ? <AccessibilityNe /> : <AccessibilityEn />;
}
