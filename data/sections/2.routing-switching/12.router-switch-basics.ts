import type { Section } from '../../../lib/types';

export const SECTION_ROUTER_SWITCH_BASICS: Section = {
  id: 'router-switch-basics',
  title: 'Cisco Router and Switch Basics',
  icon: '🔀',
  unlockAfter: 'troubleshooting-methodology',
  lessons: [
    {
      id: 'l1',
      title: 'How Routers Work',
      icon: '🔀',
      questions: [
        {
          type: 'teach',
          title: 'The Router\'s Job',
          body: 'A router connects different IP networks and forwards packets based on destination IP addresses — this is a Layer 3 function. When a packet arrives, the router looks up the destination in its routing table and sends it out the best matching interface. If no match exists and no default route is configured, the packet is dropped.',
        },
        {
          type: 'teach',
          title: 'The Routing Table',
          body: 'The routing table contains connected routes (directly attached networks, added automatically when an interface is up/up), static routes (manually configured), and dynamic routes (learned via OSPF, EIGRP, etc.). When multiple routes match a destination, the router picks the one with the longest prefix — the most specific match wins.',
        },
        {
          type: 'mcq',
          question: 'At which OSI layer does a router make forwarding decisions?',
          choices: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
          answer: 'Layer 3',
        },
        {
          type: 'mcq',
          question: 'A routing table has entries for 10.0.0.0/8 and 10.1.1.0/24. A packet arrives for 10.1.1.5. Which route is used?',
          choices: [
            '10.0.0.0/8 — it is the broader match',
            '10.1.1.0/24 — longest-prefix match wins',
            'Both routes are used and load-balanced',
            'The packet is dropped due to ambiguity',
          ],
          answer: '10.1.1.0/24 — longest-prefix match wins',
        },
        {
          type: 'tf',
          question: 'A connected route is automatically added to the routing table when an interface has an IP address and is in an up/up state.',
          answer: true,
          explanation: 'Cisco IOS adds a connected (C) route for any interface that has an IP address configured and whose status is up/up — no manual configuration is needed.',
        },
        {
          type: 'mcq',
          question: 'What happens when a router receives a packet with no matching route and no default route configured?',
          choices: [
            'The packet is flooded out all interfaces',
            'The packet is queued until a route appears',
            'The packet is dropped',
            'The packet is sent back to the source',
          ],
          answer: 'The packet is dropped',
        },
        {
          type: 'fill',
          question: 'A route that is manually entered by an administrator is called a _____ route.',
          answer: 'static',
        },
        {
          type: 'mcq',
          question: 'Which command displays the routing table on a Cisco router?',
          choices: ['show ip arp', 'show ip route', 'show interfaces', 'show ip interface brief'],
          answer: 'show ip route',
        },
        {
          type: 'wordbank',
          question: 'Order these route sources from lowest to highest administrative distance (most trusted first):',
          bank: ['OSPF', 'Connected', 'Static route', 'EIGRP'],
          answer: ['Connected', 'Static route', 'EIGRP', 'OSPF'],
        },
        {
          type: 'tf',
          question: 'A router forwards frames between hosts on the same subnet.',
          answer: false,
          explanation: 'Hosts on the same subnet communicate directly at Layer 2 via a switch. Routers only forward traffic between different networks (different subnets).',
        },
      ],
    },
    {
      id: 'l2',
      title: 'How Switches Work',
      icon: '🔌',
      questions: [
        {
          type: 'teach',
          title: 'The Switch\'s Job',
          body: 'A switch operates at Layer 2 (Data Link) and forwards Ethernet frames based on MAC addresses. It builds a MAC address table by recording the source MAC address and the port a frame arrived on — this is called dynamic learning. Once the destination MAC is known, the switch sends the frame only to the correct port.',
        },
        {
          type: 'teach',
          title: 'Flood, Forward, Filter',
          body: 'Three behaviours define switch operation: flood (send out all ports except source) for unknown destination MACs, forward (send to the specific learned port) for known destinations, and filter (discard the frame) when the source and destination are on the same port. Flooding is normal for new entries and stops once the MAC is learned.',
        },
        {
          type: 'mcq',
          question: 'At which OSI layer does a switch make forwarding decisions?',
          choices: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
          answer: 'Layer 2',
        },
        {
          type: 'mcq',
          question: 'A switch receives a frame for a MAC address not in its address table. What does it do?',
          choices: [
            'Drops the frame',
            'Sends the frame to the default gateway',
            'Floods the frame out all ports except the source port',
            'Requests the address via ARP',
          ],
          answer: 'Floods the frame out all ports except the source port',
        },
        {
          type: 'tf',
          question: 'A switch learns MAC addresses by examining the source MAC address of incoming frames.',
          answer: true,
          explanation: 'When a frame arrives, the switch records the source MAC and the port it came in on. This dynamic learning process builds the MAC address table over time.',
        },
        {
          type: 'mcq',
          question: 'What switch behaviour occurs when the source and destination MAC are on the same port?',
          choices: ['Forwarding', 'Flooding', 'Filtering', 'Spanning'],
          answer: 'Filtering',
        },
        {
          type: 'fill',
          question: 'The table a switch uses to map MAC addresses to port numbers is called the MAC _____ table.',
          answer: 'address',
        },
        {
          type: 'mcq',
          question: 'Which command displays the MAC address table on a Cisco switch?',
          choices: ['show ip route', 'show arp', 'show mac address-table', 'show interfaces'],
          answer: 'show mac address-table',
        },
        {
          type: 'tf',
          question: 'A standard Layer 2 switch can route traffic between different IP subnets.',
          answer: false,
          explanation: 'A Layer 2 switch only forwards frames based on MAC addresses. Routing between subnets requires a Layer 3 device — a router or a Layer 3 switch.',
        },
        {
          type: 'wordbank',
          question: 'Match switch behaviour to its trigger — order: known unicast, unknown unicast, same-port source and destination:',
          bank: ['Filter', 'Forward', 'Flood'],
          answer: ['Forward', 'Flood', 'Filter'],
        },
      ],
    },
    {
      id: 'l3',
      title: 'Interface Types',
      icon: '🔗',
      questions: [
        {
          type: 'teach',
          title: 'Physical Interface Types',
          body: 'Cisco routers use several physical interface types: Ethernet (FastEthernet = Fa, 100 Mbps; GigabitEthernet = Gi, 1 Gbps; TenGigabitEthernet = Te, 10 Gbps), Serial (Ser, used for WAN point-to-point links — the DCE end must supply the clock rate), and a dedicated Management port for out-of-band access. Interfaces are referenced by type and slot/port number, e.g. GigabitEthernet0/0 or Gi0/0.',
        },
        {
          type: 'teach',
          title: 'Logical Interfaces — Loopback and SVI',
          body: 'A loopback interface is software-only, always remains up, and is used as a stable router ID for OSPF/BGP or for testing reachability. A Switch Virtual Interface (SVI) is configured with "interface vlan [id]" on a Layer 3 switch and gives a VLAN a routable IP address for inter-VLAN routing or management access.',
        },
        {
          type: 'mcq',
          question: 'What is the IOS abbreviation for a GigabitEthernet interface?',
          choices: ['Ge', 'Gi', 'Gb', 'GE'],
          answer: 'Gi',
        },
        {
          type: 'tf',
          question: 'A loopback interface goes down when the router loses its physical uplink.',
          answer: false,
          explanation: 'Loopback interfaces are logical (software-only) and remain up as long as the router is running. They have no dependency on physical link status, making them ideal as stable identifiers.',
        },
        {
          type: 'mcq',
          question: 'On a serial WAN link, which end must configure the clock rate?',
          choices: ['DTE end', 'DCE end', 'Both ends', 'Neither — it is auto-negotiated'],
          answer: 'DCE end',
        },
        {
          type: 'mcq',
          question: 'What is a Switch Virtual Interface (SVI) used for?',
          choices: [
            'Creating a trunk link between two switches',
            'Assigning a Layer 3 IP address to a VLAN for routing or management',
            'Configuring port security on an access port',
            'Providing out-of-band management access',
          ],
          answer: 'Assigning a Layer 3 IP address to a VLAN for routing or management',
        },
        {
          type: 'fill',
          question: 'The IOS command to enter the configuration of a loopback interface is "interface _____ 0".',
          answer: 'loopback',
        },
        {
          type: 'tf',
          question: 'FastEthernet interfaces support speeds up to 100 Mbps.',
          answer: true,
          explanation: 'FastEthernet (Fa) operates at 10 or 100 Mbps. GigabitEthernet (Gi) supports 10/100/1000 Mbps.',
        },
        {
          type: 'mcq',
          question: 'Which interface type is most commonly used as a stable OSPF router ID?',
          choices: ['Serial', 'FastEthernet', 'Loopback', 'SVI'],
          answer: 'Loopback',
        },
        {
          type: 'wordbank',
          question: 'Match each interface to its primary use — order: inter-VLAN routing on a switch, always-up stable identifier, WAN point-to-point:',
          bank: ['Serial', 'Loopback', 'SVI'],
          answer: ['SVI', 'Loopback', 'Serial'],
        },
      ],
    },
    {
      id: 'l4',
      title: 'IOS Modes & Saving Config',
      icon: '💾',
      questions: [
        {
          type: 'teach',
          title: 'IOS Mode Hierarchy',
          body: 'Cisco IOS has four main modes: User EXEC (Router>) for basic monitoring, Privileged EXEC (Router#) for full show commands and management, Global Configuration (Router(config)#) for device-wide settings, and sub-modes like Interface Config (Router(config-if)#) for interface-specific commands. Navigate upward with "enable" then "configure terminal", and downward with "exit" or jump to Privileged EXEC with "end".',
        },
        {
          type: 'teach',
          title: 'Running Config vs Startup Config',
          body: 'The running-config is the active configuration held in RAM — changes take effect immediately but are lost on reload. The startup-config is stored in NVRAM and is loaded at boot. Save changes with "copy running-config startup-config" or the shorthand "write memory". Never reload a device without saving verified changes.',
        },
        {
          type: 'mcq',
          question: 'Which prompt indicates Privileged EXEC mode?',
          choices: ['Router>', 'Router#', 'Router(config)#', 'Router(config-if)#'],
          answer: 'Router#',
        },
        {
          type: 'mcq',
          question: 'Which command saves the running configuration to NVRAM?',
          choices: [
            'save running-config',
            'write running',
            'copy running-config startup-config',
            'copy startup-config running-config',
          ],
          answer: 'copy running-config startup-config',
        },
        {
          type: 'tf',
          question: 'The running-config is stored in NVRAM and survives a device reload.',
          answer: false,
          explanation: 'Running-config is stored in volatile RAM and is lost on reload or power loss. Only the startup-config, stored in NVRAM, persists across reloads.',
        },
        {
          type: 'mcq',
          question: 'Which command enters Global Configuration mode from Privileged EXEC?',
          choices: ['config', 'enable', 'configure terminal', 'global config'],
          answer: 'configure terminal',
        },
        {
          type: 'fill',
          question: 'The shortcut command equivalent to "copy running-config startup-config" is write _____.',
          answer: 'memory',
        },
        {
          type: 'mcq',
          question: 'Where is the startup-config stored on a Cisco device?',
          choices: ['RAM', 'Flash', 'NVRAM', 'ROM'],
          answer: 'NVRAM',
        },
        {
          type: 'tf',
          question: 'You can configure an IP address on an interface directly from Privileged EXEC mode (Router#).',
          answer: false,
          explanation: 'IP address configuration requires Interface Config sub-mode (Router(config-if)#). You must first run "configure terminal" then navigate to the interface.',
        },
        {
          type: 'wordbank',
          question: 'Order the IOS mode hierarchy from least to most privileged:',
          bank: ['Global Config', 'Privileged EXEC', 'Interface Config', 'User EXEC'],
          answer: ['User EXEC', 'Privileged EXEC', 'Global Config', 'Interface Config'],
        },
      ],
    },
  ],
};
