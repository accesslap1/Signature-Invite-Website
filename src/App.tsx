import { lazy, Suspense, useEffect, useState } from "react";

const WeddingOne = lazy(() => import("../Templates/Wedding/Wedding Template 1"));
const WeddingTwo = lazy(() => import("../Templates/Wedding/Wedding Template 2"));
const WeddingThree = lazy(() => import("../Templates/Wedding/Wedding Template 3"));
const PartyOne = lazy(() => import("../Templates/Party/Party Template 1"));

const templates = [
  { id: "wedding-1", number: "01", title: "Wedding Template 1", type: "Wedding", component: WeddingOne, tone: "warm" },
  { id: "wedding-2", number: "02", title: "Wedding Template 2", type: "Wedding", component: WeddingTwo, tone: "tropical" },
  { id: "wedding-3", number: "03", title: "Wedding Template 3", type: "Wedding", component: WeddingThree, tone: "deco" },
  { id: "party-1", number: "04", title: "Party Template 1", type: "Party", component: PartyOne, tone: "night" },
] as const;

function currentRoute() {
  return window.location.hash.replace(/^#\/?/, "");
}

export default function App() {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const selected = templates.find((template) => template.id === route);
  if (selected) {
    const Template = selected.component;
    return (
      <>
        <a className="backButton" href="#/" aria-label="Return to all templates">← All templates</a>
        <Suspense fallback={<div className="loading">Loading invitation…</div>}>
          <Template />
        </Suspense>
      </>
    );
  }

  return (
    <main className="catalogue">
      <header className="catalogueHeader">
        <div className="brandMark">SI</div>
        <div>
          <p>Signature Invite</p>
          <span>Template preview library</span>
        </div>
        <b>{templates.length.toString().padStart(2, "0")} templates</b>
      </header>

      <section className="intro">
        <h1>Choose an invitation<br />to preview.</h1>
        <p>Open each experience in its full responsive layout, with its original interactions, video, music and language controls.</p>
      </section>

      <section className="templateGrid" aria-label="Invitation templates">
        {templates.map((template) => (
          <a className={`templateCard ${template.tone}`} href={`#/${template.id}`} key={template.id}>
            <div className="cardVisual">
              <span>{template.number}</span>
              <div className="cardMonogram">{template.type === "Party" ? "P" : "W"}</div>
              <small>Open preview ↗</small>
            </div>
            <div className="cardMeta">
              <div><span>{template.type}</span><h2>{template.title}</h2></div>
              <b>View</b>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
