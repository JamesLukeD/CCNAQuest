import type { Section } from '../../../lib/types';

export const SECTION_WAN: Section = {
  id: 'wan',
  title: 'WAN Technologies',
  icon: '🖧',
  unlockAfter: 'ipv6',
  lessons: [
    {
      id: 'l1',
      title: 'WAN Concepts & Types',
      icon: '🌐',
      questions: [
        {
          type: 'teach',
          title: 'WAN Overview',
          body: 'A WAN (Wide Area Network) connects geographically separated sites, typically using service-provider infrastructure. Common WAN types include leased lines (dedicated point-to-point), MPLS (provider-managed label-switched network), Metro Ethernet (carrier Ethernet over fibre), and internet-based VPNs. The CPE (Customer Premises Equipment) connects to the provider\'s network at the demarcation point (demarc) — the boundary between customer and provider responsibility.',
        },
        {
          type: 'mcq',
          question: 'What does the demarcation point (demarc) represent in a WAN connection?',
          choices: [
            'The centre of the provider\'s core network',
            'The boundary between customer and service-provider responsibility',
            'The customer\'s core router',
            'The point where MPLS labels are applied',
          ],
          answer: 'The boundary between customer and service-provider responsibility',
        },
        {
          type: 'mcq',
          question: 'Which WAN type provides a dedicated, always-on point-to-point connection between two sites?',
          choices: ['MPLS', 'Leased line', 'Internet VPN', 'Frame Relay'],
          answer: 'Leased line',
        },
        {
          type: 'tf',
          question: 'MPLS labels are used at Layer 2.5 — between the data link and network layers.',
          answer: true,
          explanation: 'MPLS operates between Layer 2 and Layer 3, sometimes called Layer 2.5. Labels are added after the Layer 2 header and used to forward packets through the provider network without traditional IP routing at each hop.',
        },
        {
          type: 'mcq',
          question: 'Which device abbreviation refers to the customer\'s router at the WAN edge?',
          choices: ['CO', 'CPE', 'PE', 'CSU/DSU'],
          answer: 'CPE',
        },
        {
          type: 'fill',
          question: 'The provider\'s router that connects to the customer CPE in an MPLS network is called the _____ (Provider Edge) router.',
          answer: 'PE',
        },
        {
          type: 'tf',
          question: 'Metro Ethernet delivers WAN services over traditional copper telephone lines.',
          answer: false,
          explanation: 'Metro Ethernet delivers WAN services using fibre-optic Ethernet infrastructure within a metropolitan area, providing familiar Ethernet interfaces to the customer at WAN distances and speeds.',
        },
        {
          type: 'mcq',
          question: 'Which WAN technology uses the public internet with encryption to connect remote sites cost-effectively?',
          choices: ['Leased line', 'MPLS', 'Internet VPN', 'ATM'],
          answer: 'Internet VPN',
        },
      ],
    },
    {
      id: 'l2',
      title: 'WAN Serial Protocols',
      icon: '📞',
      questions: [
        {
          type: 'teach',
          title: 'HDLC and PPP',
          body: 'Serial WAN links use Layer 2 encapsulation protocols. Cisco HDLC is the default on Cisco serial interfaces but is Cisco-proprietary — it cannot interoperate with non-Cisco devices. PPP (Point-to-Point Protocol) is an open-standard serial encapsulation that supports authentication (PAP or CHAP), compression, and error detection. Change encapsulation with "encapsulation ppp" or "encapsulation hdlc".',
        },
        {
          type: 'mcq',
          question: 'What is the default Layer 2 encapsulation on Cisco serial interfaces?',
          choices: ['PPP', 'HDLC', 'Frame Relay', 'Ethernet'],
          answer: 'HDLC',
        },
        {
          type: 'mcq',
          question: 'Why might you choose PPP over Cisco HDLC on a serial link?',
          choices: [
            'PPP is faster than HDLC',
            'PPP is open-standard and supports authentication and multi-vendor interoperability',
            'HDLC does not support serial links',
            'PPP uses less bandwidth than HDLC',
          ],
          answer: 'PPP is open-standard and supports authentication and multi-vendor interoperability',
        },
        {
          type: 'tf',
          question: 'Cisco HDLC is compatible with HDLC implementations from other vendors.',
          answer: false,
          explanation: 'Cisco HDLC adds a proprietary type field to the standard HDLC frame, making it incompatible with non-Cisco equipment. Use PPP when connecting Cisco routers to non-Cisco devices.',
        },
        {
          type: 'mcq',
          question: 'Which PPP authentication method sends credentials in plain text?',
          choices: ['CHAP', 'EAP', 'PAP', 'MS-CHAPv2'],
          answer: 'PAP',
        },
        {
          type: 'fill',
          question: 'The more secure PPP authentication method that uses a three-way handshake and never sends the password in clear text is _____.',
          answer: 'CHAP',
        },
        {
          type: 'mcq',
          question: 'Which command changes the encapsulation on a serial interface to PPP?',
          choices: ['ppp encapsulation', 'encapsulation ppp', 'serial ppp enable', 'ip encapsulation ppp'],
          answer: 'encapsulation ppp',
        },
        {
          type: 'tf',
          question: 'PPP Multilink allows multiple physical serial links to be combined into one logical link.',
          answer: true,
          explanation: 'PPP Multilink (MLP) bundles multiple physical WAN links into one logical channel, increasing aggregate bandwidth and providing redundancy — similar to EtherChannel for Ethernet.',
        },
      ],
    },
    {
      id: 'l3',
      title: 'MPLS and SD-WAN',
      icon: '🔀',
      questions: [
        {
          type: 'teach',
          title: 'MPLS Forwarding and SD-WAN',
          body: 'In MPLS, the ingress PE router adds a label to each packet. Core (P) routers forward based on labels without examining the IP header — faster than traditional routing. The egress PE removes the label and delivers to the CE. SD-WAN abstracts WAN transport using a centralised controller, allowing dynamic path selection across MPLS, internet, and LTE links based on application policy.',
        },
        {
          type: 'mcq',
          question: 'What does an MPLS core (P) router use to forward packets?',
          choices: ['Destination IP address', 'MPLS label', 'MAC address table', 'VLAN tag'],
          answer: 'MPLS label',
        },
        {
          type: 'mcq',
          question: 'Which MPLS router adds the label to incoming packets from the customer?',
          choices: ['P router', 'CE router', 'Ingress PE router', 'Core router'],
          answer: 'Ingress PE router',
        },
        {
          type: 'tf',
          question: 'SD-WAN allows dynamic traffic steering across multiple WAN transports based on application policy.',
          answer: true,
          explanation: 'SD-WAN uses a centralised controller to apply business policies — routing voice over low-latency MPLS and bulk transfers over cheaper internet links, dynamically adapting to real-time path quality.',
        },
        {
          type: 'mcq',
          question: 'Which component in SD-WAN provides centralised policy management and visibility?',
          choices: ['PE router', 'SD-WAN controller', 'CE router', 'CPE modem'],
          answer: 'SD-WAN controller',
        },
        {
          type: 'fill',
          question: 'In MPLS, the customer edge router is abbreviated _____.',
          answer: 'CE',
        },
        {
          type: 'mcq',
          question: 'What is the key advantage of SD-WAN over traditional MPLS-only WANs?',
          choices: [
            'SD-WAN provides higher raw bandwidth than MPLS',
            'SD-WAN can use multiple transports (MPLS, internet, LTE) with centralised control',
            'SD-WAN eliminates the need for encryption',
            'SD-WAN is a Cisco-proprietary technology',
          ],
          answer: 'SD-WAN can use multiple transports (MPLS, internet, LTE) with centralised control',
        },
        {
          type: 'tf',
          question: 'MPLS is exclusively used for Layer 3 IP routing.',
          answer: false,
          explanation: 'MPLS can carry many payload types including IPv4, IPv6, and Ethernet frames (VPLS). The label determines forwarding, independent of the IP header.',
        },
      ],
    },
    {
      id: 'l4',
      title: 'VPN Technologies',
      icon: '🔐',
      questions: [
        {
          type: 'teach',
          title: 'Site-to-Site and Remote Access VPNs',
          body: 'VPNs encrypt traffic over an untrusted network. Site-to-site VPNs connect entire networks — typically using IPsec. Remote-access VPNs connect individual users using SSL/TLS (clientless) or IPsec with a VPN client. GRE tunnels can carry multicast and routing protocol traffic but provide no encryption — combine GRE over IPsec for encrypted routing updates.',
        },
        {
          type: 'mcq',
          question: 'Which VPN type is typically used to connect two branch offices over the internet?',
          choices: ['Remote-access VPN', 'Site-to-site VPN', 'SSL VPN', 'PPTP VPN'],
          answer: 'Site-to-site VPN',
        },
        {
          type: 'mcq',
          question: 'Which protocol is commonly used for site-to-site VPNs on Cisco routers?',
          choices: ['SSL/TLS', 'IPsec', 'L2TP', 'PPTP'],
          answer: 'IPsec',
        },
        {
          type: 'tf',
          question: 'A GRE tunnel provides encryption by default.',
          answer: false,
          explanation: 'GRE encapsulates packets to carry multicast and routing protocol traffic but provides NO encryption. Combine GRE with IPsec (GRE over IPsec) to secure the tunnel.',
        },
        {
          type: 'mcq',
          question: 'What is a key advantage of GRE tunnels over plain IPsec tunnels?',
          choices: [
            'GRE provides stronger encryption',
            'GRE can carry multicast and routing protocol traffic',
            'GRE is faster than IPsec',
            'GRE supports IPv6 natively',
          ],
          answer: 'GRE can carry multicast and routing protocol traffic',
        },
        {
          type: 'fill',
          question: 'SSL VPN is considered _____ because it only requires a web browser with no additional client software.',
          answer: 'clientless',
        },
        {
          type: 'mcq',
          question: 'Which IPsec mode encapsulates the entire original IP packet (used in site-to-site VPNs)?',
          choices: ['Transport mode', 'Tunnel mode', 'GRE mode', 'AH mode'],
          answer: 'Tunnel mode',
        },
        {
          type: 'tf',
          question: 'IPsec transport mode encrypts only the payload of the original IP packet, keeping the original IP header intact.',
          answer: true,
          explanation: 'Transport mode encrypts the data payload while preserving the original IP header. It is used for end-to-end encryption between two hosts. Tunnel mode wraps the entire original packet in a new IP header, used for site-to-site VPNs.',
        },
        {
          type: 'mcq',
          question: 'Which command verifies the status of GRE tunnel interface 0 on a Cisco router?',
          choices: ['show tunnel 0', 'show interfaces tunnel 0', 'show ip gre tunnel 0', 'show vpn tunnel 0'],
          answer: 'show interfaces tunnel 0',
        },
      ],
    },
  ],
};
