import { Link, useI18n } from '../lib/i18n';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';

export default function History() {
  const { lang, t } = useI18n();
  const ne = lang === 'ne';
  return (
    <>
      <Seo
        path="/about/history"
        title={t('about.history')}
        description={
          ne
            ? 'पेन्सिल्भेनिया नेपाली गुठी संघ कसरी सुरु भयो, र यसको यात्रा बदल्ने अनुदान।'
            : 'How the Pennsylvania Nepalese Guthi Association began, and the grant that changed its course.'
        }
        jsonLd={[
          breadcrumbJsonLd(
            [
              { name: t('crumb.home'), path: '/' },
              { name: t('nav.about'), path: '/about' },
              { name: t('about.history'), path: '/about/history' },
            ],
            lang,
          ),
        ]}
      />
      <PageHeader
        title={t('about.history')}
        crumbs={[{ label: t('nav.about'), to: '/about' }, { label: t('about.history') }]}
        intro={ne ? 'PNGA कसरी स्थापना भयो।' : 'How PNGA came into being.'}
      />
      <div className="prose-block mx-auto max-w-3xl px-4 py-10 text-lg sm:px-6">
        {ne ? (
          <>
            <h2>हामीले कसरी सुरु गर्यौँ</h2>
            <p>
              PNGA को सुरुवात मोन्टगोमेरी काउन्टीका केही नेपाली आप्रवासीहरूको नेतृत्वमा भएको स्वतःस्फूर्त सामुदायिक कार्यबाट भएको हो।
              उनीहरूले सामाजिक न्याय पुनःस्थापना गर्न र पेन्सिल्भेनियाका आप्रवासी समुदायले भोग्ने जोखिम घटाउन चाहन्थे। ती
              प्रारम्भिक प्रयासबाट एउटा समुदायमा आधारित संस्था विकसित भयो।
            </p>
            <h2>हाम्रो यात्रा कसले बदल्यो</h2>
            <p>
              अमेरिकन रेस्क्यु प्लान एक्ट (ARPA) मार्फतको अनुदानको अवसर PNGA का लागि लामो समयदेखि पर्खिएको मोड साबित भयो।
            </p>
            <h2>हामीलाई कसले सहयोग गरेका छन्</h2>
            <ul>
              <li>{t('about.s1')}</li>
              <li>{t('about.s2')}</li>
              <li>{t('about.s3')}</li>
            </ul>
            <p>
              <Link to="/programs">आज हामी के गर्छौँ</Link> पढ्नुहोस्, वा <Link to="/about/leadership">हाम्रो समितिलाई</Link> भेट्नुहोस्।
            </p>
          </>
        ) : (
          <>
            <h2>How we began</h2>
            <p>
              PNGA began with spontaneous community action led by a few Nepalese immigrants in Montgomery County. They
              wanted to restore social justice and reduce the vulnerabilities that immigrant communities in Pennsylvania
              face. From those first efforts grew a community-based organization.
            </p>
            <h2>What changed our course</h2>
            <p>
              A grant opportunity through the American Rescue Plan Act (ARPA) proved to be the long-awaited turning
              point for PNGA.
            </p>
            <h2>Who has supported us</h2>
            <ul>
              <li>Montgomery County Recovery Office</li>
              <li>Philip Jaisohn Memorial Foundation</li>
              <li>Private contributors</li>
            </ul>
            <p>
              Read about <Link to="/programs">what we do today</Link> or meet <Link to="/about/leadership">our board</Link>.
            </p>
          </>
        )}
      </div>
    </>
  );
}
