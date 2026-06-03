import type { Section } from '../../../lib/types';

export const SECTION_ROUTING_FUNDAMENTALS: Section = {
  id: 'routing-fundamentals',
  title: 'Routing Fundamentals',
  icon: '🗺️',
  unlockAfter: 'device-management',
  lessons: [
    {
      id: 'l1',
      title: 'Administrative Distance',
      icon: '📊',
      questions: [
        {
          type: 'teach',
          title: 'What Is Administrative Distance?',
          body: 'When a router learns about the same destination from multiple sources (e.g. a static route and OSPF), it must decide which source to trust. Administrative Distance (AD) is a number from 0 to 255 that ranks trustworthiness — lower is more trusted. A connected interface has AD 0 (most trusted); a static route has AD 1; anything with AD 255 is considered unreachable and never used.',
        },
        {
          type: 'teach',
          title: 'Common AD Values You Must Know',
          body: 'The CCNA exam expects you to recall these AD values: Connected = 0, Static = 1, EIGRP (internal) = 90, OSPF = 110, RIP = 120. If a router has both an OSPF route and a RIP route to the same network, it installs the OSPF route (lower AD = more trusted). Only if all equal-AD routes agree does the metric break the tie.',
        },
        {
          type: 'mcq',
          question: 'Which routing source has the lowest (most trusted) administrative distance?',
          choices: [
            'Static route',
            'Connected interface',
            'OSPF',
            'EIGRP internal',
          ],
          answer: 'Connected interface',
        },
        {
          type: 'mcq',
          question: 'What is the default administrative distance of a static route?',
          choices: ['0', '1', '90', '110'],
          answer: '1',
        },
        {
          type: 'mcq',
          question: 'A router has an OSPF route and a RIP route to 10.0.0.0/8. Which does it install in the routing table?',
          choices: [
            'RIP route (AD 120)',
            'OSPF route (AD 110)',
            'Both routes via load balancing',
            'Neither — the conflict is flagged',
          ],
          answer: 'OSPF route (AD 110)',
        },
        {
          type: 'tf',
          question: 'A route with AD 255 will be installed in the routing table as a last-resort path.',
          answer: false,
          explanation: 'AD 255 means "untrusted / unreachable" — Cisco IOS never installs a route with AD 255 in the routing table. It is effectively a way to mark a route as unusable.',
        },
        {
          type: 'mcq',
          question: 'What is the default administrative distance of EIGRP internal routes?',
          choices: ['1', '90', '110', '120'],
          answer: '90',
        },
        {
          type: 'fill',
          question: 'The administrative distance of OSPF is _____.',
          answer: '110',
        },
        {
          type: 'tf',
          question: 'Administrative distance is used to compare routes learned from different routing protocols to the same destination.',
          answer: true,
          explanation: 'AD resolves conflicts between routing sources. Within a single protocol, the metric (not AD) is used to select the best path.',
        },
        {
          type: 'wordbank',
          question: 'Order these routing sources from most trusted (lowest AD) to least trusted (highest AD):',
          bank: ['RIP', 'OSPF', 'Static', 'EIGRP internal'],
          answer: ['Static', 'EIGRP internal', 'OSPF', 'RIP'],
        },
      ],
    },
    {
      id: 'l2',
      title: 'Static & Default Routes',
      icon: '➡️',
      questions: [
        {
          type: 'teach',
          title: 'Configuring Static Routes',
          body: 'A static route is a manually configured path to a destination network. The full syntax is: "ip route [destination-network] [subnet-mask] [next-hop-ip | exit-interface]". For example, "ip route 192.168.10.0 255.255.255.0 10.0.0.2" sends traffic for 192.168.10.0/24 to the next hop at 10.0.0.2. Static routes suit small, stable networks but do not adapt to topology changes automatically.',
        },
        {
          type: 'teach',
          title: 'Default Routes and Floating Static Routes',
          body: 'A default route matches all destinations not found elsewhere in the routing table — it is the gateway of last resort. Configure it with "ip route 0.0.0.0 0.0.0.0 [next-hop]". A floating static route has a deliberately high AD (e.g. 5) to remain inactive while a dynamic route exists, activating only if the dynamic route disappears — providing a backup path.',
        },
        {
          type: 'mcq',
          question: 'Which command adds a static route to 172.16.0.0/16 via next-hop 10.1.1.1?',
          choices: [
            'ip route 172.16.0.0 255.255.0.0 10.1.1.1',
            'ip route 172.16.0.0/16 10.1.1.1',
            'route add 172.16.0.0 255.255.0.0 10.1.1.1',
            'ip static-route 172.16.0.0 255.255.0.0 10.1.1.1',
          ],
          answer: 'ip route 172.16.0.0 255.255.0.0 10.1.1.1',
        },
        {
          type: 'mcq',
          question: 'What is the destination network and mask for a default route?',
          choices: [
            '0.0.0.0 0.0.0.0',
            '255.255.255.255 255.255.255.255',
            '0.0.0.0 255.255.255.255',
            '255.255.255.255 0.0.0.0',
          ],
          answer: '0.0.0.0 0.0.0.0',
        },
        {
          type: 'tf',
          question: 'A floating static route has a lower AD than the dynamic route it backs up.',
          answer: false,
          explanation: 'A floating static route has a HIGHER AD than the dynamic route it backs up. This ensures the dynamic route is preferred while it is active; the static route only becomes active if the dynamic route disappears.',
        },
        {
          type: 'mcq',
          question: 'A floating static route to 0.0.0.0/0 via 10.0.0.1 with AD 10 is configured alongside an OSPF default route. Which route is active?',
          choices: [
            'Floating static (AD 10)',
            'OSPF default (AD 110)',
            'Both, via load balancing',
            'Neither — conflicting defaults are dropped',
          ],
          answer: 'OSPF default (AD 110)',
        },
        {
          type: 'fill',
          question: 'The "gateway of last resort" is set by configuring a _____ route.',
          answer: 'default',
        },
        {
          type: 'mcq',
          question: 'Which command configures a default route via next-hop 203.0.113.1?',
          choices: [
            'ip route default 203.0.113.1',
            'ip route 0.0.0.0 0.0.0.0 203.0.113.1',
            'ip default-gateway 203.0.113.1',
            'ip route any any 203.0.113.1',
          ],
          answer: 'ip route 0.0.0.0 0.0.0.0 203.0.113.1',
        },
        {
          type: 'tf',
          question: 'Static routes automatically update when the network topology changes.',
          answer: false,
          explanation: 'Static routes are manually configured and remain in the table until manually removed, even if the next hop becomes unreachable. This is why dynamic routing protocols are preferred in large or frequently changing networks.',
        },
        {
          type: 'mcq',
          question: 'To create a floating static route that backs up an OSPF route (AD 110), what AD should you assign?',
          choices: ['1', '90', '111', '200'],
          answer: '111',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Routing Metrics',
      icon: '📏',
      questions: [
        {
          type: 'teach',
          title: 'What Is a Metric?',
          body: 'A metric is the value a routing protocol assigns to a path to indicate its desirability — lower metric = better path. AD compares routes from different protocols; metric compares routes within the same protocol. Each protocol uses different metric types: RIP uses hop count, OSPF uses cost (based on bandwidth), EIGRP uses a composite of bandwidth and delay, IS-IS uses cost.',
        },
        {
          type: 'teach',
          title: 'OSPF Cost and Equal-Cost Load Balancing',
          body: 'OSPF calculates cost as 100 Mbps / interface bandwidth. A FastEthernet interface (100 Mbps) has cost 1; a 10 Mbps Serial has cost 10. Lower cost = preferred path. If two OSPF paths to the same destination have equal cost, the router installs both and performs equal-cost load balancing (ECMP). EIGRP also supports ECMP and can even do unequal-cost load balancing with the "variance" command.',
        },
        {
          type: 'mcq',
          question: 'Which metric does RIP use to determine the best path?',
          choices: ['Bandwidth', 'Delay', 'Hop count', 'Cost'],
          answer: 'Hop count',
        },
        {
          type: 'mcq',
          question: 'OSPF calculates interface cost as a function of what?',
          choices: ['Hop count', 'Delay', 'Bandwidth', 'MTU'],
          answer: 'Bandwidth',
        },
        {
          type: 'tf',
          question: 'A higher OSPF cost indicates a more preferred path.',
          answer: false,
          explanation: 'In OSPF, a lower cost is better. Cost = reference bandwidth / interface bandwidth. Faster interfaces have lower cost and are therefore preferred.',
        },
        {
          type: 'mcq',
          question: 'What is the default OSPF cost of a FastEthernet (100 Mbps) interface?',
          choices: ['1', '10', '100', '1000'],
          answer: '1',
        },
        {
          type: 'mcq',
          question: 'EIGRP uses which two values in its default composite metric calculation?',
          choices: [
            'Hop count and delay',
            'Bandwidth and delay',
            'Cost and MTU',
            'Bandwidth and reliability',
          ],
          answer: 'Bandwidth and delay',
        },
        {
          type: 'tf',
          question: 'Equal-cost load balancing occurs when a routing protocol installs multiple routes to the same destination with the same metric.',
          answer: true,
          explanation: 'When multiple paths share the same metric, a router can install all of them and distribute traffic across them — this is equal-cost multipath (ECMP) load balancing.',
        },
        {
          type: 'fill',
          question: 'RIP\'s maximum hop count before a route is considered unreachable is _____.',
          answer: '15',
        },
        {
          type: 'mcq',
          question: 'Two OSPF routes to 192.168.1.0/24 exist: one via Gi0/0 (cost 1) and one via Se0/0 (cost 10). Which is installed?',
          choices: [
            'Serial route (cost 10)',
            'GigabitEthernet route (cost 1)',
            'Both, equal-cost load balanced',
            'Neither — costs must match',
          ],
          answer: 'GigabitEthernet route (cost 1)',
        },
      ],
    },
    {
      id: 'l4',
      title: 'Reading the Routing Table',
      icon: '🔍',
      questions: [
        {
          type: 'teach',
          title: 'show ip route — Understanding the Output',
          body: 'The command "show ip route" displays the routing table. Each entry starts with a one or two letter code: C = Connected, L = Local (host route), S = Static, O = OSPF, D = EIGRP, R = RIP, * = candidate default route. After the code you see the network/prefix, then "[AD/metric]" in square brackets, then the next-hop IP or exit interface.',
        },
        {
          type: 'teach',
          title: 'Longest Prefix Match',
          body: 'When a packet matches multiple routing table entries, the router always chooses the most specific (longest prefix) match — the entry with the highest subnet mask. A packet to 10.1.1.5 matches both 10.0.0.0/8 and 10.1.1.0/24 — the router uses 10.1.1.0/24 because /24 is more specific. If no specific match exists, the default route (0.0.0.0/0) is used as the gateway of last resort.',
        },
        {
          type: 'mcq',
          question: 'In a "show ip route" output, what does the code "O" indicate?',
          choices: [
            'A directly connected network',
            'A static route',
            'A route learned via OSPF',
            'A route learned via EIGRP',
          ],
          answer: 'A route learned via OSPF',
        },
        {
          type: 'mcq',
          question: 'A routing table entry shows "O 10.1.1.0/24 [110/2] via 192.168.1.1". What does 110 represent?',
          choices: ['The metric', 'The administrative distance', 'The OSPF area number', 'The VLAN ID'],
          answer: 'The administrative distance',
        },
        {
          type: 'mcq',
          question: 'A routing table entry shows "O 10.1.1.0/24 [110/2] via 192.168.1.1". What does 2 represent?',
          choices: ['The administrative distance', 'The metric', 'The hop count limit', 'The number of equal-cost paths'],
          answer: 'The metric',
        },
        {
          type: 'tf',
          question: 'The router uses the longest prefix match when selecting a route for an incoming packet.',
          answer: true,
          explanation: 'Longest prefix match means the most specific route wins. A /28 always beats a /24 for a destination that matches both, because /28 is more specific.',
        },
        {
          type: 'mcq',
          question: 'A router\'s table has entries for 10.0.0.0/8, 10.1.0.0/16, and 10.1.1.0/24. A packet destined for 10.1.1.100 matches which route?',
          choices: [
            '10.0.0.0/8',
            '10.1.0.0/16',
            '10.1.1.0/24',
            'The default route',
          ],
          answer: '10.1.1.0/24',
        },
        {
          type: 'mcq',
          question: 'What code in "show ip route" marks the gateway of last resort candidate?',
          choices: ['G', 'L', 'S', '*'],
          answer: '*',
        },
        {
          type: 'fill',
          question: 'The "show ip route" code for a directly connected network is _____.',
          answer: 'C',
        },
        {
          type: 'mcq',
          question: 'Which command shows the routing table entry for a specific prefix, e.g. 10.1.1.0/24?',
          choices: [
            'show ip route 10.1.1.0',
            'show route 10.1.1.0/24',
            'debug ip route 10.1.1.0',
            'show ip interface 10.1.1.0',
          ],
          answer: 'show ip route 10.1.1.0',
        },
      ],
    },
  ],
};
