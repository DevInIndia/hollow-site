/**
 * Real output, captured from the hollow binary.
 *
 * Every string in this file was produced by running the command named in its
 * `command` field against hollow v1.0.1 and pasting what the binary printed.
 * Nothing here is written from memory, reformatted or rounded. Timings and
 * addresses are whatever that particular run returned, which is why two blocks
 * for the same name can disagree about which server answered.
 */

export type Capture = {
  /** The command exactly as it was run. */
  command: string;
  /** Standard output, verbatim. */
  output: string;
};

export const resolveExample: Capture = {
  command: "hollow resolve example.com",
  output: `; <<>> hollow <<>> example.com. A
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 53913
;; flags: qr aa; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232

;; QUESTION SECTION:
;example.com.  IN  A

;; ANSWER SECTION:
example.com.  300  IN  A  172.66.147.243
example.com.  300  IN  A  104.20.23.154

;; Query time: 31 ms
;; SERVER: 2803:f800:50::6ca2:c0a2#53 (udp)
;; MSG SIZE  rcvd: 72`,
};

export const resolveMX: Capture = {
  command: "hollow resolve google.com MX",
  output: `; <<>> hollow <<>> google.com. MX
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 47540
;; flags: qr aa; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 5

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512

;; QUESTION SECTION:
;google.com.  IN  MX

;; ANSWER SECTION:
google.com.  300  IN  MX  10 smtp.google.com.

;; ADDITIONAL SECTION:
smtp.google.com.  300  IN  A     192.178.158.27
smtp.google.com.  300  IN  A     192.178.158.26
smtp.google.com.  300  IN  AAAA  2404:6800:4013:813::1a
smtp.google.com.  300  IN  AAAA  2404:6800:4013:813::1b

;; Query time: 80 ms
;; SERVER: 2001:4860:4802:38::a#53 (udp)
;; MSG SIZE  rcvd: 148`,
};

export const resolveJSON: Capture = {
  command: "hollow resolve --json example.com",
  output: `{
  "header": {
    "id": 32016,
    "opcode": "QUERY",
    "status": "NOERROR",
    "flags": "qr aa",
    "qr": true,
    "aa": true
  },
  "question": {
    "name": "example.com.",
    "type": "A",
    "class": "IN"
  },
  "answers": [
    {
      "name": "example.com.",
      "type": "A",
      "class": "IN",
      "ttl": 300,
      "data": "172.66.147.243"
    },
    {
      "name": "example.com.",
      "type": "A",
      "class": "IN",
      "ttl": 300,
      "data": "104.20.23.154"
    }
  ],
  "additional": [
    {
      "name": ".",
      "type": "OPT",
      "class": "CLASS1232",
      "ttl": 0,
      "data": "0 options"
    }
  ],
  "queryTimeMs": 159,
  "server": "162.159.44.228#53",
  "protocol": "udp",
  "sizeBytes": 72
}`,
};

/**
 * The walk itself. The `asked as` lines are DNS 0x20: the name that actually
 * went out on the wire, case-randomised per query, which the reply had to echo
 * exactly or be discarded.
 */
export const traceGithub: Capture = {
  command: "hollow trace www.github.com",
  output: `www.github.com. A

. (root)
+- 193.0.14.129:53                                       17ms  udp, referral, 839 B, 13 NS + 26 glue, 1 of 26 servers
   asked as WWW.GitHUB.com.
   com.
   +- c.gtld-servers.net. (192.26.92.30:53)              85ms  udp, referral, 310 B, 8 NS + 2 glue, 1 of 26 servers
      asked as wWw.gItHuB.cOm.
      github.com.
      +- ns-421.awsdns-52.com. (205.251.193.165:53)      35ms  udp, answer, 296 B, 1 of 2 servers
         asked as www.gIthuB.coM.

www.github.com. 3600 IN CNAME github.com.
github.com. 60 IN A 20.207.73.82

3 queries, 3 zones, 0 answers from cache, 136ms`,
};

/**
 * Every octet of a real reply, annotated by the same decoder the resolver uses.
 * The offsets are hexadecimal and the annotation column comes from the parser,
 * not from a legend.
 */
export const inspectExample: Capture = {
  command: "hollow inspect example.com",
  output: `;; 72 octets from [2803:f800:50::6ca2:c0a2]:53 over udp in 21.438ms

0000  85 ea                    ID 0x85ea
0002  84 00                    flags QR=1 opcode=0 AA=1 TC=0 RD=0 RA=0 AD=0 CD=0 rcode=0
0004  00 01                    QDCOUNT 1
0006  00 02                    ANCOUNT 2
0008  00 00                    NSCOUNT 0
000a  00 01                    ARCOUNT 1
000c  07 65 78 61 6d 70 6c 65  QNAME example.com. = "example" "com"
0014  03 63 6f 6d 00
0019  00 01                    QTYPE A (1)
001b  00 01                    QCLASS IN (1)
001d  c0 0c                    NAME example.com. = pointer to 0x000c
001f  00 01                    TYPE A (1)
0021  00 01                    CLASS IN (1)
0023  00 00 01 2c              TTL 300 seconds
0027  00 04                    RDLENGTH 4
0029  ac 42 93 f3              RDATA address 172.66.147.243
002d  c0 0c                    NAME example.com. = pointer to 0x000c
002f  00 01                    TYPE A (1)
0031  00 01                    CLASS IN (1)
0033  00 00 01 2c              TTL 300 seconds
0037  00 04                    RDLENGTH 4
0039  68 14 17 9a              RDATA address 104.20.23.154
003d  00                       NAME . = root, one zero octet
003e  00 29                    TYPE OPT (41)
0040  04 d0                    UDP size 1232 octets the sender will accept
0042  00 00 00 00              extended rcode and flags version 0, DO=0
0046  00 00                    RDLENGTH 0`,
};

export const statsText: Capture = {
  command: "hollow stats",
  output: `up 4m51s, 10 queries, 0 blocked, 0 upstream failures
cache: 6 hits, 4 misses, 60.0% hit rate, 4 entries, 0 served stale
latency: p50 0.00ms, p99 328ms
top names:
       6  example.com.
       2  cloudflare.com.
       1  wikipedia.org.
       1  www.github.com.
top clients:
      10  127.0.0.1`,
};

export const statsJSON: Capture = {
  command: "hollow stats --json",
  output: `{
  "uptime_ms": 298631,
  "queries_total": 10,
  "queries_blocked": 0,
  "cache_hits": 6,
  "cache_misses": 4,
  "cache_entries": 4,
  "stale_served": 0,
  "upstream_errors": 0,
  "latency_p50_ms": 0,
  "latency_p99_ms": 327.6103,
  "top_clients": [
    {
      "name": "127.0.0.1",
      "count": 10
    }
  ],
  "top_domains": [
    {
      "name": "example.com.",
      "count": 6
    },
    {
      "name": "cloudflare.com.",
      "count": 2
    },
    {
      "name": "wikipedia.org.",
      "count": 1
    },
    {
      "name": "www.github.com.",
      "count": 1
    }
  ],
  "top_blocked": [],
  "events_dropped": 0,
  "names_dropped": 0
}`,
};

/**
 * One frame of the dashboard, captured with `--plain` so the escape sequences
 * are left out and the frame can be pasted. Drawn at 118x24 against a server
 * started with a three-entry blocklist.
 */
export const dashFrame: Capture = {
  command:
    "hollow dash --plain --target 127.0.0.1:15374 --width 118 --height 24",
  output: `+- hollow --------------------------------------------------------------------------------- 127.0.0.1:15374  up 13s -+
| qps 0       cache 62.5%   blocked 42.9%   p50 0.00ms    p99 574ms                                                  |
| :.#........................                                                                                        |
+---------------------------------------------------------------------+----------------------------------------------+
| LIVE                                                                | TOP NAMES                                    |
| 18:03:26 127.0.0.1       A     NOERROR  example.com.              + |  1 example.com.                            4 |
| 18:03:26 127.0.0.1       A     blocked  tracker.example.org.        |  2 ads.example.net.                        2 |
| 18:03:26 127.0.0.1       A     NOERROR  wikipedia.org.            + |  3 cloudflare.com.                         2 |
| 18:03:26 127.0.0.1       A     blocked  doubleclick.net.            |  4 doubleclick.net.                        2 |
| 18:03:26 127.0.0.1       A     NOERROR  cloudflare.com.           + |  5 tracker.example.org.                    2 |
| 18:03:26 127.0.0.1       A     blocked  ads.example.net.            |  6 wikipedia.org.                          2 |
| 18:03:26 127.0.0.1       A     NOERROR  example.com.              + |                                              |
| 18:03:26 127.0.0.1       A     NOERROR  example.com.              + | TOP BLOCKED                                  |
| 18:03:26 127.0.0.1       A     blocked  tracker.example.org.        |  1 ads.example.net.                        2 |
| 18:03:25 127.0.0.1       A     NOERROR  wikipedia.org.              |  2 doubleclick.net.                        2 |
| 18:03:25 127.0.0.1       A     blocked  doubleclick.net.            |  3 tracker.example.org.                    2 |
| 18:03:25 127.0.0.1       A     NOERROR  cloudflare.com.             |                                              |
| 18:03:25 127.0.0.1       A     blocked  ads.example.net.            | CLIENTS                                      |
| 18:03:25 127.0.0.1       A     NOERROR  example.com.                |  1 127.0.0.1                              14 |
|                                                                     |                                              |
|                                                                     |                                              |
+---------------------------------------------------------------------+----------------------------------------------+
| cache 3 entries   stale 0   dropped 0   ^C quit                                                                    |
+--------------------------------------------------------------------------------------------------------------------+`,
};

/** `hollow help`, verbatim. */
export const helpText: Capture = {
  command: "hollow help",
  output: `hollow is a DNS toolkit built on the Go standard library alone.

usage:

\thollow resolve <name> [type]   resolve a name from the root servers
\thollow trace <name> [type]     draw the delegation path the resolver walked
\thollow inspect <name> [type]   dump the reply octet by octet, annotated
\thollow serve                   answer DNS on 127.0.0.1:15353, udp and tcp
\thollow stats                   ask a running server what it has been doing
\thollow dash                    watch a running server on a live dashboard

Run "hollow <command> -h" for the flags a command accepts.`,
};

/** The delegation header `--trace` prepends to a normal resolve. */
export const resolveTrace: Capture = {
  command: "hollow resolve --trace www.google.com",
  output: `;; (root)                   [2801:1b8:10::b]:53      udp referral in 224ms
;; com.                     [2001:503:eea3::30]:53   udp referral in 159ms
;; google.com.              [2001:4860:4802:34::a]:53 udp answer in 39ms
; <<>> hollow <<>> www.google.com. A
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 24596
;; flags: qr aa; QUERY: 1, ANSWER: 8, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512

;; QUESTION SECTION:
;www.google.com.  IN  A

;; ANSWER SECTION:
www.google.com.  300  IN  A  142.251.157.119
www.google.com.  300  IN  A  142.251.156.119
www.google.com.  300  IN  A  142.251.150.119
www.google.com.  300  IN  A  142.251.155.119
www.google.com.  300  IN  A  142.251.151.119
www.google.com.  300  IN  A  142.251.152.119
www.google.com.  300  IN  A  142.251.154.119
www.google.com.  300  IN  A  142.251.153.119

;; Query time: 39 ms
;; SERVER: 2001:4860:4802:34::a#53 (udp)
;; MSG SIZE  rcvd: 171`,
};
