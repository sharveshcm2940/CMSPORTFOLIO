import IntroLoader from "./components/IntroLoader.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Nav from "./components/Nav.jsx";
import ScanRail from "./components/ScanRail.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Terminal from "./components/Terminal.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import ProjectTimeline from "./components/ProjectTimeline.jsx";
import GitHubStats from "./components/GitHubStats.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import SocialLinks from "./components/SocialLinks.jsx";
import ToastContainer from "./components/Toast.jsx";

export default function App() {
  return (
    <>
      <IntroLoader />
      <CursorGlow />
      <SocialLinks />
      <ToastContainer />
      <div className="ambient-scan" aria-hidden="true" />
      <Nav />
      <ScanRail />
      <main>
        <Hero />
        <About />
        <Terminal />
        <Skills />
        <Experience />
        <Projects />
        <ProjectTimeline />
        <GitHubStats />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
