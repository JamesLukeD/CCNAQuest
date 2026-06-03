import type { Section } from '../../../lib/types';

export const SECTION_DYNAMIC_ROUTING_PROTOCOLS: Section = {
  id: 'dynamic-routing-protocols',
  title: 'Dynamic Routing Protocols',
  icon: '📡',
  unlockAfter: 'routing-fundamentals',
  lessons: [
    {
      id: 'l1',
      title: 'Distance Vector vs Link State',
      icon: '⚖️',
      questions: [
        {
          type: 'teach',
          title: 'How Distance Vector Protocols Work',
          body: 'Distance vector protocols (RIP, EIGRP) share their entire routing table with directly connected neighbours at regular intervals — each router only knows the direction and distance to a destination, not the full topology. This "routing by rumour" is simple but can lead to slow convergence and routing loops, which is why mechanisms like split horizon, route poisoning, and holddown timers are needed.',
        },
        {
          type: 'teach',
          title: 'How Link State Protocols Work',
          body: 'Link state protocols (OSPF, IS-IS) flood link state advertisements (LSAs) throughout the network so every router builds an identical map of the entire topology. Each router then independently runs Dijkstra\'s SPF algorithm to calculate the shortest path to every destination. This leads to faster convergence and no routing loops, at the cost of more CPU and memory.',
        },
        {
          type: 'mcq',
          question: 'Which term describes the distance vector approach of sharing routing tables with neighbours?',
          choices: [
            'Link state flooding',
            'Routing by rumour',
            'SPF computation',
            'Topology discovery',
          ],
          answer: 'Routing by rumour',
        },
        {
          type: 'mcq',
          question: 'Which algorithm does OSPF use to calculate the shortest path?',
          choices: [
            'Bellman-Ford',
            'DUAL',
            'Dijkstra\'s SPF',
            'Spanning Tree',
          ],
          answer: 'Dijkstra\'s SPF',
        },
        {
          type: 'tf',
          question: 'Link state protocols flood topology information to all routers in the network, giving each router a complete map.',
          answer: true,
          explanation: 'In link state routing, each router generates LSAs describing its directly connected links and floods them to all other routers. Every router then runs SPF on this shared topology database independently.',
        },
        {
          type: 'mcq',
          question: 'Which feature prevents a distance vector router from advertising a route back out the interface it was learned on?',
          choices: [
            'Route poisoning',
            'Holddown timer',
            'Split horizon',
            'Triggered update',
          ],
          answer: 'Split horizon',
        },
        {
          type: 'tf',
          question: 'Distance vector protocols require more CPU and memory than link state protocols because they maintain a full topology database.',
          answer: false,
          explanation: 'It is the opposite — link state protocols maintain a full topology database and run SPF, demanding more CPU and memory. Distance vector protocols are simpler and lighter but converge more slowly.',
        },
        {
          type: 'mcq',
          question: 'Which two of the following are examples of distance vector protocols?',
          choices: [
            'OSPF and IS-IS',
            'RIP and EIGRP',
            'OSPF and EIGRP',
            'IS-IS and RIP',
          ],
          answer: 'RIP and EIGRP',
        },
        {
          type: 'fill',
          question: 'OSPF and IS-IS are examples of _____ state routing protocols.',
          answer: 'link',
        },
        {
          type: 'mcq',
          question: 'Which loop-prevention mechanism marks a route as unreachable (metric = infinity) so neighbours immediately discard it?',
          choices: [
            'Split horizon',
            'Route poisoning',
            'Holddown timer',
            'Triggered update',
          ],
          answer: 'Route poisoning',
        },
      ],
    },
    {
      id: 'l2',
      title: 'RIP',
      icon: '🔄',
      questions: [
        {
          type: 'teach',
          title: 'RIP Basics — Hop Count and Limitations',
          body: 'RIP (Routing Information Protocol) is a classful distance vector protocol that uses hop count as its metric, with a maximum of 15 hops — a destination 16 or more hops away is considered unreachable. RIP v1 is classful (no subnet mask in updates); RIP v2 supports classless routing with subnet masks and supports authentication. RIP sends full table updates every 30 seconds via broadcast (v1) or multicast 224.0.0.9 (v2).',
        },
        {
          type: 'teach',
          title: 'Configuring RIP v2',
          body: 'Enter RIP with "router rip", enable version 2 with "version 2", and advertise directly connected networks with "network [classful-address]". Disable automatic summarisation with "no auto-summary" — this is critical in classless networks since auto-summary can hide subnets. Verify with "show ip protocols" and "show ip route".',
        },
        {
          type: 'mcq',
          question: 'What is the maximum hop count RIP considers reachable?',
          choices: ['10', '15', '16', '255'],
          answer: '15',
        },
        {
          type: 'mcq',
          question: 'Which multicast address does RIP v2 use for routing updates?',
          choices: ['224.0.0.5', '224.0.0.9', '224.0.0.10', '255.255.255.255'],
          answer: '224.0.0.9',
        },
        {
          type: 'tf',
          question: 'RIP v1 includes the subnet mask in its routing updates.',
          answer: false,
          explanation: 'RIP v1 is a classful protocol and does not include subnet masks in updates. RIP v2 added support for subnet masks (VLSM) and multicast updates, making it classless.',
        },
        {
          type: 'mcq',
          question: 'How often does RIP send full routing table updates by default?',
          choices: ['10 seconds', '30 seconds', '90 seconds', '180 seconds'],
          answer: '30 seconds',
        },
        {
          type: 'mcq',
          question: 'Which command disables RIP\'s automatic summarisation to classful boundaries?',
          choices: ['no summary', 'no auto-summary', 'no classful', 'no summarize'],
          answer: 'no auto-summary',
        },
        {
          type: 'fill',
          question: 'The global configuration command to enter RIP routing mode is "router _____".',
          answer: 'rip',
        },
        {
          type: 'tf',
          question: 'RIP is well suited to large enterprise networks because it scales efficiently.',
          answer: false,
          explanation: 'RIP is limited to 15 hops, converges slowly, and sends full table updates every 30 seconds. It is only appropriate for small, simple networks. OSPF or EIGRP are used in enterprise environments.',
        },
        {
          type: 'mcq',
          question: 'A destination that is 16 hops away in a RIP network is treated as what?',
          choices: [
            'The maximum allowed path',
            'Unreachable (infinity)',
            'A candidate default route',
            'A floating static fallback',
          ],
          answer: 'Unreachable (infinity)',
        },
      ],
    },
    {
      id: 'l3',
      title: 'EIGRP Overview',
      icon: '⚡',
      questions: [
        {
          type: 'teach',
          title: 'EIGRP — The Hybrid Protocol',
          body: 'EIGRP (Enhanced Interior Gateway Routing Protocol) was originally Cisco-proprietary but is now an open standard (RFC 7868). It is often called a "hybrid" or "advanced distance vector" protocol because it uses the DUAL (Diffusing Update Algorithm) to guarantee loop-free paths and rapid convergence. EIGRP only sends updates when topology changes occur (partial updates), not full table updates every 30 seconds like RIP.',
        },
        {
          type: 'teach',
          title: 'EIGRP Successor and Feasible Successor',
          body: 'EIGRP stores the best path (successor) and optionally a pre-calculated backup path (feasible successor) in its topology table. The feasible successor is a neighbour whose advertised distance is less than the current feasible distance — this guarantee ensures the backup is loop-free. Switching to the feasible successor is near-instantaneous, making EIGRP convergence very fast.',
        },
        {
          type: 'mcq',
          question: 'What algorithm does EIGRP use to guarantee loop-free paths?',
          choices: ['Dijkstra\'s SPF', 'Bellman-Ford', 'DUAL', 'STP'],
          answer: 'DUAL',
        },
        {
          type: 'mcq',
          question: 'What is the administrative distance of an EIGRP internal route?',
          choices: ['1', '90', '110', '120'],
          answer: '90',
        },
        {
          type: 'tf',
          question: 'EIGRP sends full routing table updates every 30 seconds by default.',
          answer: false,
          explanation: 'EIGRP uses bounded, partial updates — it only sends updates when a topology change occurs and only to affected neighbours. This conserves bandwidth compared to RIP\'s periodic full-table broadcasts.',
        },
        {
          type: 'mcq',
          question: 'In EIGRP, what is the pre-calculated, guaranteed loop-free backup path called?',
          choices: ['Successor', 'Feasible successor', 'Backup route', 'Alternate path'],
          answer: 'Feasible successor',
        },
        {
          type: 'mcq',
          question: 'Which command enables EIGRP with autonomous system number 100?',
          choices: [
            'router eigrp 100',
            'eigrp as 100',
            'router eigrp autonomous-system 100',
            'enable eigrp 100',
          ],
          answer: 'router eigrp 100',
        },
        {
          type: 'tf',
          question: 'EIGRP is now an open standard and is no longer Cisco-proprietary.',
          answer: true,
          explanation: 'Cisco published EIGRP as an informational RFC (RFC 7868) in 2016, making it available for other vendors to implement. It was previously Cisco-proprietary.',
        },
        {
          type: 'fill',
          question: 'EIGRP\'s default composite metric uses bandwidth and _____ to calculate path cost.',
          answer: 'delay',
        },
        {
          type: 'mcq',
          question: 'What is the administrative distance of an EIGRP external route (redistributed from another protocol)?',
          choices: ['90', '110', '170', '200'],
          answer: '170',
        },
      ],
    },
    {
      id: 'l4',
      title: 'OSPF Overview',
      icon: '🔗',
      questions: [
        {
          type: 'teach',
          title: 'OSPF Areas and LSA Flooding',
          body: 'OSPF organises routers into areas to limit LSA flooding and reduce SPF recalculation overhead. Area 0 (the backbone) is mandatory — all other areas must connect to it directly or via a virtual link. Routers entirely within one area are internal routers; routers that connect two areas are Area Border Routers (ABRs). Using multiple areas improves scalability in large networks.',
        },
        {
          type: 'teach',
          title: 'DR/BDR Election and Neighbour States',
          body: 'On multi-access networks (e.g. Ethernet), OSPF elects a Designated Router (DR) and Backup Designated Router (BDR) to reduce LSA flooding — all other routers (DROther) only form full adjacencies with the DR and BDR. The router with the highest priority (default 1) wins; ties are broken by the highest router ID. A router ID is the highest loopback IP, or the highest active interface IP if no loopback exists.',
        },
        {
          type: 'mcq',
          question: 'Which OSPF area is the backbone and must exist in every OSPF network?',
          choices: ['Area 1', 'Area 0', 'Area 255', 'Area 100'],
          answer: 'Area 0',
        },
        {
          type: 'mcq',
          question: 'What is the administrative distance of OSPF?',
          choices: ['90', '100', '110', '120'],
          answer: '110',
        },
        {
          type: 'tf',
          question: 'In OSPF, all routers in the network must belong to Area 0.',
          answer: false,
          explanation: 'OSPF allows multiple areas. Routers do not all have to be in Area 0 — but all non-backbone areas must connect to Area 0, either directly or via a virtual link.',
        },
        {
          type: 'mcq',
          question: 'Which command enables OSPF with process ID 1 on a Cisco router?',
          choices: [
            'router ospf 1',
            'ospf process 1',
            'router ospf area 0',
            'enable ospf 1',
          ],
          answer: 'router ospf 1',
        },
        {
          type: 'mcq',
          question: 'On a multi-access Ethernet segment, what role does the OSPF Designated Router (DR) serve?',
          choices: [
            'It blocks redundant LSAs from flooding the entire network',
            'It acts as the gateway of last resort',
            'It performs SPF calculations on behalf of DROther routers',
            'It assigns router IDs to all neighbours',
          ],
          answer: 'It blocks redundant LSAs from flooding the entire network',
        },
        {
          type: 'tf',
          question: 'In OSPF DR/BDR elections, the router with the lowest priority wins.',
          answer: false,
          explanation: 'The router with the HIGHEST OSPF priority wins the DR election (default priority is 1). A priority of 0 means the router will never become DR or BDR.',
        },
        {
          type: 'fill',
          question: 'The OSPF router ID is determined by the highest _____ IP address if no explicit router ID is configured.',
          answer: 'loopback',
        },
        {
          type: 'mcq',
          question: 'What command advertises network 10.1.1.0/24 into OSPF area 0?',
          choices: [
            'network 10.1.1.0 255.255.255.0 area 0',
            'network 10.1.1.0 0.0.0.255 area 0',
            'ospf network 10.1.1.0/24 area 0',
            'network 10.1.1.0 area 0 /24',
          ],
          answer: 'network 10.1.1.0 0.0.0.255 area 0',
        },
      ],
    },
  ],
};
