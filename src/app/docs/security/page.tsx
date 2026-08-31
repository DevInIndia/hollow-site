export const metadata = {
  title: "Forgery Resistance & Rate Limiting",
  description: "DNS 0x20 case randomisation, crypto/rand transaction IDs, and Response Rate Limiting (RRL).",
};

export default function SecurityPage() {
  return (
    <div className="space-y-10">
      <div>
        <span className="eyebrow">Security</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Abuse & Forgery Resistance
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          hollow hardens iterative resolution against off-path spoofing and protects your server from being leveraged in DNS amplification attacks.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-ink">DNS 0x20 Case Randomisation</h2>
          <p className="text-xs text-muted leading-relaxed">
            Every outgoing recursive query randomly flips the 0x20 ASCII case bit on alphabet characters (e.g. <code className="font-mono text-ink">WWw.gitHub.COM.</code>).
            Authoritative servers preserve casing, and hollow rejects any response that fails to match the original nonce.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h2 className="text-lg font-medium text-ink">Connected Sockets & crypto/rand</h2>
          <p className="text-xs text-muted leading-relaxed">
            Transaction IDs are drawn from Go 1.24 <code className="font-mono text-ink">crypto/rand</code> (16 bits of entropy).
            UDP sockets are connected directly to the target nameserver address, so the operating system kernel discards spoofed datagrams from any other IP before the process reads them.
          </p>
          <div className="rounded-lg border border-line bg-raised p-4 font-mono text-xs text-ink">
            Total entropy: 16 (TxID) + ~16 (Ephemeral Port) + ~15 (0x20 Casing) = 34 to 51 bits
          </div>
        </section>

        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h2 className="text-lg font-medium text-ink">Response Rate Limiting (RRL)</h2>
          <p className="text-xs text-muted leading-relaxed">
            Mitigates DNS amplification attacks by tracking response rates per client subnet (/24 for IPv4 and /56 for IPv6).
            Responses exceeding <code className="font-mono text-ink">--rrl &lt;qps&gt;</code> are dropped.
            With <code className="font-mono text-ink">--rrl-slip 2</code>, every second rate-limited packet is answered with the Truncation (TC) flag set, allowing authentic clients to retry over TCP.
          </p>
        </section>
      </div>
    </div>
  );
}