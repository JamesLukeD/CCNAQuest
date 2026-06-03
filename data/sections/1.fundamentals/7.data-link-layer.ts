import type { Section } from '../../../lib/types';

export const SECTION_DATA_LINK_LAYER: Section = {
  id: 'data-link-layer',
  title: 'OSI Layer 2 – The Data-Link Layer',
  icon: '🔗',
  unlockAfter: 'subnetting',
  lessons: [
    // ─────────────────────────────────────────────────────────
    // Lesson 1 – The Ethernet Frame
    // ─────────────────────────────────────────────────────────
    {
      id: 's7l1',
      title: 'The Ethernet Frame',
      icon: '📋',
      questions: [
        {
          type: 'teach',
          title: 'The Frame — Layer 2\'s Unit of Power',
          body: 'At Layer 2, data is wrapped in an Ethernet frame. The key fields every CCNA candidate must know:\n\nDestination MAC (6 bytes) → Source MAC (6 bytes) → EtherType (2 bytes) → Data/Payload (46–1500 bytes) → FCS (4 bytes).\n\nThe FCS (Frame Check Sequence) uses a CRC calculation to detect errors. If the CRC does not match on the receiving end, the frame is silently discarded — Layer 2 detects errors but does not correct them.',
        },
        {
          type: 'teach',
          title: 'EtherType & Frame Size Limits',
          body: 'The EtherType field identifies the Layer 3 protocol inside the frame:\n\n0x0800 → IPv4\n0x0806 → ARP\n0x86DD → IPv6\n0x8100 → 802.1Q VLAN tag\n\nMinimum Ethernet frame size: 64 bytes. Maximum: 1518 bytes (1522 with an 802.1Q tag). Frames shorter than 64 bytes are called runts and are discarded.',
        },
        {
          type: 'mcq',
          question: 'What is the purpose of the FCS field in an Ethernet frame?',
          choices: [
            'It identifies the Layer 3 protocol in the payload',
            'It provides error detection using a CRC calculation',
            'It specifies the source MAC address',
            'It defines the VLAN membership of the frame',
          ],
          answer: 'It provides error detection using a CRC calculation',
        },
        {
          type: 'mcq',
          question: 'What EtherType value indicates an IPv4 payload?',
          choices: ['0x0806', '0x0800', '0x86DD', '0x8100'],
          answer: '0x0800',
        },
        {
          type: 'mcq',
          question: 'What is the minimum valid size of an Ethernet frame?',
          choices: ['32 bytes', '48 bytes', '64 bytes', '128 bytes'],
          answer: '64 bytes',
          explanation: 'Frames smaller than 64 bytes are called runts and are the result of collisions or faulty NICs. They are discarded.',
        },
        {
          type: 'tf',
          question: 'The Ethernet FCS field corrects errors in damaged frames.',
          answer: false,
          explanation: 'The FCS detects errors using a CRC but does NOT correct them. A frame with an FCS mismatch is silently discarded. Error correction is handled at higher layers (e.g., TCP retransmission).',
        },
        {
          type: 'mcq',
          question: 'What is the maximum payload size of a standard Ethernet frame?',
          choices: ['512 bytes', '1024 bytes', '1500 bytes', '9000 bytes'],
          answer: '1500 bytes',
          explanation: 'The standard Ethernet MTU (Maximum Transmission Unit) is 1500 bytes of payload. The total maximum frame size is 1518 bytes including all headers.',
        },
        {
          type: 'fill',
          question: 'Ethernet frames shorter than 64 bytes are called ________.',
          answer: 'runts',
        },
        {
          type: 'mcq',
          question: 'Which EtherType value indicates an ARP payload?',
          choices: ['0x0800', '0x0806', '0x8100', '0x86DD'],
          answer: '0x0806',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 2 – MAC Addresses & ARP
    // ─────────────────────────────────────────────────────────
    {
      id: 's7l2',
      title: 'MAC Addresses & ARP',
      icon: '🏷️',
      questions: [
        {
          type: 'teach',
          title: 'Anatomy of a MAC Address',
          body: 'A MAC address is 48 bits (6 bytes) written in hexadecimal. It has two halves:\n\nOUI (Organisationally Unique Identifier) — the first 3 bytes, assigned by IEEE to the manufacturer. Tells you who made the NIC.\nDevice ID — the last 3 bytes, assigned by the manufacturer to each individual card.\n\nCisco notation: XXXX.XXXX.XXXX. The broadcast MAC address is FF:FF:FF:FF:FF:FF — every device on the local network receives frames sent to this address.',
        },
        {
          type: 'teach',
          title: 'ARP — Bridging Layer 3 and Layer 2',
          body: 'When Host A wants to send a packet to Host B on the same network, it knows the IP address but needs the MAC address. ARP (Address Resolution Protocol) resolves this:\n\n1. Host A sends an ARP Request as a broadcast (FF:FF:FF:FF:FF:FF): "Who has 192.168.1.1?"\n2. Host B (if that is its IP) replies with a unicast ARP Reply: "I have 192.168.1.1; my MAC is XX:XX:XX:XX:XX:XX."\n3. Host A caches the IP-to-MAC mapping in its ARP table.\n\nARP only works within the same subnet.',
        },
        {
          type: 'mcq',
          question: 'How many bytes is a MAC address?',
          choices: ['4', '6', '8', '16'],
          answer: '6',
        },
        {
          type: 'mcq',
          question: 'What is the broadcast MAC address?',
          choices: ['00:00:00:00:00:00', 'FF:FF:FF:FF:FF:FF', '01:00:5E:00:00:01', '00:FF:FF:FF:FF:FF'],
          answer: 'FF:FF:FF:FF:FF:FF',
        },
        {
          type: 'mcq',
          question: 'What does the OUI portion of a MAC address identify?',
          choices: [
            'The IP address of the device',
            'The VLAN the device belongs to',
            'The manufacturer of the NIC',
            'The port number the device is connected to',
          ],
          answer: 'The manufacturer of the NIC',
        },
        {
          type: 'tf',
          question: 'An ARP Request is sent as a broadcast so that all hosts on the local network receive it.',
          answer: true,
          explanation: 'The ARP Request destination MAC is FF:FF:FF:FF:FF:FF (broadcast). All hosts on the segment receive it; only the host with the matching IP replies.',
        },
        {
          type: 'mcq',
          question: 'What type of frame does a host send when it does not know the MAC address of the destination?',
          choices: ['A unicast frame directly to the destination', 'A multicast frame to the router', 'An ARP Request broadcast', 'An ICMP Echo Request'],
          answer: 'An ARP Request broadcast',
        },
        {
          type: 'fill',
          question: 'ARP maps an IP address to a ________ address.',
          answer: 'MAC',
        },
        {
          type: 'mcq',
          question: 'An ARP Reply is sent as which type of frame?',
          choices: ['Broadcast', 'Multicast', 'Unicast', 'Anycast'],
          answer: 'Unicast',
          explanation: 'Only the device that sent the ARP Request needs the reply, so it is sent as a unicast directly to that device.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 3 – Switches & the MAC Address Table
    // ─────────────────────────────────────────────────────────
    {
      id: 's7l3',
      title: 'Switches & the MAC Address Table',
      icon: '🔀',
      questions: [
        {
          type: 'teach',
          title: 'How a Switch Learns',
          body: 'A switch builds its MAC address table (also called the CAM table) dynamically:\n\n1. A frame arrives on a port.\n2. The switch reads the SOURCE MAC address and records it against the incoming port.\n3. The switch then looks up the DESTINATION MAC in its table.\n\nThis learning-by-source-MAC method means the switch builds its table passively just by observing normal traffic.',
        },
        {
          type: 'teach',
          title: 'Flood, Forward, Filter',
          body: 'A switch takes one of three actions for every frame:\n\nFlood — destination MAC is unknown (not in the table). Send the frame out all ports except the one it arrived on. This is called unknown unicast flooding.\nForward — destination MAC is known. Send the frame only out the correct port.\nFilter — source and destination are on the same port. Discard the frame (no need to send it elsewhere).\n\nMAC table entries age out after 300 seconds by default.',
        },
        {
          type: 'mcq',
          question: 'What does a switch do when it receives a frame with an unknown destination MAC address?',
          choices: [
            'Drops the frame',
            'Sends the frame to the router',
            'Floods the frame out all ports except the incoming port',
            'Sends an ARP Request',
          ],
          answer: 'Floods the frame out all ports except the incoming port',
        },
        {
          type: 'mcq',
          question: 'What Cisco IOS command displays the MAC address table on a switch?',
          choices: ['show ip arp', 'show interfaces', 'show mac address-table', 'show vlan brief'],
          answer: 'show mac address-table',
        },
        {
          type: 'tf',
          question: 'A switch learns MAC addresses by examining the source MAC of incoming frames.',
          answer: true,
          explanation: 'The switch records the source MAC address and the port it arrived on. This is how the MAC address table is built dynamically.',
        },
        {
          type: 'mcq',
          question: 'What is the default MAC address table aging time on a Cisco switch?',
          choices: ['60 seconds', '120 seconds', '300 seconds', '600 seconds'],
          answer: '300 seconds',
          explanation: 'By default, Cisco switches age out MAC address table entries after 300 seconds (5 minutes) of inactivity.',
        },
        {
          type: 'tf',
          question: 'A switch forwards a frame out all ports (including the incoming port) when flooding.',
          answer: false,
          explanation: 'When flooding, a switch sends the frame out all ports EXCEPT the port it was received on. This prevents the originating host from receiving its own transmission.',
        },
        {
          type: 'fill',
          question: 'The MAC address table on a Cisco switch is also known as the ________ table.',
          answer: 'CAM',
          explanation: 'CAM stands for Content Addressable Memory. The MAC address table is stored in CAM hardware for fast lookups.',
        },
        {
          type: 'mcq',
          question: 'What switch action is taken when the source and destination MAC addresses are on the same port?',
          choices: ['Flood', 'Forward', 'Filter', 'Fragment'],
          answer: 'Filter',
          explanation: 'If both source and destination are on the same port (same segment), the switch discards the frame — there is no need to send it anywhere.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 4 – Duplex & Collision/Broadcast Domains
    // ─────────────────────────────────────────────────────────
    {
      id: 's7l4',
      title: 'Duplex & Collision Domains',
      icon: '↔️',
      questions: [
        {
          type: 'teach',
          title: 'Half Duplex vs Full Duplex',
          body: 'Half duplex: a device can either send OR receive at a moment in time — not both. Like a walkie-talkie. This was the norm with hubs and early Ethernet.\n\nFull duplex: a device can send AND receive simultaneously. This is the standard with modern switches. Full duplex eliminates collisions entirely on that link and doubles effective throughput.\n\nA duplex mismatch — one side full, the other half — causes performance degradation and late collisions.',
        },
        {
          type: 'teach',
          title: 'Collision Domains vs Broadcast Domains',
          body: 'A collision domain is a network segment where frames can collide. A broadcast domain is a segment where broadcast frames are propagated.\n\nHub: all ports share ONE collision domain and ONE broadcast domain — terrible at scale.\nSwitch: each port is its own collision domain (no more collisions) but all ports share ONE broadcast domain by default.\nRouter: each interface is its own collision domain AND its own broadcast domain — routers block broadcasts.\n\nVLANs create additional broadcast domain boundaries on a switch.',
        },
        {
          type: 'mcq',
          question: 'Which mode allows a device to send and receive data simultaneously?',
          choices: ['Half duplex', 'Full duplex', 'Simplex', 'Multiplexed'],
          answer: 'Full duplex',
        },
        {
          type: 'mcq',
          question: 'How many collision domains does a 24-port switch create?',
          choices: ['1', '2', '12', '24'],
          answer: '24',
          explanation: 'Each switch port is its own collision domain. A 24-port switch creates 24 separate collision domains.',
        },
        {
          type: 'tf',
          question: 'A hub creates a separate collision domain for each port.',
          answer: false,
          explanation: 'A hub places all ports in a single shared collision domain. Only switches separate collision domains per port.',
        },
        {
          type: 'mcq',
          question: 'What is the result of a duplex mismatch between two connected devices?',
          choices: [
            'The connection will not establish at all',
            'Performance degradation and late collisions',
            'Increased bandwidth',
            'Automatic fallback to half duplex on both sides',
          ],
          answer: 'Performance degradation and late collisions',
        },
        {
          type: 'mcq',
          question: 'A router with 4 interfaces connected to 4 different networks creates how many broadcast domains?',
          choices: ['1', '2', '4', '8'],
          answer: '4',
          explanation: 'Each router interface defines a separate broadcast domain. 4 interfaces = 4 broadcast domains.',
        },
        {
          type: 'tf',
          question: 'A switch with all ports in the same VLAN has one broadcast domain.',
          answer: true,
          explanation: 'Without VLANs separating them, all ports on a switch belong to the same broadcast domain. VLANs are needed to create multiple broadcast domains on a single switch.',
        },
        {
          type: 'wordbank',
          question: 'Match each device to the number of collision domains it creates (assume 1 port/interface each):',
          bank: ['Hub (4 ports)', 'Switch (4 ports)', 'Router (4 interfaces)', '1', '4', '4'],
          answer: ['Hub (4 ports)', '1', 'Switch (4 ports)', '4', 'Router (4 interfaces)', '4'],
          explanation: 'Hub: 1 shared collision domain. Switch: 4 (one per port). Router: 4 (one per interface).',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 5 – Section Review
    // ─────────────────────────────────────────────────────────
    {
      id: 's7l5',
      title: 'Section Review',
      icon: '🏆',
      questions: [
        {
          type: 'mcq',
          question: 'Which field in an Ethernet frame is used for error detection?',
          choices: ['EtherType', 'Preamble', 'FCS', 'Source MAC'],
          answer: 'FCS',
        },
        {
          type: 'mcq',
          question: 'What is the first 3 bytes of a MAC address called?',
          choices: ['Device ID', 'OUI', 'VLAN Tag', 'EtherType'],
          answer: 'OUI',
        },
        {
          type: 'tf',
          question: 'An ARP Request is sent as a unicast to the target host.',
          answer: false,
          explanation: 'ARP Requests are broadcast (FF:FF:FF:FF:FF:FF) because the sender does not yet know the target\'s MAC address. Only ARP Replies are unicast.',
        },
        {
          type: 'mcq',
          question: 'What action does a switch take when it receives a frame destined for a MAC address not in its table?',
          choices: ['Drop the frame', 'Send an ARP Request', 'Flood out all ports except the incoming port', 'Forward to the default gateway'],
          answer: 'Flood out all ports except the incoming port',
        },
        {
          type: 'fill',
          question: 'The maximum standard Ethernet payload size (MTU) is ________ bytes.',
          answer: '1500',
        },
        {
          type: 'mcq',
          question: 'Which device creates a separate collision domain for each port but a single broadcast domain?',
          choices: ['Hub', 'Switch', 'Router', 'Access Point'],
          answer: 'Switch',
        },
        {
          type: 'mcq',
          question: 'How long does a Cisco switch retain a MAC address table entry by default before aging it out?',
          choices: ['60 seconds', '120 seconds', '300 seconds', '3600 seconds'],
          answer: '300 seconds',
        },
        {
          type: 'tf',
          question: 'Full duplex connections eliminate collisions on a switched link.',
          answer: true,
          explanation: 'Full duplex allows simultaneous send and receive on dedicated switch ports, which eliminates the possibility of collisions.',
        },
        {
          type: 'wordbank',
          question: 'Match each Ethernet frame field to its size:',
          bank: ['Destination MAC', 'FCS', 'Source MAC', '6 bytes', '4 bytes', '6 bytes'],
          answer: ['Destination MAC', '6 bytes', 'FCS', '4 bytes', 'Source MAC', '6 bytes'],
        },
      ],
    },
  ],
};
