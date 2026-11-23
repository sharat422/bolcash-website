import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { FeatureCard } from "@/components/FeatureCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { pageMeta } from "@/lib/meta";
import { LAUNCH } from "@/lib/site";
import { WAITLIST_TEXT_KN } from "@/lib/waitlist";

export const metadata = pageMeta({
  slug: "kn",
  title: "ಬೋಲ್‌ಕ್ಯಾಶ್ — ಭಾರತದಲ್ಲಿ FMCG ವಿತರಕರಿಗಾಗಿ ಖಾತಾ ಆ್ಯಪ್",
  description:
    "ಭಾರತದ ಸಣ್ಣ FMCG ವಿತರಕರಿಗಾಗಿ ಖಾತಾ ಆ್ಯಪ್: ಬೀಟ್ ಲೆಡ್ಜರ್, ಬೀಟ್ ಕಲೆಕ್ಷನ್, UPI ಹೊಂದಾಣಿಕೆ, Tally ರಫ್ತಿನೊಂದಿಗೆ GST ಇನ್‌ವಾಯ್ಸ್, ಸ್ಟಾಕ್ ಮೂಲಭೂತ ಅಂಶಗಳು, ಮತ್ತು ನಗದು, UPI ಹಾಗೂ ಕ್ರೆಡಿಟ್ ಹೊಂದಾಣಿಕೆಯ ದಿನದ ಮುಕ್ತಾಯ.",
  locale: "kn_IN",
});

const tagline =
  "ಭಾರತದ ಸಣ್ಣ FMCG ವಿತರಕರಿಗಾಗಿ: ಬೀಟ್ ಲೆಡ್ಜರ್, ಕಲೆಕ್ಷನ್, ಮತ್ತು ನಗದು, UPI ಹಾಗೂ ಕ್ರೆಡಿಟ್ ಹೊಂದಾಣಿಕೆಯ ದಿನದ ಮುಕ್ತಾಯ.";

const FAQ_KN: { question: string; answer: string }[] = [
  {
    question: "ಬೀಟ್ ಪ್ಲಾನ್ ಎಂದರೇನು?",
    answer:
      "ಬೀಟ್ ಎಂದರೆ ಮಾರಾಟಗಾರ ನಿಗದಿತ ದಿನದಂದು ಕ್ರಮಿಸುವ ನಿಗದಿತ ಮಾರ್ಗ. ಬೀಟ್ ಪ್ಲಾನ್ ಯಾವ ಚಿಲ್ಲರೆ ಅಂಗಡಿಗೆ, ಯಾವ ಕ್ರಮದಲ್ಲಿ ಭೇಟಿ ನೀಡಬೇಕೆಂದು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ, ಇದರಿಂದ ಯಾವ ಅಂಗಡಿಯೂ ತಪ್ಪುವುದಿಲ್ಲ ಮತ್ತು ಯಾವ ದಿನವೂ ವ್ಯರ್ಥವಾಗುವುದಿಲ್ಲ.",
  },
  {
    question: "ಬೀಟ್‌ನಲ್ಲಿ ಕಲೆಕ್ಷನ್‌ಗಳನ್ನು ಹೇಗೆ ಗಮನಿಸುವುದು?",
    answer:
      "ಪ್ರತಿ ಕಲೆಕ್ಷನ್ ಅನ್ನು ಚಿಲ್ಲರೆ ಅಂಗಡಿಯ ಬಿಲ್‌ಗೆ ಎದುರಾಗಿ, ಬೀಟ್‌ನಲ್ಲಿಯೇ ದಾಖಲಿಸಿ. ಬೋಲ್‌ಕ್ಯಾಶ್ ಪ್ರತಿ ಬೀಟ್‌ಗೆ ಒಂದು ಲೆಡ್ಜರ್ ಇಡುತ್ತದೆ, ಆದ್ದರಿಂದ ಒಬ್ಬ ಮಾರಾಟಗಾರನ ಕಲೆಕ್ಷನ್ ಇನ್ನೊಬ್ಬರದ್ದರೊಂದಿಗೆ ಬೆರೆಯುವುದಿಲ್ಲ, ಮತ್ತು ಪ್ರತಿ ಬಿಲ್‌ನಲ್ಲಿ ಇನ್ನೂ ಎಷ್ಟು ಬಾಕಿ ಇದೆ ಎಂದು ನೀವು ನೋಡಬಹುದು.",
  },
  {
    question: "ವಿತರಕರಾಗಿ UPI ಪಾವತಿಗಳನ್ನು ಹೇಗೆ ಹೊಂದಾಣಿಕೆ ಮಾಡುವುದು?",
    answer:
      "UPI ರೆಫರೆನ್ಸ್ ಬಳಸಿ ಪ್ರತಿ UPI ಪಾವತಿಯನ್ನು ಚಿಲ್ಲರೆ ಅಂಗಡಿಯ ಬಿಲ್‌ಗೆ ಕೈಯಿಂದ ಹೊಂದಿಸಿ. ಬೋಲ್‌ಕ್ಯಾಶ್ UPI ಪಾವತಿಗಳನ್ನು ಬಿಲ್‌ಗೆ ಎದುರಾಗಿ ದಾಖಲಿಸುತ್ತದೆ ಮತ್ತು ನಿಮ್ಮ ಹಣವನ್ನು ಎಂದಿಗೂ ಹಿಡಿದಿಡುವುದಿಲ್ಲ ಅಥವಾ ಚಲಿಸುವುದಿಲ್ಲ.",
  },
  {
    question: "ವಿತರಕರಿಗಾಗಿ ದಿನದ ಮುಕ್ತಾಯವನ್ನು ಹೇಗೆ ಮಾಡುವುದು?",
    answer:
      "ದಿನದ ಕೊನೆಯಲ್ಲಿ, ಪ್ರತಿ ಬೀಟ್‌ಗೆ ಸಂಗ್ರಹಿಸಿದ ನಗದನ್ನು ಬರೆದಿದ್ದಕ್ಕೆ ಹೊಂದಿಸಿ. ಬೋಲ್‌ಕ್ಯಾಶ್ ದಿನದ ಕೊನೆಯಲ್ಲಿ ನಗದು, UPI, ನೀಡಿದ ಕ್ರೆಡಿಟ್ ಮತ್ತು ಸಂಗ್ರಹಿಸಿದ ಕ್ರೆಡಿಟ್ ಅನ್ನು ಹೊಂದಾಣಿಕೆ ಮಾಡುತ್ತದೆ.",
  },
  {
    question: "ನನ್ನ CA ಅಥವಾ Tallyಗಾಗಿ ನನ್ನ ಡೇಟಾವನ್ನು ರಫ್ತು ಮಾಡಬಹುದೇ?",
    answer:
      "ಹೌದು. ಬೋಲ್‌ಕ್ಯಾಶ್ ನಿಮ್ಮ CA ಮತ್ತು Tallyಗಾಗಿ ರಫ್ತಿನೊಂದಿಗೆ GST ಇನ್‌ವಾಯ್ಸ್‌ಗಳನ್ನು ಮಾಡುತ್ತದೆ, ಮತ್ತು ನಿಮ್ಮ ಡೇಟಾ ಮತ್ತು ರಫ್ತು ಯಾವಾಗಲೂ ಉಚಿತ.",
  },
  {
    question: "ಬೋಲ್‌ಕ್ಯಾಶ್ ಯಾವಾಗ ಬಿಡುಗಡೆಯಾಗುತ್ತದೆ, ಮತ್ತು ಅದರ ಬೆಲೆ ಎಷ್ಟು?",
    answer: `ಬೋಲ್‌ಕ್ಯಾಶ್ ${LAUNCH}ರಲ್ಲಿ ಬಿಡುಗಡೆಯಾಗುತ್ತದೆ. ವೇಟ್‌ಲಿಸ್ಟ್‌ಗೆ ಸೇರಿ, ಬಿಡುಗಡೆಯಾದಾಗ ಬೆಲೆಯೊಂದಿಗೆ ನಿಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸುತ್ತೇವೆ.`,
  },
  {
    question: "ಬೋಲ್‌ಕ್ಯಾಶ್ ಯಾವ ವ್ಯವಹಾರಗಳಿಗೆ?",
    answer:
      "ಒಂದರಿಂದ ನಾಲ್ಕು ಬೀಟ್‌ಗಳು ಮತ್ತು ಎಂಭತ್ತರಿಂದ ಮುನ್ನೂರು ಚಿಲ್ಲರೆ ಅಂಗಡಿಗಳನ್ನು ಹೊಂದಿರುವ ಸಣ್ಣ FMCG ವಿತರಕರಿಗೆ. ಹಾರ್ಡ್‌ವೇರ್ ಮತ್ತು ಕಟ್ಟಡ ಸಾಮಗ್ರಿ ವ್ಯಾಪಾರಿಗಳು ಸಹ ಇದನ್ನು ಬಳಸಬಹುದು.",
  },
];

// Kannada home page. Have a native Kannada speaker review before the Bangalore event.
export default function KannadaHome() {
  return (
    <div lang="kn">
      <section>
        <Badge tone="accent">{LAUNCH}ರಲ್ಲಿ ಬಿಡುಗಡೆ</Badge>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">
          ಬೋಲ್‌ಕ್ಯಾಶ್ — ಭಾರತದ FMCG ವಿತರಕರಿಗಾಗಿ ಖಾತಾ ಆ್ಯಪ್
        </h1>
        <p className="mt-3 text-lg text-muted">{tagline}</p>
        <div className="mt-5">
          <Button href="#waitlist">ವೇಟ್‌ಲಿಸ್ಟ್‌ಗೆ ಸೇರಿ</Button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">ಇದು ಯಾರಿಗೆ</h2>
        <p className="mt-3 text-lg">
          1–4 ಬೀಟ್‌ಗಳು ಮತ್ತು 80–300 ಚಿಲ್ಲರೆ ಅಂಗಡಿಗಳನ್ನು ಹೊಂದಿರುವ ಸಣ್ಣ FMCG ವಿತರಕರಿಗೆ.
        </p>
        <ul className="mt-3 space-y-2">
          <li>
            <strong>ಹಾರ್ಡ್‌ವೇರ್ ಮತ್ತು ಕಟ್ಟಡ ಸಾಮಗ್ರಿ ವ್ಯಾಪಾರಿಗಳು:</strong> ನಿಮ್ಮ ಗ್ರಾಹಕರ ದಾಖಲೆಗಳನ್ನು
            ನಿರ್ವಹಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಆದಾಯ ಮತ್ತು ಖರ್ಚುಗಳನ್ನು ದಾಖಲಿಸಿ.
          </li>
          <li>
            <strong>ಕಿರಾಣಿ ಅಂಗಡಿಗಳು:</strong> ನಿಮ್ಮ ಗ್ರಾಹಕರ ದಾಖಲೆಗಳು ಮತ್ತು ನಿಮ್ಮ ಆದಾಯ ಮತ್ತು
            ಖರ್ಚುಗಳನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಇರಿಸಿ.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">ಬೋಲ್‌ಕ್ಯಾಶ್ ಏನು ಮಾಡುತ್ತದೆ</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <FeatureCard title="ಬೀಟ್ / ರೂಟ್ ಲೆಡ್ಜರ್">
            ಪ್ರತಿ ಬೀಟ್‌ಗೆ ಒಂದು ಲೆಡ್ಜರ್. ಸಿಬ್ಬಂದಿಗೆ ತಮ್ಮದೇ ಬೀಟ್ ಮಾತ್ರ ಕಾಣುತ್ತದೆ.
          </FeatureCard>
          <FeatureCard title="ಬೀಟ್ ಕಲೆಕ್ಷನ್">
            ಯಾರು ಪಾವತಿಸಿದ್ದಾರೆ, ಯಾವ ಬಿಲ್‌ಗೆ, ಮತ್ತು ಇನ್ನೂ ಎಷ್ಟು ಬಾಕಿ ಇದೆ ಎಂದು ದಾಖಲಿಸಿ.
          </FeatureCard>
          <FeatureCard title="ದಿನದ ಮುಕ್ತಾಯ">
            ದಿನದ ಕೊನೆಯಲ್ಲಿ ನಗದು, UPI, ನೀಡಿದ ಕ್ರೆಡಿಟ್ ಮತ್ತು ಸಂಗ್ರಹಿಸಿದ ಕ್ರೆಡಿಟ್ ಹೊಂದಾಣಿಕೆ ಮಾಡಿ.
          </FeatureCard>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">ವಿತರಕರು ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು</h2>
        <div className="mt-4 space-y-6">
          {FAQ_KN.map((f) => (
            <div key={f.question}>
              <h3 className="text-lg font-semibold">{f.question}</h3>
              <p className="mt-1 text-muted">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="mt-12 scroll-mt-20 rounded-lg bg-surface-2 p-6">
        <h2 className="text-2xl font-bold">ವೇಟ್‌ಲಿಸ್ಟ್‌ಗೆ ಸೇರಿ</h2>
        <p className="mt-2 text-muted">
          ಬೋಲ್‌ಕ್ಯಾಶ್ {LAUNCH}ರಲ್ಲಿ ಬಿಡುಗಡೆಯಾದಾಗ ನಿಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸುತ್ತೇವೆ.
        </p>
        <div className="mt-4">
          <WaitlistForm source="kn" text={WAITLIST_TEXT_KN} />
          <noscript>
            <p className="mt-3 font-semibold">
              ವೇಟ್‌ಲಿಸ್ಟ್‌ಗೆ ಸೇರಲು ದಯವಿಟ್ಟು JavaScript ಅನ್ನು ಆನ್ ಮಾಡಿ.
            </p>
          </noscript>
        </div>
        <p className="mt-4 text-sm text-muted">
          ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಬಿಡುಗಡೆಯ ಬಗ್ಗೆ ಸಂಪರ್ಕಿಸಲು ಮಾತ್ರ ಬಳಸುತ್ತೇವೆ.
        </p>
        <Link
          href="/privacy/"
          className="inline-flex min-h-11 items-center text-sm text-muted underline"
        >
          ಗೌಪ್ಯತಾ ನೀತಿ
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">ಬೋಲ್‌ಕ್ಯಾಶ್ ಏನು ಮಾಡುವುದಿಲ್ಲ</h2>
        <p className="mt-3 text-lg">
          ಬ್ಯಾಂಕ್ ಲಾಗಿನ್ ಇಲ್ಲ. ಹಣದ ಚಲನೆ ಇಲ್ಲ. ನಿಮ್ಮ ಡೇಟಾ ಮತ್ತು ರಫ್ತು ಯಾವಾಗಲೂ ಉಚಿತ.
        </p>
      </section>
    </div>
  );
}
