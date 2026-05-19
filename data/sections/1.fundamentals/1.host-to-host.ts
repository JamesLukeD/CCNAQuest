import type { Section } from '../../../lib/types';

export const SECTION_HOST_TO_HOST: Section = {
  id: 'host-to-host',
  title: 'Host to Host Communications',
  icon: '📚',
  unlockAfter: null,
  lessons: [
    {
      id: 'l1',
      title: 'The OSI Model',
      icon: '📚',
      questions: [
        {
          type: 'teach',
          title: 'Why Do We Need a Model?',
          body: 'When computers communicate, they need a common language and set of rules. The OSI Model (Open Systems Interconnection) gives us a 7-layer framework that describes exactly how data travels from one host to another — even across different vendors and hardware.\n\nDeveloped by ISO in 1984 — still the gold-standard reference model today.',
        },
        {
          type: 'teach',
          title: 'The 7 Layers',
          body: 'The OSI model has 7 layers, from bottom to top:\n\n7 – Application\n6 – Presentation\n5 – Session\n4 – Transport\n3 – Network\n2 – Data Link\n1 – Physical\n\nMemory trick: "All People Seem To Need Data Processing" (top→bottom) or "Please Do Not Throw Sausage Pizza Away" (bottom→top)',
        },
        {
          type: 'mcq',
          question: 'How many layers does the OSI model have?',
          choices: ['4', '5', '7', '12'],
          answer: '7',
        },
        {
          type: 'tf',
          question: 'The OSI model was developed by Cisco.',
          answer: false,
          explanation: 'The OSI model was developed by ISO (International Organization for Standardization) in 1984, not Cisco.',
        },
        {
          type: 'mcq',
          question: 'Which layer of the OSI model is Layer 1?',
          choices: ['Network', 'Data Link', 'Transport', 'Physical'],
          answer: 'Physical',
        },
        {
          type: 'wordbank',
          question: 'Arrange the OSI layers from Layer 7 (top) to Layer 4:',
          bank: ['Transport', 'Application', 'Session', 'Presentation'],
          answer: ['Application', 'Presentation', 'Session', 'Transport'],
        },
        {
          type: 'mcq',
          question: 'What mnemonic helps remember OSI layers from bottom to top?',
          choices: [
            '"All People Seem To Need Data Processing"',
            '"Please Do Not Throw Sausage Pizza Away"',
            '"People Drive Nonstop To San Pedro Atoll"',
            '"All Pros Should Try New Design Patterns"',
          ],
          answer: '"Please Do Not Throw Sausage Pizza Away"',
        },
      ],
    },
    {
      id: 'l2',
      title: 'The TCP/IP Stack',
      icon: '📡',
      questions: [
        {
          type: 'teach',
          title: 'OSI vs TCP/IP',
          body: 'While the OSI model is great for reference, the real world uses the TCP/IP model (also called the Internet model). It has 4 layers:\n\n4 – Application (OSI layers 5, 6, 7)\n3 – Transport (OSI layer 4)\n2 – Internet (OSI layer 3)\n1 – Network Access (OSI layers 1 & 2)\n\nYou will see both models in the CCNA exam. Know how they map to each other!',
        },
        {
          type: 'mcq',
          question: 'How many layers does the TCP/IP model have?',
          choices: ['3', '4', '5', '7'],
          answer: '4',
        },
        {
          type: 'mcq',
          question: 'Which TCP/IP layer maps to OSI Layer 3 (Network)?',
          choices: ['Application', 'Transport', 'Internet', 'Network Access'],
          answer: 'Internet',
        },
        {
          type: 'tf',
          question: 'The TCP/IP Application layer covers OSI layers 5, 6 and 7.',
          answer: true,
          explanation: 'Correct! The TCP/IP Application layer combines the Session, Presentation, and Application layers of the OSI model.',
        },
        {
          type: 'fill',
          question: 'The bottom layer of the TCP/IP model, covering OSI layers 1 and 2, is called the ________ Access layer.',
          answer: 'Network',
        },
        {
          type: 'mcq',
          question: 'Which model is used in real-world networking implementations?',
          choices: [
            'OSI Model only',
            'TCP/IP Model only',
            'Both are used equally',
            'TCP/IP is used practically; OSI is the reference model',
          ],
          answer: 'TCP/IP is used practically; OSI is the reference model',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Encapsulation',
      icon: '📦',
      questions: [
        {
          type: 'teach',
          title: 'What is Encapsulation?',
          body: 'As data travels down the OSI layers on the sending host, each layer adds its own header (and sometimes trailer) to the data. This process is called encapsulation. On the receiving side, each layer removes its header — called de-encapsulation.\n\nThink of it like putting a letter in an envelope, then a box, then a shipping container.',
        },
        {
          type: 'teach',
          title: 'PDUs – Protocol Data Units',
          body: 'Each layer has a specific name for the data it handles:\n\nLayer 4 (Transport) → Segment\nLayer 3 (Network)   → Packet\nLayer 2 (Data Link) → Frame\nLayer 1 (Physical)  → Bits\n\nRemember: S-P-F-B — Segments, Packets, Frames, Bits (layers 4→1)',
        },
        {
          type: 'mcq',
          question: 'What is the PDU name at the Transport layer (Layer 4)?',
          choices: ['Packet', 'Frame', 'Segment', 'Bit'],
          answer: 'Segment',
        },
        {
          type: 'mcq',
          question: 'What is the PDU name at the Network layer (Layer 3)?',
          choices: ['Segment', 'Packet', 'Frame', 'Datagram'],
          answer: 'Packet',
        },
        {
          type: 'tf',
          question: 'De-encapsulation happens on the sending host as data travels down the layers.',
          answer: false,
          explanation: 'De-encapsulation happens on the RECEIVING host. The sending host performs encapsulation (adding headers as data goes down the layers).',
        },
        {
          type: 'mcq',
          question: 'What is the PDU at the Data Link layer (Layer 2)?',
          choices: ['Packet', 'Segment', 'Frame', 'Cell'],
          answer: 'Frame',
        },
        {
          type: 'wordbank',
          question: 'Order these PDUs from Layer 4 down to Layer 1:',
          bank: ['Bits', 'Packet', 'Frame', 'Segment'],
          answer: ['Segment', 'Packet', 'Frame', 'Bits'],
        },
      ],
    },
    {
      id: 'l4',
      title: 'Life of a Packet',
      icon: '✈️',
      questions: [
        {
          type: 'teach',
          title: 'How Data Travels',
          body: 'When Host A sends data to Host B:\n\n1. The application generates data at Layer 7.\n2. Data travels DOWN the layers on Host A — each layer adds its header (encapsulation).\n3. Bits are transmitted over the physical medium.\n4. Data travels UP the layers on Host B — each layer strips its header (de-encapsulation).\n5. The application on Host B receives the original data.\n\nLayer 3 devices (Routers) look at the Packet. Layer 2 devices (Switches) look at the Frame.',
        },
        {
          type: 'mcq',
          question: 'Which device operates at Layer 3 and routes packets between networks?',
          choices: ['Hub', 'Switch', 'Router', 'Access Point'],
          answer: 'Router',
        },
        {
          type: 'mcq',
          question: 'Which device operates at Layer 2 and forwards frames within a network?',
          choices: ['Router', 'Switch', 'Hub', 'Firewall'],
          answer: 'Switch',
        },
        {
          type: 'tf',
          question: 'A router makes forwarding decisions based on MAC addresses.',
          answer: false,
          explanation: 'Routers operate at Layer 3 and make decisions based on IP addresses (packets). Switches use MAC addresses (frames) at Layer 2.',
        },
        {
          type: 'mcq',
          question: 'When does encapsulation happen?',
          choices: [
            'As data travels UP the layers on the receiving host',
            'As data travels DOWN the layers on the sending host',
            'Only at the Physical layer',
            'Only at the Application layer',
          ],
          answer: 'As data travels DOWN the layers on the sending host',
        },
        {
          type: 'tf',
          question: 'A hub is a Layer 2 device that makes intelligent forwarding decisions.',
          answer: false,
          explanation: 'A hub operates at Layer 1 (Physical). It simply repeats electrical signals to all ports — it has no intelligence about addresses.',
        },
      ],
    },
    {
      id: 'l5',
      title: 'MAC vs IP Addresses',
      icon: '🏷️',
      questions: [
        {
          type: 'teach',
          title: 'Two Types of Addresses',
          body: 'Hosts have two addresses that work together:\n\nMAC Address (Layer 2) — burned into the network card. 48-bit address written in hex (e.g. 00:1A:2B:3C:4D:5E). Used for communication on the same local network.\n\nIP Address (Layer 3) — assigned logically. 32-bit (IPv4) or 128-bit (IPv6). Used for communication between networks.\n\nMAC = physical, permanent. IP = logical, can change.',
        },
        {
          type: 'mcq',
          question: 'A MAC address operates at which OSI layer?',
          choices: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
          answer: 'Layer 2',
        },
        {
          type: 'mcq',
          question: 'How many bits is a MAC address?',
          choices: ['32', '64', '48', '128'],
          answer: '48',
        },
        {
          type: 'tf',
          question: 'A MAC address can be changed by a network administrator.',
          answer: true,
          explanation: 'Although MAC addresses are "burned in" to the NIC by the manufacturer, they can be overridden in software — this is called MAC spoofing.',
        },
        {
          type: 'mcq',
          question: 'Which type of address is used to communicate between different networks?',
          choices: ['MAC address', 'IP address', 'Port number', 'VLAN ID'],
          answer: 'IP address',
        },
        {
          type: 'fill',
          question: 'ARP stands for Address Resolution ________.',
          answer: 'Protocol',
        },
        {
          type: 'mcq',
          question: 'What does ARP do?',
          choices: [
            'Assigns IP addresses automatically',
            'Resolves a hostname to an IP address',
            'Resolves an IP address to a MAC address',
            'Encrypts traffic between hosts',
          ],
          answer: 'Resolves an IP address to a MAC address',
        },
      ],
    },
    {
      id: 'l6',
      title: 'Section Review',
      icon: '🏆',
      questions: [
        {
          type: 'mcq',
          question: 'Which OSI layer handles end-to-end communication and uses segments as its PDU?',
          choices: ['Layer 2 – Data Link', 'Layer 3 – Network', 'Layer 4 – Transport', 'Layer 5 – Session'],
          answer: 'Layer 4 – Transport',
        },
        {
          type: 'mcq',
          question: 'Which layer of the TCP/IP model corresponds to OSI Layer 3?',
          choices: ['Application', 'Transport', 'Internet', 'Network Access'],
          answer: 'Internet',
        },
        {
          type: 'tf',
          question: 'Encapsulation adds headers as data travels DOWN the OSI model layers.',
          answer: true,
          explanation: 'Correct! On the sending side, each layer adds its own header as data moves from Layer 7 down to Layer 1.',
        },
        {
          type: 'mcq',
          question: 'Which PDU is used at Layer 2?',
          choices: ['Segment', 'Packet', 'Frame', 'Bit'],
          answer: 'Frame',
        },
        {
          type: 'mcq',
          question: 'What is the size of an IPv4 address?',
          choices: ['16 bits', '32 bits', '48 bits', '128 bits'],
          answer: '32 bits',
        },
        {
          type: 'tf',
          question: 'A switch makes forwarding decisions based on IP addresses.',
          answer: false,
          explanation: 'Switches operate at Layer 2 and forward frames based on MAC addresses. Routers use IP addresses at Layer 3.',
        },
        {
          type: 'wordbank',
          question: 'Place these in order: PDU name from Layer 4 to Layer 1:',
          bank: ['Frame (L2)', 'Segment (L4)', 'Bits (L1)', 'Packet (L3)'],
          answer: ['Segment (L4)', 'Packet (L3)', 'Frame (L2)', 'Bits (L1)'],
        },
        {
          type: 'mcq',
          question: 'Which protocol resolves an IP address to a MAC address?',
          choices: ['DHCP', 'DNS', 'ARP', 'NAT'],
          answer: 'ARP',
        },
      ],
    },
  ],
};
