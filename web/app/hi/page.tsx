import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  slug: "hi",
  title: "उधार खाता और कैश बुक अपने फ़ोन पर",
  description:
    "BolCash दुकानदारों और रेहड़ी-पटरी वालों के लिए एक मोबाइल ऐप है। उधार खाता और कैश बुक अपने फ़ोन पर रखें।",
});

// Hindi home page: hero only. Have a native speaker review before launch.
export default function HindiHome() {
  return (
    <div lang="hi">
      <Badge tone="accent">जल्द आ रहा है</Badge>
      <h1 className="mt-3 text-3xl font-bold md:text-4xl">
        अपना उधार खाता और कैश बुक अपने फ़ोन पर रखें
      </h1>
      <p className="mt-3 text-lg text-muted">
        BolCash दुकानदारों और रेहड़ी-पटरी वालों के लिए एक मोबाइल ऐप है। लिखकर रखिए कि किसे आपको
        कितना देना है, और आपको किसे कितना देना है।
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button href="/#waitlist">वेटलिस्ट में जुड़ें</Button>
        <Button href="/features/" variant="outline">
          फ़ीचर देखें (English)
        </Button>
      </div>
    </div>
  );
}
