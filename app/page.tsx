import { FAQ, Hero, Numbers, Process, SelectedWork, SentenceForm, Services, StackMarquee, Statement, Testimonials } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Services />
      <Numbers />
      <SelectedWork />
      <StackMarquee />
      <Process />
      <Testimonials />
      <SentenceForm />
      <FAQ />
    </>
  );
}
