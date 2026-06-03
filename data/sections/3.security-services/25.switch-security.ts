import type { Section } from '../../../lib/types';

export const SECTION_SWITCH_SECURITY: Section = {
  id: 'switch-security',
  title: 'Switch Security',
  icon: '🛡️',
  unlockAfter: 'etherchannel',
  lessons: [
    {
      id: 'l1',
      title: 'Port Security',
      icon: '🔌',
      questions: [
        {
          type: 'teach',
          title: 'Limiting MAC Addresses per Port',
          body: 'Port security restricts which MAC addresses can send traffic on a switch port. Configure with "switchport port-security" after setting the port as an access port. Set the maximum allowed MACs with "switchport port-security maximum [n]" (default 1). The violation action controls what happens when a rogue MAC is detected: protect (drop frames silently), restrict (drop + increment counter), or shutdown (err-disable the port — default).',
        },
        {
          type: 'mcq',
          question: 'Which is the default port security violation mode on Cisco switches?',
          choices: ['Protect', 'Restrict', 'Shutdown', 'Disable'],
          answer: 'Shutdown',
        },
        {
          type: 'mcq',
          question: 'What does the port security "restrict" violation mode do?',
          choices: [
            'Drops frames and shuts the port down',
            'Drops frames silently with no log',
            'Drops frames and increments the violation counter',
            'Allows all frames but logs a warning',
          ],
          answer: 'Drops frames and increments the violation counter',
        },
        {
          type: 'tf',
          question: 'Port security can only be configured on access ports, not trunk ports.',
          answer: true,
          explanation: 'Port security requires the interface to be a static access port ("switchport mode access"). It cannot be applied to dynamically negotiated or trunk ports.',
        },
        {
          type: 'mcq',
          question: 'Which command enables sticky MAC address learning on a port security-enabled interface?',
          choices: [
            'switchport port-security sticky',
            'switchport port-security mac-address sticky',
            'port-security sticky enable',
            'mac-address sticky',
          ],
          answer: 'switchport port-security mac-address sticky',
        },
        {
          type: 'fill',
          question: 'The command to set the maximum allowed MAC addresses to 3 is "switchport port-security maximum _____".',
          answer: '3',
        },
        {
          type: 'mcq',
          question: 'A port in err-disabled state due to a port security violation can be recovered by:',
          choices: [
            'Clearing the MAC address table',
            'Issuing shutdown then no shutdown on the interface',
            'Reloading the switch',
            'Removing port security configuration',
          ],
          answer: 'Issuing shutdown then no shutdown on the interface',
        },
        {
          type: 'tf',
          question: '"Protect" mode sends a syslog message when a port security violation occurs.',
          answer: false,
          explanation: 'Protect mode silently drops frames from unknown MACs with no log or counter increment. Only "restrict" and "shutdown" generate syslog messages and increment the violation counter.',
        },
        {
          type: 'mcq',
          question: 'Which command shows port security status and learned MAC addresses for all interfaces?',
          choices: [
            'show port-security',
            'show switchport port-security',
            'show mac-address-table secure',
            'show interfaces security',
          ],
          answer: 'show port-security',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Storm Control',
      icon: '⛈️',
      questions: [
        {
          type: 'teach',
          title: 'Controlling Broadcast, Multicast, and Unicast Storms',
          body: 'Storm control monitors the rate of broadcast, multicast, or unknown unicast frames on a port. When traffic exceeds the configured threshold, storm control can block the traffic (action: block) or shut the port down (action: shutdown). Configure thresholds as a percentage of port bandwidth or as packets/bits per second. This protects the network from unintentional or malicious traffic floods.',
        },
        {
          type: 'mcq',
          question: 'Which command enables storm control for broadcasts at 20% of port bandwidth on Gi0/1?',
          choices: [
            'storm-control broadcast level 20',
            'ip storm-control broadcast 20%',
            'switchport storm-control broadcast 20',
            'storm-control broadcast 20',
          ],
          answer: 'storm-control broadcast level 20',
        },
        {
          type: 'mcq',
          question: 'What traffic types can storm control monitor?',
          choices: [
            'Broadcast only',
            'Broadcast and multicast only',
            'Broadcast, multicast, and unknown unicast',
            'All IP traffic',
          ],
          answer: 'Broadcast, multicast, and unknown unicast',
        },
        {
          type: 'tf',
          question: 'Storm control thresholds can be configured as a percentage of interface bandwidth.',
          answer: true,
          explanation: 'Storm control thresholds are most commonly set as a percentage (e.g. 20.00%) of the interface bandwidth. They can also be set as bits per second (bps) or packets per second (pps).',
        },
        {
          type: 'mcq',
          question: 'Which storm control action shuts the port down when the threshold is exceeded?',
          choices: ['block', 'restrict', 'shutdown', 'drop'],
          answer: 'shutdown',
        },
        {
          type: 'fill',
          question: 'The storm control action that blocks offending traffic without disabling the port is "storm-control action _____".',
          answer: 'shutdown',
        },
        {
          type: 'tf',
          question: 'Storm control is a Layer 3 feature implemented on routers.',
          answer: false,
          explanation: 'Storm control is a Layer 2 switch feature applied per interface. It monitors and limits broadcast, multicast, and unknown unicast frame rates on switch access or trunk ports.',
        },
        {
          type: 'mcq',
          question: 'Which command shows storm control configuration and statistics for all interfaces?',
          choices: ['show storm-control', 'show interfaces storm', 'show switchport storm-control', 'show traffic storm'],
          answer: 'show storm-control',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Dynamic ARP Inspection',
      icon: '🛡️',
      questions: [
        {
          type: 'teach',
          title: 'Preventing ARP Spoofing with DAI',
          body: 'Dynamic ARP Inspection (DAI) validates ARP packets on a VLAN by checking them against the DHCP snooping binding table. An attacker could send gratuitous ARPs claiming to be the default gateway (ARP spoofing / man-in-the-middle). DAI drops ARP packets on untrusted ports if the IP-to-MAC mapping does not match the binding table. Uplink ports are configured as trusted, all access ports are untrusted.',
        },
        {
          type: 'mcq',
          question: 'What attack does Dynamic ARP Inspection (DAI) prevent?',
          choices: [
            'DHCP starvation',
            'ARP spoofing / man-in-the-middle',
            'STP root bridge hijacking',
            'MAC flooding',
          ],
          answer: 'ARP spoofing / man-in-the-middle',
        },
        {
          type: 'mcq',
          question: 'Which command enables DAI for VLAN 10?',
          choices: [
            'ip arp inspection',
            'ip arp inspection vlan 10',
            'arp inspection vlan 10',
            'dai enable vlan 10',
          ],
          answer: 'ip arp inspection vlan 10',
        },
        {
          type: 'tf',
          question: 'DAI relies on the DHCP snooping binding table to validate ARP packets.',
          answer: true,
          explanation: 'DAI checks the IP-to-MAC mapping in each ARP packet against the DHCP snooping binding table. If the mapping does not match, the ARP is considered spoofed and is dropped.',
        },
        {
          type: 'mcq',
          question: 'Which command marks an interface as trusted for DAI inspection?',
          choices: [
            'arp trust',
            'ip arp inspection trust',
            'dai trusted',
            'switchport arp trust',
          ],
          answer: 'ip arp inspection trust',
        },
        {
          type: 'fill',
          question: 'DAI is enabled per _____ on a Cisco switch (e.g. "ip arp inspection vlan 10").',
          answer: 'VLAN',
        },
        {
          type: 'tf',
          question: 'Uplink switch ports should be configured as DAI untrusted to inspect all ARP traffic.',
          answer: false,
          explanation: 'Uplink ports connecting to routers or upstream switches should be DAI trusted — these devices have legitimate ARP traffic that won\'t match client binding table entries. Only access ports facing end hosts should be untrusted.',
        },
        {
          type: 'mcq',
          question: 'What happens to an ARP packet received on a DAI untrusted port if the IP-MAC mapping does not match the binding table?',
          choices: ['It is forwarded normally', 'It is rate-limited', 'It is dropped', 'It generates a DHCP Discover'],
          answer: 'It is dropped',
        },
      ],
    },
    {
      id: 'l4',
      title: 'Putting It Together',
      icon: '🔐',
      questions: [
        {
          type: 'teach',
          title: 'Layered Switch Security',
          body: 'Enterprise switch security combines multiple features: DHCP snooping blocks rogue DHCP servers, DAI prevents ARP spoofing, port security limits MAC addresses per port, and storm control prevents traffic floods. These features work together — DHCP snooping builds the binding table that DAI uses. Enable them in order: DHCP snooping → DAI → port security, and configure trusted ports consistently across all three.',
        },
        {
          type: 'mcq',
          question: 'Which switch security feature must be enabled before DAI can validate ARP packets?',
          choices: ['Port security', 'DHCP snooping', 'Storm control', '802.1X'],
          answer: 'DHCP snooping',
        },
        {
          type: 'tf',
          question: 'DHCP snooping, DAI, and port security all need to distinguish trusted from untrusted ports.',
          answer: true,
          explanation: 'All three features use a trusted/untrusted port model. Uplink ports are trusted; access ports facing end hosts are untrusted. This consistency is essential for correct operation.',
        },
        {
          type: 'mcq',
          question: 'A rogue DHCP server on an untrusted port sends an Offer. Which feature drops it?',
          choices: ['DAI', 'Port security', 'DHCP snooping', 'Storm control'],
          answer: 'DHCP snooping',
        },
        {
          type: 'mcq',
          question: 'An attacker sends crafted ARP replies claiming to be the gateway. Which feature stops this?',
          choices: ['Port security', 'Storm control', 'DHCP snooping', 'Dynamic ARP Inspection'],
          answer: 'Dynamic ARP Inspection',
        },
        {
          type: 'fill',
          question: 'Port security limits the number of _____ addresses allowed on a switch port.',
          answer: 'MAC',
        },
        {
          type: 'mcq',
          question: 'A host is using a static IP (not DHCP). DAI drops its ARP traffic even though it is legitimate. What should you configure?',
          choices: [
            'Add a static DAI ARP access control list entry for the host',
            'Disable DAI for the host\'s VLAN',
            'Change the host to use DHCP',
            'Mark the host\'s port as DHCP trusted',
          ],
          answer: 'Add a static DAI ARP access control list entry for the host',
        },
        {
          type: 'tf',
          question: 'Storm control can be used to mitigate a MAC flooding attack.',
          answer: false,
          explanation: 'Storm control targets broadcast, multicast, and unknown unicast traffic volume. MAC flooding generates unknown unicast traffic but is better mitigated with port security (limiting MACs per port) rather than storm control alone.',
        },
        {
          type: 'mcq',
          question: 'Which command verifies that DHCP snooping is enabled and shows trusted/untrusted port status?',
          choices: ['show dhcp snooping', 'show ip dhcp snooping', 'show ip dhcp snooping binding', 'show ip dhcp snooping statistics'],
          answer: 'show ip dhcp snooping',
        },
      ],
    },
  ],
};
