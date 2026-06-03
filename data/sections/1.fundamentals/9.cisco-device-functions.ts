import type { Section } from '../../../lib/types';

export const SECTION_CISCO_DEVICE_FUNCTIONS: Section = {
  id: 'cisco-device-functions',
  title: 'Cisco Device Functions',
  icon: '🖥️',
  unlockAfter: 'physical-layer',
  lessons: [
    // ─────────────────────────────────────────────────────────
    // Lesson 1 – Routers, Switches & Hubs
    // ─────────────────────────────────────────────────────────
    {
      id: 's9l1',
      title: 'Routers, Switches & Hubs',
      icon: '🗺️',
      questions: [
        {
          type: 'teach',
          title: 'Three Devices, Three Layers',
          body: 'The three foundational network devices each operate at a different OSI layer:\n\nHub (Layer 1) — A dumb repeater. It broadcasts every received signal out all ports. No intelligence, no MAC table, all ports share one collision domain. Legacy device — you will not find one in a modern network.\n\nSwitch (Layer 2) — Learns MAC addresses and forwards frames intelligently. Each port is a separate collision domain. The workhorse of the modern LAN.\n\nRouter (Layer 3) — Routes packets between networks using IP addresses. Separates broadcast domains. The gateway between networks.',
        },
        {
          type: 'teach',
          title: 'Choosing the Right Device',
          body: 'The right device depends on what you need to connect and separate:\n\nNeed to connect devices in the same network? → Switch\nNeed to connect different networks together? → Router\nNeed to segment broadcast traffic, apply access policies, or connect to the internet? → Router\n\nA switch grows your network within a site. A router connects your site to the world — or to other sites. Both are usually present in any real deployment.',
        },
        {
          type: 'mcq',
          question: 'At which OSI layer does a hub operate?',
          choices: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
          answer: 'Layer 1',
        },
        {
          type: 'mcq',
          question: 'Which device makes forwarding decisions based on IP addresses?',
          choices: ['Hub', 'Switch', 'Router', 'Access Point'],
          answer: 'Router',
        },
        {
          type: 'tf',
          question: 'A hub creates a separate collision domain for each connected port.',
          answer: false,
          explanation: 'A hub places ALL ports in a single shared collision domain. Only switches create a separate collision domain per port.',
        },
        {
          type: 'mcq',
          question: 'Which device would you use to connect two different IP networks together?',
          choices: ['Hub', 'Switch', 'Router', 'Repeater'],
          answer: 'Router',
        },
        {
          type: 'tf',
          question: 'A switch forwards broadcast frames to all ports in the same VLAN.',
          answer: true,
          explanation: 'Switches flood broadcast frames (destination MAC FF:FF:FF:FF:FF:FF) out all ports in the same broadcast domain (VLAN). Only routers block broadcasts by default.',
        },
        {
          type: 'mcq',
          question: 'Which statement correctly describes a hub?',
          choices: [
            'It forwards frames based on MAC addresses',
            'It routes packets based on IP addresses',
            'It repeats all received signals out every port',
            'It separates collision domains for each port',
          ],
          answer: 'It repeats all received signals out every port',
        },
        {
          type: 'wordbank',
          question: 'Match each device to its OSI layer:',
          bank: ['Hub', 'Switch', 'Router', 'Layer 1', 'Layer 2', 'Layer 3'],
          answer: ['Hub', 'Layer 1', 'Switch', 'Layer 2', 'Router', 'Layer 3'],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 2 – Firewalls & Security Appliances
    // ─────────────────────────────────────────────────────────
    {
      id: 's9l2',
      title: 'Firewalls & Security Appliances',
      icon: '🔥',
      questions: [
        {
          type: 'teach',
          title: 'The Firewall — Guardian of the Network Boundary',
          body: 'A firewall controls traffic entering and leaving a network based on a defined rule set. The key distinction:\n\nStateless firewall — inspects each packet in isolation against a rule set (source IP, destination IP, port). Fast but limited — cannot understand whether a packet is part of an established TCP session.\n\nStateful firewall — tracks the state of TCP connections in a state table. Only allows inbound packets that correspond to established outbound sessions. Much more secure. Cisco ASA is a stateful firewall.',
        },
        {
          type: 'teach',
          title: 'Next-Generation Firewalls & the DMZ',
          body: 'An NGFW (Next-Generation Firewall) adds capabilities beyond stateful inspection: application-layer visibility, intrusion prevention (IPS), URL filtering, and SSL decryption. The Cisco Firepower platform is Cisco\'s NGFW.\n\nA DMZ (Demilitarized Zone) is a network segment between the internet and the internal network, used to host public-facing servers (web, email, DNS). Traffic from the internet can reach the DMZ, but the firewall prevents it from reaching the internal LAN.',
        },
        {
          type: 'mcq',
          question: 'What is the primary difference between a stateless and a stateful firewall?',
          choices: [
            'Stateless firewalls are faster but inspect each packet in isolation; stateful firewalls track connection state',
            'Stateless firewalls block all traffic; stateful firewalls allow all traffic',
            'Stateless firewalls operate at Layer 7; stateful firewalls operate at Layer 2',
            'Stateless firewalls require more memory than stateful firewalls',
          ],
          answer: 'Stateless firewalls are faster but inspect each packet in isolation; stateful firewalls track connection state',
        },
        {
          type: 'mcq',
          question: 'What is the purpose of a DMZ in network design?',
          choices: [
            'To connect two routers directly',
            'To host public-facing servers in a zone isolated from the internal LAN',
            'To provide wireless access for guests',
            'To balance load across multiple servers',
          ],
          answer: 'To host public-facing servers in a zone isolated from the internal LAN',
        },
        {
          type: 'tf',
          question: 'A stateful firewall tracks the state of active TCP connections in a state table.',
          answer: true,
          explanation: 'Stateful inspection maintains a state table of active connections. This allows the firewall to permit return traffic for established sessions without needing an explicit inbound rule.',
        },
        {
          type: 'mcq',
          question: 'Which Cisco platform is classified as a Next-Generation Firewall (NGFW)?',
          choices: ['Cisco Catalyst', 'Cisco ASR', 'Cisco Firepower', 'Cisco Nexus'],
          answer: 'Cisco Firepower',
        },
        {
          type: 'fill',
          question: 'DMZ stands for ________ Zone.',
          answer: 'Demilitarized',
        },
        {
          type: 'mcq',
          question: 'Which additional capability distinguishes an NGFW from a traditional stateful firewall?',
          choices: [
            'The ability to forward frames by MAC address',
            'Application-layer visibility and intrusion prevention (IPS)',
            'Support for wireless clients',
            'Layer 1 signal regeneration',
          ],
          answer: 'Application-layer visibility and intrusion prevention (IPS)',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 3 – Layer 2 vs Layer 3 Switches
    // ─────────────────────────────────────────────────────────
    {
      id: 's9l3',
      title: 'Layer 2 vs Layer 3 Switches',
      icon: '🔀',
      questions: [
        {
          type: 'teach',
          title: 'The Multilayer Switch — Best of Both Worlds',
          body: 'A standard Layer 2 switch forwards frames by MAC address but cannot route between different VLANs — traffic between VLANs must leave the switch, go to a router, and come back. This is called router-on-a-stick.\n\nA Layer 3 switch (multilayer switch) can do both: it switches frames AND routes packets between VLANs internally using SVIs (Switched Virtual Interfaces). This is faster, simpler, and more scalable than using an external router for inter-VLAN routing.',
        },
        {
          type: 'teach',
          title: 'SVIs — The Virtual Interface',
          body: 'An SVI (Switched Virtual Interface) is a virtual Layer 3 interface on a multilayer switch, created with the interface vlan <id> command. Each VLAN that needs routing gets an SVI with an IP address that serves as the default gateway for hosts in that VLAN.\n\nExample:\ninterface vlan 10\n ip address 192.168.10.1 255.255.255.0\n no shutdown\n\nHosts in VLAN 10 set their gateway to 192.168.10.1. The switch routes between VLANs at wire speed.',
        },
        {
          type: 'mcq',
          question: 'What is a Switched Virtual Interface (SVI) used for on a Layer 3 switch?',
          choices: [
            'To assign a physical port to a VLAN',
            'To provide a Layer 3 interface for a VLAN, enabling inter-VLAN routing',
            'To configure port security on a switch port',
            'To enable spanning tree on a specific VLAN',
          ],
          answer: 'To provide a Layer 3 interface for a VLAN, enabling inter-VLAN routing',
        },
        {
          type: 'mcq',
          question: 'What is the Cisco IOS command to create an SVI for VLAN 10?',
          choices: [
            'interface vlan 10',
            'vlan 10 svi',
            'ip interface vlan10',
            'switchport vlan 10',
          ],
          answer: 'interface vlan 10',
        },
        {
          type: 'tf',
          question: 'A Layer 2 switch can route traffic between different VLANs without external assistance.',
          answer: false,
          explanation: 'A Layer 2 switch cannot route between VLANs. You need either a router (router-on-a-stick) or a Layer 3 switch with SVIs to route between VLANs.',
        },
        {
          type: 'mcq',
          question: 'Which method routes traffic between VLANs using a single physical router interface with subinterfaces?',
          choices: [
            'Inter-VLAN routing with SVIs',
            'Router-on-a-stick',
            'Layer 3 switching',
            'VLAN trunking protocol',
          ],
          answer: 'Router-on-a-stick',
        },
        {
          type: 'tf',
          question: 'A Layer 3 switch can perform both Layer 2 switching and Layer 3 routing.',
          answer: true,
          explanation: 'A multilayer (Layer 3) switch uses ASICs to forward frames at Layer 2 AND route packets between VLANs at Layer 3 — all at wire speed.',
        },
        {
          type: 'fill',
          question: 'SVI stands for Switched Virtual ________.',
          answer: 'Interface',
        },
        {
          type: 'mcq',
          question: 'What is the primary advantage of using a Layer 3 switch for inter-VLAN routing over router-on-a-stick?',
          choices: [
            'Layer 3 switches are cheaper than routers',
            'Routing is performed internally at wire speed with no external bottleneck',
            'Layer 3 switches support more routing protocols',
            'Router-on-a-stick does not support VLANs',
          ],
          answer: 'Routing is performed internally at wire speed with no external bottleneck',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 4 – Wireless Devices: APs & WLCs
    // ─────────────────────────────────────────────────────────
    {
      id: 's9l4',
      title: 'Wireless Devices: APs & WLCs',
      icon: '📶',
      questions: [
        {
          type: 'teach',
          title: 'Autonomous vs Lightweight Access Points',
          body: 'Two models of wireless AP deployment exist:\n\nAutonomous AP — A standalone access point that is independently configured and managed. Suitable for small deployments. Each AP is its own island of configuration.\n\nLightweight AP (LAP) — A "dumb" AP that offloads all intelligence to a Wireless LAN Controller (WLC). The AP just handles radio signals; the WLC handles authentication, roaming, QoS, and configuration. Scalable to thousands of APs.',
        },
        {
          type: 'teach',
          title: 'CAPWAP & the WLC',
          body: 'Lightweight APs communicate with the WLC using the CAPWAP protocol (Control And Provisioning of Wireless Access Points). CAPWAP creates two tunnels between the LAP and WLC:\n\nControl tunnel — encrypted, carries management/configuration traffic.\nData tunnel — carries user data traffic to the WLC for centralised forwarding.\n\nBenefits of centralised wireless control: single pane of glass management, seamless roaming between APs, consistent security policy enforcement across all APs.',
        },
        {
          type: 'mcq',
          question: 'What protocol do Lightweight Access Points use to communicate with a Wireless LAN Controller?',
          choices: ['LWAPP', 'CAPWAP', 'SNMP', 'CDP'],
          answer: 'CAPWAP',
          explanation: 'CAPWAP (Control And Provisioning of Wireless Access Points) replaced the older LWAPP protocol. It creates encrypted control and data tunnels between the LAP and WLC.',
        },
        {
          type: 'mcq',
          question: 'What is the role of a Wireless LAN Controller (WLC)?',
          choices: [
            'To provide Layer 2 switching for wired clients',
            'To centrally manage, configure, and control Lightweight Access Points',
            'To route packets between different VLANs',
            'To provide DHCP services to wireless clients',
          ],
          answer: 'To centrally manage, configure, and control Lightweight Access Points',
        },
        {
          type: 'tf',
          question: 'An autonomous access point requires a Wireless LAN Controller to function.',
          answer: false,
          explanation: 'An autonomous AP is self-contained and configured independently. It does not need a WLC. Lightweight APs require a WLC.',
        },
        {
          type: 'mcq',
          question: 'What does SSID stand for?',
          choices: [
            'Secure System Identification Data',
            'Service Set Identifier',
            'Subnet Service ID',
            'Switch Station Interface Designator',
          ],
          answer: 'Service Set Identifier',
          explanation: 'The SSID is the name of a wireless network that clients see and connect to.',
        },
        {
          type: 'tf',
          question: 'CAPWAP creates two tunnels between a Lightweight AP and its WLC: a control tunnel and a data tunnel.',
          answer: true,
          explanation: 'CAPWAP uses UDP port 5246 for the control tunnel (management) and UDP port 5247 for the data tunnel (user traffic).',
        },
        {
          type: 'mcq',
          question: 'Which AP deployment model is most scalable for a large enterprise with hundreds of access points?',
          choices: [
            'Autonomous APs',
            'Lightweight APs managed by a WLC',
            'Standalone APs with SSH management',
            'Mesh APs without a controller',
          ],
          answer: 'Lightweight APs managed by a WLC',
        },
        {
          type: 'fill',
          question: 'CAPWAP stands for Control And Provisioning of Wireless ________ Points.',
          answer: 'Access',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 5 – Section Review
    // ─────────────────────────────────────────────────────────
    {
      id: 's9l5',
      title: 'Section Review',
      icon: '🏆',
      questions: [
        {
          type: 'mcq',
          question: 'Which device operates at Layer 1 and simply repeats signals to all connected ports?',
          choices: ['Switch', 'Router', 'Hub', 'Firewall'],
          answer: 'Hub',
        },
        {
          type: 'mcq',
          question: 'A multilayer switch uses which type of virtual interface to perform inter-VLAN routing?',
          choices: ['Loopback', 'Subinterface', 'SVI', 'Tunnel'],
          answer: 'SVI',
        },
        {
          type: 'tf',
          question: 'A stateful firewall is less secure than a stateless firewall because it allows more traffic through.',
          answer: false,
          explanation: 'Stateful firewalls are MORE secure. By tracking connection state, they only permit inbound packets that correspond to established outbound sessions.',
        },
        {
          type: 'mcq',
          question: 'Which protocol do Lightweight APs use to tunnel data to a WLC?',
          choices: ['GRE', 'IPsec', 'CAPWAP', 'LWAPP'],
          answer: 'CAPWAP',
        },
        {
          type: 'fill',
          question: 'A Layer 3 switch can both switch frames at Layer 2 and ________ packets at Layer 3.',
          answer: 'route',
        },
        {
          type: 'mcq',
          question: 'What is a DMZ used for in network security design?',
          choices: [
            'Encrypting internal traffic',
            'Hosting public-facing servers in an isolated zone between the internet and the internal LAN',
            'Providing wireless access for internal users',
            'Routing between VLANs',
          ],
          answer: 'Hosting public-facing servers in an isolated zone between the internet and the internal LAN',
        },
        {
          type: 'mcq',
          question: 'Which device separates broadcast domains by default?',
          choices: ['Hub', 'Switch', 'Router', 'Access Point'],
          answer: 'Router',
        },
        {
          type: 'tf',
          question: 'An autonomous access point can operate independently without a WLC.',
          answer: true,
          explanation: 'Autonomous APs are self-contained — they manage their own configuration and do not require a WLC. Lightweight APs do require a WLC.',
        },
        {
          type: 'wordbank',
          question: 'Match each device to its primary function:',
          bank: ['Router', 'Switch', 'Firewall', 'Routes packets between networks', 'Forwards frames by MAC address', 'Filters traffic by security policy'],
          answer: ['Router', 'Routes packets between networks', 'Switch', 'Forwards frames by MAC address', 'Firewall', 'Filters traffic by security policy'],
        },
      ],
    },
  ],
};
