import type { Section } from '../../../lib/types';

export const SECTION_NETWORK_LAYER: Section = {
  id: 'network-layer',
  title: 'OSI Layer 3 – The Network Layer',
  icon: '🌐',
  unlockAfter: 'transport-layer',
  lessons: [
    // ─────────────────────────────────────────────────────────
    // Lesson 1 – Layer 3 & The Role of the Router
    // ─────────────────────────────────────────────────────────
    {
      id: 's4l1',
      title: 'Layer 3 & The Router',
      icon: '🗺️',
      questions: [
        {
          type: 'teach',
          title: 'The Navigator of the Network',
          body: 'Layer 3 — the Network layer — is responsible for logical addressing and routing packets between networks. While Layer 2 moves frames within a single network, Layer 3 moves packets between different networks.\n\nThe key Layer 3 device is the router. A router inspects the destination IP address in every incoming packet and uses its routing table to decide where to forward it next.',
        },
        {
          type: 'teach',
          title: 'Routers Separate Broadcast Domains',
          body: 'Every router interface creates a separate network and a separate broadcast domain. Broadcasts sent on one network do not cross a router — this is a fundamental design principle.\n\nSwitches extend a single broadcast domain; routers divide them. This is why large flat networks are replaced with routed segments as they grow — to contain broadcast traffic and improve performance.',
        },
        {
          type: 'mcq',
          question: 'At which OSI layer does a router primarily operate?',
          choices: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
          answer: 'Layer 3',
        },
        {
          type: 'mcq',
          question: 'What does a router use to make packet-forwarding decisions?',
          choices: ['MAC address table', 'ARP cache', 'Routing table', 'VLAN database'],
          answer: 'Routing table',
        },
        {
          type: 'tf',
          question: 'A router forwards broadcast traffic between connected networks by default.',
          answer: false,
          explanation: 'By default, routers do not forward broadcast traffic. Each router interface defines a separate broadcast domain, containing broadcasts within each network.',
        },
        {
          type: 'mcq',
          question: 'Which of the following best describes the function of the Network layer?',
          choices: [
            'Converts bits to electrical signals',
            'Provides logical addressing and routes packets between networks',
            'Establishes end-to-end connections between applications',
            'Formats data for display in a browser',
          ],
          answer: 'Provides logical addressing and routes packets between networks',
        },
        {
          type: 'tf',
          question: 'Each interface on a router is in the same broadcast domain.',
          answer: false,
          explanation: 'Each router interface defines a separate broadcast domain. Routers segment networks, which is the opposite of a switch, which extends a single broadcast domain.',
        },
        {
          type: 'fill',
          question: 'The Layer 3 PDU is called a ________.',
          answer: 'packet',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 2 – IPv4 Packet Structure
    // ─────────────────────────────────────────────────────────
    {
      id: 's4l2',
      title: 'IPv4 Packet Structure',
      icon: '📦',
      questions: [
        {
          type: 'teach',
          title: 'Anatomy of an IPv4 Packet',
          body: 'An IPv4 packet has a header and a payload. The minimum header size is 20 bytes. Key fields you must know for the CCNA exam:\n\nTTL (Time to Live) — prevents packets looping forever. Decremented by 1 at each router hop. When it hits 0 the packet is discarded.\nProtocol — identifies the upper-layer protocol: 1=ICMP, 6=TCP, 17=UDP.\nSource IP / Destination IP — 32-bit logical addresses identifying sender and receiver.',
        },
        {
          type: 'teach',
          title: 'TTL — The Packet\'s Expiry Date',
          body: 'The TTL field is set by the sending host (Windows defaults to 128; Linux/macOS defaults to 64). Every router that forwards the packet decrements TTL by 1. If TTL reaches 0, the router discards the packet and sends an ICMP "Time Exceeded" message back to the source.\n\nThis is the mechanism traceroute exploits — it sends packets with progressively increasing TTL values (1, 2, 3…) to map each router hop along the path.',
        },
        {
          type: 'mcq',
          question: 'What is the minimum size of an IPv4 header?',
          choices: ['8 bytes', '16 bytes', '20 bytes', '40 bytes'],
          answer: '20 bytes',
        },
        {
          type: 'mcq',
          question: 'What does the Protocol field value of 6 indicate in an IPv4 header?',
          choices: ['ICMP', 'UDP', 'TCP', 'OSPF'],
          answer: 'TCP',
        },
        {
          type: 'mcq',
          question: 'What does the Protocol field value of 17 indicate in an IPv4 header?',
          choices: ['TCP', 'ICMP', 'GRE', 'UDP'],
          answer: 'UDP',
        },
        {
          type: 'tf',
          question: 'The TTL field in an IPv4 packet is decremented by 1 at each router hop.',
          answer: true,
          explanation: 'Each router that forwards an IPv4 packet decrements the TTL by 1. When TTL reaches 0, the packet is dropped and an ICMP Time Exceeded message is sent to the source.',
        },
        {
          type: 'fill',
          question: 'In an IPv4 header, the Protocol field value of ________ indicates ICMP.',
          answer: '1',
        },
        {
          type: 'mcq',
          question: 'What happens when an IPv4 packet\'s TTL reaches 0 at a router?',
          choices: [
            'The router resets the TTL to 255 and continues forwarding',
            'The router discards the packet and sends an ICMP Time Exceeded message to the source',
            'The router delivers the packet to the nearest host',
            'The router requests a new TTL from the source',
          ],
          answer: 'The router discards the packet and sends an ICMP Time Exceeded message to the source',
        },
        {
          type: 'wordbank',
          question: 'Match each IPv4 Protocol field value to the correct protocol:',
          bank: ['ICMP', 'TCP', 'UDP', '1', '6', '17'],
          answer: ['1', 'ICMP', '6', 'TCP', '17', 'UDP'],
          explanation: 'Protocol 1 = ICMP, Protocol 6 = TCP, Protocol 17 = UDP.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 3 – ICMP: The Network Messenger
    // ─────────────────────────────────────────────────────────
    {
      id: 's4l3',
      title: 'ICMP – The Network Messenger',
      icon: '📨',
      questions: [
        {
          type: 'teach',
          title: 'What is ICMP?',
          body: 'ICMP (Internet Control Message Protocol) is a Layer 3 protocol used for network diagnostics and error reporting. It is encapsulated directly in an IP packet (Protocol field = 1).\n\nICMP is not used to carry application data — it exists purely to report problems and test reachability. The two tools you will use constantly as a network engineer are built on ICMP: ping and traceroute.',
        },
        {
          type: 'teach',
          title: 'Ping and Traceroute',
          body: 'Ping uses ICMP Echo Request (Type 8) and Echo Reply (Type 0). The source sends an Echo Request; if the destination is reachable it replies with an Echo Reply. Round-trip time is measured.\n\nTraceroute works by sending packets with increasing TTL values (1, 2, 3…). Each router along the path discards the packet when TTL hits 0 and sends back an ICMP Time Exceeded (Type 11) message — revealing its IP address. This maps the full path hop-by-hop.',
        },
        {
          type: 'mcq',
          question: 'Which protocol does the ping command use?',
          choices: ['TCP', 'UDP', 'ICMP', 'ARP'],
          answer: 'ICMP',
        },
        {
          type: 'mcq',
          question: 'What ICMP message type is sent as part of a ping request?',
          choices: ['Type 0 – Echo Reply', 'Type 3 – Destination Unreachable', 'Type 8 – Echo Request', 'Type 11 – Time Exceeded'],
          answer: 'Type 8 – Echo Request',
        },
        {
          type: 'tf',
          question: 'ICMP is a Layer 4 protocol used by TCP to report errors.',
          answer: false,
          explanation: 'ICMP is a Layer 3 protocol. It is encapsulated directly in an IP packet (Protocol = 1). It is independent of TCP and UDP.',
        },
        {
          type: 'mcq',
          question: 'Which ICMP message type does traceroute rely on to discover router hops?',
          choices: [
            'Type 0 – Echo Reply',
            'Type 8 – Echo Request',
            'Type 3 – Destination Unreachable',
            'Type 11 – Time Exceeded',
          ],
          answer: 'Type 11 – Time Exceeded',
        },
        {
          type: 'tf',
          question: 'A successful ping generates both an ICMP Echo Request and an ICMP Echo Reply.',
          answer: true,
          explanation: 'The source sends an ICMP Echo Request (Type 8). If the destination is reachable, it replies with an ICMP Echo Reply (Type 0).',
        },
        {
          type: 'fill',
          question: 'ICMP stands for Internet Control Message ________.',
          answer: 'Protocol',
        },
        {
          type: 'mcq',
          question: 'What ICMP message would you receive if you ping a host that does not exist on a remote network?',
          choices: [
            'Type 0 – Echo Reply',
            'Type 3 – Destination Unreachable',
            'Type 8 – Echo Request',
            'Type 11 – Time Exceeded',
          ],
          answer: 'Type 3 – Destination Unreachable',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 4 – Routing Table Basics
    // ─────────────────────────────────────────────────────────
    {
      id: 's4l4',
      title: 'Routing Table Basics',
      icon: '📋',
      questions: [
        {
          type: 'teach',
          title: 'The Router\'s Spell Book',
          body: 'A router\'s routing table is its decision-making map — a list of known networks and how to reach them. Each entry contains: the destination network, the subnet mask (or prefix length), the next-hop IP address or exit interface, and a metric (cost).\n\nWhen a packet arrives, the router finds the best matching entry using the longest prefix match rule — the most specific route wins.',
        },
        {
          type: 'teach',
          title: 'Types of Routes',
          body: 'Routes in the table come from three sources:\n\nDirectly Connected (C) — networks attached to router interfaces, learned automatically when the interface comes up.\nStatic (S) — manually configured by an administrator.\nDynamic — learned automatically from other routers via routing protocols (RIP, OSPF, EIGRP).\n\nThe default route (0.0.0.0/0) is the gateway of last resort — used when no more specific route matches.',
        },
        {
          type: 'mcq',
          question: 'What Cisco IOS command displays the routing table?',
          choices: ['show mac address-table', 'show ip arp', 'show ip route', 'show interfaces'],
          answer: 'show ip route',
        },
        {
          type: 'mcq',
          question: 'In a Cisco routing table, what letter designates a directly connected route?',
          choices: ['S', 'D', 'C', 'R'],
          answer: 'C',
        },
        {
          type: 'tf',
          question: 'When multiple routes match a destination, the router always uses the route with the longest prefix (most specific match).',
          answer: true,
          explanation: 'The longest prefix match rule means the router picks the most specific route — the one with the highest prefix length (e.g. /28 beats /24 which beats /0).',
        },
        {
          type: 'mcq',
          question: 'What is the default route represented as in CIDR notation?',
          choices: ['255.255.255.255/32', '0.0.0.0/0', '127.0.0.0/8', '192.168.0.0/16'],
          answer: '0.0.0.0/0',
        },
        {
          type: 'fill',
          question: 'The default route is also known as the gateway of ________ resort.',
          answer: 'last',
        },
        {
          type: 'mcq',
          question: 'In a Cisco routing table, what letter designates a statically configured route?',
          choices: ['C', 'D', 'R', 'S'],
          answer: 'S',
        },
        {
          type: 'tf',
          question: 'A router can forward a packet even if no matching route exists in the routing table.',
          answer: false,
          explanation: 'If no matching route exists (including no default route), the router drops the packet. Without a routing table entry, the packet has no known path forward.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 5 – Section Review
    // ─────────────────────────────────────────────────────────
    {
      id: 's4l5',
      title: 'Section Review',
      icon: '🏆',
      questions: [
        {
          type: 'mcq',
          question: 'Which Layer 3 field prevents packets from looping indefinitely in a network?',
          choices: ['Protocol', 'Checksum', 'TTL', 'Fragment Offset'],
          answer: 'TTL',
        },
        {
          type: 'mcq',
          question: 'Which protocol does traceroute use to map router hops?',
          choices: ['TCP', 'UDP (Windows) / ICMP (Cisco/Linux)', 'ICMP', 'All of the above depending on OS'],
          answer: 'All of the above depending on OS',
          explanation: 'Windows tracert uses ICMP Echo Requests. Linux/macOS traceroute uses UDP by default. Cisco IOS uses ICMP. The underlying principle (TTL manipulation) is the same.',
        },
        {
          type: 'tf',
          question: 'The Protocol field value of 6 in an IPv4 header indicates UDP.',
          answer: false,
          explanation: 'Protocol 6 = TCP. Protocol 17 = UDP. Protocol 1 = ICMP.',
        },
        {
          type: 'mcq',
          question: 'What rule does a router apply when multiple routing table entries match a destination?',
          choices: [
            'Choose the route with the lowest metric only',
            'Choose the most recently added route',
            'Choose the route with the longest prefix match',
            'Choose the static route over all others',
          ],
          answer: 'Choose the route with the longest prefix match',
        },
        {
          type: 'fill',
          question: 'The minimum IPv4 header size is ________ bytes.',
          answer: '20',
        },
        {
          type: 'mcq',
          question: 'What happens when a router receives a packet with TTL = 1?',
          choices: [
            'The router forwards it and sets TTL to 0',
            'The router decrements TTL to 0, discards the packet, and sends an ICMP Time Exceeded to the source',
            'The router resets TTL to 255 and forwards the packet',
            'The router delivers the packet to the connected host',
          ],
          answer: 'The router decrements TTL to 0, discards the packet, and sends an ICMP Time Exceeded to the source',
        },
        {
          type: 'wordbank',
          question: 'Match each route code to its meaning in a Cisco routing table:',
          bank: ['C', 'S', 'Directly Connected', 'Static Route'],
          answer: ['C', 'Directly Connected', 'S', 'Static Route'],
        },
        {
          type: 'tf',
          question: 'ICMP Echo Request is Type 8; ICMP Echo Reply is Type 0.',
          answer: true,
          explanation: 'Correct. Ping sends Type 8 (Echo Request) and expects Type 0 (Echo Reply) back from the destination.',
        },
        {
          type: 'mcq',
          question: 'Which of the following is the "gateway of last resort"?',
          choices: ['A default route of 0.0.0.0/0', 'A host route of /32', 'A summary route of /8', 'A directly connected route'],
          answer: 'A default route of 0.0.0.0/0',
        },
      ],
    },
  ],
};
