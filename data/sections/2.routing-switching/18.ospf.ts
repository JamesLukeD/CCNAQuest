import type { Section } from '../../../lib/types';

export const SECTION_OSPF: Section = {
  id: 'ospf',
  title: 'OSPF – Open Shortest Path First',
  icon: '🕸️',
  unlockAfter: 'igp-fundamentals',
  lessons: [
    {
      id: 'l1',
      title: 'OSPF Configuration',
      icon: '⚙️',
      questions: [
        {
          type: 'teach',
          title: 'Basic OSPF Setup',
          body: 'Enable OSPF with "router ospf [process-id]" — the process ID is locally significant and does not need to match between routers. Advertise networks with "network [ip] [wildcard-mask] area [area-id]". The wildcard mask is the inverse of the subnet mask (0.0.0.255 for /24). Set a stable router ID explicitly with "router-id [ip]" before the OSPF process starts — otherwise IOS picks one automatically from loopback or interface IPs.',
        },
        {
          type: 'teach',
          title: 'Passive Interfaces',
          body: 'A passive interface suppresses OSPF Hello packets on that interface — the network is still advertised into OSPF, but no neighbours can form. Use "passive-interface [interface]" under the OSPF process for stub networks (e.g. LAN segments with no other routers). Use "passive-interface default" to make all interfaces passive, then "no passive-interface [interface]" to re-enable only the routed links.',
        },
        {
          type: 'mcq',
          question: 'Which command enables OSPF process 1 on a Cisco router?',
          choices: ['ospf 1', 'router ospf 1', 'enable ospf process 1', 'ip ospf 1'],
          answer: 'router ospf 1',
        },
        {
          type: 'mcq',
          question: 'What is the wildcard mask for a /24 subnet in an OSPF network statement?',
          choices: ['255.255.255.0', '0.0.0.255', '255.255.255.255', '0.255.255.255'],
          answer: '0.0.0.255',
        },
        {
          type: 'tf',
          question: 'The OSPF process ID must match on both routers for a neighbour relationship to form.',
          answer: false,
          explanation: 'The OSPF process ID is locally significant — it only identifies the OSPF process on the local router. Routers with different process IDs can still form OSPF adjacencies as long as other parameters (area, timers, authentication) match.',
        },
        {
          type: 'mcq',
          question: 'What is the purpose of the "passive-interface" command in OSPF?',
          choices: [
            'Disables OSPF on the interface entirely',
            'Suppresses Hello packets but still advertises the network',
            'Sets the interface cost to infinity',
            'Prevents the interface from being elected DR',
          ],
          answer: 'Suppresses Hello packets but still advertises the network',
        },
        {
          type: 'fill',
          question: 'The OSPF command to set the router ID to 1.1.1.1 is "router-id _____".',
          answer: '1.1.1.1',
        },
        {
          type: 'mcq',
          question: 'You want all OSPF interfaces to be passive except Gi0/0. What is the most efficient approach?',
          choices: [
            'Apply passive-interface to each interface individually',
            'passive-interface default, then no passive-interface Gi0/0',
            'no passive-interface Gi0/0 only',
            'shutdown all interfaces except Gi0/0',
          ],
          answer: 'passive-interface default, then no passive-interface Gi0/0',
        },
        {
          type: 'tf',
          question: 'A loopback interface configured with "passive-interface" will still have its network advertised into OSPF.',
          answer: true,
          explanation: 'passive-interface only suppresses Hello packets — the interface\'s connected network is still included in OSPF LSAs and advertised to neighbours. It is commonly used on loopbacks and LAN segments with no OSPF routers attached.',
        },
        {
          type: 'mcq',
          question: 'Which statement advertises the 192.168.1.0/24 network into OSPF area 0?',
          choices: [
            'network 192.168.1.0 255.255.255.0 area 0',
            'network 192.168.1.0 0.0.0.255 area 0',
            'ospf network 192.168.1.0/24 area 0',
            'ip ospf 192.168.1.0 0.0.0.255 area 0',
          ],
          answer: 'network 192.168.1.0 0.0.0.255 area 0',
        },
      ],
    },
    {
      id: 'l2',
      title: 'OSPF Cost Tuning',
      icon: '📏',
      questions: [
        {
          type: 'teach',
          title: 'The OSPF Cost Formula',
          body: 'OSPF cost = reference bandwidth / interface bandwidth. The default reference bandwidth is 100 Mbps. This means FastEthernet (100 Mbps) and GigabitEthernet (1000 Mbps) both have cost 1 — OSPF cannot distinguish between them. Always change the reference bandwidth to match your fastest links: "auto-cost reference-bandwidth 1000" for GigE networks or "10000" for 10 GigE. This must be configured consistently on all OSPF routers.',
        },
        {
          type: 'teach',
          title: 'Manually Setting Interface Cost',
          body: 'Override the calculated cost on a specific interface with "ip ospf cost [value]" in interface configuration mode. This is useful for traffic engineering — forcing traffic onto a preferred path by lowering its cost, or making a backup path less preferred by raising its cost. Interface cost takes precedence over the auto-calculated value and is the most granular tuning option.',
        },
        {
          type: 'mcq',
          question: 'What is the default OSPF reference bandwidth?',
          choices: ['10 Mbps', '100 Mbps', '1000 Mbps', '10000 Mbps'],
          answer: '100 Mbps',
        },
        {
          type: 'mcq',
          question: 'Using the default reference bandwidth, what is the OSPF cost of a GigabitEthernet interface?',
          choices: ['1', '10', '100', '1000'],
          answer: '1',
        },
        {
          type: 'tf',
          question: 'With the default OSPF reference bandwidth, OSPF can distinguish between FastEthernet and GigabitEthernet paths.',
          answer: false,
          explanation: 'Both FastEthernet (100 Mbps) and GigabitEthernet (1000 Mbps) calculate to cost 1 with the default 100 Mbps reference bandwidth. You must increase the reference bandwidth to allow OSPF to differentiate higher-speed interfaces.',
        },
        {
          type: 'mcq',
          question: 'Which command sets the OSPF reference bandwidth to 1000 Mbps on a router?',
          choices: [
            'ip ospf cost 1000',
            'auto-cost reference-bandwidth 1000',
            'ospf reference-bandwidth 1000',
            'ip ospf reference-bandwidth 1000',
          ],
          answer: 'auto-cost reference-bandwidth 1000',
        },
        {
          type: 'fill',
          question: 'The interface-level command to manually set an OSPF cost of 5 is "ip ospf cost _____".',
          answer: '5',
        },
        {
          type: 'mcq',
          question: 'The "auto-cost reference-bandwidth" command must be configured on which routers?',
          choices: [
            'Only the DR',
            'Only the ABR',
            'All OSPF routers in the domain consistently',
            'Only routers with GigabitEthernet interfaces',
          ],
          answer: 'All OSPF routers in the domain consistently',
        },
        {
          type: 'tf',
          question: 'A manually configured "ip ospf cost" on an interface overrides the auto-calculated cost.',
          answer: true,
          explanation: 'The "ip ospf cost" interface command sets the cost directly and takes precedence over any value derived from the reference bandwidth formula. It is the preferred method for traffic engineering specific links.',
        },
        {
          type: 'mcq',
          question: 'With reference bandwidth set to 1000 Mbps, what is the cost of a FastEthernet (100 Mbps) interface?',
          choices: ['1', '10', '100', '1000'],
          answer: '10',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Multi-Area OSPF',
      icon: '🗺️',
      questions: [
        {
          type: 'teach',
          title: 'Why Use Multiple OSPF Areas?',
          body: 'A single OSPF area works fine for small networks, but large topologies create problems: every router stores the entire LSDB, and any topology change triggers SPF recalculation on all routers. Multiple areas solve this by confining LSA flooding within each area. Area Border Routers (ABRs) sit between areas and summarise routing information. The backbone (Area 0) must connect all other areas.',
        },
        {
          type: 'teach',
          title: 'OSPF LSA Types',
          body: 'Key LSA types for the CCNA: Type 1 (Router LSA) — generated by every router, describes its links within the area. Type 2 (Network LSA) — generated by the DR, describes the multi-access segment. Type 3 (Summary LSA) — generated by ABRs to advertise routes between areas. Type 5 (AS External LSA) — generated by ASBRs to advertise routes from outside OSPF. Stub areas block Type 5 LSAs to reduce the LSDB size in remote areas.',
        },
        {
          type: 'mcq',
          question: 'What type of router connects two OSPF areas and generates Type 3 Summary LSAs?',
          choices: [
            'Designated Router (DR)',
            'Backbone Router',
            'Area Border Router (ABR)',
            'Autonomous System Boundary Router (ASBR)',
          ],
          answer: 'Area Border Router (ABR)',
        },
        {
          type: 'mcq',
          question: 'Which OSPF LSA type is generated by the Designated Router to describe a multi-access segment?',
          choices: ['Type 1', 'Type 2', 'Type 3', 'Type 5'],
          answer: 'Type 2',
        },
        {
          type: 'tf',
          question: 'OSPF stub areas block Type 5 External LSAs to reduce the size of the LSDB in remote areas.',
          answer: true,
          explanation: 'Stub areas replace Type 5 LSAs with a default route (Type 3) generated by the ABR, significantly reducing the number of LSAs routers in remote areas must store and process.',
        },
        {
          type: 'mcq',
          question: 'Which OSPF LSA type is generated by an ASBR to advertise external routes (e.g. redistributed from RIP)?',
          choices: ['Type 1', 'Type 2', 'Type 3', 'Type 5'],
          answer: 'Type 5',
        },
        {
          type: 'mcq',
          question: 'In a multi-area OSPF network, what is the role of Area 0?',
          choices: [
            'It is the only area that can have stub configuration',
            'It is the backbone — all other areas must connect to it',
            'It is the area reserved for external routes',
            'It contains only the DR and BDR',
          ],
          answer: 'It is the backbone — all other areas must connect to it',
        },
        {
          type: 'fill',
          question: 'OSPF Type 1 LSAs are called _____ LSAs and are generated by every router to describe its own links.',
          answer: 'Router',
        },
        {
          type: 'tf',
          question: 'An OSPF router that is entirely within one area and has no connections to other areas is called an ABR.',
          answer: false,
          explanation: 'A router entirely within one area is called an Internal Router. An Area Border Router (ABR) connects two or more OSPF areas and maintains a separate LSDB for each area it connects.',
        },
        {
          type: 'mcq',
          question: 'Which LSA type does an ABR generate to advertise inter-area routes?',
          choices: ['Type 1', 'Type 2', 'Type 3', 'Type 5'],
          answer: 'Type 3',
        },
      ],
    },
    {
      id: 'l4',
      title: 'OSPF Verification',
      icon: '🔍',
      questions: [
        {
          type: 'teach',
          title: 'Key OSPF show Commands',
          body: 'Four commands cover most OSPF verification: "show ip ospf neighbor" — lists all neighbours, their state, and DR/BDR role; "show ip ospf interface [int]" — shows Hello/Dead timers, cost, network type, and DR/BDR for the interface; "show ip ospf database" — displays all LSAs in the LSDB; "show ip route ospf" — shows only OSPF-learned routes. Always start with "show ip ospf neighbor" when troubleshooting adjacency issues.',
        },
        {
          type: 'teach',
          title: 'OSPF Troubleshooting Checklist',
          body: 'Work through these checks in order: Are interfaces in the same subnet? Do Hello/Dead intervals match? Do Area IDs match? Is authentication configured consistently? Is the interface passive (passive-interface blocks Hellos)? Is there an access-list blocking OSPF (multicast 224.0.0.5 on UDP/89)? After confirming neighbours reach Full state, verify routes appear in "show ip route" and test reachability with ping/traceroute.',
        },
        {
          type: 'mcq',
          question: 'Which command is the first to check when OSPF neighbours are not forming?',
          choices: [
            'show ip route ospf',
            'show ip ospf database',
            'show ip ospf neighbor',
            'show ip protocols',
          ],
          answer: 'show ip ospf neighbor',
        },
        {
          type: 'mcq',
          question: 'Which command shows the Hello interval, cost, and DR/BDR status for a specific OSPF interface?',
          choices: [
            'show ip ospf neighbor',
            'show ip ospf interface',
            'show ip ospf database',
            'show ip ospf process',
          ],
          answer: 'show ip ospf interface',
        },
        {
          type: 'tf',
          question: '"show ip ospf neighbor" showing a neighbour stuck in "EXSTART" state typically indicates an MTU mismatch.',
          answer: true,
          explanation: 'The ExStart state is where routers negotiate master/slave and begin exchanging DBD packets. An MTU mismatch causes DBD packets to be silently dropped, stalling the process in ExStart. Fix with "ip ospf mtu-ignore" or by matching MTU values.',
        },
        {
          type: 'mcq',
          question: 'An OSPF neighbour shows state "2-WAY" instead of "FULL". On what network type is this normal?',
          choices: [
            'Point-to-point',
            'Point-to-multipoint',
            'Broadcast (between two DROther routers)',
            'NBMA',
          ],
          answer: 'Broadcast (between two DROther routers)',
        },
        {
          type: 'mcq',
          question: 'Which command displays only OSPF-learned routes in the routing table?',
          choices: [
            'show ip route',
            'show ip route ospf',
            'show ip ospf routes',
            'show ospf topology',
          ],
          answer: 'show ip route ospf',
        },
        {
          type: 'fill',
          question: 'OSPF uses IP protocol number _____ (not TCP or UDP) for its packets.',
          answer: '89',
        },
        {
          type: 'mcq',
          question: 'OSPF neighbours have formed (Full state) but routes are missing. What should you check next?',
          choices: [
            'Hello and Dead timer mismatches',
            'Whether the network is advertised under the correct area',
            'DR/BDR election results',
            'Whether CDP is enabled',
          ],
          answer: 'Whether the network is advertised under the correct area',
        },
        {
          type: 'tf',
          question: 'An access list blocking UDP port 89 would prevent OSPF neighbours from forming.',
          answer: false,
          explanation: 'OSPF runs directly over IP using protocol number 89 — it does not use TCP or UDP. An access list would need to block IP protocol 89 (not UDP/89) to disrupt OSPF. Blocking multicast 224.0.0.5 would also prevent Hellos.',
        },
      ],
    },
  ],
};
