/**
 * The command surface, transcribed from `hollow <verb> -h` against v1.0.1.
 *
 * Every flag below appears in the binary's own usage output. Nothing is
 * inferred from what a DNS tool "should" have. Go's flag package accepts both
 * `-flag` and `--flag`; the site writes the double-dash form throughout because
 * that is what the README uses.
 */

export type Flag = {
  /** Flag name without dashes. */
  name: string;
  /** Value placeholder, or null for a boolean flag. */
  arg: string | null;
  /** The description the binary prints, verbatim. */
  description: string;
  /** Default value as the binary reports it, or null when it prints none. */
  default: string | null;
};

export type Command = {
  slug: string;
  name: string;
  /** The usage line the binary prints. */
  usage: string[];
  /** One-line summary, taken from `hollow help`. */
  summary: string;
  /** Longer editorial description, grounded in the source. */
  description: string;
  flags: Flag[];
};

export const commands: Command[] = [
  {
    slug: "resolve",
    name: "resolve",
    usage: ["hollow resolve [flags] <name> [type]"],
    summary: "resolve a name from the root servers",
    description:
      "Walks from the IANA root servers down to the authoritative nameserver and prints the reply in dig-style presentation format. The type defaults to A. With --server it skips the walk and asks one server directly, which is the only mode where the delegation path is not checked.",
    flags: [
      {
        name: "dns0x20",
        arg: null,
        description:
          "randomise the case of the query name, and refuse a reply that does not echo it",
        default: "true",
      },
      {
        name: "hints",
        arg: "string",
        description:
          "root hints in named.root format; default is the compiled-in list",
        default: null,
      },
      {
        name: "json",
        arg: null,
        description: "output reply as JSON",
        default: null,
      },
      {
        name: "port",
        arg: "uint",
        description: "port to query",
        default: "53",
      },
      {
        name: "server",
        arg: "string",
        description: "ask this server directly instead of resolving from the root",
        default: null,
      },
      {
        name: "tcp",
        arg: null,
        description: "query over TCP instead of falling back to it",
        default: null,
      },
      {
        name: "timeout",
        arg: "duration",
        description: "deadline for one exchange with one server",
        default: "3s",
      },
      {
        name: "trace",
        arg: null,
        description: "show the delegation path as it is walked",
        default: null,
      },
    ],
  },
  {
    slug: "trace",
    name: "trace",
    usage: ["hollow trace [flags] <name> [type]"],
    summary: "draw the delegation path the resolver walked",
    description:
      "Resolves through the same code path as resolve and renders the delegation chain that walk actually took. Every line comes from a step the resolver emitted as it sent the packet, so a trace and a resolve cannot disagree about what happened.",
    flags: [
      {
        name: "ascii",
        arg: null,
        description:
          "draw the tree with ASCII instead of box-drawing characters",
        default: null,
      },
      {
        name: "cache",
        arg: null,
        description:
          "cache within this one walk, so a CNAME chain reuses the delegations it already found",
        default: null,
      },
      {
        name: "dns0x20",
        arg: null,
        description:
          "randomise the case of the query name, and refuse a reply that does not echo it",
        default: "true",
      },
      {
        name: "hints",
        arg: "string",
        description:
          "root hints in named.root format; default is the compiled-in list",
        default: null,
      },
      {
        name: "json",
        arg: null,
        description: "output the steps as JSON",
        default: null,
      },
      {
        name: "port",
        arg: "uint",
        description: "port to query",
        default: "53",
      },
      {
        name: "timeout",
        arg: "duration",
        description: "deadline for one exchange with one server",
        default: "3s",
      },
    ],
  },
  {
    slug: "inspect",
    name: "inspect",
    usage: [
      "hollow inspect [flags] <name> [type]",
      "hollow inspect --file <message>",
    ],
    summary: "dump the reply octet by octet, annotated",
    description:
      "Prints every octet of a reply with the field the decoder read it as. Compression pointers are resolved to their target offset and to the name they expand to. The annotation column comes from the same parser the resolver uses, so a region nobody can name fails a test rather than being skipped over.",
    flags: [
      {
        name: "file",
        arg: "string",
        description:
          "read the message from this file instead of sending a query",
        default: null,
      },
      {
        name: "hints",
        arg: "string",
        description:
          "root hints in named.root format; default is the compiled-in list",
        default: null,
      },
      {
        name: "port",
        arg: "uint",
        description: "port to query",
        default: "53",
      },
      {
        name: "server",
        arg: "string",
        description: "ask this server directly instead of resolving from the root",
        default: null,
      },
      {
        name: "tcp",
        arg: null,
        description: "query over TCP instead of falling back to it",
        default: null,
      },
      {
        name: "timeout",
        arg: "duration",
        description: "deadline for one exchange with one server",
        default: "3s",
      },
    ],
  },
  {
    slug: "serve",
    name: "serve",
    usage: ["hollow serve [flags]"],
    summary: "answer DNS on 127.0.0.1:15353, udp and tcp",
    description:
      "Runs the caching, filtering DNS server on UDP and TCP at once. The default address needs no privileges. Blocklists load once at startup, and the control socket that stats and dash attach to is opt-in: nothing extra binds without --control.",
    flags: [
      {
        name: "addr",
        arg: "string",
        description: "address to listen on, UDP and TCP",
        default: '"127.0.0.1:15353"',
      },
      {
        name: "allow",
        arg: "value",
        description:
          "allowlist file in the same formats, overriding every block; repeatable",
        default: null,
      },
      {
        name: "block",
        arg: "value",
        description:
          "blocklist file in hosts, domain-per-line or adblock format; repeatable",
        default: null,
      },
      {
        name: "block-mode",
        arg: "string",
        description: "how a blocked name is answered: nxdomain, null or nodata",
        default: '"nxdomain"',
      },
      {
        name: "cache-size",
        arg: "int",
        description: "answers to hold in the cache; 0 disables caching",
        default: "100000",
      },
      {
        name: "control",
        arg: "string",
        description:
          "address for the control socket that hollow stats and hollow dash attach to, for example 127.0.0.1:15354",
        default: null,
      },
      {
        name: "dns0x20",
        arg: null,
        description:
          "randomise the case of each outgoing query name, and refuse a reply that does not echo it",
        default: "true",
      },
      {
        name: "forward",
        arg: "value",
        description:
          "resolve by asking this server instead of walking from the root; repeatable, tried in order",
        default: null,
      },
      {
        name: "hints",
        arg: "string",
        description:
          "root hints in named.root format; default is the compiled-in list",
        default: null,
      },
      {
        name: "rrl",
        arg: "int",
        description:
          "responses per second to one client network before rate limiting starts; 0 disables",
        default: "20",
      },
      {
        name: "rrl-slip",
        arg: "int",
        description:
          "answer every Nth rate-limited response truncated instead of dropping it; 0 drops them all",
        default: "2",
      },
      {
        name: "rrl-trusted",
        arg: "value",
        description:
          "network exempt from rate limiting; repeatable, and replaces the loopback default",
        default: null,
      },
      {
        name: "serve-stale",
        arg: "duration",
        description:
          "how long past expiry an answer may still be served when resolution fails; 0 disables",
        default: null,
      },
      {
        name: "timeout",
        arg: "duration",
        description: "deadline for answering one query",
        default: "5s",
      },
      {
        name: "verbose",
        arg: null,
        description: "log every query answered",
        default: null,
      },
      {
        name: "workers",
        arg: "int",
        description: "size of the UDP worker pool",
        default: "64",
      },
    ],
  },
  {
    slug: "stats",
    name: "stats",
    usage: ["hollow stats [flags]"],
    summary: "ask a running server what it has been doing",
    description:
      "Takes one snapshot over the control socket and prints it. Every control socket command reads and none change behaviour, which is what makes an unauthenticated loopback port defensible.",
    flags: [
      {
        name: "json",
        arg: null,
        description: "print the snapshot as JSON",
        default: null,
      },
      {
        name: "target",
        arg: "string",
        description: "control socket of the server to ask",
        default: '"127.0.0.1:15354"',
      },
      {
        name: "timeout",
        arg: "duration",
        description: "deadline for the whole exchange",
        default: "5s",
      },
    ],
  },
  {
    slug: "dash",
    name: "dash",
    usage: ["hollow dash [flags]"],
    summary: "watch a running server on a live dashboard",
    description:
      "Attaches to a running server over the control socket and redraws on a timer. There is no keyboard interaction and no raw mode on any platform, which is what lets the dashboard run without touching terminal state beyond the alternate screen and the cursor.",
    flags: [
      {
        name: "ascii",
        arg: null,
        description: "draw with ASCII instead of box-drawing characters",
        default: null,
      },
      {
        name: "height",
        arg: "int",
        description: "frame height; default is $LINES, then 30",
        default: null,
      },
      {
        name: "interval",
        arg: "duration",
        description: "how often to redraw, and how often to ask for a snapshot",
        default: "500ms",
      },
      {
        name: "plain",
        arg: null,
        description:
          "append a frame per interval instead of redrawing in place, and write no escape sequences",
        default: null,
      },
      {
        name: "target",
        arg: "string",
        description: "control socket of the server to watch",
        default: '"127.0.0.1:15354"',
      },
      {
        name: "width",
        arg: "int",
        description: "frame width; default is $COLUMNS, then 100",
        default: null,
      },
    ],
  },
];

export function commandBySlug(slug: string): Command | undefined {
  return commands.find((c) => c.slug === slug);
}

/**
 * Exit codes, from the constants in internal/cli/resolve.go. They are part of
 * the command-line contract, so a script can tell a name that does not exist
 * from a resolver that could not find out.
 */
export const exitCodes = [
  {
    code: 0,
    name: "ExitOK",
    meaning: "An answer. The reply carried rcode NOERROR.",
  },
  {
    code: 1,
    name: "ExitNXDomain",
    meaning:
      "The name does not exist. The reply carried rcode NXDOMAIN, which is an answer rather than a failure.",
  },
  {
    code: 2,
    name: "ExitFailure",
    meaning:
      "Operational failure: a bad flag, an unparseable name, a resolution that could not complete, or any rcode other than the two above.",
  },
];
