import { MotionConfig } from "framer-motion";
import {
  HeroContent,
  HeroIllustration,
} from "../components/home";
import Typing, { TYPING_SECTION_ID } from "../components/section/typing";
import { TOTAL_TYPING_DURATION } from "../components/home/home-data";

/** Smoothly scrolls the user down to the typing race section. */
function scrollToTypingSection() {
  document
    .getElementById(TYPING_SECTION_ID)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const contentDelay = TOTAL_TYPING_DURATION + 0.1;
  const buttonDelay = TOTAL_TYPING_DURATION + 0.35;

  return (
    <MotionConfig reducedMotion="user">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-6 pt-32 pb-16 md:flex-row md:justify-between md:pt-24">
        <HeroContent
          contentDelay={contentDelay}
          buttonDelay={buttonDelay}
          onStartTyping={scrollToTypingSection}
        />
        <HeroIllustration />
      </section>

      {/* Typing race section — scroll target for "Start Typing" */}
      <Typing />
    </MotionConfig>
  );
}
