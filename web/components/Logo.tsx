import Image from "next/image";

/**
 * Bolcash logo, the same as the app's login screen: the saffron B
 * from an open ledger with ₹ in the lower bowl, speech bubble on top,
 * and the "Bolcash" wordmark. Transparent PNG, works on light and dark.
 */
export function Logo() {
  return (
    <Image
      src="/bolcash-logo.png"
      alt="Bolcash"
      width={800}
      height={261}
      className="h-9 w-auto"
      priority
    />
  );
}
