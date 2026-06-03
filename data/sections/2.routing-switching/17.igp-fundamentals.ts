import type { Section } from '../../../lib/types';

export const SECTION_IGP_FUNDAMENTALS: Section = {
  id: 'igp-fundamentals',
  title: 'IGP – Interior Gateway Protocol Fundamentals',
  icon: '🏁',
  unlockAfter: 'connectivity-troubleshooting',
  lessons: [
    {
      id: 'l1',
      title: 'IGP vs EGP',
      icon: '🌐',
      questions: [
        {
          type: 'teach',
          title: 'Autonomous Systems and Protocol Classes',
          body: 'An Autonomous System (AS) is a collection of networks under a single administrative authority, identified by a 16-bit (or 32-bit) AS number. Interior Gateway Protocols (IGPs) route traffic within a single AS — examples include OSPF, EIGRP, and RIP. Exterior Gateway Protocols (EGPs) route traffic between different autonomous systems; BGP (Border Gateway Protocol) is the only EGP in use today and is the routing protocol of the internet.',
        },
        {
          type: 'teach',
          title: 'Choosing the Right IGP',
          body: 'For the CCNA, three IGPs matter: RIP (simple, small networks, hop-count metric, max 15 hops), EIGRP (Cisco/open standard, fast convergence, composite metric), and OSPF (open standard, link-state, scales to large networks, cost metric). OSPF is the most commonly deployed IGP in enterprise networks due to its scalability and vendor-neutral open standard.',
        },
        {
          type: 'mcq',
          question: 'Which protocol is the only Exterior Gateway Protocol (EGP) in widespread use today?',
          choices: ['OSPF', 'EIGRP', 'BGP', 'RIP'],
          answer: 'BGP',
        },
        {
          type: 'mcq',
          question: 'What is an Autonomous System (AS)?',
          choices: [
            'A single router with multiple routing protocols',
            'A collection of networks under a single administrative authority',
            'A group of OSPF areas',
            'A redundant pair of core switches',
          ],
          answer: 'A collection of networks under a single administrative authority',
        },
        {
          type: 'tf',
          question: 'IGPs are used to exchange routing information between different autonomous systems.',
          answer: false,
          explanation: 'IGPs route within a single AS. EGPs (specifically BGP) exchange routing information between different autonomous systems across the internet.',
        },
        {
          type: 'mcq',
          question: 'Which of the following is NOT an Interior Gateway Protocol?',
          choices: ['OSPF', 'EIGRP', 'BGP', 'RIP'],
          answer: 'BGP',
        },
        {
          type: 'tf',
          question: 'OSPF is an open-standard IGP that can be deployed on multi-vendor networks.',
          answer: true,
          explanation: 'OSPF is defined by IETF standards (RFC 2328 for OSPFv2) and is implemented by all major networking vendors, making it the most widely deployed enterprise IGP.',
        },
        {
          type: 'fill',
          question: 'BGP uses _____ system numbers to identify routing domains on the internet.',
          answer: 'autonomous',
        },
        {
          type: 'mcq',
          question: 'Which IGP is best suited for a large enterprise network requiring fast convergence and open-standard interoperability?',
          choices: ['RIP v2', 'EIGRP', 'OSPF', 'BGP'],
          answer: 'OSPF',
        },
        {
          type: 'mcq',
          question: 'RIP is classified as which type of routing protocol?',
          choices: ['Link state IGP', 'Distance vector IGP', 'Path vector EGP', 'Hybrid IGP'],
          answer: 'Distance vector IGP',
        },
      ],
    },
    {
      id: 'l2',
      title: 'OSPF Neighbour Relationships',
      icon: '🤝',
      questions: [
        {
          type: 'teach',
          title: 'OSPF Hello Packets and Timers',
          body: 'OSPF routers discover neighbours by sending Hello packets to multicast address 224.0.0.5. For two routers to become neighbours, Hello and Dead intervals must match, the Area ID must match, the subnet must match, and authentication (if configured) must match. The default Hello interval is 10 seconds on broadcast/point-to-point links; the Dead interval is 4× the Hello (40 seconds by default).',
        },
        {
          type: 'teach',
          title: 'OSPF Neighbour State Machine',
          body: 'OSPF neighbours progress through states: Down (no Hellos seen) → Init (Hello received but own RID not in it) → 2-Way (mutual Hello exchange; DR/BDR election occurs here) → ExStart (master/slave negotiation) → Exchange (DBD packets exchanged) → Loading (LSR/LSU/LSAck exchange) → Full (databases synchronised, fully adjacent). DROther routers on broadcast segments only reach Full with the DR and BDR, staying at 2-Way with each other.',
        },
        {
          type: 'mcq',
          question: 'Which multicast address do OSPF routers use to send Hello packets?',
          choices: ['224.0.0.9', '224.0.0.5', '224.0.0.10', '255.255.255.255'],
          answer: '224.0.0.5',
        },
        {
          type: 'mcq',
          question: 'What is the default OSPF Dead interval on a broadcast link?',
          choices: ['10 seconds', '20 seconds', '30 seconds', '40 seconds'],
          answer: '40 seconds',
        },
        {
          type: 'tf',
          question: 'Two OSPF routers with mismatched Hello intervals will still form a neighbour adjacency.',
          answer: false,
          explanation: 'OSPF Hello and Dead intervals must match on both sides for a neighbour relationship to form. A mismatch means routers will see each other\'s Hellos but will never progress beyond the Init state.',
        },
        {
          type: 'mcq',
          question: 'In which OSPF neighbour state does the DR/BDR election occur?',
          choices: ['Init', '2-Way', 'ExStart', 'Exchange'],
          answer: '2-Way',
        },
        {
          type: 'mcq',
          question: 'What does the OSPF "Full" state indicate?',
          choices: [
            'Hello packets have been exchanged',
            'The LSDB is synchronised — routers are fully adjacent',
            'DR/BDR election is complete',
            'The router has sent its first DBD packet',
          ],
          answer: 'The LSDB is synchronised — routers are fully adjacent',
        },
        {
          type: 'fill',
          question: 'The OSPF Hello packet is sent to multicast address 224.0.0._____.',
          answer: '5',
        },
        {
          type: 'tf',
          question: 'DROther routers on a broadcast segment reach the Full state with every other DROther router.',
          answer: false,
          explanation: 'DROther routers only form Full adjacencies with the DR and BDR. They remain in the 2-Way state with other DROther routers — this reduces the number of full adjacencies and LSA flooding on broadcast segments.',
        },
        {
          type: 'mcq',
          question: 'Which OSPF parameter mismatch would prevent neighbour adjacency from forming?',
          choices: [
            'Different router IDs',
            'Different OSPF process IDs',
            'Mismatched Area IDs',
            'Different reference bandwidths',
          ],
          answer: 'Mismatched Area IDs',
        },
      ],
    },
    {
      id: 'l3',
      title: 'OSPF Network Types',
      icon: '🕸️',
      questions: [
        {
          type: 'teach',
          title: 'Broadcast and Point-to-Point Network Types',
          body: 'OSPF assigns a network type to each interface that determines DR/BDR election and Hello/Dead timers. Broadcast (default on Ethernet): DR/BDR are elected; Hello = 10 s, Dead = 40 s. Point-to-point (default on Serial): no DR/BDR election needed since there are only two routers; Hello = 10 s, Dead = 40 s. Point-to-point is faster to converge because it skips the DR/BDR wait.',
        },
        {
          type: 'teach',
          title: 'NBMA Network Type',
          body: 'NBMA (Non-Broadcast Multi-Access) networks like Frame Relay have multiple routers but no native broadcast capability. The OSPF NBMA network type elects a DR/BDR but requires manual neighbour configuration with "neighbor [ip]". Alternatively, use "ip ospf network point-to-multipoint" to avoid DR/BDR election and manual neighbour statements. This is commonly tested on the CCNA for legacy WAN scenarios.',
        },
        {
          type: 'mcq',
          question: 'Which OSPF network type is the default on an Ethernet interface?',
          choices: ['Point-to-point', 'Broadcast', 'NBMA', 'Point-to-multipoint'],
          answer: 'Broadcast',
        },
        {
          type: 'mcq',
          question: 'On an OSPF point-to-point network type, is a DR/BDR elected?',
          choices: [
            'Yes, one DR and one BDR',
            'Yes, but only a DR',
            'No — DR/BDR election is skipped',
            'Only a BDR is elected',
          ],
          answer: 'No — DR/BDR election is skipped',
        },
        {
          type: 'tf',
          question: 'OSPF broadcast network type requires manual "neighbor" statements to discover adjacent routers.',
          answer: false,
          explanation: 'On broadcast networks (Ethernet), OSPF uses multicast Hellos (224.0.0.5) for dynamic neighbour discovery. Manual "neighbor" statements are only needed on NBMA network types.',
        },
        {
          type: 'mcq',
          question: 'Which OSPF network type is used by default on a Frame Relay serial interface?',
          choices: ['Broadcast', 'Point-to-point', 'NBMA', 'Point-to-multipoint'],
          answer: 'NBMA',
        },
        {
          type: 'mcq',
          question: 'What command changes an interface\'s OSPF network type to point-to-point?',
          choices: [
            'ospf network point-to-point',
            'ip ospf network point-to-point',
            'interface ospf type p2p',
            'ip ospf type point-to-point',
          ],
          answer: 'ip ospf network point-to-point',
        },
        {
          type: 'tf',
          question: 'The point-to-multipoint OSPF network type avoids DR/BDR election and does not require manual neighbor statements.',
          answer: true,
          explanation: 'Point-to-multipoint treats the network as a collection of point-to-point links, so no DR/BDR is needed and neighbour discovery uses multicast. It is the preferred OSPF type for hub-and-spoke topologies.',
        },
        {
          type: 'fill',
          question: 'The default OSPF Hello interval on Ethernet (broadcast) and Serial (point-to-point) interfaces is _____ seconds.',
          answer: '10',
        },
        {
          type: 'mcq',
          question: 'Why does OSPF elect a DR/BDR on broadcast networks?',
          choices: [
            'To reduce the number of full adjacencies and LSA flooding overhead',
            'To act as a default gateway for OSPF traffic',
            'To assign router IDs to other routers',
            'To prevent routing loops on Ethernet segments',
          ],
          answer: 'To reduce the number of full adjacencies and LSA flooding overhead',
        },
      ],
    },
    {
      id: 'l4',
      title: 'Route Redistribution Basics',
      icon: '🔀',
      questions: [
        {
          type: 'teach',
          title: 'What Is Route Redistribution?',
          body: 'Route redistribution imports routes learned by one routing protocol into another. For example, if part of your network runs EIGRP and part runs OSPF, you configure redistribution on the boundary router so each protocol knows about the other\'s routes. The boundary router must run both protocols simultaneously and is called an Autonomous System Boundary Router (ASBR) in OSPF terminology.',
        },
        {
          type: 'teach',
          title: 'Seed Metrics and Redistribution Syntax',
          body: 'When redistributing into OSPF, you must specify a metric (cost) using "metric [value]" or "subnets" to include all subnet routes. For EIGRP, you must provide a seed metric with five values: bandwidth, delay, reliability, load, MTU. Redistributed OSPF routes appear as External Type 1 (E1) or Type 2 (E2) in the routing table — E2 is the default and the metric does not increase as it traverses the OSPF domain.',
        },
        {
          type: 'mcq',
          question: 'Which type of router performs route redistribution between two routing protocols?',
          choices: [
            'Area Border Router (ABR)',
            'Designated Router (DR)',
            'Autonomous System Boundary Router (ASBR)',
            'Backbone Router',
          ],
          answer: 'Autonomous System Boundary Router (ASBR)',
        },
        {
          type: 'mcq',
          question: 'When redistributing routes into OSPF, the "subnets" keyword is required to do what?',
          choices: [
            'Include classless (subnet) routes in redistribution',
            'Set the seed metric for redistributed routes',
            'Enable OSPF on all subnets automatically',
            'Prevent redistribution of default routes',
          ],
          answer: 'Include classless (subnet) routes in redistribution',
        },
        {
          type: 'tf',
          question: 'Route redistribution is automatic — two routing protocols on the same router will share routes by default.',
          answer: false,
          explanation: 'Redistribution must be explicitly configured. By default, routing protocols are completely isolated from each other even on the same router. You must use the "redistribute" command in each protocol\'s configuration.',
        },
        {
          type: 'mcq',
          question: 'OSPF external routes redistributed from another protocol appear in the routing table with which code?',
          choices: ['O', 'O E1 or O E2', 'R', 'D EX'],
          answer: 'O E1 or O E2',
        },
        {
          type: 'mcq',
          question: 'What is the key difference between OSPF External Type 1 (E1) and Type 2 (E2) routes?',
          choices: [
            'E1 routes include the internal OSPF cost as the packet traverses the domain; E2 does not',
            'E1 routes are preferred over E2 routes regardless of cost',
            'E2 routes are redistributed from EIGRP; E1 from RIP',
            'E1 and E2 differ only in administrative distance',
          ],
          answer: 'E1 routes include the internal OSPF cost as the packet traverses the domain; E2 does not',
        },
        {
          type: 'fill',
          question: 'The OSPF command to redistribute EIGRP routes with a seed metric of 20 and include subnets is: "redistribute eigrp 100 metric 20 _____".',
          answer: 'subnets',
        },
        {
          type: 'tf',
          question: 'When redistributing into EIGRP, you must provide a seed metric consisting of bandwidth, delay, reliability, load, and MTU.',
          answer: true,
          explanation: 'EIGRP has no default seed metric for redistributed routes (unlike OSPF). If you omit the metric values, the redistributed routes will have an infinite metric and will not be advertised to EIGRP neighbours.',
        },
        {
          type: 'mcq',
          question: 'Which command redistributes OSPF routes into EIGRP AS 100 with metric values?',
          choices: [
            'redistribute ospf 1 metric 10000 100 255 1 1500',
            'redistribute ospf metric 10000',
            'import ospf 1 into eigrp 100',
            'redistribute ospf 1 subnets',
          ],
          answer: 'redistribute ospf 1 metric 10000 100 255 1 1500',
        },
      ],
    },
  ],
};
