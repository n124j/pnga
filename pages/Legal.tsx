import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { SITE, addressLine } from '../lib/site';

function Legal({ path, title, description, intro, children }: { path: string; title: string; description: string; intro: string; children: React.ReactNode }) {
  return (
    <>
      <Seo path={path} title={title} description={description} jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: title, path }])]} />
      <PageHeader title={title} crumbs={[{ label: title }]} intro={intro} />
      <div className="prose-block mx-auto max-w-3xl px-4 py-10 text-lg sm:px-6">{children}</div>
    </>
  );
}

const Contact = () => (
  <p>
    Questions? Write to {SITE.name}, {addressLine}
    {SITE.email && <>, or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a></>}.
  </p>
);

export function Privacy() {
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

export function Terms() {
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

export function Accessibility() {
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
