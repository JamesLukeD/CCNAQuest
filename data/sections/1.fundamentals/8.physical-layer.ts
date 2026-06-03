import type { Section } from '../../../lib/types';

export const SECTION_PHYSICAL_LAYER: Section = {
  id: 'physical-layer',
  title: 'OSI Layer 1 – The Physical Layer',
  icon: '⚡',
  unlockAfter: 'data-link-layer',
  lessons: [
    // ─────────────────────────────────────────────────────────
    // Lesson 1 – Copper Cabling
    // ─────────────────────────────────────────────────────────
    {
      id: 's8l1',
      title: 'Copper Cabling',
      icon: '🔌',
      questions: [
        {
          type: 'teach',
          title: 'The Copper Conduits',
          body: 'UTP (Unshielded Twisted Pair) is the most common LAN cabling. Eight wires arranged in four twisted pairs, terminated with an RJ-45 connector. The twisting reduces electromagnetic interference (EMI) between pairs.\n\nMaximum segment length for all copper Ethernet standards is 100 metres (328 feet). Beyond that, a switch or repeater is needed.\n\nSTP (Shielded Twisted Pair) adds a foil shield for environments with high EMI, at greater cost and bulk.',
        },
        {
          type: 'teach',
          title: 'Cable Categories',
          body: 'Know these cable categories for the CCNA exam:\n\nCat5 — Up to 100 Mbps (FastEthernet), 100m max.\nCat5e — Up to 1 Gbps (GigabitEthernet), 100m max. The "e" means enhanced — reduced crosstalk.\nCat6 — Up to 1 Gbps at 100m; up to 10 Gbps at 55m.\nCat6a — Up to 10 Gbps at 100m. The "a" means augmented.\n\nFor a new GigabitEthernet install, Cat5e is the minimum. For 10G runs, use Cat6a.',
        },
        {
          type: 'mcq',
          question: 'What is the maximum segment length for copper Ethernet (UTP) cabling?',
          choices: ['55 metres', '100 metres', '185 metres', '500 metres'],
          answer: '100 metres',
        },
        {
          type: 'mcq',
          question: 'Which cable category supports 10 Gbps at a full 100 metres?',
          choices: ['Cat5', 'Cat5e', 'Cat6', 'Cat6a'],
          answer: 'Cat6a',
          explanation: 'Cat6a (augmented) supports 10 Gbps at the full 100m segment length. Cat6 supports 10 Gbps only up to 55m.',
        },
        {
          type: 'mcq',
          question: 'What connector is used with UTP Ethernet cabling?',
          choices: ['RJ-11', 'RJ-45', 'LC', 'BNC'],
          answer: 'RJ-45',
        },
        {
          type: 'tf',
          question: 'Cat5e cabling supports GigabitEthernet (1 Gbps) at distances up to 100 metres.',
          answer: true,
          explanation: 'Cat5e is the minimum standard for GigabitEthernet and supports 1 Gbps at the full 100m UTP segment limit.',
        },
        {
          type: 'mcq',
          question: 'What does UTP stand for?',
          choices: [
            'Ultra Twisted Pair',
            'Unshielded Twisted Pair',
            'Universal Transfer Protocol',
            'Unfiltered Transmission Path',
          ],
          answer: 'Unshielded Twisted Pair',
        },
        {
          type: 'fill',
          question: 'UTP cable consists of ________ wires arranged in four twisted pairs.',
          answer: '8',
        },
        {
          type: 'mcq',
          question: 'Which cable type is recommended for environments with high electromagnetic interference?',
          choices: ['UTP', 'STP', 'Coaxial RG-6', 'Cat5e'],
          answer: 'STP',
          explanation: 'STP (Shielded Twisted Pair) adds a foil or braid shield around the wire pairs to protect against EMI.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 2 – Straight-Through vs Crossover Cables
    // ─────────────────────────────────────────────────────────
    {
      id: 's8l2',
      title: 'Straight-Through vs Crossover',
      icon: '↔️',
      questions: [
        {
          type: 'teach',
          title: 'Connecting Like and Unlike Devices',
          body: 'A straight-through cable has the same pin-out at both ends (both T568B or both T568A). It connects unlike devices: PC to switch, router to switch.\n\nA crossover cable swaps the transmit and receive pairs. It connects like devices: switch to switch, PC to PC, router to router.\n\nA rollover (console) cable is a flat, light-blue Cisco cable used to connect a PC\'s serial port to a router or switch console port. Every pin is reversed.',
        },
        {
          type: 'teach',
          title: 'Auto-MDIX — The Modern Solution',
          body: 'Modern Cisco switches support Auto-MDIX (Automatic Medium-Dependent Interface Crossover). This feature automatically detects whether a straight-through or crossover cable is needed and adjusts accordingly.\n\nThis means in practice, modern equipment works with either cable type. However, the CCNA exam still expects you to know which cable you should use for a given scenario — Auto-MDIX is a safety net, not a reason to guess.',
        },
        {
          type: 'mcq',
          question: 'Which cable type is used to connect a PC to a switch?',
          choices: ['Crossover', 'Straight-through', 'Rollover', 'Coaxial'],
          answer: 'Straight-through',
        },
        {
          type: 'mcq',
          question: 'Which cable type is used to connect two switches directly together?',
          choices: ['Straight-through', 'Crossover', 'Rollover', 'Fibre patch'],
          answer: 'Crossover',
        },
        {
          type: 'tf',
          question: 'A straight-through cable is used to connect two routers back-to-back.',
          answer: false,
          explanation: 'Connecting two like devices (router to router) requires a crossover cable. Straight-through cables connect unlike devices (e.g., router to switch).',
        },
        {
          type: 'mcq',
          question: 'What is a rollover (console) cable used for?',
          choices: [
            'Connecting two switches together',
            'Connecting a PC to the console port of a Cisco device',
            'Connecting a router to a switch',
            'Long-distance uplink between buildings',
          ],
          answer: 'Connecting a PC to the console port of a Cisco device',
        },
        {
          type: 'mcq',
          question: 'What feature on modern Cisco switches automatically adjusts for straight-through or crossover cable use?',
          choices: ['Auto-negotiate', 'Auto-MDIX', 'PortFast', 'EtherChannel'],
          answer: 'Auto-MDIX',
        },
        {
          type: 'wordbank',
          question: 'Match each connection type to the correct cable:',
          bank: ['PC to Switch', 'Switch to Switch', 'Straight-through', 'Crossover'],
          answer: ['PC to Switch', 'Straight-through', 'Switch to Switch', 'Crossover'],
        },
        {
          type: 'tf',
          question: 'A crossover cable connects the transmit pins on one end to the receive pins on the other.',
          answer: true,
          explanation: 'A crossover cable swaps pairs 1-2 and 3-6, connecting the TX pins of one device directly to the RX pins of the other.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 3 – Fibre Optic Cabling
    // ─────────────────────────────────────────────────────────
    {
      id: 's8l3',
      title: 'Fibre Optic Cabling',
      icon: '💡',
      questions: [
        {
          type: 'teach',
          title: 'Light as the Messenger',
          body: 'Fibre optic cable transmits data as pulses of light rather than electrical signals. This makes it immune to EMI, capable of vastly greater distances than copper, and much harder to tap covertly.\n\nTwo main types:\nSingle-mode (SMF) — one ray of light, laser light source, very long distances (40 km+), typically yellow jacket.\nMulti-mode (MMF) — multiple light rays, LED source, shorter distances (up to ~550m for OM4), typically orange or aqua jacket.',
        },
        {
          type: 'teach',
          title: 'Fibre Connectors',
          body: 'Common fibre connectors on the CCNA exam:\n\nLC (Lucent Connector) — small form-factor push-pull connector. Used with SFP/SFP+ transceivers. The dominant connector in modern enterprise deployments.\nSC (Subscriber Connector) — square push-pull connector. Older but still common.\nST (Straight Tip) — round bayonet connector. Legacy multi-mode installations.\n\nFibre connections are full duplex by nature — one strand for TX, one for RX (or both on a single strand via WDM).',
        },
        {
          type: 'mcq',
          question: 'Which type of fibre optic cable uses a laser light source and supports the longest distances?',
          choices: ['Multi-mode', 'Single-mode', 'Cat6a', 'Coaxial'],
          answer: 'Single-mode',
          explanation: 'Single-mode fibre uses a laser source and a narrow ~9 micron core, allowing light to travel tens of kilometres with minimal dispersion.',
        },
        {
          type: 'mcq',
          question: 'What is the typical jacket colour of single-mode fibre cable?',
          choices: ['Orange', 'Aqua', 'Yellow', 'Blue'],
          answer: 'Yellow',
          explanation: 'Single-mode fibre is typically identified by a yellow jacket. Multi-mode is orange (OM1/OM2) or aqua/lime-green (OM3/OM4/OM5).',
        },
        {
          type: 'tf',
          question: 'Multi-mode fibre supports longer distances than single-mode fibre.',
          answer: false,
          explanation: 'Single-mode fibre supports far greater distances (tens of kilometres). Multi-mode is limited to a few hundred metres, suited for in-building or campus runs.',
        },
        {
          type: 'mcq',
          question: 'Which fibre connector is most commonly used with SFP transceivers in modern enterprise switches?',
          choices: ['ST', 'SC', 'LC', 'FC'],
          answer: 'LC',
          explanation: 'The LC (Lucent Connector) is the dominant small form-factor connector used with SFP and SFP+ modules in modern switches and routers.',
        },
        {
          type: 'mcq',
          question: 'Which of the following is an advantage of fibre optic cabling over UTP copper?',
          choices: [
            'Lower cost',
            'Easier to install',
            'Immune to electromagnetic interference',
            'Uses standard RJ-45 connectors',
          ],
          answer: 'Immune to electromagnetic interference',
        },
        {
          type: 'fill',
          question: 'Single-mode fibre uses a ________ light source.',
          answer: 'laser',
        },
        {
          type: 'mcq',
          question: 'Which fibre type would you use for a 500-metre connection between two campus buildings?',
          choices: ['Cat6a UTP', 'Single-mode fibre', 'Multi-mode fibre', 'Cat5e STP'],
          answer: 'Multi-mode fibre',
          explanation: '500m exceeds the 100m copper limit. Multi-mode fibre supports up to ~550m (OM4) at 10G and is cost-effective for intra-campus runs.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 4 – Bandwidth, Throughput & Latency
    // ─────────────────────────────────────────────────────────
    {
      id: 's8l4',
      title: 'Bandwidth, Throughput & Latency',
      icon: '📊',
      questions: [
        {
          type: 'teach',
          title: 'Three Ways to Measure a Link',
          body: 'Three terms describe how a link performs — and confusing them will cost you exam marks:\n\nBandwidth — the theoretical maximum capacity of the link (e.g., 1 Gbps). Set by the physical medium and standards.\nThroughput — the actual measured data rate across the link in real conditions. Always less than or equal to bandwidth due to protocol overhead, retransmissions, congestion, and noise.\nLatency — the delay for a single unit of data to travel from source to destination. Measured in milliseconds.',
        },
        {
          type: 'teach',
          title: 'Why Throughput Is Always Less Than Bandwidth',
          body: 'Throughput is reduced by several factors:\n\nProtocol overhead — every frame, segment, and packet carries headers that consume bandwidth without delivering user data.\nRetransmissions — errors cause TCP to resend data, consuming bandwidth twice.\nCongestion — when demand exceeds capacity, queuing and dropping reduce effective throughput.\nDistance and interference — physical impairments introduce errors that force retransmissions.\n\nBenchmark tools like iPerf measure actual throughput, not theoretical bandwidth.',
        },
        {
          type: 'mcq',
          question: 'What term describes the theoretical maximum data rate of a network link?',
          choices: ['Throughput', 'Latency', 'Bandwidth', 'Goodput'],
          answer: 'Bandwidth',
        },
        {
          type: 'mcq',
          question: 'What term describes the actual measured data transfer rate experienced on a link?',
          choices: ['Bandwidth', 'Throughput', 'Latency', 'Jitter'],
          answer: 'Throughput',
        },
        {
          type: 'tf',
          question: 'Throughput can exceed the bandwidth of a link under ideal conditions.',
          answer: false,
          explanation: 'Throughput is always less than or equal to bandwidth. Bandwidth is the ceiling; real-world factors always push throughput below it.',
        },
        {
          type: 'mcq',
          question: 'What term describes the delay experienced as data travels from source to destination?',
          choices: ['Bandwidth', 'Throughput', 'Latency', 'Jitter'],
          answer: 'Latency',
        },
        {
          type: 'mcq',
          question: 'Which of the following is NOT a cause of throughput being lower than bandwidth?',
          choices: [
            'Protocol overhead',
            'Network congestion',
            'TCP retransmissions',
            'Using Cat6a instead of Cat5e',
          ],
          answer: 'Using Cat6a instead of Cat5e',
          explanation: 'Both Cat5e and Cat6a support 1 Gbps. Upgrading to Cat6a does not reduce throughput — it is the other three factors (overhead, congestion, retransmissions) that do.',
        },
        {
          type: 'fill',
          question: 'The delay for data to travel from source to destination is called ________.',
          answer: 'latency',
        },
        {
          type: 'mcq',
          question: 'A 1 Gbps link is transferring a large file. The measured transfer rate is 750 Mbps. What is 750 Mbps referred to as?',
          choices: ['Bandwidth', 'Throughput', 'Latency', 'Jitter'],
          answer: 'Throughput',
          explanation: 'The 1 Gbps is the bandwidth (capacity). The 750 Mbps actually measured is the throughput.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 5 – Section Review
    // ─────────────────────────────────────────────────────────
    {
      id: 's8l5',
      title: 'Section Review',
      icon: '🏆',
      questions: [
        {
          type: 'mcq',
          question: 'What is the maximum segment length for UTP Ethernet cabling?',
          choices: ['55 metres', '100 metres', '500 metres', '2000 metres'],
          answer: '100 metres',
        },
        {
          type: 'mcq',
          question: 'Which cable type would you use to connect two routers back-to-back?',
          choices: ['Straight-through', 'Crossover', 'Rollover', 'Coaxial'],
          answer: 'Crossover',
        },
        {
          type: 'tf',
          question: 'Single-mode fibre uses an LED light source and is suitable for multi-kilometre WAN links.',
          answer: false,
          explanation: 'Single-mode fibre uses a LASER source (not LED). It is suitable for long distances, but the LED claim is incorrect — that describes multi-mode.',
        },
        {
          type: 'mcq',
          question: 'Which cable category is the minimum required for GigabitEthernet (1 Gbps)?',
          choices: ['Cat3', 'Cat5', 'Cat5e', 'Cat6'],
          answer: 'Cat5e',
        },
        {
          type: 'mcq',
          question: 'What is the fibre connector most commonly used with SFP transceivers in modern enterprise networks?',
          choices: ['ST', 'SC', 'BNC', 'LC'],
          answer: 'LC',
        },
        {
          type: 'fill',
          question: 'The actual measured data rate on a link, which is always less than or equal to bandwidth, is called ________.',
          answer: 'throughput',
        },
        {
          type: 'mcq',
          question: 'Which feature on modern Cisco switches eliminates the need to choose the correct cable type?',
          choices: ['PortFast', 'Auto-MDIX', 'EtherChannel', 'BPDU Guard'],
          answer: 'Auto-MDIX',
        },
        {
          type: 'wordbank',
          question: 'Match each cable type to its correct use case:',
          bank: ['Straight-through', 'Crossover', 'PC to Switch', 'Switch to Switch'],
          answer: ['Straight-through', 'PC to Switch', 'Crossover', 'Switch to Switch'],
        },
        {
          type: 'tf',
          question: 'Cat6a supports 10 Gbps at 100 metres, while Cat6 is limited to 10 Gbps at only 55 metres.',
          answer: true,
          explanation: 'Cat6 can carry 10G but only to 55m due to alien crosstalk. Cat6a (augmented) eliminates this limitation, supporting 10G at the full 100m segment length.',
        },
      ],
    },
  ],
};
