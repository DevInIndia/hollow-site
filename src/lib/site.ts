/** Facts about the product that the whole site agrees on. */

export const site = {
  name: "hollow",
  /** Verified against the repository README. */
  version: "v1.0.1",
  repo: "https://github.com/DevInIndia/hollow",
  releases: "https://github.com/DevInIndia/hollow/releases",
  license: "MIT",
  tagline: "A zero-dependency DNS resolver and networking toolkit.",
  description:
    "hollow walks the root servers itself, filters what you ask it to, and shows every octet of its work. One static binary, four platforms, and an empty go.mod.",
  url: "https://hollow.dev",
} as const;

/** Install routes. All three are published in the repository README. */
export const install = {
  unix: "curl -fsSL https://raw.githubusercontent.com/DevInIndia/hollow/main/install.sh | sh",
  windows:
    "irm https://raw.githubusercontent.com/DevInIndia/hollow/main/install.ps1 | iex",
  go: "go install github.com/DevInIndia/hollow/cmd/hollow@latest",
  source: "go build ./cmd/hollow",
  docker:
    "docker build -t hollow . && docker run --rm -p 15353:15353/udp hollow",
} as const;

/**
 * Published release artifacts and their SHA-256 hashes, copied from the
 * reproducible-builds table in the README. Only the linux/amd64 row is gated by
 * `make verify`; the README says so and so does the site.
 */
export const artifacts = [
  {
    target: "linux/amd64",
    file: "hollow-linux-amd64",
    sha256:
      "dd3586d6a900deda5311556153661f4d38c9dc0b437ac5535a194b5fda605182",
    gated: true,
  },
  {
    target: "linux/arm64",
    file: "hollow-linux-arm64",
    sha256:
      "89388445e2ea0271edfab9b776665a0e84db7dc30dcc1ea6332a357a09869db1",
    gated: false,
  },
  {
    target: "darwin/arm64",
    file: "hollow-darwin-arm64",
    sha256:
      "483ac3a8be85ca787c09ffc48eab4603f0cfceba3d3bf619d6a14f9f93bfab26",
    gated: false,
  },
  {
    target: "windows/amd64",
    file: "hollow-windows-amd64.exe",
    sha256:
      "b24d69c0c6638f85705fa7fed596c3f22b0851573b8606fc9172bbca1482e574",
    gated: false,
  },
] as const;

/**
 * The limitations, restated from the README's Limitations section. The site
 * must never contradict this list or imply the opposite by omission, so it is
 * carried as data and rendered on more than one page.
 */
export const limitations = [
  {
    title: "DNSSEC is not implemented",
    body: "EDNS0 is present and the DO bit is decoded, but nothing is validated. A forged delegation from a compromised parent would not be detected. Half-done validation is worse than none, because a resolver reporting AD on evidence it did not check lies to everything downstream.",
  },
  {
    title: "The cache does not survive the process",
    body: "A restart starts cold.",
  },
  {
    title: "A forwarded answer is trusted absolutely",
    body: "Under --forward there is no delegation path to check, so choosing a forwarder is choosing whom to believe. No health checking either, so a dead first entry costs one timeout per query.",
  },
  {
    title: "Adblock $ options are honoured without their conditions",
    body: "Those blocks are broader than the rule asked for. Element hiding, @@ exceptions and regex rules are skipped and counted.",
  },
  {
    title: "Resource limits are global, not per client",
    body: "One client can occupy all 64 workers or all 256 connections. Rate limiting counts responses sent, not work done.",
  },
  {
    title: "0x20 protects the path, not the server at the end of it",
    body: "A compromised nameserver echoes the nonce correctly, and a short name carries little entropy.",
  },
  {
    title: "Blocklists load once, at startup",
    body: "No reload. Every control socket command reads and none change behaviour, which is what makes an unauthenticated loopback port defensible.",
  },
  {
    title: "The dashboard cannot read terminal size",
    body: "It does not notice a resize. Size comes from COLUMNS and LINES, then flags, then 100x30. No keyboard, because everything else needs raw mode.",
  },
  {
    title: "Not authoritative",
    body: "No zone file serving, no PTR from a local table.",
  },
] as const;

/** Bounds on one resolution, from internal/resolver/iterate.go. */
export const bounds = {
  maxDepth: 16,
  maxQueries: 64,
  maxCNAME: 8,
  ednsUDPSize: 1232,
} as const;
