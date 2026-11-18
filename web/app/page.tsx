import { Fact } from "@/components/Fact";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">BolCash</h1>
      <p className="mt-2">Coming soon.</p>
      <p className="mt-4">
        <Fact id="udyam_registered" />
      </p>
    </>
  );
}
